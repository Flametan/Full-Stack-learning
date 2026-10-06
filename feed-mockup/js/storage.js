"use strict";

/* Speicher im Browser (IndexedDB)
   posts:    eigene Beiträge mit Bildern
   state:    Interaktionen, Änderungen und Löschungen pro Beitrag
   settings: Einstellungen und Reihenfolge des Feeds */

const storage = (() => {
  const DB_NAME = "feed-simulation";
  const DB_VERSION = 2;
  let dbPromise = null;

  function open() {
    dbPromise ??= new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB wird nicht unterstützt"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("posts")) db.createObjectStore("posts", { keyPath: "id" });
        if (!db.objectStoreNames.contains("state")) db.createObjectStore("state", { keyPath: "id" });
        if (!db.objectStoreNames.contains("settings")) db.createObjectStore("settings", { keyPath: "key" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("Datenbank ist blockiert"));
    });
    return dbPromise;
  }

  async function run(storeName, mode, operation) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const request = operation(transaction.objectStore(storeName));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  return {
    getAll: (storeName) => run(storeName, "readonly", (store) => store.getAll()),
    put: (storeName, value) => run(storeName, "readwrite", (store) => store.put(value)),
    delete: (storeName, id) => run(storeName, "readwrite", (store) => store.delete(id)),
  };
})();

let storageAvailable = false;

function handleStorageError(error) {
  const quota = error?.name === "QuotaExceededError";
  showToast(quota ? "Nicht genug Speicherplatz im Browser." : "Speichern im Browser fehlgeschlagen.");
}

function persist(operation) {
  if (!storageAvailable) return Promise.resolve();
  return operation().catch(handleStorageError);
}

// Ältere Einträge (ein Bild pro Beitrag, "createdAt") in das aktuelle Format bringen
function normalizeOwnRecord(record) {
  const media = Array.isArray(record.media)
    ? record.media
    : [{ blob: record.blob, name: record.name, width: record.width, height: record.height, alt: record.alt }];
  if (!media.length || !media.every((item) => item.blob instanceof Blob)) return null;
  return {
    id: record.id,
    media,
    caption: record.caption ?? null,
    postedAt: record.postedAt ?? record.createdAt ?? Date.now(),
    likes: Number.isFinite(record.likes) ? record.likes : 0,
    ad: record.ad ?? null,
    focus: record.focus ?? "center",
  };
}

async function loadStoredData() {
  try {
    const [postRecords, stateRecords, settingRecords] = await Promise.all([
      storage.getAll("posts"),
      storage.getAll("state"),
      storage.getAll("settings"),
    ]);
    storageAvailable = true;
    return {
      ownRecords: postRecords.map(normalizeOwnRecord).filter(Boolean),
      storedStates: new Map(stateRecords.map((record) => [record.id, record])),
      storedSettings: new Map(settingRecords.map((record) => [record.key, record.value])),
    };
  } catch {
    return { ownRecords: [], storedStates: new Map(), storedSettings: new Map() };
  }
}

function saveSetting(key, value) {
  persist(() => storage.put("settings", { key, value }));
}

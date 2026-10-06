"use strict";

/* ------------------------------------------------------------------ */
/* Inhalte                                                             */
/* ------------------------------------------------------------------ */

const ACCOUNT = {
  username: "katastrophenschutz.hessen",
  location: "Hessen",
};

const VIEWER = "mein_profil";

// Begleittext, der unter jedem Beitrag steht
const CAPTION = [
  "Feuerwehr am Wochenende, THW-Ortsverband unter der Woche und hauptberuflich in der Klinik oder beim Energieversorger?",
  "Im Alltag passt das zusammen. Bei einer Großschadenslage oder Katastrophe werden aber alle gleichzeitig gebraucht. Dann zählt, wo Sie tatsächlich verfügbar sind.",
  "Wie viele Einsatzkräfte in Hessen bei mehreren Organisationen eingeplant sind oder in ihrem Hauptberuf in der Kritischen Infrastruktur unabkömmlich wären, soll eine landesweite Online-Abfrage klären. Sie läuft in gleicher Form in mehreren Bundesländern und hilft, uns besser auf große Lagen vorzubereiten.",
  "Eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen, auch wenn Sie nur in einer Organisation aktiv sind.",
  "So machen Sie mit: Fragen Sie Ihre Führungskraft nach den Zugangsdaten und nehmen Sie bis 31. Dezember 2026 teil.",
  "#Katastrophenschutz #Zivilschutz #Feuerwehr #THW #Rettungsdienst #Ehrenamt #KRITIS #Hessen",
];

const POSTS = [
  {
    id: "mehrfach-verplant",
    image: "images/mehrfach-verplant.png",
    width: 536,
    height: 646,
    alt: "Kampagnenmotiv (KI-generiert): Ein Mann und eine Frau in Einsatzkleidung stehen vor einem Feuerwehrfahrzeug, einem Rettungswagen und einem THW-Fahrzeug mit Blaulicht. Darunter auf dunkelblauem Grund der Text: Mehrfach verplant? Landesweite Abfrage für alle Einsatzkräfte im Zivil- und Katastrophenschutz in Hessen. Zugangsdaten bei Ihrer Führungskraft. Teilnahme bis zum 31. Dezember 2026. Unten rechts das Hessen-Logo.",
    hoursAgo: 2,
    likes: 1284,
    commentCount: 38,
    comments: [
      { author: "markus.k_112", text: "Bei uns in der Wehr sind mindestens fünf Leute auch beim THW. Wenn es richtig knallt, fehlen die an einer Stelle. Gut, dass das mal jemand erfasst." },
      { author: "sanitaeterin.jule", text: "Hauptberuflich Rettungsdienst, nebenbei freiwillige Feuerwehr. Ich bin dann wohl gemeint." },
      { author: "anna.wehrt", text: "Wir haben die Zugangsdaten beim letzten Dienstabend bekommen." },
      { author: "jan.brandschutz", text: "Und was ist mit Leuten, die nur in einer Organisation sind? Sollen die auch mitmachen?" },
      { author: ACCOUNT.username, text: "@jan.brandschutz Ja, eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen, auch wenn sie nur in einer Organisation aktiv sind." },
    ],
  },
  {
    id: "einmal-sie-dreimal-verplant-mann",
    image: "images/einmal-sie-dreimal-verplant-mann.png",
    width: 534,
    height: 668,
    alt: "Kampagnenmotiv (KI-generiert): Ein Mann in Einsatzkleidung mit THW-Aufschrift steht mit dem Helm in der Hand zwischen Einsatzfahrzeugen. Rechts auf dunkelblauem Grund das Hessen-Logo und der Text: Abfrage im Zivil- und Katastrophenschutz. Einmal Sie. Dreimal verplant? Zugangsdaten gibt es bei Ihrer Führungskraft.",
    hoursAgo: 26,
    likes: 963,
    commentCount: 21,
    comments: [
      { author: "t.becker_fw", text: "Einmal ich, dreimal verplant. Trifft es ziemlich genau." },
      { author: "kristina.drk", text: "Wäre interessant, die Ergebnisse später auch zu sehen." },
      { author: "ole.112", text: "Ich arbeite bei den Stadtwerken und bin Zugführer in der Feuerwehr. Im Ernstfall müsste ich mich entscheiden." },
      { author: "maja.rettet", text: "Schon an unsere Gruppe weitergeleitet." },
    ],
  },
  {
    id: "einmal-sie-dreimal-verplant-frau",
    image: "images/einmal-sie-dreimal-verplant-frau.png",
    width: 533,
    height: 668,
    alt: "Kampagnenmotiv (KI-generiert): Eine Frau in Einsatzkleidung mit THW-Aufschrift steht mit dem Helm unter dem Arm vor einem Rettungswagen und einem Einsatzfahrzeug. Rechts auf dunkelblauem Grund das Hessen-Logo und der Text: Abfrage im Zivil- und Katastrophenschutz. Einmal Sie. Dreimal verplant? Zugangsdaten gibt es bei Ihrer Führungskraft.",
    hoursAgo: 72,
    likes: 1047,
    commentCount: 27,
    comments: [
      { author: "lisa.ehrenamt", text: "Gut, dass auch eine Frau im Einsatz gezeigt wird." },
      { author: "pascal.thw", text: "Habe die Zugangsdaten heute von meinem Zugführer bekommen." },
      { author: "r.hofmann", text: "Die Einsatzkleidung ist eine ziemlich wilde Mischung aus allen Organisationen." },
      { author: "nina.sanitaet", text: "Gilt das auch für Helferinnen und Helfer im Sanitätsdienst?" },
      { author: ACCOUNT.username, text: "@nina.sanitaet Eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen." },
    ],
  },
  {
    id: "wer-kommt-wenn-alle-rufen",
    image: "images/wer-kommt-wenn-alle-rufen.png",
    width: 533,
    height: 669,
    alt: "Kampagnenmotiv: Auf dunkelblauem Grund das Hessen-Logo und der Text: Feuerwehr, THW, Rettungsdienst und dazu der Hauptberuf. Wer kommt, wenn alle gleichzeitig rufen? Landesweite Abfrage zur Mehrfachverplanung im Zivil- und Katastrophenschutz. Mitmachen bis zum 31. Dezember 2026. Zugangsdaten bei Ihrer Führungskraft.",
    hoursAgo: 120,
    likes: 702,
    commentCount: 16,
    comments: [
      { author: "f.schneider_kbi", text: "Die Frage stellt sich bei jeder Großlage. Gut, dass sie jetzt einmal systematisch gestellt wird." },
      { author: "carla.leitstelle", text: "Bis Ende Dezember ist noch Zeit, trotzdem lieber gleich erledigen." },
      { author: "dennis_fw", text: "In unserer WhatsApp-Gruppe geteilt." },
    ],
  },
];

const SHARE_CONTACTS = [
  "markus.k_112",
  "sanitaeterin.jule",
  "lukas.thw",
  "anna.wehrt",
  "ole.112",
  "maja.rettet",
  "dennis_fw",
  "kristina.drk",
];

const NOTIFICATIONS = [
  { user: ACCOUNT.username, text: "hat einen neuen Beitrag geteilt.", hoursAgo: 2, postId: "mehrfach-verplant" },
  { user: "sanitaeterin.jule", text: "hat angefangen, dir zu folgen.", hoursAgo: 5 },
  { user: "lukas.thw", text: `hat einen Beitrag von ${ACCOUNT.username} mit dir geteilt.`, hoursAgo: 25, postId: "einmal-sie-dreimal-verplant-mann" },
];

const REPORT_REASONS = [
  "Mir gefällt das nicht",
  "Spam",
  "Falschinformationen",
  "Betrug oder Täuschung",
  "Verletzung von Urheberrechten",
  "Etwas anderes",
];

const VISIBLE_COMMENTS = 2;

/* ------------------------------------------------------------------ */
/* Zustand und Hilfsfunktionen                                         */
/* ------------------------------------------------------------------ */

// Zustand pro Beitrag; "stored" ist der im Browser gespeicherte Stand (falls vorhanden)
function createPostState(post, stored = {}) {
  const liked = stored.liked === true;
  const userComments = Array.isArray(stored.comments) ? stored.comments.filter((text) => typeof text === "string") : [];
  return {
    liked,
    saved: stored.saved === true,
    likes: post.likes + (liked ? 1 : 0),
    commentCount: post.commentCount + userComments.length,
    userComments,
    likedComments: new Set(Array.isArray(stored.likedComments) ? stored.likedComments : []),
  };
}

const state = new Map();

const dom = {
  screen: document.getElementById("screen"),
  feed: document.getElementById("feed"),
  posts: document.getElementById("feed-posts"),
  postTemplate: document.getElementById("post-template"),
  commentTemplate: document.getElementById("comment-template"),
  toast: document.getElementById("toast"),
  sheetLayer: document.getElementById("sheet-layer"),
  sheet: document.getElementById("sheet"),
  sheetTitle: document.getElementById("sheet-title"),
  sheetBody: document.getElementById("sheet-body"),
  searchToggle: document.getElementById("search-toggle"),
  searchPanel: document.getElementById("search-panel"),
  searchForm: document.getElementById("search-form"),
  searchInput: document.getElementById("search-input"),
  searchClose: document.getElementById("search-close"),
  searchResults: document.getElementById("search-results"),
  notificationsToggle: document.getElementById("notifications-toggle"),
  notificationsPanel: document.getElementById("notifications-panel"),
  notificationsDot: document.getElementById("notifications-dot"),
  notificationList: document.getElementById("notification-list"),
  profileToggle: document.getElementById("profile-toggle"),
  profilePanel: document.getElementById("profile-panel"),
  savedList: document.getElementById("saved-list"),
  ownPostsInfo: document.getElementById("own-posts-info"),
  exportButton: document.getElementById("export-button"),
  importInput: document.getElementById("import-input"),
  statLiked: document.getElementById("stat-liked"),
  statSaved: document.getElementById("stat-saved"),
  statComments: document.getElementById("stat-comments"),
  navItems: document.querySelectorAll(".bottom-nav__item"),
};

const numberFormat = new Intl.NumberFormat("de-DE");

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

function focusableIn(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);
}

function getPost(id) {
  return POSTS.find((post) => post.id === id);
}

function getPostElement(id) {
  return document.getElementById(`post-${id}`);
}

function postAgeHours(post) {
  return post.createdAt ? (Date.now() - post.createdAt) / 3600000 : post.hoursAgo;
}

function formatAgeShort(hours) {
  if (hours < 1 / 60) return "Jetzt";
  if (hours < 1) return `${Math.floor(hours * 60)} Min.`;
  return hours < 24 ? `${Math.floor(hours)} Std.` : `${Math.floor(hours / 24)} T.`;
}

function formatAgeLong(hours) {
  if (hours < 1 / 60) return "gerade eben";
  if (hours < 1) {
    const minutes = Math.floor(hours * 60);
    return minutes === 1 ? "vor 1 Minute" : `vor ${minutes} Minuten`;
  }
  if (hours < 24) {
    const fullHours = Math.floor(hours);
    return fullHours === 1 ? "vor 1 Stunde" : `vor ${fullHours} Stunden`;
  }
  const days = Math.floor(hours / 24);
  return days === 1 ? "vor 1 Tag" : `vor ${days} Tagen`;
}

function isoTimeAgo(hours) {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
}

function likesLabel(count) {
  if (count === 0) return "Noch keine „Gefällt mir“-Angaben";
  return `Gefällt ${numberFormat.format(count)} Mal`;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function initials(name) {
  return name.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase();
}

function hueFromName(name) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

function createAvatar(name, sizeClass) {
  const avatar = document.createElement("span");
  avatar.className = `avatar ${sizeClass}`;
  avatar.setAttribute("aria-hidden", "true");
  if (name === ACCOUNT.username) {
    avatar.classList.add("avatar--account");
    avatar.append(dom.postTemplate.content.querySelector(".avatar svg").cloneNode(true));
  } else {
    avatar.textContent = initials(name);
    avatar.style.setProperty("--avatar-hue", hueFromName(name));
  }
  return avatar;
}

// Hashtags und @-Erwähnungen farbig hervorheben
function appendRichText(element, text) {
  const pattern = /([#@][\p{L}\p{N}_]+(?:\.[\p{L}\p{N}_]+)*)/gu;
  text.split(pattern).forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      const tag = document.createElement("span");
      tag.className = "hashtag";
      tag.textContent = part;
      element.append(tag);
    } else {
      element.append(part);
    }
  });
}

function restartAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function focusPost(id) {
  const element = getPostElement(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  restartAnimation(element, "is-focused");
}

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */

let toastTimer;

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2600);
}

/* ------------------------------------------------------------------ */
/* Popover (Dropdowns)                                                 */
/* ------------------------------------------------------------------ */

let openPopoverState = null;

function openPopover(trigger, panel, { onOpen, onClose } = {}) {
  closePopover({ returnFocus: false });
  closeSearch({ returnFocus: false });
  onOpen?.();
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  openPopoverState = { trigger, panel, onClose };
  focusableIn(panel)[0]?.focus();
}

function closePopover({ returnFocus = true } = {}) {
  if (!openPopoverState) return;
  const { trigger, panel, onClose } = openPopoverState;
  openPopoverState = null;
  panel.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  onClose?.();
  if (returnFocus) trigger.focus();
}

function togglePopover(trigger, panel, options) {
  if (openPopoverState?.panel === panel && openPopoverState.trigger === trigger) {
    closePopover();
  } else {
    openPopover(trigger, panel, options);
  }
}

function handleMenuArrows(event) {
  if (!openPopoverState || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const items = [...openPopoverState.panel.querySelectorAll('[role="menuitem"]')];
  if (!items.length) return;
  event.preventDefault();
  const current = items.indexOf(document.activeElement);
  const step = event.key === "ArrowDown" ? 1 : -1;
  items[(current + step + items.length) % items.length].focus();
}

/* ------------------------------------------------------------------ */
/* Bottom Sheet                                                        */
/* ------------------------------------------------------------------ */

let sheetTrigger = null;
let sheetOnClose = null;
let sheetCloseTimer;

function openSheet(title, buildBody, trigger, onClose = null) {
  clearTimeout(sheetCloseTimer);
  sheetTrigger = trigger;
  sheetOnClose = onClose;
  dom.sheetTitle.textContent = title;
  dom.sheetBody.replaceChildren();
  buildBody(dom.sheetBody);
  dom.sheetLayer.hidden = false;
  void dom.sheetLayer.offsetWidth;
  dom.sheetLayer.classList.add("is-open");
  focusableIn(dom.sheet)[0]?.focus();
}

function closeSheet() {
  if (dom.sheetLayer.hidden) return;
  sheetOnClose?.();
  sheetOnClose = null;
  dom.sheetLayer.classList.remove("is-open");
  sheetCloseTimer = setTimeout(() => {
    dom.sheetLayer.hidden = true;
    dom.sheetBody.replaceChildren();
  }, 260);
  sheetTrigger?.focus();
  sheetTrigger = null;
}

function trapSheetFocus(event) {
  if (event.key !== "Tab" || dom.sheetLayer.hidden) return;
  const focusable = focusableIn(dom.sheet);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function createSheetRow(label, iconMarkup) {
  const row = document.createElement("button");
  row.type = "button";
  row.className = "sheet-row";
  if (iconMarkup) {
    const icon = document.createElement("span");
    icon.className = "sheet-row__icon";
    icon.innerHTML = iconMarkup;
    row.append(icon);
  }
  row.append(label);
  return row;
}

const ICON_LINK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.3-3.3a4.5 4.5 0 0 0-6.4-6.4L12 5.6M14 10a4.5 4.5 0 0 0-6.4 0l-3.3 3.3a4.5 4.5 0 0 0 6.4 6.4l1.3-1.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_CHECK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_CHEVRON =
  '<svg class="sheet-row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ------------------------------------------------------------------ */
/* Link kopieren                                                       */
/* ------------------------------------------------------------------ */

function postUrl(id) {
  return `${location.href.split("#")[0]}#post-${id}`;
}

function copyWithTextarea(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.className = "visually-hidden";
  document.body.append(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  textarea.remove();
  return copied;
}

async function copyPostLink(id) {
  const url = postUrl(id);
  let copied = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
    } catch {
      copied = false;
    }
  }
  if (!copied) copied = copyWithTextarea(url);
  showToast(copied ? "Link in die Zwischenablage kopiert" : "Link konnte nicht kopiert werden");
}

/* ------------------------------------------------------------------ */
/* Speicher im Browser (IndexedDB)                                     */
/* ------------------------------------------------------------------ */

// Eigene Beiträge (mit Bild) und Interaktionen aller Beiträge bleiben so über ein Neuladen erhalten.
const storage = (() => {
  const DB_NAME = "feed-simulation";
  const DB_VERSION = 1;
  let dbPromise = null;

  function open() {
    dbPromise ??= new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB wird nicht unterstützt"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        request.result.createObjectStore("posts", { keyPath: "id" });
        request.result.createObjectStore("state", { keyPath: "id" });
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

function savePostState(postId) {
  const postState = state.get(postId);
  if (!postState) return;
  persist(() =>
    storage.put("state", {
      id: postId,
      liked: postState.liked,
      saved: postState.saved,
      comments: postState.userComments,
      likedComments: [...postState.likedComments],
    })
  );
}

function saveOwnPost(post) {
  if (storageAvailable) navigator.storage?.persist?.().catch(() => {});
  persist(() =>
    storage.put("posts", {
      id: post.id,
      blob: post.blob,
      name: post.name,
      width: post.width,
      height: post.height,
      alt: post.alt,
      caption: post.caption,
      createdAt: post.createdAt,
    })
  );
}

async function loadStoredData() {
  try {
    const [postRecords, stateRecords] = await Promise.all([storage.getAll("posts"), storage.getAll("state")]);
    storageAvailable = true;
    return {
      ownPosts: postRecords.filter((record) => record.blob instanceof Blob).map(createOwnPost),
      storedStates: new Map(stateRecords.map((record) => [record.id, record])),
    };
  } catch {
    return { ownPosts: [], storedStates: new Map() };
  }
}

/* ------------------------------------------------------------------ */
/* Beiträge rendern                                                    */
/* ------------------------------------------------------------------ */

function renderComment(comment, { extra = false, isNew = false } = {}) {
  const item = dom.commentTemplate.content.firstElementChild.cloneNode(true);
  item.querySelector(".comment__author").textContent = comment.author;
  appendRichText(item.querySelector(".comment__body"), comment.text);
  item.querySelector(".comment__like").setAttribute("aria-label", `Kommentar von ${comment.author} gefällt mir`);
  item.classList.toggle("is-extra", extra);
  item.classList.toggle("is-new", isNew);
  return item;
}

function updateCommentsToggle(article, postId) {
  const section = article.querySelector(".comments");
  const toggle = section.querySelector(".comments__toggle");
  const hasExtra = section.querySelector(".comment.is-extra") !== null;
  const expanded = section.classList.contains("is-expanded");
  toggle.hidden = !hasExtra;
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.textContent = expanded
    ? "Weniger Kommentare anzeigen"
    : `Alle ${numberFormat.format(state.get(postId).commentCount)} Kommentare ansehen`;
}

function renderCaption(article, paragraphs) {
  const caption = article.querySelector(".caption");
  if (!paragraphs.length) {
    caption.remove();
    return;
  }

  appendRichText(article.querySelector('[data-field="caption-lead"]'), paragraphs[0]);
  if (paragraphs.length === 1) {
    caption.classList.remove("is-collapsed");
    caption.querySelector(".caption__toggle").remove();
    return;
  }

  const rest = article.querySelector('[data-field="caption-rest"]');
  paragraphs.slice(1).forEach((text) => {
    const paragraph = document.createElement("p");
    appendRichText(paragraph, text);
    rest.append(paragraph);
  });
  const collapse = createElement("button", "caption__toggle", "weniger");
  collapse.type = "button";
  collapse.dataset.action = "toggle-caption";
  collapse.setAttribute("aria-expanded", "true");
  rest.lastElementChild.append(" ", collapse);
}

function setPressed(button, pressed, labelPressed, labelDefault) {
  button.setAttribute("aria-pressed", String(pressed));
  button.setAttribute("aria-label", pressed ? labelPressed : labelDefault);
}

function renderPost(post, index) {
  const article = dom.postTemplate.content.firstElementChild.cloneNode(true);
  const postState = state.get(post.id);
  const age = postAgeHours(post);
  const ageLong = formatAgeLong(age);
  const fill = (field, value) =>
    article.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
      el.textContent = value;
    });

  article.id = `post-${post.id}`;
  article.dataset.postId = post.id;
  article.setAttribute("aria-label", `Beitrag von ${ACCOUNT.username}, ${ageLong}`);

  fill("username", ACCOUNT.username);
  fill("location", ACCOUNT.location);
  fill("age-short", formatAgeShort(age));
  fill("age-long", ageLong);
  fill("likes", likesLabel(postState.likes));
  article.querySelectorAll("time").forEach((time) => {
    time.dateTime = isoTimeAgo(age);
  });

  setPressed(article.querySelector('[data-action="like"]'), postState.liked, "Gefällt mir nicht mehr", "Gefällt mir");
  setPressed(article.querySelector('[data-action="save"]'), postState.saved, "Aus Gespeichert entfernen", "Speichern");
  if (post.isOwn) {
    article.querySelector('[data-own-only]').hidden = false;
    article.querySelector('[data-hide-own]').hidden = true;
  }

  const image = article.querySelector(".post__image");
  image.loading = index === 0 ? "eager" : "lazy";
  image.width = post.width;
  image.height = post.height;
  image.alt = post.alt;
  image.src = post.image;

  renderCaption(article, post.caption ?? CAPTION);

  const list = article.querySelector('[data-field="comments"]');
  post.comments.forEach((comment, i) => list.append(renderComment(comment, { extra: i >= VISIBLE_COMMENTS })));
  postState.userComments.forEach((text) => list.append(renderComment({ author: VIEWER, text })));
  list.querySelectorAll(".comment__like").forEach((button, i) => {
    if (postState.likedComments.has(i)) button.setAttribute("aria-pressed", "true");
  });

  const input = article.querySelector(".comment-form__input");
  input.id = `comment-input-${post.id}`;
  article.querySelector(".comment-form label").htmlFor = input.id;

  updateCommentsToggle(article, post.id);
  return article;
}

function renderFeed() {
  const fragment = document.createDocumentFragment();
  POSTS.forEach((post, index) => fragment.append(renderPost(post, index)));
  dom.posts.append(fragment);
}

/* ------------------------------------------------------------------ */
/* Beitragsaktionen                                                    */
/* ------------------------------------------------------------------ */

function setLiked(article, liked) {
  const postId = article.dataset.postId;
  const postState = state.get(postId);
  if (postState.liked === liked) return;
  postState.liked = liked;
  postState.likes += liked ? 1 : -1;

  const button = article.querySelector('[data-action="like"]');
  setPressed(button, liked, "Gefällt mir nicht mehr", "Gefällt mir");
  if (liked) restartAnimation(button, "is-popping");
  article.querySelector('[data-field="likes"]').textContent = likesLabel(postState.likes);
  updateProfileStats();
  savePostState(postId);
}

function toggleSave(article) {
  const postId = article.dataset.postId;
  const postState = state.get(postId);
  postState.saved = !postState.saved;
  const button = article.querySelector('[data-action="save"]');
  setPressed(button, postState.saved, "Aus Gespeichert entfernen", "Speichern");
  if (postState.saved) restartAnimation(button, "is-popping");
  showToast(postState.saved ? "Beitrag gespeichert" : "Aus Gespeichert entfernt");
  updateProfileStats();
  savePostState(postId);
}

function showBurst(article) {
  restartAnimation(article.querySelector(".post__burst"), "is-bursting");
}

function goToComments(article) {
  const section = article.querySelector(".comments");
  const input = section.querySelector(".comment-form__input");
  section.classList.add("is-expanded");
  updateCommentsToggle(article, article.dataset.postId);
  input.focus({ preventScroll: true });
  section.querySelector(".comment-form").scrollIntoView({ behavior: "smooth", block: "center" });
  restartAnimation(section, "is-highlighted");
}

function toggleComments(article) {
  article.querySelector(".comments").classList.toggle("is-expanded");
  updateCommentsToggle(article, article.dataset.postId);
}

function toggleCaption(article) {
  const caption = article.querySelector(".caption");
  const collapsed = caption.classList.toggle("is-collapsed");
  caption.querySelectorAll(".caption__toggle").forEach((button) => {
    button.setAttribute("aria-expanded", String(!collapsed));
  });
  const target = collapsed ? ".caption__lead .caption__toggle" : ".caption__rest .caption__toggle";
  caption.querySelector(target).focus();
}

function addComment(article, form) {
  const input = form.querySelector(".comment-form__input");
  const text = input.value.trim();
  if (!text) return;

  const postId = article.dataset.postId;
  const postState = state.get(postId);
  postState.commentCount += 1;
  postState.userComments.push(text);

  article.querySelector(".comments__list").append(renderComment({ author: VIEWER, text }, { isNew: true }));
  input.value = "";
  form.querySelector(".comment-form__submit").disabled = true;
  updateCommentsToggle(article, postId);
  updateProfileStats();
  savePostState(postId);
}

function toggleCommentLike(article, button) {
  const postId = article.dataset.postId;
  const liked = button.getAttribute("aria-pressed") !== "true";
  const index = [...article.querySelectorAll(".comment__like")].indexOf(button);
  button.setAttribute("aria-pressed", String(liked));
  const { likedComments } = state.get(postId);
  if (liked) likedComments.add(index);
  else likedComments.delete(index);
  savePostState(postId);
}

function hidePost(article) {
  closePopover({ returnFocus: false });
  const notice = document.createElement("div");
  notice.className = "post-hidden";

  const text = document.createElement("div");
  const title = document.createElement("p");
  title.className = "post-hidden__title";
  title.textContent = "Beitrag ausgeblendet";
  const detail = document.createElement("p");
  detail.className = "post-hidden__text";
  detail.textContent = "Du siehst künftig weniger Beiträge wie diesen.";
  text.append(title, detail);

  const undo = document.createElement("button");
  undo.type = "button";
  undo.className = "text-button";
  undo.dataset.action = "unhide";
  undo.textContent = "Rückgängig";

  notice.append(text, undo);
  article.prepend(notice);
  article.classList.add("is-hidden");
  undo.focus();
}

function unhidePost(article) {
  article.querySelector(".post-hidden")?.remove();
  article.classList.remove("is-hidden");
  article.querySelector('[data-action="menu"]').focus();
}

function openReportSheet(article) {
  const trigger = article.querySelector('[data-action="menu"]');
  closePopover({ returnFocus: false });
  openSheet(
    "Melden",
    (body) => {
      const lead = document.createElement("p");
      lead.className = "sheet__lead";
      lead.textContent = "Warum meldest du diesen Beitrag?";
      const list = document.createElement("div");
      list.className = "report-list";
      REPORT_REASONS.forEach((reason) => {
        const row = createSheetRow(reason);
        row.insertAdjacentHTML("beforeend", ICON_CHEVRON);
        row.addEventListener("click", () => showReportThanks(body));
        list.append(row);
      });
      body.append(lead, list);
    },
    trigger
  );
}

function showReportThanks(body) {
  const lead = document.createElement("p");
  lead.className = "sheet__lead";
  lead.textContent =
    "Danke für deine Meldung. In dieser Simulation wird nichts übermittelt, die Meldung bleibt lokal in deinem Browser.";
  const done = document.createElement("button");
  done.type = "button";
  done.className = "button-primary";
  done.textContent = "Fertig";
  done.addEventListener("click", closeSheet);
  body.replaceChildren(lead, done);
  done.focus();
}

function openShareSheet(article) {
  const postId = article.dataset.postId;
  const trigger = article.querySelector('[data-action="share"]');

  openSheet(
    "Teilen",
    (body) => {
      const grid = document.createElement("div");
      grid.className = "share-grid";
      const selected = new Set();

      const message = document.createElement("input");
      message.type = "text";
      message.className = "share-message";
      message.placeholder = "Nachricht schreiben …";
      message.setAttribute("aria-label", "Nachricht zum geteilten Beitrag");

      const send = document.createElement("button");
      send.type = "button";
      send.className = "button-primary";
      send.textContent = "Senden";
      send.disabled = true;

      SHARE_CONTACTS.forEach((name) => {
        const contact = document.createElement("button");
        contact.type = "button";
        contact.className = "share-contact";
        contact.setAttribute("aria-pressed", "false");
        contact.setAttribute("aria-label", `An ${name} senden`);

        const label = document.createElement("span");
        label.className = "share-contact__name";
        label.textContent = name;
        const check = document.createElement("span");
        check.className = "share-contact__check";
        check.innerHTML = ICON_CHECK;

        contact.append(createAvatar(name, "avatar--xl"), label, check);
        contact.addEventListener("click", () => {
          if (selected.has(name)) selected.delete(name);
          else selected.add(name);
          contact.setAttribute("aria-pressed", String(selected.has(name)));
          send.disabled = selected.size === 0;
          send.textContent = selected.size > 1 ? `Separat senden (${selected.size})` : "Senden";
        });
        grid.append(contact);
      });

      send.addEventListener("click", () => {
        const recipients = [...selected];
        closeSheet();
        showToast(recipients.length === 1 ? `Gesendet an ${recipients[0]}` : `Gesendet an ${recipients.length} Personen`);
      });

      const actions = document.createElement("div");
      actions.className = "share-actions";
      const copy = createSheetRow("Link kopieren", ICON_LINK);
      copy.addEventListener("click", () => {
        closeSheet();
        copyPostLink(postId);
      });
      actions.append(copy);

      body.append(grid, message, send, actions);
    },
    trigger
  );
}

/* ------------------------------------------------------------------ */
/* Neuer Beitrag                                                       */
/* ------------------------------------------------------------------ */

const ICON_UPLOAD =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.8 17.5 5-5 4 4 2.5-2.5 4.9 4.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

function createPostId() {
  return `eigen-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createOwnPost(record) {
  return {
    id: record.id,
    blob: record.blob,
    image: record.url ?? URL.createObjectURL(record.blob),
    name: record.name,
    width: record.width,
    height: record.height,
    alt: record.alt,
    caption: record.caption,
    createdAt: record.createdAt,
    likes: 0,
    commentCount: 0,
    comments: [],
    isOwn: true,
  };
}

function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () =>
      resolve({ url, blob: file, name: file.name, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(file.name));
    };
    image.src = url;
  });
}

function splitParagraphs(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

// Eigene Beiträge stehen nach Erstellungszeit sortiert über den Kampagnenbeiträgen
function insertPost(post) {
  let index = POSTS.findIndex((other) => !other.isOwn || other.createdAt < post.createdAt);
  if (index === -1) index = POSTS.length;
  const next = POSTS[index];
  POSTS.splice(index, 0, post);
  dom.posts.insertBefore(renderPost(post, 0), next ? getPostElement(next.id) : null);
}

function addPosts(newPosts) {
  newPosts.forEach((post) => {
    state.set(post.id, createPostState(post));
    insertPost(post);
  });
  updateProfileStats();
  newPosts.forEach(saveOwnPost);

  dom.feed.scrollTo({ top: 0, behavior: "smooth" });
  restartAnimation(getPostElement(newPosts[0].id), "is-focused");
  showToast(newPosts.length === 1 ? "Beitrag geteilt" : `${newPosts.length} Beiträge geteilt`);
}

function openCreateSheet(trigger) {
  const drafts = [];
  let published = false;
  let closed = false;

  openSheet(
    "Neuer Beitrag",
    (body) => {
      const drop = createElement("label", "upload-drop");
      const fileInput = createElement("input", "visually-hidden");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.multiple = true;
      const icon = createElement("span", "upload-drop__icon");
      icon.innerHTML = ICON_UPLOAD;
      drop.append(
        fileInput,
        icon,
        createElement("span", "upload-drop__title", "Bilder auswählen"),
        createElement("span", "upload-drop__hint", "oder hierher ziehen. Jedes Bild wird ein eigener Beitrag.")
      );

      const list = createElement("ul", "upload-list");

      const captionField = createElement("div", "upload-caption");
      const useCampaign = document.createElement("input");
      useCampaign.type = "checkbox";
      useCampaign.checked = true;
      const checkLabel = createElement("label", "upload-caption__check");
      checkLabel.append(useCampaign, " Begleittext der Kampagne verwenden");
      const ownCaption = createElement("textarea", "upload-caption__text");
      ownCaption.rows = 4;
      ownCaption.placeholder = "Eigene Bildunterschrift schreiben …";
      ownCaption.setAttribute("aria-label", "Eigene Bildunterschrift");
      ownCaption.hidden = true;
      captionField.append(checkLabel, ownCaption);

      const publish = createElement("button", "button-primary", "Teilen");
      publish.type = "button";
      publish.disabled = true;

      const updatePublish = () => {
        publish.disabled = drafts.length === 0;
        publish.textContent = drafts.length > 1 ? `${drafts.length} Beiträge teilen` : "Teilen";
      };

      const renderDraft = (draft) => {
        const item = createElement("li", "upload-item");
        const thumb = createElement("img", "upload-item__thumb");
        thumb.src = draft.url;
        thumb.alt = "";
        const alt = createElement("input", "upload-item__alt");
        alt.type = "text";
        alt.placeholder = "Bildbeschreibung (optional)";
        alt.setAttribute("aria-label", `Bildbeschreibung für ${draft.name}`);
        alt.addEventListener("input", () => {
          draft.alt = alt.value.trim();
        });
        const meta = createElement("div", "upload-item__meta");
        meta.append(createElement("span", "upload-item__name", draft.name), alt);

        const remove = createElement("button", "icon-button upload-item__remove");
        remove.type = "button";
        remove.setAttribute("aria-label", `${draft.name} entfernen`);
        remove.innerHTML =
          '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        remove.addEventListener("click", () => {
          drafts.splice(drafts.indexOf(draft), 1);
          URL.revokeObjectURL(draft.url);
          item.remove();
          updatePublish();
          fileInput.focus();
        });

        item.append(thumb, meta, remove);
        list.append(item);
      };

      const addFiles = async (files) => {
        const images = [...files].filter((file) => file.type.startsWith("image/"));
        if (images.length < files.length) showToast("Nur Bilddateien können hinzugefügt werden.");
        const results = await Promise.allSettled(images.map(loadImageFile));
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const draft = { ...result.value, alt: "" };
            if (closed) {
              URL.revokeObjectURL(draft.url);
              return;
            }
            drafts.push(draft);
            renderDraft(draft);
          } else {
            showToast(`„${result.reason.message}“ konnte nicht geladen werden.`);
          }
        });
        updatePublish();
      };

      fileInput.addEventListener("change", () => {
        addFiles(fileInput.files);
        fileInput.value = "";
      });
      drop.addEventListener("dragover", (event) => {
        event.preventDefault();
        drop.classList.add("is-dragging");
      });
      drop.addEventListener("dragleave", () => drop.classList.remove("is-dragging"));
      drop.addEventListener("drop", (event) => {
        event.preventDefault();
        drop.classList.remove("is-dragging");
        addFiles(event.dataTransfer.files);
      });

      useCampaign.addEventListener("change", () => {
        ownCaption.hidden = useCampaign.checked;
        if (!useCampaign.checked) ownCaption.focus();
      });

      publish.addEventListener("click", () => {
        const caption = useCampaign.checked ? CAPTION : splitParagraphs(ownCaption.value);
        const now = Date.now();
        const newPosts = drafts.map((draft, i) =>
          createOwnPost({
            id: createPostId(),
            blob: draft.blob,
            url: draft.url,
            name: draft.name,
            width: draft.width,
            height: draft.height,
            alt: draft.alt || `Hochgeladenes Bild: ${draft.name}`,
            caption,
            createdAt: now - i,
          })
        );
        published = true;
        closeSheet();
        addPosts(newPosts);
      });

      body.append(drop, list, captionField, publish);
    },
    trigger,
    () => {
      closed = true;
      if (!published) drafts.forEach((draft) => URL.revokeObjectURL(draft.url));
    }
  );
}

/* ------------------------------------------------------------------ */
/* Eigene Beiträge löschen, exportieren, importieren                   */
/* ------------------------------------------------------------------ */

function openDeleteSheet(article) {
  const trigger = article.querySelector('[data-action="menu"]');
  closePopover({ returnFocus: false });
  openSheet(
    "Beitrag löschen?",
    (body) => {
      const lead = createElement("p", "sheet__lead", "Der Beitrag wird mit Bild, Likes und Kommentaren aus diesem Browser entfernt.");
      const confirm = createElement("button", "button-primary button-primary--danger", "Löschen");
      confirm.type = "button";
      confirm.addEventListener("click", () => {
        sheetTrigger = null;
        closeSheet();
        deleteOwnPost(article.dataset.postId);
      });
      const cancel = createSheetRow("Abbrechen");
      cancel.classList.add("sheet-row--center");
      cancel.addEventListener("click", closeSheet);
      body.append(lead, confirm, cancel);
    },
    trigger
  );
}

function deleteOwnPost(postId) {
  const post = getPost(postId);
  if (!post?.isOwn) return;
  POSTS.splice(POSTS.indexOf(post), 1);
  state.delete(postId);
  getPostElement(postId)?.remove();
  URL.revokeObjectURL(post.image);
  persist(() => Promise.all([storage.delete("posts", postId), storage.delete("state", postId)]));
  updateProfileStats();
  dom.feed.focus({ preventScroll: true });
  showToast("Beitrag gelöscht");
}

function ownPosts() {
  return POSTS.filter((post) => post.isOwn);
}

function updateOwnPostsInfo() {
  const count = ownPosts().length;
  let text;
  if (!storageAvailable) {
    text = "Speichern im Browser ist hier nicht möglich. Eigene Beiträge gehen beim Neuladen verloren.";
  } else if (count === 0) {
    text = "Noch keine eigenen Beiträge. Neue Beiträge legst du über das Plus an.";
  } else {
    text = `${count === 1 ? "1 eigener Beitrag" : `${count} eigene Beiträge`} in diesem Browser gespeichert.`;
  }
  dom.ownPostsInfo.textContent = text;
  dom.exportButton.disabled = count === 0;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const match = /^data:(image\/[\w.+-]+);base64,(.+)$/s.exec(dataUrl);
  if (!match) throw new Error("Ungültige Bilddaten");
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: match[1] });
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportOwnPosts() {
  const posts = ownPosts();
  if (!posts.length) return;
  const entries = await Promise.all(
    posts.map(async (post) => {
      const postState = state.get(post.id);
      return {
        id: post.id,
        name: post.name,
        width: post.width,
        height: post.height,
        alt: post.alt,
        caption: post.caption,
        createdAt: post.createdAt,
        image: await blobToDataUrl(post.blob),
        liked: postState.liked,
        saved: postState.saved,
        comments: postState.userComments,
        likedComments: [...postState.likedComments],
      };
    })
  );
  const data = { format: "feed-simulation", version: 1, exportedAt: new Date().toISOString(), posts: entries };
  const date = new Date().toISOString().slice(0, 10);
  downloadFile(new Blob([JSON.stringify(data)], { type: "application/json" }), `feed-simulation-beitraege-${date}.json`);
  showToast(posts.length === 1 ? "1 Beitrag exportiert" : `${posts.length} Beiträge exportiert`);
}

async function importEntry(entry) {
  if (typeof entry?.id !== "string" || typeof entry.image !== "string") throw new Error("Unvollständiger Eintrag");
  const blob = dataUrlToBlob(entry.image);
  const name = typeof entry.name === "string" ? entry.name : "Bild";
  // Abmessungen aus dem Bild selbst lesen, das prüft zugleich, ob es sich laden lässt
  const loaded = await loadImageFile(new File([blob], name, { type: blob.type }));
  const post = createOwnPost({
    id: entry.id,
    blob,
    url: loaded.url,
    name,
    width: loaded.width,
    height: loaded.height,
    alt: typeof entry.alt === "string" && entry.alt ? entry.alt : `Hochgeladenes Bild: ${name}`,
    caption: Array.isArray(entry.caption) ? entry.caption.filter((text) => typeof text === "string") : CAPTION,
    createdAt: Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now(),
  });
  state.set(post.id, createPostState(post, entry));
  insertPost(post);
  saveOwnPost(post);
  savePostState(post.id);
}

async function importOwnPosts(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    showToast("Die Datei ist keine gültige Exportdatei.");
    return;
  }
  if (data?.format !== "feed-simulation" || !Array.isArray(data.posts)) {
    showToast("Die Datei ist keine Exportdatei dieser Feed-Simulation.");
    return;
  }

  let imported = 0;
  let skipped = 0;
  for (const entry of data.posts) {
    if (getPost(entry?.id)) {
      skipped += 1;
      continue;
    }
    try {
      await importEntry(entry);
      imported += 1;
    } catch {
      skipped += 1;
    }
  }
  updateProfileStats();
  const parts = [`${imported} ${imported === 1 ? "Beitrag" : "Beiträge"} importiert`];
  if (skipped) parts.push(`${skipped} übersprungen (schon vorhanden oder fehlerhaft)`);
  showToast(parts.join(", "));
}

const postActions = {
  like: (article) => setLiked(article, !state.get(article.dataset.postId).liked),
  save: toggleSave,
  comment: goToComments,
  share: openShareSheet,
  "toggle-comments": toggleComments,
  "toggle-caption": toggleCaption,
  menu: (article, button) => togglePopover(button, article.querySelector(".popover--menu")),
  "close-menu": () => closePopover(),
  "copy-link": (article) => {
    closePopover();
    copyPostLink(article.dataset.postId);
  },
  report: openReportSheet,
  delete: openDeleteSheet,
  hide: hidePost,
  unhide: unhidePost,
};

function bindFeedEvents() {
  dom.posts.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    const article = event.target.closest(".post");
    if (button && article && postActions[button.dataset.action]) {
      postActions[button.dataset.action](article, button);
      return;
    }
    const commentLike = event.target.closest(".comment__like");
    if (commentLike && article) toggleCommentLike(article, commentLike);
  });

  dom.posts.addEventListener("submit", (event) => {
    const form = event.target.closest(".comment-form");
    if (!form) return;
    event.preventDefault();
    addComment(form.closest(".post"), form);
  });

  dom.posts.addEventListener("input", (event) => {
    if (!event.target.matches(".comment-form__input")) return;
    const submit = event.target.form.querySelector(".comment-form__submit");
    submit.disabled = event.target.value.trim() === "";
  });

  // Doppeltippen bzw. Doppelklick auf das Bild markiert den Beitrag mit "Gefällt mir"
  let lastTap = { time: 0, postId: null };
  dom.posts.addEventListener("pointerup", (event) => {
    const media = event.target.closest(".post__media");
    if (!media) return;
    const article = media.closest(".post");
    const now = Date.now();
    if (lastTap.postId === article.dataset.postId && now - lastTap.time < 320) {
      setLiked(article, true);
      showBurst(article);
      lastTap = { time: 0, postId: null };
    } else {
      lastTap = { time: now, postId: article.dataset.postId };
    }
  });
}

/* ------------------------------------------------------------------ */
/* Kopfzeile: Suche, Benachrichtigungen, Profil                        */
/* ------------------------------------------------------------------ */

function buildSearchIndex() {
  const entries = [{ type: "account", name: ACCOUNT.username, meta: `${POSTS.length} Beiträge im Feed`, postId: POSTS[0].id }];
  const seen = new Set([ACCOUNT.username]);

  POSTS.forEach((post) => {
    post.comments.forEach((comment) => {
      if (seen.has(comment.author)) return;
      seen.add(comment.author);
      entries.push({ type: "account", name: comment.author, meta: "Kommentar im Feed", postId: post.id });
    });
  });

  CAPTION.join(" ")
    .match(/#[\p{L}\p{N}_]+/gu)
    .forEach((tag) => {
      entries.push({ type: "hashtag", name: tag, meta: `${POSTS.length} Beiträge`, postId: POSTS[0].id });
    });
  return entries;
}

const searchIndex = buildSearchIndex();

function renderSearchResults(query) {
  const term = query.trim().toLowerCase().replace(/^[#@]/, "");
  const matches = term
    ? searchIndex.filter((entry) => entry.name.toLowerCase().replace(/^#/, "").includes(term))
    : searchIndex.filter((entry) => entry.type === "hashtag" || entry.name === ACCOUNT.username);

  dom.searchResults.replaceChildren();

  if (!matches.length) {
    const empty = document.createElement("li");
    empty.className = "search-results__hint";
    empty.textContent = `Keine Ergebnisse für „${query.trim()}“ in diesem Feed.`;
    dom.searchResults.append(empty);
    return;
  }

  if (!term) {
    const hint = document.createElement("li");
    hint.className = "search-results__hint";
    hint.textContent = "Vorschläge aus diesem Feed";
    dom.searchResults.append(hint);
  }

  matches.forEach((entry) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";

    if (entry.type === "hashtag") {
      const hash = document.createElement("span");
      hash.className = "search-result__hash";
      hash.setAttribute("aria-hidden", "true");
      hash.textContent = "#";
      button.append(hash);
    } else {
      button.append(createAvatar(entry.name, "avatar--lg"));
    }

    const text = document.createElement("span");
    const name = document.createElement("span");
    name.className = "search-result__name";
    name.textContent = entry.name;
    const meta = document.createElement("span");
    meta.className = "search-result__meta";
    meta.textContent = entry.meta;
    text.append(name, document.createElement("br"), meta);
    button.append(text);

    button.addEventListener("click", () => {
      closeSearch({ returnFocus: false });
      focusPost(entry.postId);
    });
    item.append(button);
    dom.searchResults.append(item);
  });
}

function openSearch() {
  closePopover({ returnFocus: false });
  dom.searchPanel.hidden = false;
  dom.searchToggle.setAttribute("aria-expanded", "true");
  setActiveNav("search");
  renderSearchResults(dom.searchInput.value);
  dom.searchInput.focus();
}

function closeSearch({ returnFocus = true } = {}) {
  if (dom.searchPanel.hidden) return;
  dom.searchPanel.hidden = true;
  dom.searchToggle.setAttribute("aria-expanded", "false");
  setActiveNav("home");
  if (returnFocus) dom.searchToggle.focus();
}

function renderNotifications() {
  dom.notificationList.replaceChildren();
  NOTIFICATIONS.forEach((entry) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const user = document.createElement("strong");
    user.textContent = entry.user;
    const time = document.createElement("span");
    time.className = "notification__time";
    time.textContent = ` ${formatAgeShort(entry.hoursAgo)}`;
    text.append(user, ` ${entry.text}`, time);

    if (entry.postId) {
      item.className = "notification--link";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "notification-button";
      button.append(createAvatar(entry.user, "avatar--sm"), text);
      button.addEventListener("click", () => {
        closePopover({ returnFocus: false });
        focusPost(entry.postId);
      });
      item.append(button);
    } else {
      item.append(createAvatar(entry.user, "avatar--sm"), text);
    }
    dom.notificationList.append(item);
  });
}

function markNotificationsRead() {
  dom.notificationsDot.hidden = true;
  dom.notificationsToggle.setAttribute("aria-label", "Benachrichtigungen");
}

function updateProfileStats() {
  const values = [...state.values()];
  dom.statLiked.textContent = values.filter((s) => s.liked).length;
  dom.statSaved.textContent = values.filter((s) => s.saved).length;
  dom.statComments.textContent = values.reduce((sum, s) => sum + s.userComments.length, 0);
  updateOwnPostsInfo();

  const saved = POSTS.filter((post) => state.get(post.id).saved);
  dom.savedList.replaceChildren();

  if (!saved.length) {
    const empty = document.createElement("li");
    empty.className = "saved-list__empty";
    empty.textContent = "Noch nichts gespeichert. Tippe unter einem Beitrag auf das Lesezeichen.";
    dom.savedList.append(empty);
    return;
  }

  saved.forEach((post) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "saved-list__button";

    const thumb = document.createElement("img");
    thumb.className = "saved-list__thumb";
    thumb.src = post.image;
    thumb.alt = "";
    thumb.width = 36;
    thumb.height = 45;

    const label = document.createElement("span");
    label.textContent = `Beitrag ${POSTS.indexOf(post) + 1} · ${formatAgeLong(postAgeHours(post))}`;

    button.append(thumb, label);
    button.addEventListener("click", () => {
      closePopover({ returnFocus: false });
      focusPost(post.id);
    });
    item.append(button);
    dom.savedList.append(item);
  });
}

function bindHeaderEvents() {
  dom.searchToggle.addEventListener("click", () => (dom.searchPanel.hidden ? openSearch() : closeSearch()));
  dom.searchClose.addEventListener("click", () => closeSearch());
  dom.searchInput.addEventListener("input", () => renderSearchResults(dom.searchInput.value));
  dom.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    dom.searchResults.querySelector(".search-result")?.click();
  });

  dom.notificationsToggle.addEventListener("click", () =>
    togglePopover(dom.notificationsToggle, dom.notificationsPanel, { onOpen: markNotificationsRead })
  );
  dom.profileToggle.addEventListener("click", () => togglePopover(dom.profileToggle, dom.profilePanel));
  dom.exportButton.addEventListener("click", exportOwnPosts);
  dom.importInput.addEventListener("change", () => {
    const [file] = dom.importInput.files;
    dom.importInput.value = "";
    if (file) importOwnPosts(file);
  });
}

/* ------------------------------------------------------------------ */
/* Untere Navigation                                                   */
/* ------------------------------------------------------------------ */

function setActiveNav(name) {
  dom.navItems.forEach((item) => {
    const active = item.dataset.nav === name;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

const navActions = {
  home: () => {
    closeSearch({ returnFocus: false });
    closePopover({ returnFocus: false });
    setActiveNav("home");
    dom.feed.scrollTo({ top: 0, behavior: "smooth" });
  },
  search: () => (dom.searchPanel.hidden ? openSearch() : closeSearch()),
  create: (button) => openCreateSheet(button),
  reels: () => showToast("Reels sind in dieser Simulation nicht enthalten."),
  profile: (button) =>
    togglePopover(button, dom.profilePanel, {
      onOpen: () => setActiveNav("profile"),
      onClose: () => setActiveNav("home"),
    }),
};

function bindNavEvents() {
  dom.navItems.forEach((item) => {
    item.addEventListener("click", () => navActions[item.dataset.nav](item));
  });
}

/* ------------------------------------------------------------------ */
/* Globale Ereignisse                                                  */
/* ------------------------------------------------------------------ */

function bindGlobalEvents() {
  document.addEventListener("click", (event) => {
    if (!openPopoverState) return;
    const { trigger, panel } = openPopoverState;
    if (!panel.contains(event.target) && !trigger.contains(event.target)) {
      closePopover({ returnFocus: false });
    }
  });

  dom.sheetLayer.addEventListener("click", (event) => {
    if (event.target.closest("[data-sheet-close]")) closeSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!dom.sheetLayer.hidden) closeSheet();
      else if (openPopoverState) closePopover();
      else closeSearch();
      return;
    }
    trapSheetFocus(event);
    handleMenuArrows(event);
  });
}

function openLinkedPost() {
  const match = location.hash.match(/^#post-(.+)$/);
  if (match && getPost(match[1])) {
    requestAnimationFrame(() => focusPost(match[1]));
  }
}

async function init() {
  const { ownPosts: storedPosts, storedStates } = await loadStoredData();
  storedPosts.sort((a, b) => b.createdAt - a.createdAt);
  POSTS.unshift(...storedPosts);
  POSTS.forEach((post) => state.set(post.id, createPostState(post, storedStates.get(post.id))));

  renderFeed();
  renderNotifications();
  updateProfileStats();
  bindFeedEvents();
  bindHeaderEvents();
  bindNavEvents();
  bindGlobalEvents();
  openLinkedPost();
}

init();

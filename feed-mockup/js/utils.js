/* © 2026 Fabian Flemig */

"use strict";

/* Gemeinsame Hilfsfunktionen und DOM-Referenzen */

// Aktueller Account; Werte kommen aus den Einstellungen
const ACCOUNT = { ...ACCOUNT_DEFAULTS };

const dom = {
  body: document.body,
  phone: document.getElementById("phone"),
  screen: document.getElementById("screen"),
  feed: document.getElementById("feed"),
  posts: document.getElementById("feed-posts"),
  postTemplate: document.getElementById("post-template"),
  commentTemplate: document.getElementById("comment-template"),
  shieldTemplate: document.getElementById("shield-template"),
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
  statLiked: document.getElementById("stat-liked"),
  statSaved: document.getElementById("stat-saved"),
  statComments: document.getElementById("stat-comments"),
  ownPostsInfo: document.getElementById("own-posts-info"),
  exportButton: document.getElementById("export-button"),
  importInput: document.getElementById("import-input"),
  campaignInfo: document.getElementById("campaign-info"),
  deleteAllButton: document.getElementById("delete-all-button"),
  restoreButton: document.getElementById("restore-button"),
  feedEmpty: document.getElementById("feed-empty"),
  feedEnd: document.getElementById("feed-end"),
  emptyCreate: document.getElementById("empty-create"),
  statusTime: document.getElementById("status-time"),
  navItems: document.querySelectorAll(".bottom-nav__item"),
  navAccountAvatar: document.getElementById("nav-account-avatar"),
  accountStoryAvatar: document.getElementById("account-story-avatar"),
  accountStoryName: document.getElementById("account-story-name"),
  storyTestInputs: document.querySelectorAll(".story-test-input"),
  fbStoryImage: document.getElementById("fb-story-image"),
  fbStoryAvatar: document.getElementById("fb-story-avatar"),
  fbStoryName: document.getElementById("fb-story-name"),
  presentationExit: document.getElementById("presentation-exit"),
};

const numberFormat = new Intl.NumberFormat("de-DE");
const compactFormat = new Intl.NumberFormat("de-DE", { notation: "compact", maximumFractionDigits: 1 });
const decimalFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 });

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

function focusableIn(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createButton(className, text) {
  const button = createElement("button", className, text);
  button.type = "button";
  return button;
}

function restartAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/* Zeit */

function postAgeHours(post) {
  return post.postedAt ? (Date.now() - post.postedAt) / 3600000 : post.hoursAgo;
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

/* Plattform */

function currentPlatformId() {
  return PLATFORMS[settings.platform] ? settings.platform : "instagram";
}

function currentRules() {
  return PLATFORMS[currentPlatformId()];
}

// Facebook zeigt den Namen der Seite, Instagram und TikTok den Benutzernamen
function accountLabel(platformId = currentPlatformId()) {
  return platformId === "facebook" ? ACCOUNT.displayName || ACCOUNT.username : ACCOUNT.username;
}

/* Account und Avatare */

function resolveAccount(text) {
  return text.split(ACCOUNT_TOKEN).join(ACCOUNT.username);
}

function initials(name) {
  return name.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase();
}

function hueFromName(name) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

// Füllt ein Avatar-Element mit dem Profilbild des Accounts (eigenes Bild oder Schild-Symbol)
function fillAccountAvatar(element) {
  element.replaceChildren();
  element.classList.add("avatar--account");
  if (accountAvatarUrl) {
    const image = createElement("img", "avatar__image");
    image.src = accountAvatarUrl;
    image.alt = "";
    element.append(image);
  } else {
    element.append(dom.shieldTemplate.content.firstElementChild.cloneNode(true));
  }
}

function createAvatar(name, sizeClass) {
  const avatar = createElement("span", `avatar ${sizeClass}`);
  avatar.setAttribute("aria-hidden", "true");
  if (name === ACCOUNT.username || name === ACCOUNT_TOKEN) {
    fillAccountAvatar(avatar);
  } else {
    avatar.textContent = initials(name);
    avatar.style.setProperty("--avatar-hue", hueFromName(name));
  }
  return avatar;
}

/* Text */

// Hashtags und @-Erwähnungen farbig hervorheben
function appendRichText(element, text) {
  const pattern = /([#@][\p{L}\p{N}_]+(?:\.[\p{L}\p{N}_]+)*)/gu;
  text.split(pattern).forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      element.append(createElement("span", "hashtag", part));
    } else {
      element.append(part);
    }
  });
}

function splitParagraphs(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function countHashtags(text) {
  return (text.match(/#[\p{L}\p{N}_]+/gu) ?? []).length;
}

/* Bilder und Seitenverhältnisse */

function isVideo(item) {
  return item?.type === "video";
}

// Vorschaubild eines Mediums (bei Videos das beim Hochladen erzeugte Standbild)
function thumbSrc(item) {
  return isVideo(item) ? item.poster ?? "" : item.src;
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () =>
      resolve({ type: "image", src: url, blob: file, name: file.name, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(file.name));
    };
    image.src = url;
  });
}

// Liest Abmessungen und Dauer eines Videos und erzeugt ein Standbild für Raster und Vorschauen
function loadVideoFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    let settled = false;
    const fail = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      reject(new Error(file.name));
    };
    const timer = setTimeout(fail, 15000);
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.onerror = fail;
    video.onloadedmetadata = () => {
      if (!video.videoWidth || !video.videoHeight) {
        fail();
        return;
      }
      video.currentTime = Math.min(0.5, (video.duration || 1) / 3);
    };
    video.onseeked = () => {
      if (settled) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(
        (posterBlob) => {
          settled = true;
          clearTimeout(timer);
          resolve({
            type: "video",
            src: url,
            blob: file,
            name: file.name,
            width: video.videoWidth,
            height: video.videoHeight,
            duration: Number.isFinite(video.duration) ? video.duration : 0,
            posterBlob,
            poster: posterBlob ? URL.createObjectURL(posterBlob) : null,
          });
        },
        "image/jpeg",
        0.85
      );
    };
    video.src = url;
  });
}

function loadMediaFile(file) {
  return file.type.startsWith("video/") ? loadVideoFile(file) : loadImageFile(file);
}

function isMediaFile(file) {
  return file.type.startsWith("image/") || file.type.startsWith("video/");
}

function revokeMedia(item) {
  if (item.src?.startsWith("blob:")) URL.revokeObjectURL(item.src);
  if (item.poster?.startsWith("blob:")) URL.revokeObjectURL(item.poster);
}

function mediaRatio(media) {
  return media.width / media.height;
}

// Seitenverhältnis, in dem ein Bild im Feed der Plattform erscheint (TikTok: immer Vollbild)
function feedFrameRatio(ratio, rules = currentRules()) {
  if (rules.screenRatio) return rules.screenRatio;
  return clamp(ratio, rules.feedMinRatio, rules.feedMaxRatio);
}

// Anteil des Bildes, der beim Einpassen in einen Rahmen verloren geht
function cropLoss(imageRatio, frameRatio) {
  if (Math.abs(imageRatio - frameRatio) / frameRatio < 0.005) return { axis: null, removed: 0 };
  if (imageRatio < frameRatio) return { axis: "vertical", removed: 1 - imageRatio / frameRatio };
  return { axis: "horizontal", removed: 1 - frameRatio / imageRatio };
}

const NAMED_RATIOS = [
  [1, "1:1"],
  [4 / 5, "4:5"],
  [3 / 4, "3:4"],
  [2 / 3, "2:3"],
  [9 / 16, "9:16"],
  [16 / 9, "16:9"],
  [1.91, "1,91:1"],
  [4 / 3, "4:3"],
  [3 / 2, "3:2"],
];

function formatRatio(ratio) {
  const named = NAMED_RATIOS.find(([value]) => Math.abs(value - ratio) / value < 0.012);
  return named ? named[1] : `${decimalFormat.format(ratio)}:1`;
}

function formatPercent(fraction) {
  return `${Math.round(fraction * 100)} %`;
}

function focusToPosition(focus) {
  return { top: "50% 0%", bottom: "50% 100%", left: "0% 50%", right: "100% 50%" }[focus] ?? "50% 50%";
}

/* Dateien */

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const match = /^data:((?:image|video)\/[\w.+-]+);base64,(.+)$/s.exec(dataUrl);
  if (!match) throw new Error("Ungültige Mediendaten");
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

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // weiter mit der Ausweichlösung
    }
  }
  return copyWithTextarea(text);
}

/* Toast */

let toastTimer;

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2600);
}

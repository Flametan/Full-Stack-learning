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

const state = new Map(
  POSTS.map((post) => [
    post.id,
    { liked: false, saved: false, likes: post.likes, commentCount: post.commentCount, ownComments: 0 },
  ])
);

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
  statLiked: document.getElementById("stat-liked"),
  statSaved: document.getElementById("stat-saved"),
  statComments: document.getElementById("stat-comments"),
  navItems: document.querySelectorAll(".bottom-nav__item"),
};

const numberFormat = new Intl.NumberFormat("de-DE");

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

function getPost(id) {
  return POSTS.find((post) => post.id === id);
}

function getPostElement(id) {
  return document.getElementById(`post-${id}`);
}

function formatAgeShort(hours) {
  return hours < 24 ? `${hours} Std.` : `${Math.floor(hours / 24)} T.`;
}

function formatAgeLong(hours) {
  if (hours < 24) return hours === 1 ? "vor 1 Stunde" : `vor ${hours} Stunden`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "vor 1 Tag" : `vor ${days} Tagen`;
}

function isoTimeAgo(hours) {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
}

function likesLabel(count) {
  return `Gefällt ${numberFormat.format(count)} Mal`;
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
  panel.querySelector(FOCUSABLE)?.focus();
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
let sheetCloseTimer;

function openSheet(title, buildBody, trigger) {
  clearTimeout(sheetCloseTimer);
  sheetTrigger = trigger;
  dom.sheetTitle.textContent = title;
  dom.sheetBody.replaceChildren();
  buildBody(dom.sheetBody);
  dom.sheetLayer.hidden = false;
  void dom.sheetLayer.offsetWidth;
  dom.sheetLayer.classList.add("is-open");
  dom.sheet.querySelector(FOCUSABLE)?.focus();
}

function closeSheet() {
  if (dom.sheetLayer.hidden) return;
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
  const focusable = [...dom.sheet.querySelectorAll(FOCUSABLE)];
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

function renderPost(post, index) {
  const article = dom.postTemplate.content.firstElementChild.cloneNode(true);
  const ageLong = formatAgeLong(post.hoursAgo);
  const fill = (field, value) =>
    article.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
      el.textContent = value;
    });

  article.id = `post-${post.id}`;
  article.dataset.postId = post.id;
  article.setAttribute("aria-label", `Beitrag ${index + 1} von ${ACCOUNT.username}, ${ageLong}`);

  fill("username", ACCOUNT.username);
  fill("location", ACCOUNT.location);
  fill("age-short", formatAgeShort(post.hoursAgo));
  fill("age-long", ageLong);
  fill("likes", likesLabel(post.likes));
  fill("caption-lead", CAPTION[0]);
  article.querySelectorAll("time").forEach((time) => {
    time.dateTime = isoTimeAgo(post.hoursAgo);
  });

  const image = article.querySelector(".post__image");
  image.loading = index === 0 ? "eager" : "lazy";
  image.width = post.width;
  image.height = post.height;
  image.alt = post.alt;
  image.src = post.image;

  const rest = article.querySelector('[data-field="caption-rest"]');
  CAPTION.slice(1).forEach((text) => {
    const paragraph = document.createElement("p");
    appendRichText(paragraph, text);
    rest.append(paragraph);
  });
  const collapse = document.createElement("button");
  collapse.type = "button";
  collapse.className = "caption__toggle";
  collapse.dataset.action = "toggle-caption";
  collapse.setAttribute("aria-expanded", "true");
  collapse.textContent = "weniger";
  rest.lastElementChild.append(" ", collapse);

  const list = article.querySelector('[data-field="comments"]');
  post.comments.forEach((comment, i) => list.append(renderComment(comment, { extra: i >= VISIBLE_COMMENTS })));

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
  button.setAttribute("aria-pressed", String(liked));
  button.setAttribute("aria-label", liked ? "Gefällt mir nicht mehr" : "Gefällt mir");
  if (liked) restartAnimation(button, "is-popping");
  article.querySelector('[data-field="likes"]').textContent = likesLabel(postState.likes);
  updateProfileStats();
}

function toggleSave(article) {
  const postState = state.get(article.dataset.postId);
  postState.saved = !postState.saved;
  const button = article.querySelector('[data-action="save"]');
  button.setAttribute("aria-pressed", String(postState.saved));
  button.setAttribute("aria-label", postState.saved ? "Aus Gespeichert entfernen" : "Speichern");
  if (postState.saved) restartAnimation(button, "is-popping");
  showToast(postState.saved ? "Beitrag gespeichert" : "Aus Gespeichert entfernt");
  updateProfileStats();
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
  postState.ownComments += 1;

  article.querySelector(".comments__list").append(renderComment({ author: VIEWER, text }, { isNew: true }));
  input.value = "";
  form.querySelector(".comment-form__submit").disabled = true;
  updateCommentsToggle(article, postId);
  updateProfileStats();
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
    if (commentLike) {
      const liked = commentLike.getAttribute("aria-pressed") !== "true";
      commentLike.setAttribute("aria-pressed", String(liked));
    }
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

  POSTS.forEach((post, index) => {
    post.comments.forEach((comment) => {
      if (seen.has(comment.author)) return;
      seen.add(comment.author);
      entries.push({ type: "account", name: comment.author, meta: `Kommentar unter Beitrag ${index + 1}`, postId: post.id });
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
  dom.statComments.textContent = values.reduce((sum, s) => sum + s.ownComments, 0);

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
    label.textContent = `Beitrag ${POSTS.indexOf(post) + 1} · ${formatAgeLong(post.hoursAgo)}`;

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
  create: () => showToast("Beiträge erstellen ist in dieser Simulation nicht enthalten."),
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

function init() {
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

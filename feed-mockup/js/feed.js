"use strict";

/* Feed: Beitragsdaten, Darstellung und Aktionen */

// Alle Beiträge, die gerade im Feed stehen, in Anzeigereihenfolge
const POSTS = [];
const state = new Map();

/* ------------------------------------------------------------------ */
/* Datenmodell                                                         */
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

function applyEditFields(post, edits) {
  if (!edits) return;
  if (edits.caption === null || Array.isArray(edits.caption)) post.caption = edits.caption;
  if (Number.isFinite(edits.likes)) post.likes = edits.likes;
  if (Number.isFinite(edits.postedAt)) post.postedAt = edits.postedAt;
  if (Array.isArray(edits.alts)) {
    edits.alts.forEach((alt, i) => {
      if (post.media[i] && typeof alt === "string" && alt) post.media[i].alt = alt;
    });
  }
  if (edits.ad && typeof edits.ad === "object") post.ad = { enabled: edits.ad.enabled === true, cta: String(edits.ad.cta ?? "") };
  if (typeof edits.focus === "string") post.focus = edits.focus;
}

// Kampagnenbeiträge sind fest im Code; Änderungen liegen als "edits" im Zustand
function buildCampaignPost(base, edits = null) {
  const post = {
    ...base,
    media: base.media.map((item) => ({ ...item })),
    isOwn: false,
    caption: null,
    ad: null,
    focus: "center",
    edits,
  };
  applyEditFields(post, edits);
  return post;
}

function buildOwnPost(record) {
  return {
    id: record.id,
    isOwn: true,
    media: record.media.map((item) => ({
      src: item.src ?? URL.createObjectURL(item.blob),
      blob: item.blob,
      name: item.name,
      width: item.width,
      height: item.height,
      alt: item.alt,
    })),
    caption: record.caption ?? null,
    postedAt: record.postedAt,
    likes: record.likes ?? 0,
    commentCount: 0,
    comments: [],
    ad: record.ad ?? null,
    focus: record.focus ?? "center",
  };
}

function ownRecord(post) {
  return {
    id: post.id,
    media: post.media.map(({ blob, name, width, height, alt }) => ({ blob, name, width, height, alt })),
    caption: post.caption,
    postedAt: post.postedAt,
    likes: post.likes,
    ad: post.ad,
    focus: post.focus,
  };
}

function getPost(id) {
  return POSTS.find((post) => post.id === id);
}

function getPostElement(id) {
  return document.getElementById(`post-${id}`);
}

function ownPosts() {
  return POSTS.filter((post) => post.isOwn);
}

function missingCampaignPosts() {
  return CAMPAIGN_POSTS.filter((post) => !getPost(post.id));
}

function captionParagraphs(post) {
  return post.caption ?? CAPTION;
}

function usesCampaignCaption(post) {
  return post.caption === null || JSON.stringify(post.caption) === JSON.stringify(CAPTION);
}

function createPostId() {
  return `eigen-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ------------------------------------------------------------------ */
/* Speichern                                                           */
/* ------------------------------------------------------------------ */

function savePostState(postId) {
  const post = getPost(postId);
  const postState = state.get(postId);
  if (!post || !postState) return;
  const record = {
    id: postId,
    liked: postState.liked,
    saved: postState.saved,
    comments: postState.userComments,
    likedComments: [...postState.likedComments],
  };
  if (!post.isOwn && post.edits) record.edits = post.edits;
  persist(() => storage.put("state", record));
}

function saveOwnPost(post) {
  if (storageAvailable) navigator.storage?.persist?.().catch(() => {});
  persist(() => storage.put("posts", ownRecord(post)));
}

function saveOrder() {
  saveSetting("order", POSTS.map((post) => post.id));
}

/* ------------------------------------------------------------------ */
/* Darstellung                                                         */
/* ------------------------------------------------------------------ */

function setPressed(button, pressed, labelPressed, labelDefault) {
  button.setAttribute("aria-pressed", String(pressed));
  button.setAttribute("aria-label", pressed ? labelPressed : labelDefault);
}

function renderComment(comment, { extra = false, isNew = false } = {}) {
  const item = dom.commentTemplate.content.firstElementChild.cloneNode(true);
  const author = resolveAccount(comment.author);
  item.querySelector(".comment__author").textContent = author;
  appendRichText(item.querySelector(".comment__body"), resolveAccount(comment.text));
  item.querySelector(".comment__like").setAttribute("aria-label", `Kommentar von ${author} gefällt mir`);
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

function renderMedia(article, post) {
  const container = article.querySelector(".post__media");
  const crop = settings.realisticCrop;
  const firstRatio = mediaRatio(post.media[0]);
  container.style.setProperty("--media-ratio", String(crop ? clampFeedRatio(firstRatio) : firstRatio));
  container.classList.toggle("is-cropping", crop);

  const track = createElement("div", "carousel__track");
  post.media.forEach((item, index) => {
    const slide = createElement("div", "carousel__slide");
    const image = createElement("img", "post__image");
    image.loading = "lazy";
    image.decoding = "async";
    image.width = item.width;
    image.height = item.height;
    image.alt = post.media.length > 1 ? `Bild ${index + 1} von ${post.media.length}: ${item.alt}` : item.alt;
    image.src = item.src;
    image.style.objectPosition = focusToPosition(post.focus);
    slide.append(image);
    track.append(slide);
  });
  container.prepend(track);

  if (post.media.length < 2) return;
  container.classList.add("is-carousel");
  const counter = createElement("span", "carousel__counter", `1/${post.media.length}`);
  counter.setAttribute("aria-hidden", "true");
  const prev = createButton("carousel__nav carousel__nav--prev");
  prev.dataset.action = "carousel-prev";
  prev.setAttribute("aria-label", "Vorheriges Bild");
  prev.innerHTML = ICON_CHEVRON.replace("sheet-row__chevron", "carousel__icon carousel__icon--flip");
  prev.disabled = true;
  const next = createButton("carousel__nav carousel__nav--next");
  next.dataset.action = "carousel-next";
  next.setAttribute("aria-label", "Nächstes Bild");
  next.innerHTML = ICON_CHEVRON.replace("sheet-row__chevron", "carousel__icon");
  container.append(counter, prev, next);

  const dots = article.querySelector(".carousel__dots");
  post.media.forEach((_, index) => dots.append(createElement("span", index === 0 ? "carousel__dot is-active" : "carousel__dot")));

  track.addEventListener("scroll", () => updateCarousel(article), { passive: true });
}

function updateCarousel(article) {
  const track = article.querySelector(".carousel__track");
  const count = track.children.length;
  const index = clamp(Math.round(track.scrollLeft / track.clientWidth), 0, count - 1);
  if (Number(track.dataset.index ?? 0) === index) return;
  track.dataset.index = String(index);
  article.querySelector(".carousel__counter").textContent = `${index + 1}/${count}`;
  article.querySelectorAll(".carousel__dot").forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  article.querySelector('[data-action="carousel-prev"]').disabled = index === 0;
  article.querySelector('[data-action="carousel-next"]').disabled = index === count - 1;
}

function scrollCarousel(article, step) {
  const track = article.querySelector(".carousel__track");
  track.scrollBy({ left: step * track.clientWidth, behavior: "smooth" });
}

function renderCaption(article, post) {
  const caption = article.querySelector(".caption");
  const paragraphs = captionParagraphs(post).map(resolveAccount);
  if (!paragraphs.length) {
    caption.hidden = true;
    return;
  }
  caption.dataset.text = paragraphs.join("\n");

  const full = caption.querySelector(".caption__full");
  paragraphs.forEach((text, index) => {
    const paragraph = createElement("p");
    if (index === 0) paragraph.append(createElement("span", "caption__username", ACCOUNT.username), " ");
    appendRichText(paragraph, text);
    full.append(paragraph);
  });
  const collapse = createButton("caption__toggle", "weniger");
  collapse.dataset.action = "toggle-caption";
  collapse.setAttribute("aria-expanded", "true");
  full.lastElementChild.append(" ", collapse);
}

// Baut die eingeklappte Bildunterschrift so, dass sie mit "… mehr" in zwei Zeilen passt, wie im Instagram-Feed.
// Gibt die Zahl der sichtbaren Zeichen zurück (oder null, wenn das Element gerade nicht sichtbar ist).
function layoutCollapsedCaption(element, username, text, { interactive = true } = {}) {
  if (!element.getClientRects().length) return null;

  const build = (shown, truncated) => {
    element.replaceChildren(createElement("span", "caption__username", username), " ");
    const body = createElement("span", "caption__text");
    appendRichText(body, shown);
    element.append(body);
    if (!truncated) return;
    element.append("… ");
    const more = interactive ? createButton("caption__toggle", "mehr") : createElement("span", "caption__toggle", "mehr");
    if (interactive) {
      more.dataset.action = "toggle-caption";
      more.setAttribute("aria-expanded", "false");
    }
    element.append(more);
  };

  const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 18;
  const maxHeight = lineHeight * 2 + 2;
  build(text, false);
  if (element.offsetHeight <= maxHeight) return text.length;

  let low = 0;
  let high = text.length;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    build(text.slice(0, middle).trimEnd(), true);
    if (element.offsetHeight <= maxHeight) low = middle;
    else high = middle - 1;
  }
  // nach Möglichkeit an einer Wortgrenze abschneiden
  let cut = low;
  const boundary = Math.max(text.lastIndexOf(" ", cut), text.lastIndexOf("\n", cut));
  if (boundary > cut - 18 && boundary > 0) cut = boundary;
  build(text.slice(0, cut).trimEnd(), true);
  return cut;
}

function layoutCaption(article) {
  const caption = article.querySelector(".caption");
  if (caption.hidden || !caption.dataset.text) return;
  const collapsed = caption.querySelector(".caption__collapsed");
  if (!caption.querySelector(".caption__full").hidden) return;
  layoutCollapsedCaption(collapsed, ACCOUNT.username, caption.dataset.text);
}

function layoutAllCaptions() {
  dom.posts.querySelectorAll(".post").forEach(layoutCaption);
}

function renderPost(post) {
  const article = dom.postTemplate.content.firstElementChild.cloneNode(true);
  const postState = state.get(post.id);
  const age = postAgeHours(post);
  const ageLong = formatAgeLong(age);
  const fill = (field, value) =>
    article.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
      el.textContent = value;
    });
  const ad = post.ad?.enabled === true;

  article.id = `post-${post.id}`;
  article.dataset.postId = post.id;
  article.setAttribute("aria-label", `${ad ? "Anzeige" : "Beitrag"} von ${ACCOUNT.username}, ${ageLong}`);

  fillAccountAvatar(article.querySelector('[data-field="avatar"]'));
  fill("username", ACCOUNT.username);
  fill("location", ad ? "Gesponsert" : ACCOUNT.location);
  article.querySelector(".post__location").hidden = !ad && !ACCOUNT.location;
  article.querySelector('[data-field="verified"]').style.display = ACCOUNT.verified ? "" : "none";
  fill("age-short", formatAgeShort(age));
  fill("age-long", ageLong);
  fill("likes", likesLabel(postState.likes));
  article.querySelectorAll("time").forEach((time) => {
    time.dateTime = isoTimeAgo(age);
  });

  if (ad) {
    const cta = article.querySelector(".post__cta");
    cta.hidden = false;
    fill("cta", post.ad.cta || "Mehr dazu");
  }

  setPressed(article.querySelector('[data-action="like"]'), postState.liked, "Gefällt mir nicht mehr", "Gefällt mir");
  setPressed(article.querySelector('[data-action="save"]'), postState.saved, "Aus Gespeichert entfernen", "Speichern");
  if (post.isOwn) article.querySelector("[data-hide-own]").hidden = true;

  renderMedia(article, post);
  renderCaption(article, post);

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
  POSTS.forEach((post) => fragment.append(renderPost(post)));
  dom.posts.replaceChildren(fragment);
  dom.posts.querySelectorAll(".post__image").forEach((image, index) => {
    if (index === 0) image.loading = "eager";
  });
  layoutAllCaptions();
  updateFeedEmpty();
}

function rerenderFeed() {
  const scrollTop = dom.feed.scrollTop;
  renderFeed();
  dom.feed.scrollTop = scrollTop;
}

function rerenderPost(post) {
  const current = getPostElement(post.id);
  if (!current) return;
  const article = renderPost(post);
  current.replaceWith(article);
  layoutCaption(article);
}

function insertPostAt(post, index) {
  POSTS.splice(index, 0, post);
  const next = POSTS[index + 1];
  const article = renderPost(post);
  dom.posts.insertBefore(article, next ? getPostElement(next.id) : null);
  layoutCaption(article);
}

function updateFeedEmpty() {
  const empty = POSTS.length === 0;
  dom.feedEmpty.hidden = !empty;
  dom.feedEnd.hidden = empty;
}

function focusPost(id) {
  const element = getPostElement(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  restartAnimation(element, "is-focused");
}

function refreshPostAges() {
  POSTS.forEach((post) => {
    const article = getPostElement(post.id);
    if (!article) return;
    const age = postAgeHours(post);
    article.querySelector('[data-field="age-short"]').textContent = formatAgeShort(age);
    article.querySelector('[data-field="age-long"]').textContent = formatAgeLong(age);
  });
}

/* ------------------------------------------------------------------ */
/* Aktionen                                                            */
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
  const full = caption.querySelector(".caption__full");
  const collapsed = caption.querySelector(".caption__collapsed");
  const expand = full.hidden;
  full.hidden = !expand;
  collapsed.hidden = expand;
  if (expand) {
    full.querySelector(".caption__toggle").focus();
  } else {
    layoutCaption(article);
    collapsed.querySelector(".caption__toggle")?.focus();
  }
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
  const notice = createElement("div", "post-hidden");
  const text = createElement("div");
  text.append(
    createElement("p", "post-hidden__title", "Beitrag ausgeblendet"),
    createElement("p", "post-hidden__text", "Du siehst künftig weniger Beiträge wie diesen.")
  );
  const undo = createButton("text-button", "Rückgängig");
  undo.dataset.action = "unhide";
  notice.append(text, undo);
  article.prepend(notice);
  article.classList.add("is-hidden");
  undo.focus();
}

function unhidePost(article) {
  article.querySelector(".post-hidden")?.remove();
  article.classList.remove("is-hidden");
  layoutCaption(article);
  article.querySelector('[data-action="menu"]').focus();
}

function postUrl(id) {
  return `${location.href.split("#")[0]}#post-${id}`;
}

async function copyPostLink(id) {
  const copied = await copyText(postUrl(id));
  showToast(copied ? "Link in die Zwischenablage kopiert" : "Link konnte nicht kopiert werden");
}

function openReportSheet(article) {
  const trigger = article.querySelector('[data-action="menu"]');
  closePopover({ returnFocus: false });
  openSheet(
    "Melden",
    (body) => {
      const lead = createElement("p", "sheet__lead", "Warum meldest du diesen Beitrag?");
      const list = createElement("div", "report-list");
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
  const lead = createElement(
    "p",
    "sheet__lead",
    "Danke für deine Meldung. In dieser Simulation wird nichts übermittelt, die Meldung bleibt lokal in deinem Browser."
  );
  const done = createButton("button-primary", "Fertig");
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
      const grid = createElement("div", "share-grid");
      const selected = new Set();

      const message = createElement("input", "share-message");
      message.type = "text";
      message.placeholder = "Nachricht schreiben …";
      message.setAttribute("aria-label", "Nachricht zum geteilten Beitrag");

      const send = createButton("button-primary", "Senden");
      send.disabled = true;

      SHARE_CONTACTS.forEach((name) => {
        const contact = createButton("share-contact");
        contact.setAttribute("aria-pressed", "false");
        contact.setAttribute("aria-label", `An ${name} senden`);
        const check = createElement("span", "share-contact__check");
        check.innerHTML = ICON_CHECK;
        contact.append(createAvatar(name, "avatar--xl"), createElement("span", "share-contact__name", name), check);
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

      const actions = createElement("div", "share-actions");
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

function openDeleteSheet(article) {
  const post = getPost(article.dataset.postId);
  closePopover({ returnFocus: false });
  openConfirmSheet({
    title: "Beitrag löschen?",
    text: post.isOwn
      ? "Der Beitrag wird mit Bildern, Likes und Kommentaren aus diesem Browser entfernt."
      : "Der Beitrag wird aus dem Feed entfernt. Im Profil-Panel kannst du die Kampagnenbeiträge jederzeit wiederherstellen.",
    confirmLabel: "Löschen",
    trigger: article.querySelector('[data-action="menu"]'),
    onConfirm: () => {
      deletePost(post.id);
      saveOrder();
      updateProfileStats();
      dom.feed.focus({ preventScroll: true });
      showToast("Beitrag gelöscht");
    },
  });
}

function deletePost(postId) {
  const post = getPost(postId);
  if (!post) return;
  POSTS.splice(POSTS.indexOf(post), 1);
  state.delete(postId);
  getPostElement(postId)?.remove();
  if (post.isOwn) {
    post.media.forEach((item) => URL.revokeObjectURL(item.src));
    persist(() => Promise.all([storage.delete("posts", postId), storage.delete("state", postId)]));
  } else {
    // Kampagnenbeiträge sind fest im Code; gespeichert wird nur, dass sie gelöscht sind
    persist(() => storage.put("state", { id: postId, deleted: true }));
  }
}

function openDeleteAllSheet() {
  const trigger = openPopoverState?.trigger ?? dom.profileToggle;
  closePopover({ returnFocus: false });
  const own = ownPosts().length;
  openConfirmSheet({
    title: "Alle Beiträge löschen?",
    text:
      own > 0
        ? "Der Feed wird geleert. Deine eigenen Beiträge werden endgültig aus diesem Browser entfernt; sichere sie vorher über „Exportieren“, wenn du sie behalten willst. Die Kampagnenbeiträge lassen sich wiederherstellen."
        : "Der Feed wird geleert. Die Kampagnenbeiträge lassen sich im Profil-Panel wiederherstellen.",
    confirmLabel: "Alle löschen",
    trigger,
    onConfirm: () => {
      [...POSTS].forEach((post) => deletePost(post.id));
      saveOrder();
      updateProfileStats();
      updateFeedEmpty();
      dom.feed.scrollTo({ top: 0 });
      showToast("Alle Beiträge gelöscht");
    },
  });
}

function restoreCampaignPosts() {
  const missing = missingCampaignPosts();
  if (!missing.length) return;
  missing.forEach((base) => {
    const post = buildCampaignPost(base);
    state.set(post.id, createPostState(post));
    POSTS.push(post);
    persist(() => storage.delete("state", post.id));
  });
  saveOrder();
  rerenderFeed();
  updateProfileStats();
  closePopover({ returnFocus: false });
  focusPost(missing[0].id);
  showToast(missing.length === 1 ? "1 Kampagnenbeitrag wiederhergestellt" : `${missing.length} Kampagnenbeiträge wiederhergestellt`);
}

function addPosts(newPosts) {
  newPosts.forEach((post, index) => {
    state.set(post.id, createPostState(post));
    insertPostAt(post, index);
    saveOwnPost(post);
  });
  saveOrder();
  updateProfileStats();
  updateFeedEmpty();

  dom.feed.scrollTo({ top: 0, behavior: "smooth" });
  restartAnimation(getPostElement(newPosts[0].id), "is-focused");
  showToast(newPosts.length === 1 ? "Beitrag geteilt" : `${newPosts.length} Beiträge geteilt`);
}

// Übernimmt Änderungen aus dem Bearbeiten-Dialog
function updatePost(post, edits) {
  applyEditFields(post, edits);
  const postState = state.get(post.id);
  postState.likes = post.likes + (postState.liked ? 1 : 0);
  if (post.isOwn) {
    saveOwnPost(post);
  } else {
    post.edits = { ...(post.edits ?? {}), ...edits };
    savePostState(post.id);
  }
  rerenderPost(post);
  updateProfileStats();
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
  edit: (article) => {
    const trigger = article.querySelector('[data-action="menu"]');
    closePopover({ returnFocus: false });
    openEditSheet(getPost(article.dataset.postId), trigger);
  },
  story: (article) => {
    closePopover({ returnFocus: false });
    openPostStory(article.dataset.postId);
  },
  "open-profile": (article, button) => openProfileView(button),
  "carousel-prev": (article) => scrollCarousel(article, -1),
  "carousel-next": (article) => scrollCarousel(article, 1),
  cta: (article) => {
    const post = getPost(article.dataset.postId);
    showToast(`„${post.ad?.cta || "Mehr dazu"}“ würde zur verlinkten Seite führen (Simulation).`);
  },
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
    if (!media || event.target.closest("button")) return;
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

  // Bildunterschriften neu kürzen, wenn sich die Breite des Feeds ändert (z. B. beim Gerätewechsel)
  let lastWidth = 0;
  let frame = 0;
  new ResizeObserver(([entry]) => {
    const width = Math.round(entry.contentRect.width);
    if (width === lastWidth) return;
    lastWidth = width;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layoutAllCaptions);
  }).observe(dom.posts);
}

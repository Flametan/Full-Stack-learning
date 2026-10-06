/* Feed-Simulation. © 2026 Fabian Flemig. Alle Rechte vorbehalten. */

"use strict";

/* Feed: Beitragsdaten, gemeinsame Darstellungsbausteine und Aktionen.
   Die plattformspezifische Darstellung der Beiträge steht in platforms.js. */

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
    sharesSent: Number.isFinite(stored.sharesSent) ? stored.sharesSent : 0,
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

function derivedCounts(likes) {
  return {
    views: Math.round(likes * DERIVED_COUNTS.views),
    saves: Math.round(likes * DERIVED_COUNTS.saves),
    shares: Math.round(likes * DERIVED_COUNTS.shares),
  };
}

// Kampagnenbeiträge sind fest im Code; Änderungen liegen als "edits" im Zustand
function buildCampaignPost(base, edits = null) {
  const post = {
    ...base,
    media: base.media.map((item) => ({ type: "image", ...item })),
    isOwn: false,
    caption: null,
    ad: null,
    focus: "center",
    edits,
    ...derivedCounts(base.likes),
  };
  applyEditFields(post, edits);
  return post;
}

function buildOwnPost(record) {
  return {
    id: record.id,
    isOwn: true,
    media: record.media.map((item) => ({
      type: item.type === "video" ? "video" : "image",
      src: item.src ?? URL.createObjectURL(item.blob),
      blob: item.blob,
      name: item.name,
      width: item.width,
      height: item.height,
      alt: item.alt,
      duration: item.duration ?? 0,
      posterBlob: item.posterBlob ?? null,
      poster: item.poster ?? (item.posterBlob ? URL.createObjectURL(item.posterBlob) : null),
    })),
    caption: record.caption ?? null,
    postedAt: record.postedAt,
    likes: record.likes ?? 0,
    commentCount: 0,
    comments: [],
    ad: record.ad ?? null,
    focus: record.focus ?? "center",
    views: 0,
    saves: 0,
    shares: 0,
  };
}

function ownRecord(post) {
  return {
    id: post.id,
    media: post.media.map(({ type, blob, name, width, height, alt, duration, posterBlob }) => ({
      type,
      blob,
      name,
      width,
      height,
      alt,
      duration,
      posterBlob,
    })),
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

// Anzeigewerte, die alle Plattformen nutzen
function displayCounts(post) {
  const postState = state.get(post.id);
  return {
    likes: postState.likes,
    comments: postState.commentCount,
    saves: post.saves + (postState.saved ? 1 : 0),
    shares: post.shares + postState.sharesSent,
    views: post.views + 1,
  };
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
    sharesSent: postState.sharesSent,
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
/* Darstellungsbausteine                                               */
/* ------------------------------------------------------------------ */

function setPressed(button, pressed, labelPressed, labelDefault) {
  button.setAttribute("aria-pressed", String(pressed));
  button.setAttribute("aria-label", pressed ? labelPressed : labelDefault);
}

function fillFields(root, field, value) {
  root.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
    el.textContent = value;
  });
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

// Kommentarliste eines Beitrags (vorgegebene und eigene), mit gespeicherten Kommentar-Likes
function fillCommentList(list, post, { collapseAfter = Infinity } = {}) {
  const postState = state.get(post.id);
  list.replaceChildren();
  post.comments.forEach((comment, i) => list.append(renderComment(comment, { extra: i >= collapseAfter })));
  postState.userComments.forEach((text) => list.append(renderComment({ author: VIEWER, text })));
  list.querySelectorAll(".comment__like").forEach((button, i) => {
    if (postState.likedComments.has(i)) button.setAttribute("aria-pressed", "true");
  });
}

function updateCommentsToggle(article, postId) {
  const section = article.querySelector(".comments");
  if (!section) return;
  const toggle = section.querySelector(".comments__toggle");
  const hasExtra = section.querySelector(".comment.is-extra") !== null;
  const expanded = section.classList.contains("is-expanded");
  toggle.hidden = !hasExtra;
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.textContent = platformView().commentsToggleLabel(state.get(postId).commentCount, expanded);
}

function createMediaElement(item, { label, focus, eager = false }) {
  if (isVideo(item)) {
    const video = createElement("video", "post__image post__video");
    video.muted = !videoSound;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", label);
    if (item.poster) video.poster = item.poster;
    video.src = item.src;
    video.style.objectPosition = focusToPosition(focus);
    return video;
  }
  const image = createElement("img", "post__image");
  image.loading = eager ? "eager" : "lazy";
  image.decoding = "async";
  image.width = item.width;
  image.height = item.height;
  image.alt = label;
  image.src = item.src;
  image.style.objectPosition = focusToPosition(focus);
  return image;
}

function mediaLabel(post, item, index) {
  const kind = isVideo(item) ? "Video" : "Bild";
  return post.media.length > 1 ? `${kind} ${index + 1} von ${post.media.length}: ${item.alt}` : item.alt;
}

// Karussell bzw. Einzelbild. frameRatio null bedeutet: Rahmen füllt den Container (TikTok).
function renderCarousel(container, post, { frameRatio, cover, dots }) {
  if (frameRatio) container.style.setProperty("--media-ratio", String(frameRatio));
  container.classList.toggle("is-cropping", cover);

  const track = createElement("div", "carousel__track");
  post.media.forEach((item, index) => {
    const slide = createElement("div", "carousel__slide");
    slide.append(createMediaElement(item, { label: mediaLabel(post, item, index), focus: post.focus }));
    track.append(slide);
  });
  container.prepend(track);
  addMuteButton(container, post);

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

  post.media.forEach((_, index) => dots.append(createElement("span", index === 0 ? "carousel__dot is-active" : "carousel__dot")));
  track.addEventListener("scroll", () => updateCarousel(container.closest(".post")), { passive: true });
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

// Facebook zeigt mehrere Fotos als Collage: 2 nebeneinander, 3 = eins oben und zwei unten,
// 4 = Raster 2 × 2, ab 5 = zwei oben und drei unten, ab 6 mit "+N" auf dem letzten Feld
function renderCollage(container, post) {
  const count = post.media.length;
  const shown = post.media.slice(0, 5);
  container.classList.add("is-collage", `is-collage-${Math.min(count, 5)}`);
  container.style.setProperty("--media-ratio", { 2: "2", 3: "1", 4: "1" }[Math.min(count, 5)] ?? "1.2");
  const grid = createElement("div", "collage");
  shown.forEach((item, index) => {
    const cell = createButton("collage__cell");
    cell.dataset.action = "open-media";
    cell.dataset.index = String(index);
    cell.setAttribute("aria-label", `${mediaLabel(post, item, index)}. Groß anzeigen`);
    const thumb = createElement("img", "collage__image");
    thumb.src = thumbSrc(item) || item.src;
    thumb.alt = "";
    thumb.loading = "lazy";
    thumb.style.objectPosition = focusToPosition(post.focus);
    cell.append(thumb);
    if (isVideo(item)) cell.append(createElement("span", "collage__play", "▶"));
    if (index === 4 && count > 5) cell.append(createElement("span", "collage__more", `+${count - 5}`));
    grid.append(cell);
  });
  container.prepend(grid);
}

function addMuteButton(container, post) {
  if (!post.media.some(isVideo)) return;
  const mute = createButton("media-mute");
  mute.dataset.action = "mute";
  updateMuteButton(mute);
  container.append(mute);
}

function updateMuteButton(button) {
  button.setAttribute("aria-pressed", String(videoSound));
  button.setAttribute("aria-label", videoSound ? "Ton aus" : "Ton an");
  button.innerHTML = videoSound ? ICON_SOUND_ON : ICON_SOUND_OFF;
}

/* Bildunterschrift */

function renderCaption(article, post, { prefix = "" } = {}) {
  const caption = article.querySelector(".caption");
  const paragraphs = captionParagraphs(post).map(resolveAccount);
  if (!paragraphs.length) {
    caption.hidden = true;
    return;
  }
  caption.dataset.text = paragraphs.join("\n");
  caption.dataset.prefix = prefix;

  const full = caption.querySelector(".caption__full");
  paragraphs.forEach((text, index) => {
    const paragraph = createElement("p");
    if (index === 0 && prefix) paragraph.append(createElement("span", "caption__username", prefix), " ");
    appendRichText(paragraph, text);
    full.append(paragraph);
  });
  const collapse = createButton("caption__toggle", "weniger");
  collapse.dataset.action = "toggle-caption";
  collapse.setAttribute("aria-expanded", "true");
  full.lastElementChild.append(" ", collapse);
}

// Baut die eingeklappte Bildunterschrift so, dass sie mit "… mehr" in die vorgegebene Zeilenzahl passt.
// Gibt die Zahl der sichtbaren Zeichen zurück (oder null, wenn das Element gerade nicht sichtbar ist).
function layoutCollapsedCaption(element, prefix, text, { lines = 2, moreLabel = "mehr", interactive = true } = {}) {
  if (!element.getClientRects().length) return null;

  const build = (shown, truncated) => {
    element.replaceChildren();
    if (prefix) element.append(createElement("span", "caption__username", prefix), " ");
    const body = createElement("span", "caption__text");
    appendRichText(body, shown);
    element.append(body);
    if (!truncated) return;
    element.append("… ");
    const more = interactive ? createButton("caption__toggle", moreLabel) : createElement("span", "caption__toggle", moreLabel);
    if (interactive) {
      more.dataset.action = "toggle-caption";
      more.setAttribute("aria-expanded", "false");
    }
    element.append(more);
  };

  const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 18;
  const maxHeight = lineHeight * lines + 2;
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
  if (!caption || caption.hidden || !caption.dataset.text) return;
  if (!caption.querySelector(".caption__full").hidden) return;
  const rules = currentRules();
  layoutCollapsedCaption(caption.querySelector(".caption__collapsed"), caption.dataset.prefix, caption.dataset.text, {
    lines: rules.captionLines,
    moreLabel: rules.moreLabel,
  });
}

function layoutAllCaptions() {
  dom.posts.querySelectorAll(".post").forEach(layoutCaption);
}

/* Feed aufbauen */

function platformView() {
  return PLATFORM_VIEWS[currentPlatformId()];
}

function renderPost(post) {
  const article = platformView().renderPost(post);
  article.id = `post-${post.id}`;
  article.dataset.postId = post.id;
  if (post.isOwn) article.querySelector("[data-hide-own]")?.setAttribute("hidden", "");
  const input = article.querySelector(".comment-form__input");
  if (input) {
    input.id = `comment-input-${post.id}`;
    article.querySelector(".comment-form label").htmlFor = input.id;
  }
  refreshCounts(article, post);
  return article;
}

function refreshCounts(article, post) {
  platformView().refreshCounts(article, post, displayCounts(post), state.get(post.id));
}

function observeVideos(root) {
  root.querySelectorAll("video.post__video").forEach((video) => videoObserver.observe(video));
}

function renderFeed() {
  videoObserver.disconnect();
  const fragment = document.createDocumentFragment();
  POSTS.forEach((post) => fragment.append(renderPost(post)));
  dom.posts.replaceChildren(fragment);
  const firstImage = dom.posts.querySelector("img.post__image");
  if (firstImage) firstImage.loading = "eager";
  observeVideos(dom.posts);
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
  current.querySelectorAll("video").forEach((video) => videoObserver.unobserve(video));
  const article = renderPost(post);
  current.replaceWith(article);
  observeVideos(article);
  layoutCaption(article);
}

function insertPostAt(post, index) {
  POSTS.splice(index, 0, post);
  const next = POSTS[index + 1];
  const article = renderPost(post);
  dom.posts.insertBefore(article, next ? getPostElement(next.id) : null);
  observeVideos(article);
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
    fillFields(article, "age-short", formatAgeShort(age));
    fillFields(article, "age-long", formatAgeLong(age));
  });
}

/* ------------------------------------------------------------------ */
/* Videos                                                              */
/* ------------------------------------------------------------------ */

let videoSound = false;

// Videos laufen stumm, sobald sie zu mindestens 60 % sichtbar sind, wie in den Apps
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !video.dataset.userPaused && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { root: dom.feed, threshold: [0, 0.6, 1] }
);

function toggleSound() {
  videoSound = !videoSound;
  dom.posts.querySelectorAll("video.post__video").forEach((video) => {
    video.muted = !videoSound;
  });
  dom.posts.querySelectorAll(".media-mute").forEach(updateMuteButton);
}

function togglePlayback(article) {
  const track = article.querySelector(".carousel__track");
  const index = track ? Number(track.dataset.index ?? 0) : 0;
  const video = article.querySelectorAll(".carousel__slide")[index]?.querySelector("video");
  if (!video) return;
  if (video.paused) {
    delete video.dataset.userPaused;
    video.play().catch(() => {});
  } else {
    video.dataset.userPaused = "true";
    video.pause();
  }
  article.classList.toggle("is-paused", video.paused);
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
  const post = getPost(postId);
  refreshCounts(article, post);
  if (liked) article.querySelectorAll('[data-action="like"]').forEach((button) => restartAnimation(button, "is-popping"));
  updateProfileStats();
  savePostState(postId);
}

function toggleSave(article) {
  const postId = article.dataset.postId;
  const postState = state.get(postId);
  postState.saved = !postState.saved;
  refreshCounts(article, getPost(postId));
  if (postState.saved) article.querySelectorAll('[data-action="save"]').forEach((button) => restartAnimation(button, "is-popping"));
  showToast(postState.saved ? "Beitrag gespeichert" : "Aus Gespeichert entfernt");
  updateProfileStats();
  savePostState(postId);
}

function showBurst(article) {
  const burst = article.querySelector(".post__burst");
  if (burst) restartAnimation(burst, "is-bursting");
}

function goToComments(article) {
  if (platformView().opensCommentSheet) {
    openCommentSheet(article);
    return;
  }
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
  article.classList.toggle("is-caption-open", expand);
  if (expand) {
    full.querySelector(".caption__toggle").focus();
  } else {
    layoutCaption(article);
    collapsed.querySelector(".caption__toggle")?.focus();
  }
}

// Speichert einen neuen Kommentar und gibt das Listenelement zurück
function storeComment(article, text) {
  const postId = article.dataset.postId;
  const postState = state.get(postId);
  postState.commentCount += 1;
  postState.userComments.push(text);
  refreshCounts(article, getPost(postId));
  updateProfileStats();
  savePostState(postId);
  return renderComment({ author: VIEWER, text }, { isNew: true });
}

function addComment(article, form) {
  const input = form.querySelector(".comment-form__input");
  const text = input.value.trim();
  if (!text) return;
  article.querySelector(".comments__list").append(storeComment(article, text));
  input.value = "";
  form.querySelector(".comment-form__submit").disabled = true;
  updateCommentsToggle(article, article.dataset.postId);
}

function toggleCommentLike(article, button, list) {
  const postId = article.dataset.postId;
  const liked = button.getAttribute("aria-pressed") !== "true";
  const index = [...list.querySelectorAll(".comment__like")].indexOf(button);
  button.setAttribute("aria-pressed", String(liked));
  const { likedComments } = state.get(postId);
  if (liked) likedComments.add(index);
  else likedComments.delete(index);
  savePostState(postId);
}

// TikTok zeigt Kommentare in einem eigenen Panel
function openCommentSheet(article) {
  const post = getPost(article.dataset.postId);
  openSheet(
    `${numberFormat.format(state.get(post.id).commentCount)} Kommentare`,
    (body) => {
      const list = createElement("ul", "comments__list comment-sheet__list");
      fillCommentList(list, post);
      list.addEventListener("click", (event) => {
        const like = event.target.closest(".comment__like");
        if (like) toggleCommentLike(article, like, list);
      });
      const form = createElement("form", "comment-form comment-sheet__form");
      const input = createElement("input", "comment-form__input");
      input.type = "text";
      input.maxLength = 300;
      input.placeholder = "Kommentar hinzufügen …";
      input.setAttribute("aria-label", "Kommentar schreiben");
      const submit = createElement("button", "text-button comment-form__submit", "Posten");
      submit.type = "submit";
      submit.disabled = true;
      input.addEventListener("input", () => {
        submit.disabled = input.value.trim() === "";
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        list.append(storeComment(article, text));
        dom.sheetTitle.textContent = `${numberFormat.format(state.get(post.id).commentCount)} Kommentare`;
        input.value = "";
        submit.disabled = true;
        list.lastElementChild.scrollIntoView({ block: "nearest" });
      });
      form.append(createAvatar(VIEWER, "avatar--xs"), input, submit);
      body.append(list, form);
    },
    article.querySelector('[data-action="comment"]'),
    { tall: true }
  );
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
  article.querySelectorAll("video").forEach((video) => video.pause());
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

function countShare(postId) {
  const postState = state.get(postId);
  if (!postState) return;
  postState.sharesSent += 1;
  const article = getPostElement(postId);
  if (article) refreshCounts(article, getPost(postId));
  savePostState(postId);
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
        countShare(postId);
        showToast(recipients.length === 1 ? `Gesendet an ${recipients[0]}` : `Gesendet an ${recipients.length} Personen`);
      });

      const actions = createElement("div", "share-actions");
      const copy = createSheetRow("Link kopieren", ICON_LINK);
      copy.addEventListener("click", () => {
        closeSheet();
        countShare(postId);
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
      ? "Der Beitrag wird mit allen Bildern und Videos, Likes und Kommentaren aus diesem Browser entfernt."
      : "Der Beitrag wird aus dem Feed entfernt. Im Simulationsmenü kannst du die Kampagnenbeiträge jederzeit wiederherstellen.",
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
  const element = getPostElement(postId);
  element?.querySelectorAll("video").forEach((video) => videoObserver.unobserve(video));
  element?.remove();
  if (post.isOwn) {
    post.media.forEach(revokeMedia);
    persist(() => Promise.all([storage.delete("posts", postId), storage.delete("state", postId)]));
  } else {
    // Kampagnenbeiträge sind fest im Code; gespeichert wird nur, dass sie gelöscht sind
    persist(() => storage.put("state", { id: postId, deleted: true }));
  }
}

function openDeleteAllSheet(trigger = openPopoverState?.trigger ?? dom.profileToggle) {
  closePopover({ returnFocus: false });
  const own = ownPosts().length;
  openConfirmSheet({
    title: "Alle Beiträge löschen?",
    text:
      own > 0
        ? "Der Feed wird geleert. Deine eigenen Beiträge werden endgültig aus diesem Browser entfernt; sichere sie vorher über „Exportieren“, wenn du sie behalten willst. Die Kampagnenbeiträge lassen sich wiederherstellen."
        : "Der Feed wird geleert. Die Kampagnenbeiträge lassen sich wiederherstellen.",
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
  closeSheet();
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
  save: (article) => {
    closePopover({ returnFocus: false });
    toggleSave(article);
  },
  comment: goToComments,
  share: openShareSheet,
  "toggle-comments": toggleComments,
  "toggle-caption": toggleCaption,
  menu: (article, button) => togglePopover(button, article.querySelector(".popover--menu")),
  "close-menu": () => closePopover(),
  "copy-link": (article) => {
    closePopover();
    countShare(article.dataset.postId);
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
  "open-media": (article, button) => openMediaViewer(getPost(article.dataset.postId), Number(button.dataset.index ?? 0), button),
  "carousel-prev": (article) => scrollCarousel(article, -1),
  "carousel-next": (article) => scrollCarousel(article, 1),
  mute: () => toggleSound(),
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
    if (commentLike && article) toggleCommentLike(article, commentLike, article.querySelector(".comments__list"));
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

  // Doppeltippen markiert mit "Gefällt mir"; bei TikTok pausiert einfaches Tippen ein Video
  let lastTap = { time: 0, postId: null };
  let singleTapTimer = 0;
  dom.posts.addEventListener("pointerup", (event) => {
    const media = event.target.closest(".post__media");
    if (!media || event.target.closest("button") || !platformView().doubleTapLike) return;
    const article = media.closest(".post");
    const now = Date.now();
    clearTimeout(singleTapTimer);
    if (lastTap.postId === article.dataset.postId && now - lastTap.time < 320) {
      setLiked(article, true);
      showBurst(article);
      lastTap = { time: 0, postId: null };
      return;
    }
    lastTap = { time: now, postId: article.dataset.postId };
    if (platformView().tapToPause) singleTapTimer = setTimeout(() => togglePlayback(article), 330);
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

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) dom.posts.querySelectorAll("video").forEach((video) => video.pause());
  });
}

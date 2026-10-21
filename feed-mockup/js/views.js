/* © 2026 Fabian Flemig */

"use strict";

/* Profilansicht, Story-Vorschau und Bildbetrachter */

/* ------------------------------------------------------------------ */
/* Profilansicht (pro Plattform)                                       */
/* ------------------------------------------------------------------ */

const profileView = {
  root: document.getElementById("profile-view"),
  close: document.getElementById("profile-view-close"),
  title: document.getElementById("profile-view-title"),
  body: document.getElementById("profile-view-body"),
  trigger: null,
  isFollowing: false,
};

function isProfileViewOpen() {
  return !profileView.root.hidden;
}

function totalLikes() {
  return POSTS.reduce((sum, post) => sum + (state.get(post.id)?.likes ?? 0), 0);
}

function createFollowButtons(primaryClass) {
  const row = createElement("div", "profile-buttons");
  const follow = createButton(`profile-buttons__button ${profileView.isFollowing ? "" : primaryClass}`, profileView.isFollowing ? "Gefolgt" : "Folgen");
  follow.setAttribute("aria-pressed", String(profileView.isFollowing));
  follow.addEventListener("click", () => {
    profileView.isFollowing = !profileView.isFollowing;
    renderProfileView();
    profileView.body.querySelector(".profile-buttons__button")?.focus();
  });
  const message = createButton("profile-buttons__button", "Nachricht");
  message.addEventListener("click", () => showToast("Direktnachrichten sind in dieser Simulation nicht enthalten."));
  row.append(follow, message);
  return row;
}

function createStat(value, label) {
  const stat = createElement("div");
  stat.append(createElement("dd", "", value), createElement("dt", "", label));
  return stat;
}

// Raster mit Kacheln im Format der Plattform; Videos mit Abspielsymbol bzw. Aufrufen (TikTok)
function createProfileGrid({ ratio, showViews = false }) {
  const grid = createElement("ul", "profile-grid");
  grid.style.setProperty("--grid-ratio", String(ratio));
  POSTS.forEach((post, index) => {
    const tile = createElement("li", "profile-grid__item");
    const button = createButton("profile-grid__button");
    button.setAttribute("aria-label", `Beitrag ${index + 1} im Feed öffnen`);
    const first = post.media[0];
    const image = createElement("img", "profile-grid__image");
    image.src = thumbSrc(first);
    image.alt = "";
    image.loading = "lazy";
    image.style.objectPosition = focusToPosition(post.focus);
    button.append(image);
    if (post.media.length > 1) {
      const icon = createElement("span", "profile-grid__badge");
      icon.innerHTML = ICON_CAROUSEL;
      button.append(icon);
    } else if (isVideo(first) && !showViews) {
      button.append(createElement("span", "profile-grid__badge profile-grid__badge--play", "▶"));
    }
    if (showViews) {
      button.append(createElement("span", "profile-grid__views", `▷ ${compactFormat.format(displayCounts(post).views)}`));
    }
    button.addEventListener("click", () => {
      closeProfileView({ returnFocus: false });
      focusPost(post.id);
    });
    tile.append(button);
    grid.append(tile);
  });
  return grid;
}

function emptyGridNote() {
  return createElement("p", "profile-grid__empty", "Noch keine Beiträge.");
}

const PROFILE_RENDERERS = {
  instagram(body) {
    profileView.title.textContent = ACCOUNT.username;
    const head = createElement("div", "profile-head");
    const avatar = createElement("span", "profile-head__avatar");
    avatar.append(createAvatar(ACCOUNT.username, "avatar--profile avatar--story"));
    const stats = createElement("dl", "profile-head__stats");
    stats.append(
      createStat(numberFormat.format(POSTS.length), "Beiträge"),
      createStat(numberFormat.format(ACCOUNT.followers + (profileView.isFollowing ? 1 : 0)), "Follower"),
      createStat(numberFormat.format(ACCOUNT.following), "Gefolgt")
    );
    head.append(avatar, stats);
    const bio = createElement("div", "profile-bio");
    if (ACCOUNT.displayName) bio.append(createElement("p", "profile-bio__name", ACCOUNT.displayName));
    if (ACCOUNT.bio) bio.append(createElement("p", "profile-bio__text", ACCOUNT.bio));
    body.append(
      head,
      bio,
      createFollowButtons("profile-buttons__button--primary"),
      createElement("p", "profile-view__note", "Kacheln zeigen den Ausschnitt im Format 3:4, wie im Instagram-Profilraster."),
      POSTS.length ? createProfileGrid({ ratio: PLATFORMS.instagram.gridRatio }) : emptyGridNote()
    );
  },

  tiktok(body) {
    profileView.title.textContent = ACCOUNT.displayName || ACCOUNT.username;
    const head = createElement("div", "tt-profile");
    const avatar = createElement("span", "tt-profile__avatar");
    avatar.append(createAvatar(ACCOUNT.username, "avatar--profile"));
    const handle = createElement("p", "tt-profile__handle", `@${ACCOUNT.username}`);
    const stats = createElement("dl", "tt-profile__stats");
    stats.append(
      createStat(compactFormat.format(ACCOUNT.following), "Gefolgt"),
      createStat(compactFormat.format(ACCOUNT.followers + (profileView.isFollowing ? 1 : 0)), "Follower"),
      createStat(compactFormat.format(totalLikes()), "Likes")
    );
    head.append(avatar, handle, stats, createFollowButtons("profile-buttons__button--tiktok"));
    if (ACCOUNT.bio) head.append(createElement("p", "tt-profile__bio", ACCOUNT.bio));
    body.append(
      head,
      createElement("p", "profile-view__note", "Kacheln zeigen den Ausschnitt im Format 3:4, wie im TikTok-Profil. Die Aufrufe sind Beispielwerte."),
      POSTS.length ? createProfileGrid({ ratio: PLATFORMS.tiktok.gridRatio, showViews: true }) : emptyGridNote()
    );
  },

  facebook(body) {
    profileView.title.textContent = accountLabel("facebook");
    const cover = createElement("div", "fb-profile__cover");
    const coverSource = POSTS.find((post) => thumbSrc(post.media[0]));
    if (coverSource) {
      const image = createElement("img", "fb-profile__cover-image");
      image.src = thumbSrc(coverSource.media[0]);
      image.alt = "";
      cover.append(image);
    }
    const head = createElement("div", "fb-profile");
    const avatar = createElement("span", "fb-profile__avatar");
    avatar.append(createAvatar(ACCOUNT.username, "avatar--profile"));
    const name = createElement("p", "fb-profile__name", accountLabel("facebook"));
    const meta = createElement(
      "p",
      "fb-profile__meta",
      `${numberFormat.format(ACCOUNT.followers + (profileView.isFollowing ? 1 : 0))} Follower · ${numberFormat.format(ACCOUNT.following)} folgt`
    );
    head.append(avatar, name, meta);
    if (ACCOUNT.bio) head.append(createElement("p", "fb-profile__bio", ACCOUNT.bio));
    head.append(createFollowButtons("profile-buttons__button--facebook"));
    body.append(
      cover,
      head,
      createElement("p", "fb-profile__tab", "Fotos und Videos"),
      createElement("p", "profile-view__note", "Vereinfachte Darstellung der Seite mit quadratischen Vorschaubildern."),
      POSTS.length ? createProfileGrid({ ratio: PLATFORMS.facebook.gridRatio }) : emptyGridNote()
    );
  },
};

function renderProfileView() {
  profileView.body.replaceChildren();
  profileView.root.dataset.platform = currentPlatformId();
  PROFILE_RENDERERS[currentPlatformId()](profileView.body);
}

function openProfileView(trigger) {
  closePopover({ returnFocus: false });
  closeSearch({ returnFocus: false });
  closeSheet();
  profileView.trigger = trigger ?? null;
  renderProfileView();
  profileView.root.hidden = false;
  profileView.body.scrollTop = 0;
  setActiveNav("profile");
  pauseFeedVideos();
  profileView.close.focus();
}

function closeProfileView({ returnFocus = true } = {}) {
  if (!isProfileViewOpen()) return;
  profileView.root.hidden = true;
  setActiveNav("home");
  if (returnFocus && profileView.trigger?.isConnected) profileView.trigger.focus();
  profileView.trigger = null;
}

function pauseFeedVideos() {
  dom.posts.querySelectorAll("video").forEach((video) => video.pause());
}

function bindProfileViewEvents() {
  profileView.close.addEventListener("click", () => closeProfileView());
}

/* ------------------------------------------------------------------ */
/* Bildbetrachter (Facebook)                                           */
/* ------------------------------------------------------------------ */

const mediaViewer = {
  root: document.getElementById("media-viewer"),
  stage: document.getElementById("media-viewer-stage"),
  counter: document.getElementById("media-viewer-counter"),
  alt: document.getElementById("media-viewer-alt"),
  close: document.getElementById("media-viewer-close"),
  prev: document.getElementById("media-viewer-prev"),
  next: document.getElementById("media-viewer-next"),
  post: null,
  index: 0,
  trigger: null,
};

function isMediaViewerOpen() {
  return !mediaViewer.root.hidden;
}

function renderMediaViewer() {
  const { post, index } = mediaViewer;
  const item = post.media[index];
  const element = isVideo(item) ? createElement("video", "media-viewer__media") : createElement("img", "media-viewer__media");
  if (isVideo(item)) {
    element.controls = true;
    element.playsInline = true;
    element.autoplay = true;
    if (item.poster) element.poster = item.poster;
  } else {
    element.alt = item.alt;
  }
  element.src = item.src;
  mediaViewer.stage.replaceChildren(element);
  mediaViewer.counter.textContent = post.media.length > 1 ? `${index + 1} von ${post.media.length}` : "";
  mediaViewer.alt.textContent = item.alt;
  mediaViewer.prev.hidden = index === 0;
  mediaViewer.next.hidden = index === post.media.length - 1;
}

function openMediaViewer(post, index, trigger) {
  if (!post) return;
  closePopover({ returnFocus: false });
  pauseFeedVideos();
  mediaViewer.post = post;
  mediaViewer.index = clamp(index, 0, post.media.length - 1);
  mediaViewer.trigger = trigger;
  renderMediaViewer();
  mediaViewer.root.hidden = false;
  mediaViewer.close.focus();
}

function stepMediaViewer(step) {
  if (!isMediaViewerOpen()) return;
  const next = mediaViewer.index + step;
  if (next < 0 || next >= mediaViewer.post.media.length) return;
  mediaViewer.index = next;
  renderMediaViewer();
}

function closeMediaViewer() {
  if (!isMediaViewerOpen()) return;
  mediaViewer.root.hidden = true;
  mediaViewer.stage.replaceChildren();
  if (mediaViewer.trigger?.isConnected) mediaViewer.trigger.focus();
  mediaViewer.trigger = null;
}

function bindMediaViewerEvents() {
  mediaViewer.close.addEventListener("click", closeMediaViewer);
  mediaViewer.prev.addEventListener("click", () => stepMediaViewer(-1));
  mediaViewer.next.addEventListener("click", () => stepMediaViewer(1));
}

/* ------------------------------------------------------------------ */
/* Story-Vorschau                                                      */
/* ------------------------------------------------------------------ */

const STORY_DURATION = 5000;
const STORY_VIDEO_MAX = 60000;

const story = {
  root: document.getElementById("story-viewer"),
  frame: document.getElementById("story-frame"),
  backdrop: document.getElementById("story-backdrop"),
  image: document.getElementById("story-image"),
  video: document.getElementById("story-video"),
  zones: document.getElementById("story-zones"),
  progress: document.getElementById("story-progress"),
  avatar: document.getElementById("story-avatar"),
  name: document.getElementById("story-name"),
  age: document.getElementById("story-age"),
  zonesToggle: document.getElementById("story-zones-toggle"),
  pauseButton: document.getElementById("story-pause"),
  closeButton: document.getElementById("story-close"),
  prev: document.getElementById("story-prev"),
  next: document.getElementById("story-next"),
  reply: document.getElementById("story-reply"),
  replyInput: document.getElementById("story-reply-input"),
  slides: [],
  index: 0,
  elapsed: 0,
  lastTick: 0,
  frameRequest: 0,
  paused: false,
  holding: false,
  trigger: null,
  cleanup: null,
};

function isStoryOpen() {
  return !story.root.hidden;
}

// 9:16-Rahmen so groß wie möglich in den Bildschirm einpassen
function fitStoryFrame() {
  const { clientWidth: width, clientHeight: height } = story.root;
  let frameWidth = width;
  let frameHeight = width / GENERAL.storyRatio;
  if (frameHeight > height) {
    frameHeight = height;
    frameWidth = height * GENERAL.storyRatio;
  }
  story.frame.style.width = `${frameWidth}px`;
  story.frame.style.height = `${frameHeight}px`;
}

function slidesFromPosts(posts) {
  return posts.flatMap((post) =>
    post.media.map((item) => ({
      type: item.type,
      src: item.src,
      poster: item.poster,
      alt: item.alt,
      ratio: mediaRatio(item),
      author: accountLabel(),
      age: formatAgeShort(postAgeHours(post)),
    }))
  );
}

function storySlideDuration(slide) {
  if (slide.type !== "video") return STORY_DURATION;
  const seconds = story.video.duration;
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds * 1000, STORY_VIDEO_MAX) : STORY_DURATION;
}

function renderStorySlide() {
  const slide = story.slides[story.index];
  const fits = Math.abs(slide.ratio - GENERAL.storyRatio) / GENERAL.storyRatio < 0.04;
  const video = slide.type === "video";
  story.image.hidden = video;
  story.video.hidden = !video;
  story.video.pause();
  if (video) {
    story.image.removeAttribute("src");
    story.video.src = slide.src;
    story.video.muted = !videoSound;
    story.video.currentTime = 0;
    story.video.classList.toggle("is-cover", fits);
    story.video.play().catch(() => {});
  } else {
    story.video.removeAttribute("src");
    story.image.src = slide.src;
    story.image.alt = slide.alt;
    story.image.classList.toggle("is-cover", fits);
  }
  const backdropSource = video ? slide.poster : slide.src;
  story.backdrop.style.backgroundImage = fits || !backdropSource ? "none" : `url("${backdropSource}")`;
  story.avatar.replaceChildren(createAvatar(slide.author === VIEWER ? VIEWER : ACCOUNT.username, "avatar--sm"));
  story.name.textContent = slide.author;
  story.age.textContent = slide.age;

  story.progress.replaceChildren();
  story.slides.forEach((_, i) => {
    const segment = createElement("span", "story-viewer__segment");
    const bar = createElement("span", "story-viewer__bar");
    bar.style.width = i < story.index ? "100%" : "0%";
    segment.append(bar);
    story.progress.append(segment);
  });
  story.elapsed = 0;
}

function storyTick(timestamp) {
  if (!isStoryOpen()) return;
  const delta = story.lastTick ? timestamp - story.lastTick : 0;
  story.lastTick = timestamp;
  const slide = story.slides[story.index];
  const stopped = story.paused || story.holding;
  if (slide.type === "video") {
    if (stopped && !story.video.paused) story.video.pause();
    if (!stopped && story.video.paused && story.video.src) story.video.play().catch(() => {});
    story.elapsed = story.video.currentTime * 1000;
  } else if (!stopped) {
    story.elapsed += delta;
  }
  const duration = storySlideDuration(slide);
  const bar = story.progress.children[story.index]?.firstElementChild;
  if (bar) bar.style.width = `${Math.min(100, (story.elapsed / duration) * 100)}%`;
  const ended = slide.type === "video" ? story.video.ended || story.elapsed >= duration : story.elapsed >= duration;
  if (ended && !stopped) {
    goToStory(story.index + 1);
    if (!isStoryOpen()) return;
  }
  story.frameRequest = requestAnimationFrame(storyTick);
}

function goToStory(index) {
  if (index >= story.slides.length) {
    closeStoryViewer();
    return;
  }
  story.index = Math.max(0, index);
  renderStorySlide();
}

function setStoryPaused(paused) {
  story.paused = paused;
  story.pauseButton.setAttribute("aria-pressed", String(paused));
  story.pauseButton.setAttribute("aria-label", paused ? "Fortsetzen" : "Pausieren");
}

function openStoryViewer(slides, { startIndex = 0, trigger = null, cleanup = null } = {}) {
  if (!slides.length) {
    showToast("Keine Bilder oder Videos für die Story-Vorschau vorhanden.");
    cleanup?.();
    return;
  }
  closePopover({ returnFocus: false });
  closeSheet();
  pauseFeedVideos();
  story.slides = slides;
  story.trigger = trigger;
  story.cleanup = cleanup;
  story.lastTick = 0;
  story.holding = false;
  story.root.dataset.platform = currentPlatformId();
  setStoryPaused(false);
  story.root.hidden = false;
  fitStoryFrame();
  goToStory(startIndex);
  story.closeButton.focus();
  cancelAnimationFrame(story.frameRequest);
  story.frameRequest = requestAnimationFrame(storyTick);
}

function closeStoryViewer() {
  if (!isStoryOpen()) return;
  cancelAnimationFrame(story.frameRequest);
  story.root.hidden = true;
  story.video.pause();
  story.video.removeAttribute("src");
  story.image.removeAttribute("src");
  story.cleanup?.();
  story.cleanup = null;
  if (story.trigger?.isConnected) story.trigger.focus();
  story.trigger = null;
}

function openAccountStory(trigger) {
  dom.accountStoryAvatar.classList.add("is-seen");
  openStoryViewer(slidesFromPosts(POSTS), { trigger });
}

function openPostStory(postId) {
  const post = getPost(postId);
  if (!post) return;
  openStoryViewer(slidesFromPosts([post]), { trigger: getPostElement(postId)?.querySelector('[data-action="menu"]') });
}

async function openTestStory(files, trigger) {
  const results = await Promise.allSettled(files.filter(isMediaFile).map(loadMediaFile));
  const loaded = results.filter((result) => result.status === "fulfilled").map((result) => result.value);
  if (results.length > loaded.length) showToast("Nicht alle Dateien konnten geladen werden.");
  const slides = loaded.map((item) => ({
    type: item.type,
    src: item.src,
    poster: item.poster,
    alt: item.name,
    ratio: mediaRatio(item),
    author: VIEWER,
    age: "Jetzt",
  }));
  openStoryViewer(slides, { trigger, cleanup: () => loaded.forEach(revokeMedia) });
}

function handleStoryKeys(event) {
  if (!isStoryOpen() || event.target === story.replyInput) return false;
  if (event.key === "ArrowRight") goToStory(story.index + 1);
  else if (event.key === "ArrowLeft") goToStory(story.index - 1);
  else if (event.key === " ") setStoryPaused(!story.paused);
  else return false;
  event.preventDefault();
  return true;
}

function handleMediaViewerKeys(event) {
  if (!isMediaViewerOpen()) return false;
  if (event.key === "ArrowRight") stepMediaViewer(1);
  else if (event.key === "ArrowLeft") stepMediaViewer(-1);
  else return false;
  event.preventDefault();
  return true;
}

function bindStoryEvents() {
  story.closeButton.addEventListener("click", closeStoryViewer);
  story.prev.addEventListener("click", () => goToStory(story.index - 1));
  story.next.addEventListener("click", () => goToStory(story.index + 1));
  story.pauseButton.addEventListener("click", () => setStoryPaused(!story.paused));
  story.zonesToggle.addEventListener("click", () => {
    const show = story.zones.hidden;
    story.zones.hidden = !show;
    story.zonesToggle.setAttribute("aria-pressed", String(show));
  });

  // Gedrückt halten pausiert, wie in der App
  story.frame.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".story-viewer__header, .story-viewer__reply")) return;
    story.holding = true;
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) =>
    story.frame.addEventListener(type, () => {
      story.holding = false;
    })
  );

  story.replyInput.addEventListener("focus", () => setStoryPaused(true));
  story.replyInput.addEventListener("blur", () => setStoryPaused(false));
  story.reply.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!story.replyInput.value.trim()) return;
    story.replyInput.value = "";
    showToast("Antwort gesendet (Simulation)");
  });

  dom.storyTestInputs.forEach((input) =>
    input.addEventListener("change", () => {
      const files = [...input.files];
      input.value = "";
      if (files.length) openTestStory(files, input.closest("label"));
    })
  );

  new ResizeObserver(() => {
    if (isStoryOpen()) fitStoryFrame();
  }).observe(dom.screen);
}

"use strict";

/* Profilansicht im Raster und Story-Vorschau */

/* ------------------------------------------------------------------ */
/* Profilansicht                                                       */
/* ------------------------------------------------------------------ */

const profileView = {
  root: document.getElementById("profile-view"),
  close: document.getElementById("profile-view-close"),
  title: document.getElementById("profile-view-title"),
  avatar: document.getElementById("profile-view-avatar"),
  posts: document.getElementById("profile-view-posts"),
  followers: document.getElementById("profile-view-followers"),
  following: document.getElementById("profile-view-following"),
  name: document.getElementById("profile-view-name"),
  bio: document.getElementById("profile-view-bio"),
  follow: document.getElementById("profile-follow"),
  message: document.getElementById("profile-message"),
  grid: document.getElementById("profile-grid"),
  empty: document.getElementById("profile-grid-empty"),
  trigger: null,
  isFollowing: false,
};

function isProfileViewOpen() {
  return !profileView.root.hidden;
}

function renderProfileView() {
  const verified = ACCOUNT.verified ? " ✓" : "";
  profileView.title.textContent = `${ACCOUNT.username}${verified}`;
  profileView.title.setAttribute("aria-label", `${ACCOUNT.username}${ACCOUNT.verified ? ", verifiziert" : ""}`);
  profileView.avatar.replaceChildren(createAvatar(ACCOUNT.username, "avatar--profile avatar--story"));
  profileView.posts.textContent = numberFormat.format(POSTS.length);
  profileView.followers.textContent = numberFormat.format(ACCOUNT.followers + (profileView.isFollowing ? 1 : 0));
  profileView.following.textContent = numberFormat.format(ACCOUNT.following);
  profileView.name.textContent = ACCOUNT.displayName;
  profileView.name.hidden = !ACCOUNT.displayName;
  profileView.bio.textContent = ACCOUNT.bio;
  profileView.bio.hidden = !ACCOUNT.bio;
  profileView.follow.textContent = profileView.isFollowing ? "Gefolgt" : "Folgen";
  profileView.follow.setAttribute("aria-pressed", String(profileView.isFollowing));
  profileView.follow.classList.toggle("profile-buttons__button--primary", !profileView.isFollowing);

  profileView.grid.replaceChildren();
  POSTS.forEach((post, index) => {
    const tile = createElement("li", "profile-grid__item");
    const button = createButton("profile-grid__button");
    button.setAttribute("aria-label", `Beitrag ${index + 1} im Feed öffnen`);
    const image = createElement("img", "profile-grid__image");
    image.src = post.media[0].src;
    image.alt = "";
    image.loading = "lazy";
    image.style.objectPosition = focusToPosition(post.focus);
    button.append(image);
    if (post.media.length > 1) {
      const icon = createElement("span", "profile-grid__badge");
      icon.innerHTML = ICON_CAROUSEL;
      button.append(icon);
    }
    button.addEventListener("click", () => {
      closeProfileView({ returnFocus: false });
      focusPost(post.id);
    });
    tile.append(button);
    profileView.grid.append(tile);
  });
  profileView.empty.hidden = POSTS.length > 0;
}

function openProfileView(trigger) {
  closePopover({ returnFocus: false });
  closeSearch({ returnFocus: false });
  closeSheet();
  profileView.trigger = trigger ?? null;
  renderProfileView();
  profileView.root.hidden = false;
  profileView.root.querySelector(".profile-view__scroll").scrollTop = 0;
  setActiveNav("profile");
  profileView.close.focus();
}

function closeProfileView({ returnFocus = true } = {}) {
  if (!isProfileViewOpen()) return;
  profileView.root.hidden = true;
  setActiveNav("home");
  if (returnFocus && profileView.trigger?.isConnected) profileView.trigger.focus();
  profileView.trigger = null;
}

function bindProfileViewEvents() {
  profileView.close.addEventListener("click", () => closeProfileView());
  profileView.follow.addEventListener("click", () => {
    profileView.isFollowing = !profileView.isFollowing;
    renderProfileView();
  });
  profileView.message.addEventListener("click", () => showToast("Direktnachrichten sind in dieser Simulation nicht enthalten."));
}

/* ------------------------------------------------------------------ */
/* Story-Vorschau                                                      */
/* ------------------------------------------------------------------ */

const STORY_DURATION = 5000;

const story = {
  root: document.getElementById("story-viewer"),
  frame: document.getElementById("story-frame"),
  backdrop: document.getElementById("story-backdrop"),
  image: document.getElementById("story-image"),
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
  let frameHeight = width / INSTAGRAM.storyRatio;
  if (frameHeight > height) {
    frameHeight = height;
    frameWidth = height * INSTAGRAM.storyRatio;
  }
  story.frame.style.width = `${frameWidth}px`;
  story.frame.style.height = `${frameHeight}px`;
}

function slidesFromPosts(posts) {
  return posts.flatMap((post) =>
    post.media.map((item) => ({
      src: item.src,
      alt: item.alt,
      ratio: mediaRatio(item),
      author: ACCOUNT.username,
      age: formatAgeShort(postAgeHours(post)),
    }))
  );
}

function renderStorySlide() {
  const slide = story.slides[story.index];
  const fits = Math.abs(slide.ratio - INSTAGRAM.storyRatio) / INSTAGRAM.storyRatio < 0.04;
  story.image.src = slide.src;
  story.image.alt = slide.alt;
  story.image.classList.toggle("is-cover", fits);
  story.backdrop.style.backgroundImage = fits ? "none" : `url("${slide.src}")`;
  story.avatar.replaceChildren(createAvatar(slide.author, "avatar--sm"));
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
  if (!story.paused && !story.holding) {
    story.elapsed += delta;
    const bar = story.progress.children[story.index]?.firstElementChild;
    if (bar) bar.style.width = `${Math.min(100, (story.elapsed / STORY_DURATION) * 100)}%`;
    if (story.elapsed >= STORY_DURATION) {
      goToStory(story.index + 1);
      if (!isStoryOpen()) return;
    }
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
    showToast("Keine Bilder für die Story-Vorschau vorhanden.");
    cleanup?.();
    return;
  }
  closePopover({ returnFocus: false });
  closeSheet();
  story.slides = slides;
  story.trigger = trigger;
  story.cleanup = cleanup;
  story.lastTick = 0;
  story.holding = false;
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

async function openTestStory(files) {
  const results = await Promise.allSettled([...files].filter((file) => file.type.startsWith("image/")).map(loadImageFile));
  const loaded = results.filter((result) => result.status === "fulfilled").map((result) => result.value);
  if (results.length > loaded.length) showToast("Nicht alle Dateien konnten geladen werden.");
  const slides = loaded.map((item) => ({ src: item.src, alt: item.name, ratio: mediaRatio(item), author: VIEWER, age: "Jetzt" }));
  openStoryViewer(slides, {
    trigger: dom.storyTestInput.closest(".story-bubble"),
    cleanup: () => loaded.forEach((item) => URL.revokeObjectURL(item.src)),
  });
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

  dom.storyTestInput.addEventListener("change", () => {
    const files = [...dom.storyTestInput.files];
    dom.storyTestInput.value = "";
    if (files.length) openTestStory(files);
  });

  new ResizeObserver(() => {
    if (isStoryOpen()) fitStoryFrame();
  }).observe(dom.screen);
}

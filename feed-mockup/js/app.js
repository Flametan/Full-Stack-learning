/* Feed-Simulation. © 2026 Fabian Flemig. Alle Rechte vorbehalten. */

"use strict";

/* Kopfzeile, Navigation, Export/Import, globale Ereignisse und Start */

/* ------------------------------------------------------------------ */
/* Suche                                                               */
/* ------------------------------------------------------------------ */

let searchIndex = [];
let searchTrigger = null;

function rebuildSearchIndex() {
  const entries = [{ type: "account", name: accountLabel(), meta: "Profil ansehen", action: "profile" }];
  const seen = new Set([ACCOUNT.username]);
  POSTS.forEach((post) => {
    post.comments.forEach((comment) => {
      const author = resolveAccount(comment.author);
      if (seen.has(author)) return;
      seen.add(author);
      entries.push({ type: "account", name: author, meta: "Kommentar im Feed", postId: post.id });
    });
  });
  const tags = new Map();
  POSTS.forEach((post) => {
    (captionParagraphs(post).join(" ").match(/#[\p{L}\p{N}_]+/gu) ?? []).forEach((tag) => {
      if (!tags.has(tag)) tags.set(tag, { count: 0, postId: post.id });
      tags.get(tag).count += 1;
    });
  });
  tags.forEach(({ count, postId }, tag) => {
    entries.push({ type: "hashtag", name: tag, meta: count === 1 ? "1 Beitrag" : `${count} Beiträge`, postId });
  });
  searchIndex = entries;
}

function renderSearchResults(query) {
  const term = query.trim().toLowerCase().replace(/^[#@]/, "");
  const matches = term
    ? searchIndex.filter((entry) => entry.name.toLowerCase().replace(/^#/, "").includes(term))
    : searchIndex.filter((entry) => entry.type === "hashtag" || entry.action === "profile");

  dom.searchResults.replaceChildren();
  if (!matches.length) {
    dom.searchResults.append(createElement("li", "search-results__hint", `Keine Ergebnisse für „${query.trim()}“ in diesem Feed.`));
    return;
  }
  if (!term) dom.searchResults.append(createElement("li", "search-results__hint", "Vorschläge aus diesem Feed"));

  matches.forEach((entry) => {
    const item = createElement("li");
    const button = createButton("search-result");
    if (entry.type === "hashtag") {
      const hash = createElement("span", "search-result__hash", "#");
      hash.setAttribute("aria-hidden", "true");
      button.append(hash);
    } else {
      button.append(createAvatar(entry.name, "avatar--lg"));
    }
    const text = createElement("span");
    text.append(createElement("span", "search-result__name", entry.name), createElement("br"), createElement("span", "search-result__meta", entry.meta));
    button.append(text);
    button.addEventListener("click", () => {
      closeSearch({ returnFocus: false });
      if (entry.action === "profile") openProfileView(searchTrigger);
      else focusPost(entry.postId);
    });
    item.append(button);
    dom.searchResults.append(item);
  });
}

function openSearch(trigger = dom.searchToggle) {
  searchTrigger = trigger;
  closePopover({ returnFocus: false });
  closeProfileView({ returnFocus: false });
  rebuildSearchIndex();
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
  if (returnFocus && searchTrigger?.isConnected) searchTrigger.focus();
}

/* ------------------------------------------------------------------ */
/* Benachrichtigungen und Profil-Panel                                 */
/* ------------------------------------------------------------------ */

function renderNotifications(list = dom.notificationList, onSelect = () => closePopover({ returnFocus: false })) {
  list.replaceChildren();
  NOTIFICATIONS.forEach((entry) => {
    const item = createElement("li");
    const text = createElement("span");
    const time = createElement("span", "notification__time", ` ${formatAgeShort(entry.hoursAgo)}`);
    text.append(createElement("strong", "", resolveAccount(entry.user)), ` ${resolveAccount(entry.text)}`, time);

    if (entry.postId) {
      item.className = "notification--link";
      const button = createButton("notification-button");
      button.append(createAvatar(entry.user, "avatar--sm"), text);
      button.addEventListener("click", () => {
        onSelect();
        if (getPost(entry.postId)) focusPost(entry.postId);
        else showToast("Dieser Beitrag wurde gelöscht.");
      });
      item.append(button);
    } else {
      item.append(createAvatar(entry.user, "avatar--sm"), text);
    }
    list.append(item);
  });
}

function openNotificationsSheet(trigger) {
  closePopover({ returnFocus: false });
  markNotificationsRead();
  openSheet(
    "Benachrichtigungen",
    (body) => {
      const list = createElement("ul", "notification-list notification-list--sheet");
      renderNotifications(list, () => {
        sheetTrigger = null;
        closeSheet();
      });
      body.append(list);
    },
    trigger
  );
}

function markNotificationsRead() {
  dom.notificationsDot.hidden = true;
  dom.notificationsToggle.setAttribute("aria-label", "Benachrichtigungen");
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

  const missing = missingCampaignPosts().length;
  const total = POSTS.length === 1 ? "1 Beitrag" : `${POSTS.length} Beiträge`;
  dom.campaignInfo.textContent =
    missing === 0 ? `${total} im Feed.` : `${total} im Feed, ${missing} von ${CAMPAIGN_POSTS.length} Kampagnenbeiträgen gelöscht.`;
  dom.deleteAllButton.disabled = POSTS.length === 0;
  dom.restoreButton.disabled = missing === 0;
}

function updateProfileStats() {
  const values = [...state.values()];
  dom.statLiked.textContent = values.filter((s) => s.liked).length;
  dom.statSaved.textContent = values.filter((s) => s.saved).length;
  dom.statComments.textContent = values.reduce((sum, s) => sum + s.userComments.length, 0);
  updateOwnPostsInfo();
  updateFeedEmpty();

  const saved = POSTS.filter((post) => state.get(post.id)?.saved);
  dom.savedList.replaceChildren();
  if (!saved.length) {
    dom.savedList.append(createElement("li", "saved-list__empty", "Noch nichts gespeichert. Tippe unter einem Beitrag auf das Lesezeichen."));
    return;
  }
  saved.forEach((post) => {
    const item = createElement("li");
    const button = createButton("saved-list__button");
    const thumb = createElement("img", "saved-list__thumb");
    thumb.src = thumbSrc(post.media[0]);
    thumb.alt = "";
    thumb.width = 36;
    thumb.height = 45;
    button.append(thumb, createElement("span", "", `Beitrag ${POSTS.indexOf(post) + 1} · ${formatAgeLong(postAgeHours(post))}`));
    button.addEventListener("click", () => {
      closePopover({ returnFocus: false });
      focusPost(post.id);
    });
    item.append(button);
    dom.savedList.append(item);
  });
}

/* ------------------------------------------------------------------ */
/* Export und Import                                                   */
/* ------------------------------------------------------------------ */

async function exportOwnPosts() {
  const posts = ownPosts();
  if (!posts.length) return;
  const entries = await Promise.all(
    posts.map(async (post) => {
      const postState = state.get(post.id);
      return {
        id: post.id,
        media: await Promise.all(
          post.media.map(async (item) => ({
            type: item.type,
            data: await blobToDataUrl(item.blob),
            name: item.name,
            alt: item.alt,
          }))
        ),
        caption: post.caption,
        postedAt: post.postedAt,
        likes: post.likes,
        ad: post.ad,
        focus: post.focus,
        liked: postState.liked,
        saved: postState.saved,
        comments: postState.userComments,
        likedComments: [...postState.likedComments],
      };
    })
  );
  const data = { format: "feed-simulation", version: 3, exportedAt: new Date().toISOString(), posts: entries };
  const date = new Date().toISOString().slice(0, 10);
  downloadFile(new Blob([JSON.stringify(data)], { type: "application/json" }), `feed-simulation-beitraege-${date}.json`);
  showToast(posts.length === 1 ? "1 Beitrag exportiert" : `${posts.length} Beiträge exportiert`);
}

async function importEntry(entry) {
  if (typeof entry?.id !== "string") throw new Error("Unvollständiger Eintrag");
  // Version 1 hatte genau ein Bild pro Beitrag
  const rawMedia = Array.isArray(entry.media) ? entry.media : [{ image: entry.image, name: entry.name, alt: entry.alt }];
  if (!rawMedia.length) throw new Error("Keine Bilder");
  const media = await Promise.all(
    rawMedia.map(async (raw) => {
      const blob = dataUrlToBlob(raw.data ?? raw.image);
      const name = typeof raw.name === "string" ? raw.name : "Datei";
      // Abmessungen aus der Datei selbst lesen, das prüft zugleich, ob sie sich laden lässt
      const loaded = await loadMediaFile(new File([blob], name, { type: blob.type }));
      return { ...loaded, alt: typeof raw.alt === "string" && raw.alt ? raw.alt : `Hochgeladenes Bild: ${name}` };
    })
  );
  const post = buildOwnPost({
    id: entry.id,
    media,
    caption: Array.isArray(entry.caption) ? entry.caption.filter((text) => typeof text === "string") : null,
    postedAt: Number.isFinite(entry.postedAt) ? entry.postedAt : Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now(),
    likes: Number.isFinite(entry.likes) ? entry.likes : 0,
    ad: entry.ad && typeof entry.ad === "object" ? { enabled: entry.ad.enabled === true, cta: String(entry.ad.cta ?? "") } : null,
    focus: typeof entry.focus === "string" ? entry.focus : "center",
  });
  state.set(post.id, createPostState(post, entry));
  insertPostAt(post, 0);
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
  // in umgekehrter Reihenfolge einfügen, damit die Reihenfolge der Datei erhalten bleibt
  for (const entry of [...data.posts].reverse()) {
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
  saveOrder();
  updateProfileStats();
  const parts = [`${imported} ${imported === 1 ? "Beitrag" : "Beiträge"} importiert`];
  if (skipped) parts.push(`${skipped} übersprungen (schon vorhanden oder fehlerhaft)`);
  showToast(parts.join(", "));
}

/* ------------------------------------------------------------------ */
/* Navigation und Befehle                                              */
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
    closeProfileView({ returnFocus: false });
    setActiveNav("home");
    dom.feed.scrollTo({ top: 0, behavior: "smooth" });
  },
  search: () => (dom.searchPanel.hidden ? openSearch() : closeSearch()),
  create: (button) => openCreateSheet(button),
  reels: () => showToast("Reels sind in dieser Simulation nicht enthalten."),
  friends: () => showToast("Die Freunde-Ansicht ist in dieser Simulation nicht enthalten."),
  video: () => showToast("Die Video-Ansicht ist in dieser Simulation nicht enthalten. Videos erscheinen im Feed."),
  inbox: (button) => openNotificationsSheet(button),
  notifications: (button) => openNotificationsSheet(button),
  profile: (button) => (isProfileViewOpen() ? closeProfileView() : openProfileView(button)),
};

const commands = {
  profile: (trigger) => openProfileView(trigger),
  story: (trigger) => openAccountStory(trigger),
  reorder: (trigger) => openReorderSheet(trigger),
  settings: (trigger) => openSettingsSheet(trigger),
  present: () => startPresentation(),
  tools: (trigger) => openToolsSheet(trigger),
  search: (trigger) => openSearch(trigger),
  notifications: (trigger) => openNotificationsSheet(trigger),
  create: (trigger) => openCreateSheet(trigger),
  messages: () => showToast("Nachrichten sind in dieser Simulation nicht enthalten."),
  following: () => showToast("In der Simulation gibt es nur den Feed „Für dich“."),
};

function bindNavigation() {
  dom.navItems.forEach((item) => {
    item.addEventListener("click", () => navActions[item.dataset.nav](item));
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-command]");
    if (button && commands[button.dataset.command]) commands[button.dataset.command](button);
  });
}

function bindHeaderEvents() {
  dom.searchToggle.addEventListener("click", () => (dom.searchPanel.hidden ? openSearch(dom.searchToggle) : closeSearch()));
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
  dom.deleteAllButton.addEventListener("click", openDeleteAllSheet);
  dom.restoreButton.addEventListener("click", restoreCampaignPosts);
  dom.emptyCreate.addEventListener("click", () => openCreateSheet(dom.emptyCreate));
}

/* ------------------------------------------------------------------ */
/* Screenshots einfügen                                                */
/* ------------------------------------------------------------------ */

function screenshotName(index) {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()].map((part) => String(part).padStart(2, "0")).join("-");
  return `Screenshot ${time}${index ? ` (${index + 1})` : ""}.png`;
}

function handlePaste(event) {
  const files = [...(event.clipboardData?.files ?? [])].filter(isMediaFile);
  if (!files.length) return;
  // Text in Eingabefeldern normal einfügen lassen, nur Bilder abfangen
  event.preventDefault();
  const named = files.map((file, index) =>
    /^image\.\w+$/i.test(file.name) || !file.name ? new File([file], screenshotName(index), { type: file.type }) : file
  );
  if (activeComposer) {
    activeComposer.addFiles(named);
    showToast(named.length === 1 ? "Screenshot eingefügt" : `${named.length} Screenshots eingefügt`);
  } else {
    closeStoryViewer();
    closeMediaViewer();
    closeProfileView({ returnFocus: false });
    openCreateSheet(null, named);
  }
}

/* ------------------------------------------------------------------ */
/* Uhrzeit                                                             */
/* ------------------------------------------------------------------ */

function updateClock() {
  const now = new Date();
  dom.statusTime.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  dom.statusTime.dateTime = now.toISOString();
}

// Zum Beginn jeder Minute aktualisieren, damit die Uhr nicht hinterherläuft
function startClock() {
  const tick = () => {
    updateClock();
    refreshPostAges();
    setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
  };
  tick();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateClock();
      refreshPostAges();
    }
  });
}

/* ------------------------------------------------------------------ */
/* Globale Ereignisse und Start                                        */
/* ------------------------------------------------------------------ */

function handleEscape() {
  if (isStoryOpen()) closeStoryViewer();
  else if (isMediaViewerOpen()) closeMediaViewer();
  else if (!dom.sheetLayer.hidden) closeSheet();
  else if (openPopoverState) closePopover();
  else if (!dom.searchPanel.hidden) closeSearch();
  else if (isProfileViewOpen()) closeProfileView();
  else stopPresentation();
}

function bindGlobalEvents() {
  document.addEventListener("click", (event) => {
    if (!openPopoverState) return;
    const { trigger, panel } = openPopoverState;
    if (!panel.contains(event.target) && !trigger.contains(event.target)) closePopover({ returnFocus: false });
  });

  dom.sheetLayer.addEventListener("click", (event) => {
    if (event.target.closest("[data-sheet-close]")) closeSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      handleEscape();
      return;
    }
    if (handleStoryKeys(event) || handleMediaViewerKeys(event)) return;
    trapSheetFocus(event);
    handleMenuArrows(event);
  });

  document.addEventListener("paste", handlePaste);
}

function arrangePosts(ownRecords, storedStates, order) {
  const own = ownRecords.map(buildOwnPost).sort((a, b) => b.postedAt - a.postedAt);
  const campaign = CAMPAIGN_POSTS.filter((base) => !storedStates.get(base.id)?.deleted).map((base) =>
    buildCampaignPost(base, storedStates.get(base.id)?.edits ?? null)
  );
  const posts = [...own, ...campaign];
  if (Array.isArray(order)) {
    // Bekannte Beiträge nach gespeicherter Reihenfolge; unbekannte eigene oben, unbekannte Kampagnenbeiträge unten
    const rank = (post) => {
      const index = order.indexOf(post.id);
      if (index !== -1) return index;
      return post.isOwn ? -1 : order.length;
    };
    posts.sort((a, b) => rank(a) - rank(b));
  }
  return posts;
}

function openLinkedPost() {
  const match = location.hash.match(/^#post-(.+)$/);
  if (match && getPost(match[1])) requestAnimationFrame(() => focusPost(match[1]));
}

async function init() {
  const { ownRecords, storedStates, storedSettings } = await loadStoredData();
  loadSettings(storedSettings);
  dom.screen.dataset.platform = currentPlatformId();
  applyTheme();
  applyDevice();

  POSTS.splice(0, POSTS.length, ...arrangePosts(ownRecords, storedStates, storedSettings.get("order")));
  POSTS.forEach((post) => state.set(post.id, createPostState(post, storedStates.get(post.id))));

  bindSettingControls();
  updateAccountChrome();
  renderFeed();
  renderNotifications();
  rebuildSearchIndex();
  updateProfileStats();
  syncSettingControls();

  bindFeedEvents();
  bindHeaderEvents();
  bindNavigation();
  bindPresentationEvents();
  bindProfileViewEvents();
  bindMediaViewerEvents();
  bindStoryEvents();
  bindGlobalEvents();
  startClock();
  openLinkedPost();
}

init();

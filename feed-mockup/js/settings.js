"use strict";

/* Einstellungen, Dunkelmodus, Gerätegröße und Präsentationsmodus */

const SETTINGS_DEFAULTS = {
  dark: false,
  device: "auto",
  realisticCrop: true,
  autoScroll: "medium",
  fullscreen: false,
};

const AUTO_SCROLL_SPEEDS = { off: 0, slow: 25, medium: 50, fast: 90 };

const settings = { ...SETTINGS_DEFAULTS };

// Objekt-URL des eigenen Profilbilds (falls gesetzt)
let accountAvatarUrl = null;

const mobileQuery = window.matchMedia("(max-width: 519px)");

function saveSettings() {
  saveSetting("settings", { ...settings });
}

function saveAccount() {
  saveSetting("account", { ...ACCOUNT });
}

function setAccountAvatar(blob) {
  if (accountAvatarUrl) URL.revokeObjectURL(accountAvatarUrl);
  ACCOUNT.avatar = blob instanceof Blob ? blob : null;
  accountAvatarUrl = ACCOUNT.avatar ? URL.createObjectURL(ACCOUNT.avatar) : null;
}

function loadSettings(storedSettings) {
  const savedSettings = storedSettings.get("settings");
  if (savedSettings && typeof savedSettings === "object") {
    Object.keys(SETTINGS_DEFAULTS).forEach((key) => {
      if (typeof savedSettings[key] === typeof SETTINGS_DEFAULTS[key]) settings[key] = savedSettings[key];
    });
  }
  const savedAccount = storedSettings.get("account");
  if (savedAccount && typeof savedAccount === "object") {
    Object.keys(ACCOUNT_DEFAULTS).forEach((key) => {
      if (key !== "avatar" && typeof savedAccount[key] === typeof ACCOUNT_DEFAULTS[key]) ACCOUNT[key] = savedAccount[key];
    });
    setAccountAvatar(savedAccount.avatar);
  }
}

/* ------------------------------------------------------------------ */
/* Anwenden                                                            */
/* ------------------------------------------------------------------ */

function applyTheme() {
  dom.screen.dataset.theme = settings.dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]').content = settings.dark ? "#000000" : "#ffffff";
}

function applyDevice() {
  const device = DEVICES.find((entry) => entry.id === settings.device) ?? DEVICES[0];
  const style = dom.phone.style;
  if (mobileQuery.matches) {
    style.removeProperty("--screen-width");
    style.removeProperty("--screen-height");
    style.zoom = "";
    return;
  }
  style.setProperty("--screen-width", `${device.width}px`);
  if (device.height) {
    style.setProperty("--screen-height", `${device.height}px`);
    // Passt das Gerät nicht ins Fenster, wird der ganze Rahmen verkleinert dargestellt
    const bezel = 24;
    const available = window.innerHeight - 48;
    style.zoom = String(Math.min(1, available / (device.height + bezel)));
  } else {
    style.removeProperty("--screen-height");
    style.zoom = "";
  }
}

function updateAccountChrome() {
  dom.navAccountAvatar.replaceChildren(createAvatar(ACCOUNT.username, "avatar--nav"));
  dom.accountStoryAvatar.replaceChildren(createAvatar(ACCOUNT.username, "avatar--story-lg"));
  dom.accountStoryName.textContent = ACCOUNT.username;
}

function onAccountChanged() {
  updateAccountChrome();
  rerenderFeed();
  renderNotifications();
  rebuildSearchIndex();
  if (isProfileViewOpen()) renderProfileView();
  saveAccount();
}

function syncSettingControls() {
  document.querySelectorAll("[data-setting]").forEach((control) => {
    const key = control.dataset.setting;
    if (control.type === "checkbox") control.checked = settings[key] === true;
    else control.value = settings[key];
  });
}

function changeSetting(key, value) {
  if (settings[key] === value) return;
  settings[key] = value;
  if (key === "dark") applyTheme();
  if (key === "device") applyDevice();
  if (key === "realisticCrop") rerenderFeed();
  syncSettingControls();
  saveSettings();
}

function fillDeviceSelect(select) {
  DEVICES.forEach((device) => select.append(new Option(device.label, device.id)));
}

/* ------------------------------------------------------------------ */
/* Einstellungsdialog                                                  */
/* ------------------------------------------------------------------ */

function sanitizeUsername(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, INSTAGRAM.usernameMax);
}

function createSettingCheckbox(key, label) {
  const { wrapper, input } = createCheckbox(label, settings[key]);
  input.dataset.setting = key;
  return wrapper;
}

function openSettingsSheet(trigger) {
  closePopover({ returnFocus: false });
  openSheet(
    "Einstellungen",
    (body) => {
      /* Account */
      const account = createSection("Account");

      const avatarRow = createElement("div", "settings-avatar");
      const avatarPreview = createElement("span", "settings-avatar__preview");
      const renderAvatarPreview = () => avatarPreview.replaceChildren(createAvatar(ACCOUNT.username, "avatar--lg"));
      renderAvatarPreview();
      const avatarPick = createElement("label", "own-posts__button");
      const avatarInput = createElement("input", "visually-hidden");
      avatarInput.type = "file";
      avatarInput.accept = "image/*";
      avatarPick.append(avatarInput, "Profilbild wählen");
      const avatarReset = createButton("own-posts__button", "Standard-Symbol");
      avatarRow.append(avatarPreview, avatarPick, avatarReset);
      avatarInput.addEventListener("change", () => {
        const [file] = avatarInput.files;
        avatarInput.value = "";
        if (!file?.type.startsWith("image/")) return;
        setAccountAvatar(file);
        renderAvatarPreview();
        onAccountChanged();
      });
      avatarReset.addEventListener("click", () => {
        setAccountAvatar(null);
        renderAvatarPreview();
        onAccountChanged();
      });

      const textInput = (key, { maxLength, type = "text" } = {}) => {
        const input = createElement("input", "field__control");
        input.type = type;
        if (maxLength) input.maxLength = maxLength;
        input.value = String(ACCOUNT[key]);
        return input;
      };

      const username = textInput("username", { maxLength: INSTAGRAM.usernameMax });
      username.autocomplete = "off";
      username.spellcheck = false;
      username.addEventListener("change", () => {
        const value = sanitizeUsername(username.value) || ACCOUNT_DEFAULTS.username;
        username.value = value;
        if (value === ACCOUNT.username) return;
        ACCOUNT.username = value;
        onAccountChanged();
      });

      const bindText = (input, key) =>
        input.addEventListener("change", () => {
          ACCOUNT[key] = input.value.trim();
          onAccountChanged();
        });
      const displayName = textInput("displayName", { maxLength: 30 });
      bindText(displayName, "displayName");
      const locationInput = textInput("location", { maxLength: 40 });
      bindText(locationInput, "location");

      const bio = createElement("textarea", "field__control field__control--textarea");
      bio.rows = 3;
      bio.maxLength = INSTAGRAM.bioMax;
      bio.value = ACCOUNT.bio;
      bindText(bio, "bio");

      const numberInput = (key) => {
        const input = textInput(key, { type: "number" });
        input.min = "0";
        input.addEventListener("change", () => {
          ACCOUNT[key] = Math.max(0, Math.round(Number(input.value) || 0));
          input.value = String(ACCOUNT[key]);
          onAccountChanged();
        });
        return input;
      };

      const verified = createCheckbox("Verifizierungs-Haken anzeigen", ACCOUNT.verified);
      verified.input.addEventListener("change", () => {
        ACCOUNT.verified = verified.input.checked;
        onAccountChanged();
      });

      const numbersRow = createElement("div", "field__columns");
      numbersRow.append(createField("Follower", numberInput("followers")), createField("Gefolgt", numberInput("following")));

      account.append(
        avatarRow,
        createField("Benutzername", username, "Nur Kleinbuchstaben, Ziffern, Punkt und Unterstrich."),
        createField("Name im Profil", displayName),
        createField("Ort unter dem Namen im Beitrag", locationInput, "Leer lassen, um keinen Ort anzuzeigen."),
        createField(`Profiltext (bis ${INSTAGRAM.bioMax} Zeichen)`, bio),
        numbersRow,
        verified.wrapper
      );

      /* Darstellung */
      const display = createSection("Darstellung");
      const device = createElement("select", "field__control");
      device.dataset.setting = "device";
      fillDeviceSelect(device);
      const deviceField = createField("Gerätegröße", device, mobileQuery.matches ? "Auf dem Smartphone nutzt die Simulation immer den ganzen Bildschirm." : "");
      device.disabled = mobileQuery.matches;
      display.append(
        createSettingCheckbox("dark", "Dunkelmodus"),
        createSettingCheckbox("realisticCrop", "Zuschnitt wie Instagram (Feed zwischen 3:4 und 1,91:1)"),
        deviceField
      );

      /* Präsentation */
      const presentationSection = createSection("Präsentation");
      const speed = createElement("select", "field__control");
      speed.dataset.setting = "autoScroll";
      [
        ["off", "Aus"],
        ["slow", "Langsam"],
        ["medium", "Mittel"],
        ["fast", "Schnell"],
      ].forEach(([value, label]) => speed.append(new Option(label, value)));
      const start = createButton("button-primary", "Präsentation starten");
      start.addEventListener("click", startPresentation);
      presentationSection.append(
        createField("Automatisch scrollen", speed),
        createSettingCheckbox("fullscreen", "Im Vollbild präsentieren"),
        createElement("p", "field__hint", "Blendet Werkzeuge und Hinweise aus. Beenden mit Esc oder über den Knopf oben rechts."),
        start
      );

      const reset = createButton("own-posts__button own-posts__button--danger settings-reset", "Einstellungen zurücksetzen");
      reset.addEventListener("click", () => {
        Object.assign(settings, SETTINGS_DEFAULTS);
        Object.assign(ACCOUNT, { ...ACCOUNT_DEFAULTS });
        setAccountAvatar(null);
        applyTheme();
        applyDevice();
        saveSettings();
        onAccountChanged();
        closeSheet();
        showToast("Einstellungen zurückgesetzt");
      });

      body.append(account, display, presentationSection, reset);
      syncSettingControls();
    },
    trigger,
    { tall: true }
  );
}

/* ------------------------------------------------------------------ */
/* Präsentationsmodus                                                  */
/* ------------------------------------------------------------------ */

const presentation = {
  active: false,
  frameRequest: 0,
  lastTick: 0,
  position: 0,
  startTimer: 0,
  hideTimer: 0,
};

function showPresentationExit() {
  dom.presentationExit.classList.add("is-visible");
  clearTimeout(presentation.hideTimer);
  presentation.hideTimer = setTimeout(() => dom.presentationExit.classList.remove("is-visible"), 2500);
}

function stopAutoScroll() {
  cancelAnimationFrame(presentation.frameRequest);
  clearTimeout(presentation.startTimer);
  presentation.frameRequest = 0;
}

function autoScrollTick(timestamp) {
  const speed = AUTO_SCROLL_SPEEDS[settings.autoScroll] ?? 0;
  const delta = presentation.lastTick ? (timestamp - presentation.lastTick) / 1000 : 0;
  presentation.lastTick = timestamp;
  presentation.position += speed * delta;
  dom.feed.scrollTop = presentation.position;
  if (dom.feed.scrollTop + dom.feed.clientHeight >= dom.feed.scrollHeight - 1) {
    stopAutoScroll();
    return;
  }
  presentation.frameRequest = requestAnimationFrame(autoScrollTick);
}

function startAutoScroll() {
  stopAutoScroll();
  if (!AUTO_SCROLL_SPEEDS[settings.autoScroll]) return;
  presentation.position = dom.feed.scrollTop;
  presentation.lastTick = 0;
  presentation.frameRequest = requestAnimationFrame(autoScrollTick);
}

function startPresentation() {
  closeSheet();
  closePopover({ returnFocus: false });
  closeSearch({ returnFocus: false });
  closeProfileView({ returnFocus: false });
  closeStoryViewer();
  presentation.active = true;
  dom.body.classList.add("is-presenting");
  dom.presentationExit.hidden = false;
  showPresentationExit();
  if (settings.fullscreen) document.documentElement.requestFullscreen?.().catch(() => {});
  dom.feed.scrollTo({ top: 0 });
  dom.feed.focus({ preventScroll: true });
  presentation.startTimer = setTimeout(startAutoScroll, 1500);
}

function stopPresentation() {
  if (!presentation.active) return;
  presentation.active = false;
  stopAutoScroll();
  dom.body.classList.remove("is-presenting");
  dom.presentationExit.hidden = true;
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}

function bindPresentationEvents() {
  dom.presentationExit.addEventListener("click", stopPresentation);
  ["mousemove", "touchstart"].forEach((type) =>
    document.addEventListener(
      type,
      () => {
        if (presentation.active) showPresentationExit();
      },
      { passive: true }
    )
  );
  // Eingriffe des Publikums oder der vortragenden Person stoppen das automatische Scrollen
  ["wheel", "touchstart", "pointerdown"].forEach((type) =>
    dom.feed.addEventListener(type, () => presentation.frameRequest && stopAutoScroll(), { passive: true })
  );
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && presentation.active && settings.fullscreen) stopPresentation();
  });
}

function bindSettingControls() {
  document.querySelectorAll("select[data-setting='device']").forEach((select) => {
    if (!select.options.length) fillDeviceSelect(select);
  });
  // Delegiert, damit auch die Steuerelemente im Einstellungsdialog erfasst werden
  document.addEventListener("change", (event) => {
    const control = event.target.closest("[data-setting]");
    if (!control) return;
    const key = control.dataset.setting;
    changeSetting(key, control.type === "checkbox" ? control.checked : control.value);
  });
  window.addEventListener("resize", applyDevice);
  mobileQuery.addEventListener("change", applyDevice);
}

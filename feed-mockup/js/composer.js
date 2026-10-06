/* © 2026 Fabian Flemig */

"use strict";

/* Beiträge erstellen, bearbeiten und sortieren */

// Offener "Neuer Beitrag"-Dialog, damit eingefügte Screenshots dort landen
let activeComposer = null;

/* ------------------------------------------------------------------ */
/* Bausteine                                                           */
/* ------------------------------------------------------------------ */

function createCheckbox(label, checked) {
  const wrapper = createElement("label", "check");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  wrapper.append(input, ` ${label}`);
  return { wrapper, input };
}

function createField(label, control, hint) {
  const field = createElement("label", "field");
  field.append(createElement("span", "field__label", label), control);
  if (hint) field.append(createElement("span", "field__hint", hint));
  return field;
}

function createSection(title) {
  const section = createElement("section", "composer-section");
  section.append(createElement("h3", "composer-section__title", title));
  return section;
}

// Breite der Bildunterschrift im Feed der aktiven Plattform, damit die Vorschau gleich kürzt
function captionPreviewWidth() {
  const visible = [...dom.posts.querySelectorAll(".caption__collapsed")].find((el) => el.getClientRects().length);
  if (visible) return visible.clientWidth;
  const width = dom.feed.clientWidth;
  return { instagram: width - 28, tiktok: width - 96, facebook: width - 24 }[currentPlatformId()];
}

/* Zuschnitt-Check */

function describeFrameLoss(loss) {
  const sides = loss.axis === "vertical" ? "oben und unten" : "links und rechts";
  return `${sides} fehlen ${formatPercent(loss.removed)}`;
}

// Wie zeigen die drei Plattformen ein Bild oder Video? multi: Teil eines mehrteiligen Beitrags
function describeCrop(item, { multi = false, index = 0, firstRatio = mediaRatio(item) } = {}) {
  const ratio = mediaRatio(item);
  const active = currentPlatformId();
  const lines = [];
  let level = "ok";
  let activeLoss = { axis: null, removed: 0 };

  const kind = isVideo(item) ? `Video (${formatDuration(item.duration)})` : "Bild";
  lines.push({ text: `${kind} im Format ${formatRatio(ratio)}`, className: "upload-item__format" });

  PLATFORM_ORDER.forEach((id) => {
    const rules = PLATFORMS[id];
    let text;
    let loss = { axis: null, removed: 0 };
    if (id === "tiktok") {
      const screen = rules.screenRatio;
      if (Math.abs(ratio - screen) / screen < 0.03) text = "füllt den Bildschirm";
      else if (ratio > screen) text = `Ränder oben und unten, ${formatPercent(1 - screen / ratio)} des Bildschirms bleiben frei`;
      else text = `Ränder links und rechts, ${formatPercent(1 - ratio / screen)} des Bildschirms bleiben frei`;
    } else if (id === "facebook" && multi) {
      text = "Collage, der Ausschnitt hängt von der Anordnung ab";
    } else {
      const frame = feedFrameRatio(multi && id === "instagram" ? firstRatio : ratio, rules);
      loss = cropLoss(ratio, frame);
      text = loss.removed === 0 ? "wird vollständig angezeigt" : describeFrameLoss(loss);
      if (loss.removed > 0 && multi && id === "instagram" && index > 0) text += " (Format des ersten Bildes)";
    }
    if (id === active) {
      activeLoss = loss;
      if (loss.removed > 0) level = "warn";
    }
    lines.push({ text: `${rules.label}: ${text}`, className: id === active ? "upload-item__crop is-active" : "upload-item__crop" });
  });

  if (index === 0) {
    const rules = PLATFORMS[active];
    const grid = cropLoss(Math.min(ratio, 1.91), rules.gridRatio);
    if (grid.removed > 0.01) {
      lines.push({ text: `Profilraster ${rules.label} (${rules.gridLabel}): ${formatPercent(grid.removed)} fehlen`, className: "upload-item__crop" });
    }
  }
  if (ratio < 0.62) lines.push({ text: "Hohes Format: passt gut zu TikTok und zur Story-Vorschau (9:16).", className: "upload-item__crop" });
  return { lines, level, feed: activeLoss };
}

// Vorschaubild mit markiertem Ausschnitt der aktiven Plattform
function createCropPreview(item, feed, focus) {
  const ratio = mediaRatio(item);
  const preview = createElement("span", "crop-preview");
  if (ratio < 0.8) {
    preview.style.height = "80px";
    preview.style.width = `${Math.round(80 * ratio)}px`;
  } else {
    preview.style.width = "72px";
    preview.style.height = `${Math.round(72 / ratio)}px`;
  }
  const image = createElement("img", "crop-preview__image");
  image.src = thumbSrc(item);
  image.alt = "";
  preview.append(image);
  if (isVideo(item)) preview.append(createElement("span", "crop-preview__play", "▶"));

  if (feed.removed > 0) {
    const frame = createElement("span", "crop-preview__frame");
    const visible = 1 - feed.removed;
    const offsets = { start: 0, center: feed.removed / 2, end: feed.removed };
    const key = { top: "start", left: "start", bottom: "end", right: "end" }[focus] ?? "center";
    const offset = offsets[feed.axis === "vertical" && ["left", "right"].includes(focus) ? "center" : key];
    if (feed.axis === "vertical") {
      Object.assign(frame.style, { top: `${offset * 100}%`, height: `${visible * 100}%`, left: "0", width: "100%" });
    } else {
      Object.assign(frame.style, { left: `${offset * 100}%`, width: `${visible * 100}%`, top: "0", height: "100%" });
    }
    preview.append(frame);
  }
  return preview;
}

function buildFocusSelect(initial) {
  const select = createElement("select", "field__control");
  [
    ["center", "Mitte"],
    ["top", "Oben"],
    ["bottom", "Unten"],
    ["left", "Links"],
    ["right", "Rechts"],
  ].forEach(([value, label]) => {
    const option = new Option(label, value);
    option.selected = value === initial;
    select.append(option);
  });
  const field = createField("Ausschnitt beim Zuschneiden", select, "Bestimmt, welcher Teil sichtbar bleibt, wenn eine Plattform zuschneidet.");
  return { field, select };
}

/* Bildunterschrift-Prüfung */

function buildCaptionEditor(initialCaption) {
  const section = createSection("Bildunterschrift");
  const campaign = createCheckbox("Begleittext der Kampagne verwenden", initialCaption === null);
  const textarea = createElement("textarea", "field__control field__control--textarea");
  textarea.rows = 6;
  textarea.placeholder = "Eigene Bildunterschrift schreiben …";
  textarea.setAttribute("aria-label", "Eigene Bildunterschrift");
  textarea.hidden = initialCaption === null;
  if (initialCaption) textarea.value = initialCaption.join("\n\n");

  const check = createElement("div", "caption-check");
  const stats = createElement("ul", "caption-check__stats");
  const warning = createElement("p", "caption-check__warning");
  const previewLabel = createElement("p", "caption-check__label");
  const previewBox = createElement("div", "caption-check__preview-box");
  const preview = createElement("p", "caption-check__preview");
  previewBox.append(preview);
  const hint = createElement("p", "caption-check__hint");
  check.append(stats, warning, previewLabel, previewBox, hint);

  const getCaption = () => (campaign.input.checked ? null : splitParagraphs(textarea.value));

  const update = () => {
    const paragraphs = (getCaption() ?? CAPTION).map(resolveAccount);
    const text = paragraphs.join("\n");
    const characters = text.length;
    const hashtags = countHashtags(text);
    const active = currentPlatformId();

    stats.replaceChildren();
    const warnings = [];
    PLATFORM_ORDER.forEach((id) => {
      const rules = PLATFORMS[id];
      const item = createElement("li", id === active ? "is-active" : "");
      const tooLong = characters > rules.captionMax;
      const tooManyTags = rules.hashtagMax !== null && hashtags > rules.hashtagMax;
      item.append(
        `${rules.label}: `,
        createElement("span", tooLong ? "is-error" : "", `${numberFormat.format(characters)} / ${numberFormat.format(rules.captionMax)} Zeichen`),
        " · ",
        createElement(
          "span",
          tooManyTags ? "is-error" : "",
          `${hashtags} ${hashtags === 1 ? "Hashtag" : "Hashtags"}${rules.hashtagMax !== null ? ` (erlaubt: ${rules.hashtagMax})` : ""}`
        )
      );
      stats.append(item);
      if (tooLong) warnings.push(`${rules.label} erlaubt höchstens ${numberFormat.format(rules.captionMax)} Zeichen.`);
      if (tooManyTags) warnings.push(rules.hashtagNote);
    });
    warning.textContent = warnings.join(" ");
    warning.hidden = warnings.length === 0;

    const rules = currentRules();
    previewLabel.textContent = `So erscheint der Text eingeklappt bei ${rules.label}:`;
    preview.className = `caption-check__preview caption-check__preview--${active}`;
    if (!text) {
      preview.textContent = "";
      hint.textContent = "Ohne Bildunterschrift erscheint nur der Beitrag selbst.";
      return;
    }
    preview.style.width = `${captionPreviewWidth()}px`;
    const visible = layoutCollapsedCaption(preview, active === "instagram" ? ACCOUNT.username : "", text, {
      lines: rules.captionLines,
      moreLabel: rules.moreLabel,
      interactive: false,
    });
    if (visible === null) return;
    hint.textContent =
      visible >= text.length
        ? "Der ganze Text ist ohne Aufklappen sichtbar."
        : `Ohne Aufklappen sichtbar: die ersten ${visible} Zeichen. Wichtige Aussagen sollten dort stehen.`;
  };

  campaign.input.addEventListener("change", () => {
    textarea.hidden = campaign.input.checked;
    if (!campaign.input.checked) {
      if (!textarea.value.trim()) textarea.value = CAPTION.join("\n\n");
      textarea.focus();
    }
    update();
  });
  textarea.addEventListener("input", update);

  section.append(campaign.wrapper, textarea, check);
  return { section, getCaption, update };
}

function buildAdEditor(initialAd) {
  const section = createSection("Anzeige");
  const enabled = createCheckbox("Als Anzeige darstellen („Gesponsert“ und Aktionsknopf)", initialAd?.enabled === true);
  const input = createElement("input", "field__control");
  input.type = "text";
  input.maxLength = 30;
  input.value = initialAd?.cta || "Mehr dazu";
  const listId = `cta-suggestions-${Math.random().toString(36).slice(2, 7)}`;
  input.setAttribute("list", listId);
  const datalist = document.createElement("datalist");
  datalist.id = listId;
  CTA_SUGGESTIONS.forEach((label) => datalist.append(new Option(label)));
  const field = createField("Text des Aktionsknopfs", input);
  field.hidden = !enabled.input.checked;
  enabled.input.addEventListener("change", () => {
    field.hidden = !enabled.input.checked;
  });
  section.append(enabled.wrapper, field, datalist);
  return {
    section,
    getAd: () => ({ enabled: enabled.input.checked, cta: input.value.trim() || "Mehr dazu" }),
  };
}

// Liste der Bilder und Videos mit Zuschnitt-Check, Bildbeschreibung und Sortierung
function buildMediaList({ items, getMulti, getFocus, allowSort, allowRemove, onChange }) {
  const list = createElement("ul", "upload-list");

  const render = () => {
    list.replaceChildren();
    const multi = getMulti();
    const focus = getFocus();
    const firstRatio = items.length ? mediaRatio(items[0]) : 1;

    items.forEach((item, index) => {
      const label = item.name || `${isVideo(item) ? "Video" : "Bild"} ${index + 1}`;
      const crop = describeCrop(item, { multi, index, firstRatio });
      const row = createElement("li", `upload-item upload-item--${crop.level}`);

      const meta = createElement("div", "upload-item__meta");
      meta.append(createElement("span", "upload-item__name", label));
      crop.lines.forEach((line) => meta.append(createElement("span", line.className, line.text)));
      const alt = createElement("input", "upload-item__alt");
      alt.type = "text";
      alt.value = item.alt ?? "";
      alt.placeholder = isVideo(item) ? "Beschreibung des Videos (optional)" : "Bildbeschreibung (optional)";
      alt.setAttribute("aria-label", `Beschreibung für ${label}`);
      alt.addEventListener("input", () => {
        item.alt = alt.value;
      });
      meta.append(alt);

      const tools = createElement("div", "upload-item__tools");
      if (allowSort && items.length > 1) {
        const up = createButton("icon-button icon-button--sm");
        up.innerHTML = ICON_UP;
        up.setAttribute("aria-label", `${label} nach oben`);
        up.disabled = index === 0;
        up.addEventListener("click", () => {
          items.splice(index - 1, 0, items.splice(index, 1)[0]);
          render();
          onChange?.();
        });
        const down = createButton("icon-button icon-button--sm");
        down.innerHTML = ICON_DOWN;
        down.setAttribute("aria-label", `${label} nach unten`);
        down.disabled = index === items.length - 1;
        down.addEventListener("click", () => {
          items.splice(index + 1, 0, items.splice(index, 1)[0]);
          render();
          onChange?.();
        });
        tools.append(up, down);
      }
      if (allowRemove(items)) {
        const remove = createButton("icon-button icon-button--sm");
        remove.innerHTML = ICON_CLOSE;
        remove.setAttribute("aria-label", `${label} entfernen`);
        remove.addEventListener("click", () => {
          items.splice(index, 1);
          item.onRemove?.();
          render();
          onChange?.();
        });
        tools.append(remove);
      }

      row.append(createCropPreview(item, crop.feed, focus), meta, tools);
      list.append(row);
    });
  };

  render();
  return { list, render };
}

function multiLimitWarning(count) {
  const exceeded = PLATFORM_ORDER.map((id) => PLATFORMS[id]).filter((rules) => rules.multiMax && count > rules.multiMax);
  return exceeded.map((rules) => `${rules.label} erlaubt höchstens ${rules.multiMax} Dateien in einem ${rules.multiLabel}.`).join(" ");
}

/* ------------------------------------------------------------------ */
/* Neuer Beitrag                                                       */
/* ------------------------------------------------------------------ */

function openCreateSheet(trigger, initialFiles = []) {
  const drafts = [];
  let published = false;
  let closed = false;

  openSheet(
    "Neuer Beitrag",
    (body) => {
      const drop = createElement("label", "upload-drop");
      const fileInput = createElement("input", "visually-hidden");
      fileInput.type = "file";
      fileInput.accept = "image/*,video/*";
      fileInput.multiple = true;
      const icon = createElement("span", "upload-drop__icon");
      icon.innerHTML = ICON_UPLOAD;
      drop.append(
        fileInput,
        icon,
        createElement("span", "upload-drop__title", "Bilder, Videos oder Screenshots auswählen"),
        createElement("span", "upload-drop__hint", "oder hierher ziehen, Screenshots auch mit Strg+V (Mac: Cmd+V) einfügen")
      );

      const multi = createCheckbox("Alle Dateien in einem Beitrag (Instagram: Karussell, TikTok: Fotobeitrag, Facebook: Collage)", false);
      multi.wrapper.hidden = true;
      const focus = buildFocusSelect("center");
      focus.field.hidden = true;

      const mediaList = buildMediaList({
        items: drafts,
        getMulti: () => multi.input.checked && drafts.length > 1,
        getFocus: () => focus.select.value,
        allowSort: true,
        allowRemove: () => true,
        onChange: () => update(),
      });

      const caption = buildCaptionEditor(null);
      const ad = buildAdEditor(null);
      const options = createSection("Darstellung");
      const limit = createElement("p", "composer-warning");
      limit.hidden = true;
      const publish = createButton("button-primary", "Teilen");
      publish.disabled = true;

      function update() {
        const count = drafts.length;
        multi.wrapper.hidden = count < 2;
        const asOne = multi.input.checked && count > 1;
        limit.textContent = asOne ? multiLimitWarning(count) : "";
        limit.hidden = !limit.textContent;
        const firstRatio = count ? mediaRatio(drafts[0]) : 1;
        focus.field.hidden = !drafts.some((item, index) => describeCrop(item, { multi: asOne, index, firstRatio }).feed.removed > 0);
        options.hidden = multi.wrapper.hidden && focus.field.hidden;
        publish.disabled = count === 0;
        publish.textContent = count > 1 && !asOne ? `${count} Beiträge teilen` : "Teilen";
      }

      const addFiles = async (files) => {
        const media = [...files].filter(isMediaFile);
        if (media.length < files.length) showToast("Nur Bilder und Videos können hinzugefügt werden.");
        const results = await Promise.allSettled(media.map(loadMediaFile));
        results.forEach((result) => {
          if (result.status === "rejected") {
            showToast(`„${result.reason.message}“ konnte nicht geladen werden. Der Browser unterstützt das Format eventuell nicht.`);
            return;
          }
          const draft = { ...result.value, alt: "" };
          if (closed) {
            revokeMedia(draft);
            return;
          }
          draft.onRemove = () => revokeMedia(draft);
          drafts.push(draft);
        });
        mediaList.render();
        update();
      };
      activeComposer = { addFiles };

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
      multi.input.addEventListener("change", () => {
        mediaList.render();
        update();
      });
      focus.select.addEventListener("change", () => mediaList.render());

      publish.addEventListener("click", () => {
        const captionValue = caption.getCaption();
        const adValue = ad.getAd();
        const now = Date.now();
        const toMedia = (draft) => ({
          type: draft.type,
          src: draft.src,
          blob: draft.blob,
          name: draft.name,
          width: draft.width,
          height: draft.height,
          duration: draft.duration ?? 0,
          poster: draft.poster ?? null,
          posterBlob: draft.posterBlob ?? null,
          alt: draft.alt.trim() || `Hochgeladen: ${draft.name}`,
        });
        const createPost = (media, index) => ({
          id: createPostId(),
          isOwn: true,
          media,
          caption: captionValue,
          postedAt: now - index,
          likes: 0,
          commentCount: 0,
          comments: [],
          ad: adValue.enabled ? adValue : null,
          focus: focus.select.value,
          views: 0,
          saves: 0,
          shares: 0,
        });
        const newPosts =
          multi.input.checked && drafts.length > 1
            ? [createPost(drafts.map(toMedia), 0)]
            : drafts.map((draft, index) => createPost([toMedia(draft)], index));
        published = true;
        closeSheet();
        addPosts(newPosts);
      });

      options.append(multi.wrapper, focus.field);
      options.hidden = true;
      body.append(drop, mediaList.list, options, caption.section, ad.section, limit, publish);
      requestAnimationFrame(caption.update);
      if (initialFiles.length) addFiles(initialFiles);
    },
    trigger,
    {
      tall: true,
      onClose: () => {
        closed = true;
        activeComposer = null;
        if (!published) drafts.forEach(revokeMedia);
      },
    }
  );
}

/* ------------------------------------------------------------------ */
/* Beitrag bearbeiten                                                  */
/* ------------------------------------------------------------------ */

function openEditSheet(post, trigger) {
  const items = post.media.map((item) => ({ ...item, original: item }));
  const removed = [];

  openSheet(
    "Beitrag bearbeiten",
    (body) => {
      const focus = buildFocusSelect(post.focus ?? "center");
      const mediaList = buildMediaList({
        items,
        getMulti: () => items.length > 1,
        getFocus: () => focus.select.value,
        allowSort: post.isOwn,
        allowRemove: (list) => post.isOwn && list.length > 1,
        onChange: () => {},
      });
      items.forEach((item) => {
        item.onRemove = () => removed.push(item.original);
      });
      focus.select.addEventListener("change", () => mediaList.render());

      const display = createSection("Darstellung");
      display.append(focus.field);

      const caption = buildCaptionEditor(usesCampaignCaption(post) ? null : post.caption);
      const ad = buildAdEditor(post.ad);

      const numbers = createSection("Likes und Zeit");
      const likes = createElement("input", "field__control");
      likes.type = "number";
      likes.min = "0";
      likes.step = "1";
      likes.value = String(post.likes);
      const age = postAgeHours(post);
      const [ageValue, ageUnit] = age < 1 ? [Math.max(1, Math.round(age * 60)), "minutes"] : age < 48 ? [Math.round(age), "hours"] : [Math.round(age / 24), "days"];
      const ageInput = createElement("input", "field__control field__control--short");
      ageInput.type = "number";
      ageInput.min = "0";
      ageInput.value = String(ageValue);
      ageInput.setAttribute("aria-label", "Alter des Beitrags");
      const unit = createElement("select", "field__control field__control--short");
      unit.setAttribute("aria-label", "Einheit");
      [
        ["minutes", "Minuten"],
        ["hours", "Stunden"],
        ["days", "Tage"],
      ].forEach(([value, label]) => {
        const option = new Option(label, value);
        option.selected = value === ageUnit;
        unit.append(option);
      });
      const ageRow = createElement("div", "field__row");
      ageRow.append(createElement("span", "", "vor"), ageInput, unit);
      const ageField = createElement("div", "field");
      ageField.append(createElement("span", "field__label", "Veröffentlicht"), ageRow);
      numbers.append(createField("„Gefällt mir“-Angaben (ohne deine eigene)", likes), ageField);

      const save = createButton("button-primary", "Speichern");
      save.addEventListener("click", () => {
        const factor = { minutes: 60000, hours: 3600000, days: 86400000 }[unit.value];
        const edits = {
          caption: caption.getCaption(),
          likes: Math.max(0, Math.round(Number(likes.value) || 0)),
          postedAt: Date.now() - Math.max(0, Number(ageInput.value) || 0) * factor,
          alts: items.map((item) => item.alt ?? ""),
          ad: ad.getAd(),
          focus: focus.select.value,
        };
        if (post.isOwn) {
          removed.forEach(revokeMedia);
          post.media = items.map(({ type, src, blob, name, width, height, alt, duration, poster, posterBlob }) => ({
            type,
            src,
            blob,
            name,
            width,
            height,
            alt,
            duration,
            poster,
            posterBlob,
          }));
        }
        closeSheet();
        updatePost(post, edits);
        showToast("Änderungen gespeichert");
      });

      body.append(mediaList.list, display, caption.section, ad.section, numbers, save);
      requestAnimationFrame(caption.update);
    },
    trigger,
    { tall: true }
  );
}

/* ------------------------------------------------------------------ */
/* Reihenfolge                                                         */
/* ------------------------------------------------------------------ */

function openReorderSheet(trigger) {
  closePopover({ returnFocus: false });
  openSheet(
    "Reihenfolge im Feed",
    (body) => {
      if (!POSTS.length) {
        body.append(createElement("p", "sheet__lead", "Der Feed ist leer."));
        return;
      }
      body.append(createElement("p", "sheet__lead", "Mit den Pfeilen oder per Ziehen sortieren. Oben steht der erste Beitrag im Feed."));
      const list = createElement("ul", "reorder-list");

      const move = (from, to) => {
        if (to < 0 || to >= POSTS.length || from === to) return;
        POSTS.splice(to, 0, POSTS.splice(from, 1)[0]);
        saveOrder();
        rerenderFeed();
        render(to);
      };

      const render = (focusIndex = null) => {
        list.replaceChildren();
        POSTS.forEach((post, index) => {
          const item = createElement("li", "reorder-item");
          item.draggable = true;
          item.dataset.index = String(index);
          const thumb = createElement("img", "reorder-item__thumb");
          thumb.src = thumbSrc(post.media[0]);
          thumb.alt = "";
          const label = createElement("span", "reorder-item__label");
          const firstLine = resolveAccount(captionParagraphs(post)[0] ?? "Ohne Bildunterschrift");
          const kinds = [
            post.isOwn ? "Eigener Beitrag" : "Kampagne",
            post.media.length > 1 ? `${post.media.length} Dateien` : isVideo(post.media[0]) ? "Video" : "",
            post.ad?.enabled ? "Anzeige" : "",
          ];
          label.append(
            createElement("span", "reorder-item__title", `${index + 1}. ${firstLine}`),
            createElement("span", "reorder-item__meta", kinds.filter(Boolean).join(" · "))
          );
          const up = createButton("icon-button icon-button--sm");
          up.innerHTML = ICON_UP;
          up.setAttribute("aria-label", `Beitrag ${index + 1} nach oben`);
          up.disabled = index === 0;
          up.addEventListener("click", () => move(index, index - 1));
          const down = createButton("icon-button icon-button--sm");
          down.innerHTML = ICON_DOWN;
          down.setAttribute("aria-label", `Beitrag ${index + 1} nach unten`);
          down.disabled = index === POSTS.length - 1;
          down.addEventListener("click", () => move(index, index + 1));
          item.append(thumb, label, up, down);
          list.append(item);
        });
        if (focusIndex !== null) {
          const target = list.children[focusIndex]?.querySelector("button:not([disabled])");
          target?.focus();
        }
      };

      let dragFrom = null;
      list.addEventListener("dragstart", (event) => {
        const item = event.target.closest(".reorder-item");
        if (!item) return;
        dragFrom = Number(item.dataset.index);
        item.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      });
      list.addEventListener("dragover", (event) => {
        if (dragFrom === null) return;
        event.preventDefault();
        list.querySelectorAll(".is-drop-target").forEach((el) => el.classList.remove("is-drop-target"));
        event.target.closest(".reorder-item")?.classList.add("is-drop-target");
      });
      list.addEventListener("drop", (event) => {
        event.preventDefault();
        const target = event.target.closest(".reorder-item");
        if (dragFrom !== null && target) move(dragFrom, Number(target.dataset.index));
        dragFrom = null;
      });
      list.addEventListener("dragend", () => {
        dragFrom = null;
        list.querySelectorAll(".is-dragging, .is-drop-target").forEach((el) => el.classList.remove("is-dragging", "is-drop-target"));
      });

      render();
      body.append(list);
    },
    trigger,
    { tall: true }
  );
}

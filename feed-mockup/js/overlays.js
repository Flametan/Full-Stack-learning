"use strict";

/* Popover (Dropdowns) und Bottom Sheet */

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
  const items = [...openPopoverState.panel.querySelectorAll('[role="menuitem"]')].filter(
    (item) => item.getClientRects().length > 0
  );
  if (!items.length) return;
  event.preventDefault();
  const current = items.indexOf(document.activeElement);
  const step = event.key === "ArrowDown" ? 1 : -1;
  items[(current + step + items.length) % items.length].focus();
}

let sheetTrigger = null;
let sheetOnClose = null;
let sheetCloseTimer;

function openSheet(title, buildBody, trigger, { onClose = null, tall = false } = {}) {
  clearTimeout(sheetCloseTimer);
  if (!dom.sheetLayer.hidden) sheetOnClose?.();
  sheetTrigger = trigger;
  sheetOnClose = onClose;
  dom.sheet.classList.toggle("sheet--tall", tall);
  dom.sheetTitle.textContent = title;
  dom.sheetBody.replaceChildren();
  dom.sheet.scrollTop = 0;
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
  if (sheetTrigger?.isConnected) sheetTrigger.focus();
  sheetTrigger = null;
}

function isSheetOpen() {
  return !dom.sheetLayer.hidden && dom.sheetLayer.classList.contains("is-open");
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
  const row = createButton("sheet-row");
  if (iconMarkup) {
    const icon = createElement("span", "sheet-row__icon");
    icon.innerHTML = iconMarkup;
    row.append(icon);
  }
  row.append(label);
  return row;
}

function openConfirmSheet({ title, text, confirmLabel, trigger, onConfirm }) {
  openSheet(
    title,
    (body) => {
      const lead = createElement("p", "sheet__lead", text);
      const confirm = createButton("button-primary button-primary--danger", confirmLabel);
      confirm.addEventListener("click", () => {
        sheetTrigger = null;
        closeSheet();
        onConfirm();
      });
      const cancel = createSheetRow("Abbrechen");
      cancel.classList.add("sheet-row--center");
      cancel.addEventListener("click", closeSheet);
      body.append(lead, confirm, cancel);
    },
    trigger
  );
}

const ICON_LINK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.3-3.3a4.5 4.5 0 0 0-6.4-6.4L12 5.6M14 10a4.5 4.5 0 0 0-6.4 0l-3.3 3.3a4.5 4.5 0 0 0 6.4 6.4l1.3-1.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_CHECK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_CHEVRON =
  '<svg class="sheet-row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_UPLOAD =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.8 17.5 5-5 4 4 2.5-2.5 4.9 4.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const ICON_CLOSE =
  '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_UP =
  '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_DOWN =
  '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_CAROUSEL =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 21H5.5A2.5 2.5 0 0 1 3 18.5V7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

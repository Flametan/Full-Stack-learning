/* © 2026 Fabian Flemig */

"use strict";

/* Darstellung der Beiträge je Plattform. Alle Ansichten nutzen dieselben data-action-Hooks,
   damit die Aktionen in feed.js für jede Plattform funktionieren. */

function cloneTemplate(id) {
  return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

function fillAccountHeader(article, post, platformId) {
  const ad = post.ad?.enabled === true;
  const age = postAgeHours(post);
  article.querySelectorAll('[data-field="avatar"]').forEach(fillAccountAvatar);
  fillFields(article, "username", accountLabel(platformId));
  fillFields(article, "age-short", formatAgeShort(age));
  fillFields(article, "age-long", formatAgeLong(age));
  article.querySelectorAll('[data-field="verified"]').forEach((icon) => {
    icon.style.display = ACCOUNT.verified ? "" : "none";
  });
  article.querySelectorAll("time").forEach((time) => {
    time.dateTime = isoTimeAgo(age);
  });
  article.setAttribute("aria-label", `${ad ? "Anzeige" : "Beitrag"} von ${accountLabel(platformId)}, ${formatAgeLong(age)}`);
  if (ad) {
    article.querySelectorAll(".post__cta, [data-ad-only]").forEach((el) => {
      el.hidden = false;
    });
    fillFields(article, "cta", post.ad.cta || "Mehr dazu");
  }
  return ad;
}

const PLATFORM_VIEWS = {
  instagram: {
    doubleTapLike: true,
    tapToPause: false,
    opensCommentSheet: false,
    commentsToggleLabel: (count, expanded) =>
      expanded ? "Weniger Kommentare anzeigen" : `Alle ${numberFormat.format(count)} Kommentare ansehen`,

    renderPost(post) {
      const article = cloneTemplate("post-template");
      const ad = fillAccountHeader(article, post, "instagram");
      fillFields(article, "location", ad ? "Gesponsert" : ACCOUNT.location);
      article.querySelector(".post__location").hidden = !ad && !ACCOUNT.location;

      const crop = settings.realisticCrop;
      const firstRatio = mediaRatio(post.media[0]);
      renderCarousel(article.querySelector(".post__media"), post, {
        frameRatio: crop ? feedFrameRatio(firstRatio, PLATFORMS.instagram) : firstRatio,
        cover: crop,
        dots: article.querySelector(".carousel__dots"),
      });
      renderCaption(article, post, { prefix: ACCOUNT.username });
      fillCommentList(article.querySelector(".comments__list"), post, { collapseAfter: VISIBLE_COMMENTS });
      return article;
    },

    refreshCounts(article, post, counts, postState) {
      fillFields(article, "likes", likesLabel(counts.likes));
      setPressed(article.querySelector('[data-action="like"]'), postState.liked, "Gefällt mir nicht mehr", "Gefällt mir");
      setPressed(article.querySelector('[data-action="save"]'), postState.saved, "Aus Gespeichert entfernen", "Speichern");
      updateCommentsToggle(article, post.id);
    },
  },

  tiktok: {
    doubleTapLike: true,
    tapToPause: true,
    opensCommentSheet: true,
    commentsToggleLabel: () => "",

    renderPost(post) {
      const article = cloneTemplate("tiktok-post-template");
      fillAccountHeader(article, post, "tiktok");
      fillFields(article, "sound", `Originalton – ${ACCOUNT.username}`);
      renderCarousel(article.querySelector(".post__media"), post, {
        frameRatio: null,
        cover: false,
        dots: article.querySelector(".carousel__dots"),
      });
      renderCaption(article, post);
      article.querySelector(".tt-zones").hidden = !settings.tiktokZones;
      return article;
    },

    refreshCounts(article, post, counts, postState) {
      fillFields(article, "likes-count", compactFormat.format(counts.likes));
      fillFields(article, "comments-count", compactFormat.format(counts.comments));
      fillFields(article, "saves-count", compactFormat.format(counts.saves));
      fillFields(article, "shares-count", compactFormat.format(counts.shares));
      setPressed(article.querySelector('[data-action="like"]'), postState.liked, "Gefällt mir nicht mehr", "Gefällt mir");
      setPressed(article.querySelector('[data-action="save"]'), postState.saved, "Aus Favoriten entfernen", "Zu Favoriten hinzufügen");
    },
  },

  facebook: {
    doubleTapLike: false,
    tapToPause: false,
    opensCommentSheet: false,
    commentsToggleLabel: (_, expanded) => (expanded ? "Weniger Kommentare anzeigen" : "Weitere Kommentare ansehen"),

    renderPost(post) {
      const article = cloneTemplate("fb-post-template");
      const ad = fillAccountHeader(article, post, "facebook");
      fillFields(article, "meta", ad ? "Gesponsert" : formatAgeShort(postAgeHours(post)));

      const media = article.querySelector(".post__media");
      if (post.media.length > 1) {
        renderCollage(media, post);
      } else {
        const crop = settings.realisticCrop;
        const ratio = mediaRatio(post.media[0]);
        renderCarousel(media, post, {
          frameRatio: crop ? feedFrameRatio(ratio, PLATFORMS.facebook) : ratio,
          cover: crop,
          dots: createElement("span"),
        });
        const open = createButton("media-open");
        open.dataset.action = "open-media";
        open.dataset.index = "0";
        open.setAttribute("aria-label", "Groß anzeigen");
        media.querySelector(".carousel__track").after(open);
      }
      if (ad) fillFields(article, "cta-text", resolveAccount(captionParagraphs(post)[0] ?? accountLabel("facebook")));
      renderCaption(article, post);
      fillCommentList(article.querySelector(".comments__list"), post, { collapseAfter: 1 });
      return article;
    },

    refreshCounts(article, post, counts, postState) {
      const reactions = article.querySelector(".fb-post__reactions");
      reactions.hidden = counts.likes === 0;
      let likesText = numberFormat.format(counts.likes);
      if (postState.liked) likesText = counts.likes === 1 ? "Du" : `Du und ${numberFormat.format(counts.likes - 1)} weitere Personen`;
      fillFields(article, "likes", likesText);
      fillFields(article, "comments-label", counts.comments ? `${numberFormat.format(counts.comments)} Kommentare` : "");
      fillFields(article, "shares-label", counts.shares ? `${numberFormat.format(counts.shares)}-mal geteilt` : "");
      article.querySelector(".fb-post__dot").hidden = !counts.comments || !counts.shares;
      setPressed(article.querySelector('.fb-action[data-action="like"]'), postState.liked, "Gefällt mir nicht mehr", "Gefällt mir");
      const save = article.querySelector('.menu-item[data-action="save"]');
      save.textContent = postState.saved ? "Aus Gespeichert entfernen" : "Beitrag speichern";
      save.setAttribute("aria-pressed", String(postState.saved));
      updateCommentsToggle(article, post.id);
    },
  },
};

# Feed-Simulation

Eigenständiges Mockup mobiler Social-Media-Feeds zum Testen von Kampagnenmotiven, umschaltbar
zwischen Instagram, TikTok und Facebook. Vorbelegt mit den vier Motiven der Kampagne zur
Mehrfachverplanung im Zivil- und Katastrophenschutz. Reines HTML, CSS und JavaScript, ohne
Framework, ohne Build-Schritt und ohne Backend. Die Seite ist eine visuelle Simulation und keine
echte Seite von Instagram, TikTok oder Facebook.

## Starten

`index.html` direkt im Browser öffnen. Ein lokaler Server ist nicht nötig.

## Dateien

```
index.html          Grundgerüst, Werkzeugleiste, Kopf- und Navigationsleisten der drei Plattformen,
                    Profilansicht, Story-Viewer, Bildbetrachter, Vorlagen
styles.css          Layout, Komponenten, Plattform-Stile, Dunkelmodus (Farben als CSS-Variablen)
js/content.js       Inhalte (Begleittext, Kampagnenbeiträge, Kommentare) und Plattformvorgaben
js/utils.js         Hilfsfunktionen, DOM-Referenzen, Seitenverhältnisse, Laden von Bildern und Videos
js/storage.js       Speicherung im Browser (IndexedDB)
js/overlays.js      Dropdown-Menüs, Bottom Sheets, Symbole
js/feed.js          Beiträge: Datenmodell, gemeinsame Bausteine, Videosteuerung, Aktionen
js/platforms.js     Darstellung der Beiträge je Plattform
js/composer.js      Neuer Beitrag, Bearbeiten, Zuschnitt-Check, Textprüfung, Reihenfolge
js/views.js         Profilansicht je Plattform, Story-Vorschau, Bildbetrachter
js/settings.js      Einstellungen, Plattformwechsel, Simulationsmenü, Gerätegröße, Präsentation
js/app.js           Suche, Benachrichtigungen, Navigation, Export/Import, Einfügen, Uhrzeit, Start
images/             Die Kampagnenmotive, unverändert übernommen
```

Die Skripte sind klassische Skripte und keine ES-Module, weil Browser Module bei per Doppelklick
geöffneten Dateien blockieren. Sie teilen sich den globalen Gültigkeitsbereich und werden in der
Reihenfolge aus `index.html` geladen.

## Plattformen

Umschalten über die Werkzeugleiste (Desktop), das Simulationsmenü („Simulation“ oben auf jeder
Plattform) oder die Einstellungen. Beiträge, Likes, Kommentare und Einstellungen bleiben beim
Wechsel dieselben.

- Instagram: Feed mit Story-Leiste, Karussell, Like per Doppeltippen, Kommentare unter dem Beitrag
- TikTok: Vollbild-Feed im Hochformat, der pro Beitrag einrastet; Seitenleiste mit Likes,
  Kommentaren, Favoriten und Teilen; Kommentare in einem eigenen Panel; Tippen pausiert Videos,
  Doppeltippen liked; mehrere Bilder als Fotobeitrag; optional eingeblendete verdeckte Bereiche
- Facebook: Text über dem Bild, mehrere Fotos als Collage mit „+N“, Bildbetrachter beim Antippen,
  Reaktionszeile, Aktionsleiste und Kommentare als Sprechblasen, Eingabezeile und Story-Karten

## Funktionen

Beiträge
- Bilder, Videos und Screenshots über das Plus (bzw. „Was machst du gerade?“) hinzufügen,
  hineinziehen oder mit Strg+V (Mac: Cmd+V) einfügen
- Mehrere Dateien als einzelne Beiträge oder als ein Beitrag (Karussell, Fotobeitrag, Collage)
- Videos laufen stumm, sobald sie sichtbar sind; der Ton lässt sich einschalten
- Zuschnitt-Check pro Datei für alle drei Plattformen, Verlust im Profilraster der aktiven
  Plattform, markierter Ausschnitt und wählbarer Bildausschnitt
- Prüfung der Bildunterschrift: Zeichen und Hashtags für alle drei Plattformen, Vorschau des
  eingeklappten Texts der aktiven Plattform in Feedbreite
- Anzeigen-Variante mit „Gesponsert“ und Aktionsknopf
- Bearbeiten (Text, Beschreibungen, Ausschnitt, Anzeige, Likes, Alter), Sortieren, Löschen,
  „Alle löschen“ und Wiederherstellen der Kampagnenbeiträge

Ansichten
- Profilansicht je Plattform: Instagram-Raster (3:4), TikTok-Profil mit Raster (3:4) und
  Beispiel-Aufrufen, Facebook-Seite mit Titelbild und quadratischem Fotoraster
- Story-Vorschau (9:16) mit Bildern und Videos, Fortschritt, Pause und verdeckten Bereichen
- Dunkelmodus, Gerätegrößen (Desktop), Präsentationsmodus mit automatischem Scrollen (bei TikTok
  seitenweise) und Vollbild
- Statusleiste mit der aktuellen Uhrzeit

## Plattformvorgaben

Die Werte stehen in `js/content.js` unter `PLATFORMS` und `GENERAL`. Sie stammen aus gängigen
Social-Media-Leitfäden (Stand Oktober 2026), nicht aus offizieller Dokumentation:

- Instagram: Feed zwischen 3:4 und 1,91:1, Profilraster 3:4, Karussell bis 20 Dateien,
  bis 2.200 Zeichen, höchstens 5 Hashtags (seit Dezember 2025)
- TikTok: Vollbild 9:16, andere Formate erhalten Ränder; verdeckt bei 1080 × 1920 etwa 130 px oben,
  484 px unten, 140 px rechts und 44 px links; Profilraster 3:4; Fotobeitrag bis 35 Bilder;
  bis 4.000 Zeichen (einige Leitfäden nennen noch 2.200)
- Facebook: Feed zwischen 4:5 und 1,91:1; mobil sind ohne Aufklappen etwa 125 Zeichen sichtbar;
  bis 63.206 Zeichen; Collage-Anordnung für 2, 3, 4 und 5 oder mehr Fotos
- Storys: 9:16, oben und unten jeweils etwa 250 von 1920 Pixeln verdeckt (Wert von Instagram,
  für alle Plattformen verwendet)

Vereinfachungen: Kürzung der Bildunterschrift über die Zeilenzahl (Instagram und TikTok 2,
Facebook 3), unscharfer Hintergrund in Storys statt Farbverlauf, Format des ersten Bildes für alle
Bilder eines Instagram-Karussells, quadratisches Fotoraster bei Facebook, abgeleitete
Beispielzahlen für Aufrufe, Favoriten und geteilte Beiträge.

## Speicherung

Eigene Beiträge mit Bildern und Videos, Änderungen, Likes, Kommentare, gelöschte
Kampagnenbeiträge, Reihenfolge und Einstellungen werden im Browser gespeichert (IndexedDB,
Datenbank `feed-simulation`). Es wird nichts an einen Server übertragen.

- Die Daten gelten nur für diesen Browser auf diesem Gerät. Wer die Browserdaten löscht oder in
  einem privaten Fenster arbeitet, verliert sie. Export und Import (Profil-Panel bei Instagram
  oder Simulationsmenü) sichern eigene Beiträge einschließlich Videos als JSON-Datei.
- Große Videos belegen entsprechend viel Speicher im Browser und machen die Exportdatei groß.
- Welche Videoformate abspielbar sind, hängt vom Browser ab. MP4 (H.264) und WebM laufen in
  aktuellen Desktop-Browsern in der Regel, MOV- oder HEVC-Dateien teils nicht. Getestet wurde mit
  WebM in Chromium.
- Bietet der Browser kein IndexedDB, funktioniert die Seite weiter, Änderungen gehen dann aber
  beim Neuladen verloren.

Kopierte Links zeigen auf den jeweiligen Beitrag (`index.html#post-…`) und springen beim Öffnen
direkt dorthin.

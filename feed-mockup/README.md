# Feed-Simulation

Eigenständiges Mockup eines mobilen Social-Media-Feeds zum Testen von Kampagnenmotiven, hier mit
den vier Motiven der Kampagne zur Mehrfachverplanung im Zivil- und Katastrophenschutz. Reines
HTML, CSS und JavaScript, ohne Framework, ohne Build-Schritt und ohne Backend. Die Seite ist eine
visuelle Simulation und keine echte Instagram-Seite.

## Starten

`index.html` direkt im Browser öffnen. Ein lokaler Server ist nicht nötig.

## Dateien

```
index.html        Grundgerüst, Werkzeugleiste, Story-Leiste, Profilansicht, Story-Viewer, Vorlagen
styles.css        Layout, Komponenten, Dunkelmodus (Farben als CSS-Variablen)
js/content.js     Inhalte (Begleittext, Kampagnenbeiträge, Kommentare) und Instagram-Vorgaben
js/utils.js       Hilfsfunktionen, DOM-Referenzen, Seitenverhältnisse, Toast
js/storage.js     Speicherung im Browser (IndexedDB)
js/overlays.js    Dropdown-Menüs und Bottom Sheets
js/feed.js        Beiträge: Datenmodell, Darstellung, Karussell, Aktionen
js/composer.js    Neuer Beitrag, Bearbeiten, Zuschnitt-Check, Bildunterschrift-Prüfung, Reihenfolge
js/views.js       Profilansicht im Raster, Story-Vorschau
js/settings.js    Einstellungen, Dunkelmodus, Gerätegröße, Präsentationsmodus
js/app.js         Kopfzeile, Suche, Navigation, Export/Import, Einfügen, Uhrzeit, Start
images/           Die Kampagnenmotive, unverändert übernommen
```

Die Skripte sind klassische Skripte und keine ES-Module, weil Browser Module bei per Doppelklick
geöffneten Dateien blockieren. Sie teilen sich den globalen Gültigkeitsbereich und werden in der
Reihenfolge aus `index.html` geladen.

## Funktionen

Feed
- Like (auch per Doppeltippen), Kommentieren, Kommentare liken, Speichern, Teilen, Link kopieren,
  Melden, „Weniger Beiträge wie diesen“, Löschen
- Karussell-Beiträge mit Wischen, Pfeilen, Zähler und Punkten
- Anzeigen-Variante mit „Gesponsert“ und frei beschriftbarem Aktionsknopf
- Bildunterschrift wird wie im Feed auf zwei Zeilen mit „… mehr“ gekürzt und bei jeder Breite neu
  berechnet
- Statusleiste mit der aktuellen Uhrzeit

Neuer Beitrag (Plus in der unteren Leiste)
- Bilder auswählen, hineinziehen oder Screenshots mit Strg+V (Mac: Cmd+V) einfügen; Einfügen
  funktioniert überall auf der Seite und öffnet den Dialog
- Mehrere Bilder als einzelne Beiträge oder als ein Karussell (bis 20 Bilder)
- Zuschnitt-Check pro Bild: Format, ob und wie viel Instagram im Feed abschneidet, Verlust im
  Profilraster, markierter Ausschnitt in der Vorschau, wählbarer Bildausschnitt
- Prüfung der Bildunterschrift: Zeichenzahl, Zahl der Hashtags, Vorschau des eingeklappten Texts
  in Feedbreite und Zahl der ohne Aufklappen sichtbaren Zeichen
- Anzeigen-Optionen

Bearbeiten (Drei-Punkte-Menü)
- Bildunterschrift, Bildbeschreibungen, Bildausschnitt, Anzeige, Like-Zahl und Alter des Beitrags;
  bei eigenen Karussells auch Reihenfolge und Entfernen einzelner Bilder
- Gilt auch für die Kampagnenbeiträge

Weitere Ansichten
- Profilraster: Accountname oder Profilbild im Beitrag antippen, Profil-Symbol unten rechts oder
  „Profilraster“ in der Werkzeugleiste; Kacheln im Format 3:4
- Story-Vorschau: Kreis des Accounts in der Story-Leiste (alle Bilder des Feeds), „Als Story
  ansehen“ im Menü eines Beitrags oder „Story testen“ für beliebige Bilder, die nicht gespeichert
  werden; „Zonen“ blendet die von der Oberfläche verdeckten Bereiche ein
- Reihenfolge: Beiträge per Pfeil oder Ziehen sortieren

Einstellungen (Profil-Panel oben rechts oder Werkzeugleiste)
- Account: Profilbild, Benutzername, Name, Ort, Profiltext, Follower, Gefolgt, Verifizierung
- Darstellung: Dunkelmodus, Zuschnitt wie Instagram, Gerätegröße (nur am Desktop)
- Präsentation: automatisches Scrollen, Vollbild; der Präsentationsmodus blendet Werkzeuge und
  Hinweise aus und endet mit Esc oder über den Knopf oben rechts

Profil-Panel
- Eigene Beiträge exportieren und importieren (JSON mit eingebetteten Bildern)
- Alle Beiträge löschen und gelöschte Kampagnenbeiträge wiederherstellen

## Instagram-Vorgaben

Die Werte stehen in `js/content.js` unter `INSTAGRAM`. Sie stammen aus gängigen
Social-Media-Leitfäden (Stand Oktober 2026), nicht aus offizieller Dokumentation von Instagram:

- Feed: Seitenverhältnis zwischen 3:4 (Hochformat) und 1,91:1 (Querformat), was darüber
  hinausgeht, wird zugeschnitten
- Profilraster: Kacheln im Format 3:4
- Karussell: bis 20 Bilder; im Karussell gilt das Format des ersten Bildes für alle (vereinfacht)
- Bildunterschrift: bis 2.200 Zeichen, höchstens 5 Hashtags (seit Dezember 2025)
- Story: 9:16, oben und unten jeweils etwa 250 von 1920 Pixeln von der Oberfläche verdeckt

Die Kürzung der Bildunterschrift auf zwei Zeilen und der unscharfe Hintergrund in der Story bei
Bildern, die nicht 9:16 sind, sind Annäherungen an die App.

## Speicherung

Eigene Beiträge, Änderungen, Likes, Kommentare, gelöschte Kampagnenbeiträge, Reihenfolge und
Einstellungen werden im Browser gespeichert (IndexedDB, Datenbank `feed-simulation`). Es wird
nichts an einen Server übertragen.

- Die Daten gelten nur für diesen Browser auf diesem Gerät. Wer die Browserdaten löscht oder in
  einem privaten Fenster arbeitet, verliert sie. Export und Import im Profil-Panel sichern eigene
  Beiträge oder übertragen sie auf einen anderen Rechner.
- Bietet der Browser kein IndexedDB, funktioniert die Seite weiter, Änderungen gehen dann aber
  beim Neuladen verloren. Das Profil-Panel weist darauf hin.

Kopierte Links zeigen auf den jeweiligen Beitrag (`index.html#post-…`) und springen beim Öffnen
direkt dorthin.

# 12 · Le terminal intégré

> **Objectif :** utiliser la console cachée de Catlib pour **tester et déboguer** ton jeu pendant qu'il tourne : changer de scène, lire ou modifier des données, écrire des notes…

⬅️ [Données et sauvegardes](11-donnees-sauvegardes.md) · [Sommaire](../README.md) · ➡️ [Son, clavier, temps](13-son-clavier-temps.md)

---

## 1. Ouvrir et fermer

| Action | Touche |
|---|---|
| Ouvrir / fermer le terminal | **`&`** (touche `1` sur un clavier AZERTY) |
| Valider une commande | `Entrée` |
| Effacer un caractère | **`-`** (et non la touche retour arrière) |

Quand il est ouvert, le curseur devient un **curseur de texte** et l'écran affiche : le titre `terminal v2.0`, l'heure en haut à droite, 21 lignes d'historique, et la ligne de saisie avec une suggestion.

> [!NOTE]
> Il est lancé au démarrage par la commande `TERMINAL START`. Les touches `&` et `-` sont des **données** (`TERM.KEY.TOGGLE` et `TERM.KEY.BACK` dans `GAME`) : tu peux les changer.

## 2. Les touches du terminal

| Touche | Action |
|---|---|
| `↑` / `↓` | Parcourir les **suggestions** de commandes (et remonter dans l'historique). |
| `→` | **Accepter** la suggestion affichée. |
| `←` | **Rappeler** la dernière commande. |
| `-` | Effacer. |
| `&` | Ouvrir / fermer. |

> [!NOTE]
> Tu peux taper uniquement les caractères de la liste `ᗢ CORE keys` (lettres **minuscules**, chiffres, signes courants, espace). C'est la même liste que pour les codes de sauvegarde.

## 3. Les commandes

Un mot de commande, puis ses options. `<n>` = nom obligatoire, `[val]` = valeur facultative.

### Scènes ([chapitre 09](09-scenes-fondus.md))

| Commande | Effet |
|---|---|
| `SCENE SET <n>` | Va à la scène `<n>` |
| `SCENE BACK` | Revient à la scène précédente |
| `SCENE MAIN` | Retourne à la scène principale |
| `SCENE RESET` | Efface l'historique des scènes |

### Données ([chapitre 11](11-donnees-sauvegardes.md))

Valable avec **`GAME`**, **`CACHE`**, **`SAVE`** et **`CLOUD`** :

| Commande | Effet |
|---|---|
| `<SOURCE> SET <n> [val]` | Crée ou modifie |
| `<SOURCE> GET <n>` | Lit (la valeur va dans `〉DATA get output`) |
| `<SOURCE> ADD <n> <val>` | Ajoute un nombre |
| `<SOURCE> CREATE <n> [val]` | Crée si absent |
| `<SOURCE> UNSET <n>` | Supprime |
| `<SOURCE> RENAME <n> <newname>` | Renomme |
| `<SOURCE> CLEAR [chars]` | Supprime les noms contenant `chars` (tout si vide) |
| `<SOURCE> FIND [chars]` | Affiche les données dont le nom contient `chars` |

En plus : `SAVE IMPORT`, `SAVE EXPORT [RAW]`, `CLOUD SYNC`, `CLOUD SEND`.

Exemple : `GAME SET test hello` → le terminal répond `create {test} = hello`.

> [!NOTE]
> `GET` ne fait qu'enregistrer la valeur dans `〉DATA get output` : il **n'affiche rien**. Pour **voir** des données, utilise `FIND`.

### Notes

| Commande | Effet |
|---|---|
| `NOTE NEW <n> <contenu>` | Crée une note (le contenu peut contenir des espaces) |
| `NOTE OPEN <n>` | Affiche la note |
| `NOTE LIST` | Liste les notes |
| `NOTE DEL <n>` | Supprime la note |
| `HELP` | Affiche l'aide du terminal |

Les notes sont stockées dans `GAME` sous le nom `NOTE.<nom>`, avec leur date de dernière modification (`NOTE.<nom>.LAST_EDIT`). Dans un contenu de note, le caractère **`>`** est un **retour à la ligne**.

### Autres

| Commande | Effet |
|---|---|
| `FADE <scène> <vitesse1> <vitesse2> …` | Fondu vers une scène ([09](09-scenes-fondus.md)) |
| Toute commande de **ton module** | Voir [10](10-commandes-modules.md) |

> [!WARNING]
> L'autocomplétion propose aussi `SCENE GET <n>`, `ALERT NEW …` et (selon le projet) des commandes `SOUND`, mais **rien n'est branché derrière** dans ce fichier. Elles ne font donc rien. Voir [17](17-depannage.md).

## 4. Changer les touches du terminal

```text
〉DATA / source [GAME] action [SET] var [TERM.KEY.TOGGLE] to [t]
〉DATA / source [GAME] action [SET] var [TERM.KEY.BACK] to [<]
```
Ou dans le terminal : `GAME SET TERM.KEY.TOGGLE t`.

## 5. Écrire dans le terminal et le journal

- `ᗢ Core` possède le bloc `〉TERMINAL write / type [TYPE] prefix [PREFIX] text [TEXT]`, avec les types `FEEDBACK` (ligne de retour en retrait), `COMMENT`, `CODE` ou vide. Il n'existe **que dans Core**.
- Depuis un autre sprite, utilise la commande **`LOG`** ([chapitre 10](10-commandes-modules.md#la-commande-log)) : elle écrit dans la liste `〉LOGS`.
- `〉DEVLOG / new entry [TEXT] new version? [VERSION]` ajoute une entrée datée au **journal de développement** `〉DEVLOGS` (liste de Core).

## 6. Comment ça marche (pour les curieux)

- `Lib - TERMINAL` tourne en boucle : elle lit la **première touche** de la liste `〉PRESSED KEY` ([13](13-son-clavier-temps.md)), la compose dans le texte de saisie et gère les touches spéciales.
- `ᗢ Text` dessine les lignes avec le moteur de texte ([08](08-texte.md)).
- À l'entrée, le terminal regarde le premier mot : `CACHE`, `GAME`, `SAVE` ou `CLOUD` (hors `SEND`, `SYNC`, `EXPORT`, `IMPORT`, `FIND`) appelle directement `〉DATA` ; tout le reste passe par `〉CMD`.

---

⬅️ [Données et sauvegardes](11-donnees-sauvegardes.md) · [Sommaire](../README.md) · ➡️ [Son, clavier, temps](13-son-clavier-temps.md)

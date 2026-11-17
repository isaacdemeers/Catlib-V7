# 13 · Son, clavier, souris et temps

> **Objectif :** jouer des sons avec des volumes réglables (musique / effets), savoir quelles touches sont pressées, lire l'heure et la date.

⬅️ [Terminal](12-terminal.md) · [Sommaire](../README.md) · ➡️ [Outils TOOLS](14-tools.md)

---

## 1. Le son

### Un lecteur de son dans chaque sprite

Chaque sprite basé sur `Frame` possède **son propre lecteur** (`〉SOUND play` / `〉SOUND stop`). Les sons doivent donc être **dans le sprite** qui les joue.

```text
〉SOUND play / name [NAME] loop? [LOOP?] ( volume ) [VOL]
〉SOUND stop / name [NAME]
```

| Entrée | Rôle |
|---|---|
| `name` | Nom du son (dans les sons du sprite). |
| `loop?` | **Vide** : joué une fois. **Tout autre texte** (ex. `YES`) : joué **en boucle**. |
| `volume` | Voir ci-dessous. |

**Exemples**

```text
〉SOUND play / name [clic] loop? [] ( volume ) []          ← un effet sonore
〉SOUND play / name [theme] loop? [YES] ( volume ) [MUSIC]  ← musique en boucle
〉SOUND stop / name [theme]                                 ← arrêter
〉SOUND stop / name [ALL]                                   ← tout arrêter
```

### Le volume

| `volume` | Volume utilisé |
|---|---|
| **vide** | Le volume du **canal du sprite** (`SFX` par défaut). |
| un **nombre** (ex. `40`) | Exactement ce volume. |
| un **mot** (ex. `MUSIC`) | Le volume du canal `VOL.MUSIC`. |

### Les canaux de volume

Les volumes sont stockés dans les données **`GAME`** :

| Donnée | Rôle |
|---|---|
| `VOL.SFX` | Volume des **effets sonores** |
| `VOL.MUSIC` | Volume de la **musique** |
| `VOL.MASTER` | Volume « général » (créé par Catlib) |

Chaque sprite a une variable **`〉〉SOUND_SOURCE`** : le canal qu'il utilise par défaut. Elle vaut `SFX`. Pour un sprite « musique », mets `〉〉SOUND_SOURCE` à `MUSIC` dans `〉SELF init`.

### Changer le volume en jeu

```text
〉DATA / source [GAME] action [SET] var [VOL.MUSIC] to [50]
diffuser [ᗢ CATLIB - vol changed]
```

Le message `ᗢ CATLIB - vol changed` demande à **tous** les sprites de ré-appliquer leur volume (déjà branché dans `Frame`).

> [!WARNING]
> - Changer une donnée `VOL.xxx` **ne diffuse pas** tout seul le message : pense à le diffuser.
> - `VOL.MASTER` est enregistré mais, d'après le code, **n'est pas combiné automatiquement** avec les autres volumes : un sprite l'utilise seulement si son canal est `MASTER`.
> - `〉SOUND stop` **n'interrompt pas** un son déjà lancé : il empêche seulement la **boucle de repartir** (le son en cours finit son tour).

## 2. Le clavier

### Lancer la lecture

La commande **`KEY START`** démarre une boucle qui surveille les touches. Elle est lancée **automatiquement** au démarrage.

### La liste `〉PRESSED KEY`

Elle contient **les touches actuellement enfoncées**, la plus récente **en premier** (position 1).

```text
si < 〉PRESSED KEY contient [d] ? > alors
    〉MOVE add / xy [3] []

si < (élément 1 de 〉PRESSED KEY) = [space] > alors  ← la dernière touche appuyée
```

Quand une touche est relâchée, elle est retirée de la liste.

### Touches surveillées

La liste `ᗢ CORE keys` (75 entrées) : lettres `a–z`, chiffres `0–9`, signes (`& é # " ' { ( [ à è _ ç @ ) ] } < > ! : / ; . ? , % - * + $ = ~`), l'espace, `enter`, `space` et les 4 flèches (`left arrow`, `right arrow`, `up arrow`, `down arrow`).

> [!TIP]
> Utiliser `〉PRESSED KEY` plutôt que `touche pressée ?` te permet de savoir **toutes** les touches pressées en même temps, et laisse le terminal capter les frappes sans conflit.

## 3. La souris

Position, clic et survol : voir [06 · Curseur](06-curseur.md) (`〉CURSOR x`, `〉CURSOR y`, `〉CURSOR clicked ?`, `〉CURSOR hovering ?`).

## 4. Le temps

| Variable | Contenu | Exemple |
|---|---|---|
| `〉TIME clock` | Heure `HH:MM`. Les deux-points **clignotent** (un espace une seconde sur deux). | `01:28` / `01 28` |
| `〉TIME date` | Date `MM/JJ/AAAA`. | `11/16/2026` |
| `ᗢ CLOCK` | Horloge interne : `+0.1` à chaque image. Sert aux identifiants et au clignotement. | `155.3` |

Pour lire `ᗢ CLOCK` depuis un autre sprite : `(ᗢ CLOCK) de (ᗢ Core)`.

---

⬅️ [Terminal](12-terminal.md) · [Sommaire](../README.md) · ➡️ [Outils TOOLS](14-tools.md)

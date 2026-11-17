
# 13 · Sound, Keyboard, Mouse, and Time

> **Objective:** Play sounds with adjustable volumes (music / effects), find out which keys are pressed, and read the time and date.

⬅️ [Terminal](12-terminal.md) · [Table of Contents](../README.md) · ➡️ [TOOLS Tools](14-tools.md)

---

## 1. Sound

### A sound player in each sprite

Each sprite based on `Frame` has **its own player** (`〉SOUND play` / `〉SOUND stop`). Sounds must therefore be **inside the sprite** that plays them.

```text
〉SOUND play / name [NAME] loop? [LOOP?] ( volume ) [VOL]
〉SOUND stop / name [NAME]
```

| Input | Role |
|---|---|
| `name` | Sound name (in the sprite's sounds). |
| `loop?` | **Empty:** played once. **Any other text** (e.g. `YES`): played **in a loop**. |
| `volume` | See below. |

**Examples**

```text
〉SOUND play / name [click] loop? [] ( volume ) []          ← a sound effect
〉SOUND play / name [theme] loop? [YES] ( volume ) [MUSIC]  ← looping music
〉SOUND stop / name [theme]                                 ← stop
〉SOUND stop / name [ALL]                                   ← stop everything
```

### Volume

| `volume` | Volume used |
|---|---|
| **empty** | The **sprite channel's** volume (`SFX` by default). |
| a **number** (e.g. `40`) | Exactly that volume. |
| a **word** (e.g. `MUSIC`) | The volume of the `VOL.MUSIC` channel. |

### Volume channels

Volumes are stored in the **`GAME`** data:

| Data | Role |
|---|---|
| `VOL.SFX` | **Sound effects** volume |
| `VOL.MUSIC` | **Music** volume |
| `VOL.MASTER` | "Master" volume (created by Catlib) |

Each sprite has a **`〉〉SOUND_SOURCE`** variable: the channel it uses by default. Its value is `SFX`. For a "music" sprite, set `〉〉SOUND_SOURCE` to `MUSIC` in `〉SELF init`.

### Changing the volume during the game

```text
〉DATA / source [GAME] action [SET] var [VOL.MUSIC] to [50]
diffuser [ᗢ CATLIB - vol changed]
```

The `ᗢ CATLIB - vol changed` message asks **all** sprites to reapply their volume (already wired up in `Frame`).

> [!WARNING]
> - Changing a `VOL.xxx` data value does **not automatically broadcast** the message: remember to broadcast it.
> - `VOL.MASTER` is stored but, according to the code, **is not automatically combined** with the other volumes: a sprite only uses it if its channel is `MASTER`.
> - `〉SOUND stop` does **not interrupt** a sound that has already started: it only prevents the **loop from starting again** (the current playback finishes).

## 2. Keyboard

### Starting input detection

The **`KEY START`** command starts a loop that monitors the keys. It is started **automatically** at startup.

### The `〉PRESSED KEY` list

It contains **the keys currently held down**, with the most recently pressed **first** (position 1).

```text
if < 〉PRESSED KEY contains [d] ? > then
    〉MOVE add / xy [3] []

if < (item 1 of 〉PRESSED KEY) = [space] > then  ← the most recently pressed key
```

When a key is released, it is removed from the list.

### Monitored keys

The `ᗢ CORE keys` list (75 entries): letters `a–z`, numbers `0–9`, symbols (`& é # " ' { ( [ à è _ ç @ ) ] } < > ! : / ; . ? , % - * + $ = ~`), space, `enter`, `space`, and the 4 arrow keys (`left arrow`, `right arrow`, `up arrow`, `down arrow`).

> [!TIP]
> Using `〉PRESSED KEY` instead of `key pressed?` lets you detect **all** keys pressed at the same time, while allowing the terminal to capture keystrokes without conflict.

## 3. Mouse

Position, clicks, and hovering: see [06 · Cursor](06-curseur.md) (`〉CURSOR x`, `〉CURSOR y`, `〉CURSOR clicked ?`, `〉CURSOR hovering ?`).

## 4. Time

| Variable | Contents | Example |
|---|---|---|
| `〉TIME clock` | Time `HH:MM`. The colon **blinks** (a space appears every other second). | `01:28` / `01 28` |
| `〉TIME date` | Date `MM/DD/YYYY`. | `11/16/2026` |
| `ᗢ CLOCK` | Internal clock: increases by `+0.1` every frame. Used for identifiers and blinking. | `155.3` |

To read `ᗢ CLOCK` from another sprite: `(ᗢ CLOCK) of (ᗢ Core)`.

---

⬅️ [Terminal](12-terminal.md) · [Table of Contents](../README.md) · ➡️ [TOOLS Tools](14-tools.md)


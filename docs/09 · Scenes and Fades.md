
# 09 · Scenes and Fades

> **Objective:** organize your game into "screens" (menu, game, options, etc.) and switch between them, with a fade transition if you want.

⬅️ [Text](08-texte.md) · [Table of Contents](../README.md) · ➡️ [Commands and Modules](10-commandes-modules.md)

---

## 1. What is a scene?

A **scene** is a "screen" in your game: `MENU`, `GAME`, `OPTIONS`, `GAMEOVER`… Each one has its own **name** (a single word, **without spaces**). Catlib stores the current scene in the **`〉SCENE`** variable and broadcasts a message whenever it changes.

This system keeps things organized: each screen responds to **its own** message and only handles its own objects.

## 2. Changing scenes

We use a **command** (see [10 · Commands](10-commandes-modules.md)):

```text
〉CMD / name [SCENE] option [SET] args [GAME] [] [] awaited? [NO]
```

Or, in the terminal: `SCENE SET GAME`.

| Command | Effect |
|---|---|
| `SCENE SET <name>` | Switches to the `<name>` scene. The previous scene is saved. |
| `SCENE BACK` | Returns to the **previous** scene. |
| `SCENE MAIN` | Returns to the **main** scene and clears the history. |
| `SCENE SETMAIN <name>` | Sets the main scene. |
| `SCENE RESET` | Clears the history but keeps the current scene. |

A scene change:

1. saves the previous scene in the `ᗢ CORE scenes` list;
2. updates `〉SCENE`;
3. writes a message to the terminal;
4. broadcasts `ᗢ SCENE new`;
5. broadcasts **`SCENE <name>`** (unless you add `NO` immediately after the name: `SCENE SET GAME NO`).

> [!NOTE]
> If you request a scene that is **identical to the current scene**, or an **empty** scene, nothing happens.

## 3. Building a scene

For each scene, your objects respond to the **`SCENE <name>`** message to **spawn**, and **delete themselves** when the scene changes:

```text
when I receive [SCENE GAME]
create a clone of [myself]

〉SELF on tick :
    if not < 〉SCENE = [GAME] > then
        〉SELF kill
    … your logic …
    〉UPDATE normal
```

> [!TIP]
> This check ("if the scene is no longer mine, I disappear") is the safest way to clean things up. For the UI, this happens automatically thanks to `visible on scene` ([07](07-ui.md)).

### Warning: the STOP message

Catlib also broadcasts `SCENE <name> STOP` whenever a scene changes. According to the code, this message contains the name of the **new** scene (not the previous one). To detect when a scene is being left, **compare `〉SCENE` on every tick** as shown above, rather than using this message.

## 4. Fades: the `FADE` module

The **`ᗢ Fader +`** sprite adds the `FADE` command, which darkens the screen, **changes scenes at the darkest point**, and then brightens the screen again.

```text
FADE <SCENE_NAME> [FADE_IN_SPD] [FADE_OUT_SPD] [WAIT_IN] [WAIT_OUT]
```

| Parameter | Purpose |
|---|---|
| `SCENE_NAME` | The scene to switch to. |
| `FADE_IN_SPD` | Darkening speed (e.g. `20`). Higher = faster. |
| `FADE_OUT_SPD` | Brightening speed (e.g. `20`). |
| `WAIT_IN` | Waiting time in seconds **before** the scene change (black screen). |
| `WAIT_OUT` | Waiting time in seconds **before** starting to brighten the screen. |

**Example:**
```text
〉CMD / name [FADE] option [GAME] args [20 20] [0.5] [] awaited? [NO]
```
(`name` = `FADE`, `option` = scene name, followed by the values separated by spaces.)

Sequence: screen darkens in 20% increments → wait for `WAIT_IN` → **`SCENE SET GAME`** → wait for `WAIT_OUT` → screen brightens → done.

> [!NOTE]
> The block comment in `ᗢ Fader +` indicates default values of `-20` and `20`, but the code does not apply them automatically: **always provide explicit values**, for example `20 20`. The terminal autocomplete writes the same command as follows: `FADE <n> <showtime> <hidetime> [actiondelay] [fadedelay]`.

The fade uses the sprite's `BLACK` costume, which covers the entire screen.

## 5. First startup and logo

At startup, `Config - CHECK USER` compares your Scratch username with the `〉USER` variable:

- **Different** (new user): `〉USER` is updated, the `ᗢ CATLIB - first start` message is broadcast, and the requested scene is the **first startup** scene (`LOGO`).
- **Identical**: the `MENU` scene is requested.

The `INTRO V12` sprite then plays its logo animation and requests `SCENE SET MENU`. To use your own logo, delete `INTRO V12` and send the `SCENE SET MENU` command yourself at the end.

> [!TIP]
> The `ᗢ CATLIB - first start` message is perfect for triggering a **tutorial** specifically for new players.

## 6. Quick reference

| ✅ Do | ❌ Avoid |
|---|---|
| Use **single-word** scene names (`GAME`, `OPTIONS`) | Spaces in scene names (words are separated by spaces in commands) |
| Use **distinct** names that do not contain one another | Using `GAME` and `GAME2` together |
| Clean up your objects when changing scenes | Leaving clones from one scene in the next |
| Use `FADE` with explicit speed values | Using `FADE` without speed values |

---

⬅️ [Text](08-texte.md) · [Table of Contents](../README.md) · ➡️ [Commands and Modules](10-commandes-modules.md)
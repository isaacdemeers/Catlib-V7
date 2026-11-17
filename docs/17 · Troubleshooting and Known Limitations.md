# 17 · Troubleshooting and Known Limitations

> **Objective:** Resolve common issues and understand which parts of the code require attention.

⬅️ [Quick Reference](16-reference-rapide.md) · [Table of Contents](../README.md) · ➡️ [Glossary and Versions](18-glossaire-versions.md)

---

## 1. Frequently Asked Questions

### My object is invisible
- `〉SELF init` sets `〉FX ghost` to `100` by default (invisible). Call `〉FX ghost / val [0] speed [5]`.
- Is the costume being used `Icon` or `_BLANK`? These are technical costumes (empty or hidden).
- Has the clone actually been created (`create clone of myself`)?
- In stamp mode, `〉SELF stamp` must be called **on every frame**.

### My object always returns to the center
You kept the **example script** from `Frame` (`when I start as a clone` + `forever` with `〉MOVE bounce` toward `0 0`). Delete it ([03 §7](03-frame.md#7-le-script-dexemple-dans-frame-à-supprimer-)).

### My object does not move / moves suddenly
- The `〉MOVE` / `〉SIZE` / `〉ROTATE` blocks must be called **on every frame**, inside `〉SELF on tick`.
- `〉UPDATE normal` (or `camera`) must be called **afterward**, to apply the result.
- `damp = 1` is instant: increase it.

### My text does not stay displayed
Core clears the pen on every frame: call `〉WRITE` **on every frame** in a `when I receive ᗢ CATLIB - tick` script ([08](08-texte.md)).

### My `〉CMD` command does nothing
- The **name** must match the module name exactly (`〉MODULE set name`). A typo means nothing happens, with no message.
- No **spaces** in an argument (spaces separate words).
- Only one command is processed **per frame**: wait a moment.

### My UI button does not appear
- Does the scene name in `visible on scene` exactly match `〉SCENE`?
- Do the required costumes and sounds exist **in the `ᗢ UI` sprite**?
- Did you write `type [BUTTON]` for a clickable button?
- Is the creation script inside `ᗢ UI`?

### I see multiple cursors
The cursor is cloned every time you enter `SCENE MENU` ([06 §4](06-curseur.md#4-quand-apparaît-le-curseur-)).

### The terminal does not open
- Try the **`&`** key (the `1` key on an AZERTY keyboard).
- The opening key is the `GAME` data: `TERM.KEY.TOGGLE`. It must be included in the list of keys in `ᗢ CORE keys`.
- `TERMINAL START` must have been sent (this is done in `Config - WHEN READY COMMANDS`).

### The game is slow
- Use **TurboWarp**.
- Prefer **stamp mode** (`〉SELF stamp`, `STAMP? [YES]`) over large numbers of visible clones.
- Avoid creating many clones without deleting them (`〉SELF kill`).
- Avoid extremely large layer numbers ([03 §5](03-frame.md#5-les-calques-ordre-daffichage)).

### My pen drawing disappears
This is normal: Core runs `clear all` on every frame ([02](02-fonctionnement.md)).

### Cloud does not work
It only works on the **official Scratch website**, when logged in, and the value must remain short and numeric ([11 §5](11-donnees-sauvegardes.md#5-le-cloud)).

---

## 2. Known Limitations and Points to Watch

> [!IMPORTANT]
> These points come from **reading the code** (the project was not run to confirm them). They do not break normal use of Catlib, but it is worth knowing about them. Each point includes a **fix** where possible.

### 🔴 High-priority fixes

**1. `SAVE IMPORT` does not appear to write to `ᗢ DATA save`.**

In `Func - IMPORT instant` (sprite `ᗢ Core`), the final part copies the decrypted data if the source is **`GAME`**. However, the terminal calls the import with the source **`SAVE`**: neither of the two branches (`CLOUD`, `GAME`) is executed.

*Fix:* In this block, replace `GAME` with `SAVE` in the second `if`.

**2. Save key generation can get stuck.**

In `Core - GEN KEY`, if the calculated key has **more than 11** digits, it is truncated to 10; otherwise, random digits are added **until it has exactly 10**. If the key has **exactly 11** digits, neither condition applies: the loop keeps adding digits without ever reaching 10, and the block (without screen refresh) **never finishes**. Depending on the Scratch pseudocode and random draw, a quick simulation shows that this case can occur regularly.

*Fix:* Replace the `length > 11` condition with `length > 10`.

### 🟡 Good to know

**3. `〉CURSOR speed x` is never updated.** As a result, `〉SIZE+ mouse speed` and `〉ROTATE+ mouse speed` have no effect. Fix: [06 §5](06-curseur.md#5-alimenter-la-vitesse-de-la-souris).

**4. Camera direction.** The `DEMO` comment describes `render = x − (cam × mirror)`, whereas the `〉UPDATE camera` block calculates `x + (cam ÷ mirror)`. In `origin [CAMERA]` mode, the camera offset is also added **twice** in the formula. Test it visually and choose `mirror` accordingly ([05](05-camera.md)).

**5. `SCENE <name> STOP` message.** It is broadcast with the name of the **new** scene. To detect when leaving a scene, compare `〉SCENE` on every tick ([09](09-scenes-fondus.md)).

**6. Commands offered but not connected.** The terminal autocomplete suggests `SCENE GET <n>` and `ALERT NEW <sprite> [sound]`: no code handles them. There are also `SOUND PLAY / LOOP / STOP` lines in Core that are not attached to any hat block (they never execute). Use `〉SOUND play` in sprites ([13](13-son-clavier-temps.md)).

**7. The cursor is cloned every time `SCENE MENU` is entered** ([06 §4](06-curseur.md#4-quand-apparaît-le-curseur-)).

**8. `〉DATA` in `Frame` sprites does not have `ADD` for `GAME`.** Use `GET` then `SET`, or go through `〉CMD / name [GAME] option [ADD] …` (Core version).

**9. Text and camera.** By default, text does not follow the camera ([08 §6](08-texte.md#6-suivre-la-caméra)). Only one font (`default`) is provided, in white, with uppercase letters drawn the same way as lowercase letters.

**10. `VOL.MASTER` is not applied automatically** ([13](13-son-clavier-temps.md)).

**11. `Config - CHECK USER`** ignores its “normal scene” parameter: during normal use, the requested scene is always `MENU`.

**12. `FADE`:** the default values mentioned in the block comment are not applied; always provide the speeds. `awaited?` does not wait for the fade to finish.

**13. Test data in the file:** notes, example values in `ᗢ DATA save`, old codes in `〉SAVECODES`, username in `〉USER`. Clean these up before publishing.

**14. Save system:** only a 75-character character set, with no distinction between uppercase and lowercase ([11 §4](11-donnees-sauvegardes.md#4-les-codes-de-sauvegarde-safe-code)).

**15. Names kept as they are:** `UPADTE CAM` and `〉FX pixalate` contain typos; the documentation uses the actual names so you can find them.

**16. Unused elements:** the `ᗢ - CATLIB init` message, two variables `TOOL #2` / `TOOL ##2` on the stage, and the `ᗢ Thumbnail` sprite if you do not use a stop thumbnail.

---

⬅️ [Quick Reference](16-reference-rapide.md) · [Table of Contents](../README.md) · ➡️ [Glossary and Versions](18-glossaire-versions.md)
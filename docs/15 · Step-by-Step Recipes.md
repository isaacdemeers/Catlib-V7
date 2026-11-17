
# 15 · Step-by-Step Recipes

> **Objective:** Follow these mini-tutorials in order to build practical things. Each recipe uses concepts from the previous chapters.

⬅️ [TOOLS Tools](14-tools.md) · [Table of Contents](../README.md) · ➡️ [Quick Reference](16-reference-rapide.md)

> [!NOTE]
> The scripts below are **examples written for this documentation**, based on Catlib blocks. They are provided as pseudocode: you must assemble them using the actual blocks.

---

## Recipe 1: My First Object

**Goal:** A ball that follows the mouse while bouncing, visible only in the `GAME` scene.

1. Right-click `Frame` → **duplicate**. Rename the copy `Balle`.
2. *Costumes* tab: draw a circle (keep `Icon` and `_BLANK`).
3. **Delete** the example script `when I start as a clone / forever` ([03 §7](03-frame.md#7-le-script-dexemple-dans-frame-à-supprimer-)).
4. Complete `〉SELF init`:

```text
DEFINE 〉SELF init
    〉MOVE set / xy [0] [0]
    〉SIZE set / val [40]
    〉SELF set layer / layer [100]
    〉FX ghost / val [100] speed [1]
    show
```

5. Complete `〉SELF on tick`:

```text
DEFINE 〉SELF on tick
    if not < 〉SCENE = [GAME] > then
        〉SELF kill
    〉FX ghost / val [0] speed [5]
    〉MOVE bounce / xy [〉CURSOR x] [〉CURSOR y] damp [6] bounciness [2]
    〉UPDATE normal
```

6. Add the creation event:

```text
when I receive [SCENE GAME]
create clone of [myself]
```

7. 🏁 Start the game, press `&` and type `SCENE SET GAME`. The ball appears with a fade-in and follows the mouse.

> [!WARNING]
> **The ball doesn't appear?** Check that your costume isn't `Icon` or `_BLANK`, that `〉FX ghost` is moving toward `0`, and that you deleted the example script.

---

## Recipe 2: A Menu with a Button and a Fade

**Goal:** A "PLAY" button in `MENU` that transitions to `GAME` with a fade.

1. In `ᗢ UI`, add the costumes `PLAY_IDLE`, `PLAY_HOVER`, `PLAY_CLICK` (keep the `HOVER` and `CLICK` sounds).
2. In `ᗢ UI`:

```text
when I receive [SCENE MENU]
〉UI new / name [play] / xy [0] [-40] start offset [0] [-80] / size [30] size offset [-20]
    / visible on scene [MENU] OR hide on scene []
    / idle sprite [PLAY_IDLE] hover sprite [PLAY_HOVER] click sprite [PLAY_CLICK]
    / hover sfx [HOVER] click sfx [CLICK]
    / type [BUTTON] action [FADE] value [GAME]

DEFINE 〉UI on click
    if < 〉UI action = [FADE] > then
        〉CMD / name [FADE] option [〉UI value] args [20 20] [0.2] [] awaited? [NO]
```

3. Start the game: the button bounces into view, reacts to hovering, and clicking it starts the fade to `GAME`; the button disappears because the scene is no longer `MENU`.

See [07 · UI](07-ui.md) and [09 · Scenes and Fades](09-scenes-fondus.md).

---

## Recipe 3: A Camera That Follows the Player

**Goal:** A camera that follows the `Joueur` sprite with a slight delay, and a background that moves along with it.

1. In `ᗢ Camera`, modify `UPADTE CAM`:

```text
DEFINE UPADTE CAM
    〉SIZE set / val [100]
    〉MOVE bounce / xy [(x position) of [Joueur]] [(y position) of [Joueur]] damp [8] bounciness [2]
```

2. In your **background** (duplicated from `Frame`), replace the following in `〉SELF on tick`:

```text
〉UPDATE normal   →   〉UPDATE camera / origine [] mirror [1]
```

3. Test it. If the background moves in the **wrong direction**, set `mirror` to `-1` (or give the camera the opposite position; see [05](05-camera.md)).
4. Keep the **interface** (score, lives) on `〉UPDATE normal` so it stays fixed.

---

## Recipe 4: Displaying a Score with Leading Zeros

**Goal:** `SCORE 000042` in the top-left corner, updating automatically.

1. When the game is created, initialize: `〉DATA / source [SAVE] action [CREATE] var [SCORE] to [0]`.
2. When the player earns points: `〉DATA / source [SAVE] action [ADD] var [SCORE] to [10]`.
3. In `ᗢ Text`:

```text
when I receive [ᗢ CATLIB - tick]
if < 〉SCENE = [GAME] > then
    〉DATA / source [SAVE] action [GET] var [SCORE] to []
    〉TOOL Text normalize / val [〉DATA get output] target len. [6]
    〉WRITE at [-230] [165] ALIGN [l] HSL [0] [0] [100] SIZE [2]
            TEXT [(join [SCORE ] 〉TOOL Text normalize output)]
            GROUP [] TYPE [] FONT [] SPACING ( 4 + [0] ) STAMP? [YES] SCREEN VFX? [NO]
```

See [08 · Text](08-texte.md) and [14 · TOOLS](14-tools.md).

---

## Recipe 5: Saving and Loading with a Code

**Goal:** Two buttons, "SAVE" and "LOAD".

**Save** (inside a `〉UI on click`):

```text
〉DATA / source [SAVE] action [SET] var [SN] to [Alex]       ← name displayed in the code header
〉CMD / name [SAVE] option [EXPORT] args [] [] [] awaited? []
show the list [〉SAVECODES]
```

The player copies the first line in the list (the most recent one).

**Load**:

```text
〉CMD / name [SAVE] option [IMPORT] args [] [] [] awaited? []
```

An input box opens; the player pastes their code.

> [!WARNING]
> Check the **"SAVE IMPORT"** item in [17 · Known Limitations](17-depannage.md) before relying on loading, and keep the **character restrictions** in mind ([11 §4](11-donnees-sauvegardes.md#4-les-codes-de-sauvegarde-safe-code)).

---

## Recipe 6: Creating Your Own Command

**Goal:** A `COIN ADD <n>` command that can be used from any sprite.

1. Duplicate `Extension`, rename it `Module COIN`.
2. Replace `〉MODULE set name / name [// CHANGE //]` with `〉MODULE set name / name [COIN]`.
3. Fill in `ᗢ MODULE actions`:

```text
DEFINE ᗢ MODULE actions
    〉MEMORY / get [2]
    if < ᗢ CORE memory = [ADD] > then
        〉MEMORY / get [3]
        〉DATA / source [SAVE] action [ADD] var [COINS] to [ᗢ CORE memory]
```

4. Use it anywhere: `〉CMD / name [COIN] option [ADD] args [5] [] [] awaited? [NO]`.
5. Check in the terminal: `COIN ADD 5`, then `SAVE FIND COINS`.

See [10 · Commands and Modules](10-commandes-modules.md#6-créer-tes-propres-commandes-avec-extension).

---

## Recipe 7: A Logo That Reacts to the Mouse

**Goal:** A logo that floats and moves slightly in the opposite direction to the mouse.

```text
DEFINE 〉SELF init
    〉MOVE set / xy [0] [20]
    〉SIZE set / val [60]
    〉FX ghost / val [100] speed [1]
    show

DEFINE 〉SELF on tick
    〉FX ghost / val [0] speed [6]
    〉MOVE+ parallax / damp [30] for [XY]
    〉MOVE bounce / xy [0] [20] damp [3] bounciness [2]
    〉UPDATE normal
```

The **larger** `damp` is, the less the object moves. Try `15` (strong movement) and `60` (subtle movement). To make the **size** or **tilt** react too, first feed in the mouse speed ([06 §5](06-curseur.md#5-alimenter-la-vitesse-de-la-souris)).

---

⬅️ [TOOLS Tools](14-tools.md) · [Table of Contents](../README.md) · ➡️ [Quick Reference](16-reference-rapide.md)


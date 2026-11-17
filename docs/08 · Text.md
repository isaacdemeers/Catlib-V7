
# 08 · Text engine

> **Goal:** display text on screen with the `〉WRITE` block: alignment, size, brightness, curved-screen effect, and even your own fonts.

⬅️ [UI Builder](<07 · UI.md>) · [Index](../README.md) · ➡️ [Scenes and fades](<09 · Scenes and Fades.md>)

---

## 1. The principle

Scratch doesn't display "free" text on screen. Catlib does it by **drawing each letter**: one letter = one **costume** of the `ᗢ Text` sprite. The `〉WRITE` block places the letters one by one, side by side.

This sprite contains **102 costumes**: 99 characters of the `default` font and 3 technical costumes (`Icon`, `_BLANK`, `_BLACK`).

> [!IMPORTANT]
> `〉WRITE` is defined **in the `ᗢ Text` sprite**. So write your text display scripts **in that sprite**.

## 2. The `〉WRITE` block

```text
〉WRITE at [X] [Y] ALIGN [ALIGN] HSL [COLOR] [OPACITY] [BRIGHT] SIZE [SIZE]
        TEXT [TEXT] GROUP [GROUP] TYPE [TYPE] FONT [FONT]
        SPACING ( 4 + [SPACING] ) STAMP? [STAMP] SCREEN VFX? [SCREENVFX]
```

| Input | Role | Values |
|---|---|---|
| `X`, `Y` | Text position. | scene coordinates |
| `ALIGN` | Alignment relative to `X`. | `l` (left), `c` (center), `r` (right) |
| `COLOR` | **Color** effect (hue). | `0` to `200` |
| `OPACITY` | **Ghost** effect: careful, `0` = **opaque**, `100` = invisible. | `0` to `100` |
| `BRIGHT` | **Brightness** effect. | `-100` to `100` |
| `SIZE` | Font size (the sprite size is `10 × SIZE` %). | `2` = title, `1.6` = small text |
| `TEXT` | The text to display. | text or number |
| `GROUP` | Group option. `AUTOSIZE` reduces the size when the text exceeds 4 characters. | empty or `AUTOSIZE` |
| `TYPE` | Free label, stored in the variable `ᗢ TEXT type`. | free |
| `FONT` | Font name. **Empty** = `default`. | see §5 |
| `SPACING ( 4 + n )` | Space between letters: letter width = `(4 + n) × SIZE`. | `0` = normal |
| `STAMP?` | `YES`: stamped with the pen (fast, **recommended**). Otherwise: one clone per letter. | `YES` / `NO` |
| `SCREEN VFX?` | `YES`: applies the **curved-screen effect** (see §4). | `YES` / `NO` |

> [!NOTE]
> The input group is called `HSL` in the block, but they are actually Scratch's **color**, **ghost** and **brightness** effects. The `default` font is drawn in **white**: the color effect doesn't tint pure white, so use `BRIGHT` to gray out (negative value) or `OPACITY` to make it transparent.

## 3. Displaying text: the golden rule

Since **Core clears the pen every frame**, stamped text must be **rewritten every frame**. So put `〉WRITE` in a script that runs on every `tick`, **in `ᗢ Text`**:

```text
when I receive [ᗢ CATLIB - tick]
if < 〉SCENE = [MENU] > then
    〉WRITE at [0] [100] ALIGN [c] HSL [0] [0] [100] SIZE [3] TEXT [MY GAME]
            GROUP [] TYPE [] FONT [] SPACING ( 4 + [0] ) STAMP? [YES] SCREEN VFX? [NO]
```

> [!WARNING]
> If you only call `〉WRITE` **once**, the text will appear for a single frame before being erased. In the provided file, the blinking `[ see inside ]` text is an example: it writes for 20 frames, then waits 0.5 s.

### Example: a score with leading zeros

```text
〉TOOL Text normalize / val [score] target len. [6]
〉WRITE at [-230] [165] ALIGN [l] … TEXT [〉TOOL Text normalize output] … STAMP? [YES]
```
Result: `000042`. See [14 · TOOLS](<14 · The TOOLS Blocks.md>).

## 4. The curved-screen effect (`SCREEN VFX?`)

With `YES`, each letter is **shifted in height and tilted** depending on its distance from the screen center: the text looks like it's on a bulging old TV screen. The closer the text is to the edges, the more visible the effect. (The version log mentions a fix of the letter rotation for this effect.)

## 5. Characters and fonts

### Characters available in the `default` font

```text
space ! " # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @
A–Z a–z [ ] ^ _ { } £ à â ç è é € ᗢ
```

> [!WARNING]
> - **Uppercase and lowercase use the same drawing**.
> - **Missing**: `\`, `|`, `~`, the lone grave accent, and the letters `ê î ô ù û ë ï œ`. A missing letter displays nothing.

### Adding a font

The block looks for the costume named **`<FONT>_<character>`**. With `FONT` empty, it looks for `default_a`, `default_b`… To create the font `comic`:

1. In `ᗢ Text`, add costumes named `comic_a`, `comic_b`, `comic_1`, `comic_!`…
2. Call `〉WRITE` with `FONT [comic]`.

> [!NOTE]
> Only the `default` font is provided in this file. Other fonts are yours to create.

## 6. Following the camera

In the provided file, `ᗢ Text` applies `〉UPDATE self` (no camera) in its `〉SELF update function` block: the text **stays fixed on screen** even if the camera moves (ideal for an interface). A `〉UPDATE camera` block is available in the sprite: for text that **follows the world**, replace `〉UPDATE self` with `〉UPDATE camera` in `〉SELF update function` (see [05 · Camera](<05 · Camera.md>)).

## 7. The terminal uses this engine

When you open the terminal (`&`), it's `ᗢ Text` that draws the lines (`ᗢ CORE print terminal`), the time and the `terminal v2.0` title. See [12 · Terminal](<12 · The Built-in Terminal.md>).

## 8. Cheat sheet

| I want to… | I do… |
|---|---|
| Center | `ALIGN [c]` with `X = 0` |
| Align right | `ALIGN [r]` |
| Semi-transparent text | `OPACITY [50]` |
| Darker text | `BRIGHT [-50]` |
| More spaced letters | `SPACING ( 4 + [2] )` |
| Automatically shrink long texts | `GROUP [AUTOSIZE]` |
| Separate thousands | `〉TOOL Text space` ([14](<14 · The TOOLS Blocks.md>)) |

---

⬅️ [UI Builder](<07 · UI.md>) · [Index](../README.md) · ➡️ [Scenes and fades](<09 · Scenes and Fades.md>)

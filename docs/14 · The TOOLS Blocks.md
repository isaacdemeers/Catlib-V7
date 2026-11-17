
# 14 · The TOOLS Blocks

> **Objective:** Get to know the ready-to-use utility blocks: distances, angles, collisions, conversions, and text manipulation.

⬅️ [Sound, Keyboard, Time](<13 · Sound, Keyboard, Mouse, and Time.md>) · [Table of Contents](../README.md) · ➡️ [Recipes](<15 · Step-by-Step Recipes.md>)

---

## How it works

Each `〉TOOL …` block **calculates** something and stores the result in an **output variable** (like `〉DATA get output`). Run the block, then read the variable.

They are available in all sprites duplicated from `Frame`.

## 1. Math and geometry

### `〉TOOL get distance / from [OX] [OY] to [X] [Y]`

Distance between two points → **`〉TOOL distance`**.

```text
〉TOOL get distance / from [x position] [y position] to [〉CURSOR x] [〉CURSOR y]
if < 〉TOOL distance < [50] > then … the mouse is nearby …
```

### `〉TOOL get rotate / from [Ox] [Oy] to [X] [Y]`

Direction (in degrees, as in Scratch: `0` = up, `90` = right) from the starting point to the destination point → **`〉TOOL rotate`**.

```text
〉TOOL get rotate / from [〉SELF x] [〉SELF y] to [〉CURSOR x] [〉CURSOR y]
〉ROTATE smooth / val [〉TOOL rotate − 90] damp [5]
```

(`〉SELF rotation` is `0` when the object is upright, whereas this angle is a Scratch direction: hence the `− 90` for a drawing that faces right.)

### `〉TOOL check collide / point [X] [Y] in box w/h [W] [H] at [BX] [BY]`

Checks whether a **point** is inside a **rectangle** centered at `(BX ; BY)` → **`〉TOOL collide?`** is `1` (yes) or `0` (no).

`W` and `H` are the **half**-width and half-height (distance from the center to the edge).

```text
〉TOOL check collide / point [〉CURSOR x] [〉CURSOR y] in box w/h [40] [20] at [0] [-50]
if < 〉TOOL collide? = [1] > then … click inside the area …
```

### `〉TOOL normalize / val [VAL] range of val [MIN] [MAX] target range [NMIN] [NMAX]`

**Converts** a value from one range to another → **`〉TOOL normalized`**.

```text
〉TOOL normalize / val [〉CURSOR x] range of val [-240] [240] target range [0] [100]
```

Mouse at `x = 0` → result `50` (useful for creating a volume or settings slider).

### `〉TOOL get speed / xy [X] [Y]`

Compares the given position with the position from the **previous call** → **`〉TOOL speed`** (absolute value of `Δx + Δy`). Call it every frame.

> [!NOTE]
> This is a simple estimate: a movement of `+3` in x and `−3` in y cancels out. For the actual distance traveled, use `〉TOOL get distance` between the old and new positions.

### `〉TOOL num/text / val [number or text]`

Determines whether the value is a **number** or **text** → **`〉TOOL num/text`** = `NUM` or `TEXT`. (An empty value counts as text.)

## 2. Text manipulation

All these blocks return their result in a `〉TOOL Text … output` variable.

| Block | Result stored in | Example |
|---|---|---|
| `〉TOOL Text split / split index [N] keep 1/2 [KEEP] text [TEXT]` | `〉TOOL Text split output` | `HELLO`, N=`2`, keep `1` → `HE`; keep `2` → `LLO` |
| `〉TOOL Text replace / val to replace [A] replace by [B] text [TEXT]` | `〉TOOL Text replace output` | replace `a` with `o` in `banana` → `bonono` |
| `〉TOOL Text normalize / val [VAL] target len. [LEN]` | `〉TOOL Text normalize output` | `7`, len `3` → `007` |
| `〉TOOL Text space / space size [N] text [TEXT]` | `〉TOOL Text space output` | `1000000`, N=`3` → `1 000 000` |

### Details

- **`split`**: `keep 1` keeps the **first N** characters; `keep 2` keeps **everything after** the first N characters.
- **`replace`**: the search is case-insensitive. Two special values for `replace by`: **`+`** = a space, **`-`** = nothing (delete).
- **`normalize`**: pads with **leading zeros** if the text is too short. If it is too long, **keeps the last** characters (`12345` with `3` → `345`).
- **`space`**: inserts a space **every N characters, starting from the right** (thousands separator with `3`).

## 3. Sprite size in pixels

### `〉TOOL get size of sprite`

Measures the current costume's size in **pixels at 100%** by moving it to the edge of the screen. The result is stored in `CACHE`:

| Data | Contents |
|---|---|
| `<〉〉UNIQUE_ID>.SIZEX` | Width |
| `<〉〉UNIQUE_ID>.SIZEY` | Height |

```text
〉TOOL get size of sprite
〉DATA / source [CACHE] action [GET] var [(join 〉〉UNIQUE_ID [.SIZEX])] to []
… width = 〉DATA get output …
```

> [!WARNING]
> This block **moves and resizes** the sprite while measuring it. Call it **inside `〉SELF init`**, before the object appears, and then let `〉UPDATE` put it back in place.

## 4. Quick reference

| I want to… | Block |
|---|---|
| Find out whether two points are close | `〉TOOL get distance` |
| Point an object toward a location | `〉TOOL get rotate` |
| Detect a click inside a rectangle | `〉TOOL check collide` |
| Convert a range of values | `〉TOOL normalize` |
| Display `007` | `〉TOOL Text normalize` |
| Display `1 000 000` | `〉TOOL Text space` |
| Split / replace text | `〉TOOL Text split` / `replace` |

---

⬅️ [Sound, Keyboard, Time](<13 · Sound, Keyboard, Mouse, and Time.md>) · [Table of Contents](../README.md) · ➡️ [Recipes](<15 · Step-by-Step Recipes.md>)


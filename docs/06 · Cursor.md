
# 06 · Cursor and mouse

> **Goal:** use Catlib's custom cursor, react to hover and click, and read the mouse position.

⬅️ [Camera](<05 · Camera.md>) · [Index](../README.md) · ➡️ [UI Builder](<07 · UI.md>)

---

## 1. The `ᗢ Cursor` sprite

It's an object built on `Frame` that **replaces the mouse pointer** with a drawing of yours. It has two looks (costumes):

| Costume | When |
|---|---|
| `POINTER` | Normal **mouse** mode. |
| `TEXT` | When the **terminal** is open (blinking text cursor). |

It has two sounds (`A` and `B`) and is configured like a Frame object.

## 2. The mouse variables

Updated **every frame** by `ᗢ Cursor`:

| Variable | Value |
|---|---|
| `〉CURSOR x` | Mouse X position. |
| `〉CURSOR y` | Mouse Y position. |
| `〉CURSOR clicked ?` | `YES` if the button is down, otherwise `NO`. |
| `〉CURSOR hovering ?` | `YES` if a UI button is hovered (handled by `ᗢ UI`). |
| `〉CURSOR text x`, `〉CURSOR text y` | Position of the terminal's text cursor. |

## 3. The 6 cursor events

In `ᗢ Cursor`, six **empty** (or almost) blocks wait for you. Fill them in to decide what the cursor does:

| Block | When it's called |
|---|---|
| `〉CURSOR always` | **Every frame**, in mouse mode. By default: bounces toward the mouse, becomes visible, rotates by 2°. |
| `〉CURSOR idle` | Every frame where the cursor **hovers nothing and isn't clicking**. |
| `〉CURSOR on hover` | **Once**, at the start of a hover. |
| `〉CURSOR while hover` | **Every frame** during the hover. |
| `〉CURSOR on click` | **Once**, at the start of the click. |
| `〉CURSOR while click` | **Every frame** while the button stays down. |

**Example: the cursor grows when it hovers a button**

```text
DEFINE 〉CURSOR while hover
    〉SIZE bounce / val [45] damp [2] bounce [2]

DEFINE 〉CURSOR idle
    〉SIZE bounce / val [30] damp [2] bounce [2]
```

> [!NOTE]
> These events are independent of the UI's (`〉UI on hover`…): the cursor reacts to the fact that **an** element is hovered, each button reacts **for itself**. See [07 · UI](<07 · UI.md>).

## 4. When does the cursor appear?

In the provided file, the cursor is created when the message **`SCENE MENU`** is received (`create clone of myself`). It's deleted when the project stops.

> [!WARNING]
> If you return to the `MENU` scene several times, a **new cursor clone** is created each time, without deleting the old one. If you see several cursors, move the creation to `ᗢ CATLIB - ready`, or add a check before cloning.

## 5. Feeding the mouse speed

The `〉SIZE+ mouse speed` and `〉ROTATE+ mouse speed` blocks ([chapter 04](<04 · Movement Effects.md#6-animations-that-react-to-the-mouse>)) read `〉CURSOR speed x`. In the provided file, **this variable is never computed**. To enable it, in `ᗢ Cursor`, in the script that updates `〉CURSOR x` / `〉CURSOR y` (`when I receive ᗢ CATLIB - ready` → `forever`), add **before** the update of `〉CURSOR x`:

```text
set [〉CURSOR speed x] to ( (mouse x) − 〉CURSOR x )
set [〉CURSOR speed y] to ( (mouse y) − 〉CURSOR y )
```

Since `〉CURSOR x` still holds the previous frame's value, the difference is indeed the mouse **speed**.

## 6. Other uses of the mouse

- **Parallax**: `〉MOVE+ parallax` ([04](<04 · Movement Effects.md#6-animations-that-react-to-the-mouse>)).
- **Turn toward the mouse**: `〉TOOL get rotate / from [x] [y] to [〉CURSOR x] [〉CURSOR y]` ([14 · TOOLS](<14 · The TOOLS Blocks.md>)).
- **Click in an area**: `〉TOOL check collide` with `〉CURSOR x` and `〉CURSOR y` ([14](<14 · The TOOLS Blocks.md>)).

---

⬅️ [Camera](<05 · Camera.md>) · [Index](../README.md) · ➡️ [UI Builder](<07 · UI.md>)

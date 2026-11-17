# 14 · Les blocs TOOLS

> **Objectif :** connaître les petits utilitaires prêts à l'emploi : distances, angles, collisions, conversions, et manipulation de texte.

⬅️ [Son, clavier, temps](13-son-clavier-temps.md) · [Sommaire](../README.md) · ➡️ [Recettes](15-recettes.md)

---

## Comment ça marche

Chaque bloc `〉TOOL …` **calcule** quelque chose et range le résultat dans une **variable de sortie** (comme `〉DATA get output`). Tu exécutes le bloc, puis tu lis la variable.

Ils sont disponibles dans tous les sprites dupliqués de `Frame`.

## 1. Maths et géométrie

### `〉TOOL get distance / from [OX] [OY] to [X] [Y]`
Distance entre deux points → **`〉TOOL distance`**.

```text
〉TOOL get distance / from [x position] [y position] to [〉CURSOR x] [〉CURSOR y]
si < 〉TOOL distance < [50] > alors … la souris est proche …
```

### `〉TOOL get rotate / from [Ox] [Oy] to [X] [Y]`
Direction (en degrés, comme dans Scratch : `0` = haut, `90` = droite) pour aller du point de départ vers le point d'arrivée → **`〉TOOL rotate`**.

```text
〉TOOL get rotate / from [〉SELF x] [〉SELF y] to [〉CURSOR x] [〉CURSOR y]
〉ROTATE smooth / val [〉TOOL rotate − 90] damp [5]
```
(`〉SELF rotation` vaut `0` quand l'objet est droit, alors que cet angle est une direction Scratch : d'où le `− 90` pour un dessin qui regarde vers la droite.)

### `〉TOOL check collide / point [X] [Y] in box w/h [W] [H] at [BX] [BY]`
Teste si un **point** est dans un **rectangle** centré en `(BX ; BY)` → **`〉TOOL collide?`** vaut `1` (oui) ou `0` (non).

`W` et `H` sont les **demi**-largeur et demi-hauteur (distance du centre au bord).

```text
〉TOOL check collide / point [〉CURSOR x] [〉CURSOR y] in box w/h [40] [20] at [0] [-50]
si < 〉TOOL collide? = [1] > alors … clic dans la zone …
```

### `〉TOOL normalize / val [VAL] range of val [MIN] [MAX] target range [NMIN] [NMAX]`
**Convertit** une valeur d'une plage vers une autre → **`〉TOOL normalized`**.

```text
〉TOOL normalize / val [〉CURSOR x] range of val [-240] [240] target range [0] [100]
```
Souris à `x = 0` → résultat `50` (utile pour faire un volume ou un curseur de réglage).

### `〉TOOL get speed / xy [X] [Y]`
Compare la position donnée à celle de **l'appel précédent** → **`〉TOOL speed`** (valeur absolue de `Δx + Δy`). À appeler à chaque image.

> [!NOTE]
> C'est une estimation simple : un déplacement `+3` en x et `−3` en y s'annule. Pour une vraie distance parcourue, utilise `〉TOOL get distance` entre l'ancienne et la nouvelle position.

### `〉TOOL num/text / val [number or text]`
Dit si la valeur est un **nombre** ou du **texte** → **`〉TOOL num/text`** = `NUM` ou `TEXT`. (Une valeur vide compte comme du texte.)

## 2. Manipulation de texte

Tous retournent leur résultat dans une variable `〉TOOL Text … output`.

| Bloc | Résultat dans | Exemple |
|---|---|---|
| `〉TOOL Text split / split index [N] keep 1/2 [KEEP] text [TEXT]` | `〉TOOL Text split output` | `HELLO`, N=`2`, keep `1` → `HE` ; keep `2` → `LLO` |
| `〉TOOL Text replace / val to replace [A] replace by [B] text [TEXT]` | `〉TOOL Text replace output` | remplacer `a` par `o` dans `banana` → `bonono` |
| `〉TOOL Text normalize / val [VAL] target len. [LEN]` | `〉TOOL Text normalize output` | `7`, len `3` → `007` |
| `〉TOOL Text space / space size [N] text [TEXT]` | `〉TOOL Text space output` | `1000000`, N=`3` → `1 000 000` |

### Détails

- **`split`** : `keep 1` garde les **N premiers** caractères ; `keep 2` garde **tout ce qui suit** les N premiers.
- **`replace`** : la recherche ne tient pas compte des majuscules. Deux valeurs spéciales pour `replace by` : **`+`** = une espace, **`-`** = rien (supprimer).
- **`normalize`** : complète par des **zéros à gauche** si le texte est trop court. S'il est trop long, **garde les derniers** caractères (`12345` avec `3` → `345`).
- **`space`** : insère une espace **tous les N caractères en partant de la droite** (séparateur de milliers avec `3`).

## 3. Taille d'un sprite en pixels

### `〉TOOL get size of sprite`
Mesure la taille du costume actuel en **pixels à 100 %** en le déplaçant jusqu'au bord de l'écran. Le résultat est rangé dans `CACHE` :

| Donnée | Contenu |
|---|---|
| `<〉〉UNIQUE_ID>.SIZEX` | Largeur |
| `<〉〉UNIQUE_ID>.SIZEY` | Hauteur |

```text
〉TOOL get size of sprite
〉DATA / source [CACHE] action [GET] var [(join 〉〉UNIQUE_ID [.SIZEX])] to []
… largeur = 〉DATA get output …
```

> [!WARNING]
> Ce bloc **déplace et redimensionne** le sprite pendant la mesure. Appelle-le **dans `〉SELF init`**, avant l'apparition de l'objet, et laisse ensuite `〉UPDATE` le remettre en place.

## 4. Aide-mémoire

| Je veux… | Bloc |
|---|---|
| Savoir si deux points sont proches | `〉TOOL get distance` |
| Orienter un objet vers un point | `〉TOOL get rotate` |
| Clic dans un rectangle | `〉TOOL check collide` |
| Convertir une plage de valeurs | `〉TOOL normalize` |
| Afficher `007` | `〉TOOL Text normalize` |
| Afficher `1 000 000` | `〉TOOL Text space` |
| Couper / remplacer du texte | `〉TOOL Text split` / `replace` |

---

⬅️ [Son, clavier, temps](13-son-clavier-temps.md) · [Sommaire](../README.md) · ➡️ [Recettes](15-recettes.md)

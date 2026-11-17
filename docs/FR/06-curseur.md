# 06 · Curseur et souris

> **Objectif :** utiliser le curseur personnalisé de Catlib, réagir au survol et au clic, et lire la position de la souris.

⬅️ [Caméra](05-camera.md) · [Sommaire](../README.md) · ➡️ [UI Builder](07-ui.md)

---

## 1. Le sprite `ᗢ Cursor`

C'est un objet construit sur `Frame` qui **remplace le pointeur** de la souris par un dessin à toi. Il a deux apparences (costumes) :

| Costume | Quand |
|---|---|
| `POINTER` | Mode **souris** normal. |
| `TEXT` | Quand le **terminal** est ouvert (curseur de texte clignotant). |

Il possède deux sons (`A` et `B`) et se règle comme un objet Frame.

## 2. Les variables de la souris

Mises à jour **à chaque image** par `ᗢ Cursor` :

| Variable | Valeur |
|---|---|
| `〉CURSOR x` | Position X de la souris. |
| `〉CURSOR y` | Position Y de la souris. |
| `〉CURSOR clicked ?` | `YES` si le bouton est enfoncé, sinon `NO`. |
| `〉CURSOR hovering ?` | `YES` si un bouton de l'UI est survolé (géré par `ᗢ UI`). |
| `〉CURSOR text x`, `〉CURSOR text y` | Position du curseur de texte du terminal. |

## 3. Les 6 événements du curseur

Dans `ᗢ Cursor`, six blocs **vides** (ou presque) t'attendent. Tu les remplis pour décider ce que fait le curseur :

| Bloc | Quand il est appelé |
|---|---|
| `〉CURSOR always` | **À chaque image**, en mode souris. Par défaut : rebondit vers la souris, devient visible, tourne de 2°. |
| `〉CURSOR idle` | À chaque image où le curseur **ne survole rien et ne clique pas**. |
| `〉CURSOR on hover` | **Une fois**, au début d'un survol. |
| `〉CURSOR while hover` | **À chaque image** pendant le survol. |
| `〉CURSOR on click` | **Une fois**, au début du clic. |
| `〉CURSOR while click` | **À chaque image** pendant que le bouton reste enfoncé. |

**Exemple : le curseur grossit quand il survole un bouton**

```text
DEFINE 〉CURSOR while hover
    〉SIZE bounce / val [45] damp [2] bounce [2]

DEFINE 〉CURSOR idle
    〉SIZE bounce / val [30] damp [2] bounce [2]
```

> [!NOTE]
> Ces événements sont indépendants de ceux de l'UI (`〉UI on hover`…) : le curseur réagit au fait qu'**un** élément est survolé, chaque bouton réagit pour **lui-même**. Voir [07 · UI](07-ui.md).

## 4. Quand apparaît le curseur ?

Dans le fichier fourni, le curseur est créé quand le message **`SCENE MENU`** est reçu (`créer un clone de moi-même`). Il est supprimé à l'arrêt du projet.

> [!WARNING]
> Si tu retournes plusieurs fois à la scène `MENU`, un **nouveau clone** de curseur est créé à chaque fois, sans supprimer l'ancien. Si tu vois plusieurs curseurs, déplace la création sur `ᗢ CATLIB - ready`, ou ajoute une vérification avant de cloner.

## 5. Alimenter la vitesse de la souris

Les blocs `〉SIZE+ mouse speed` et `〉ROTATE+ mouse speed` ([chapitre 04](04-mouvements-effets.md#6-les-animations-qui-réagissent-à-la-souris)) lisent `〉CURSOR speed x`. Dans le fichier fourni, **cette variable n'est jamais calculée**. Pour l'activer, dans `ᗢ Cursor`, dans le script qui met à jour `〉CURSOR x` / `〉CURSOR y` (`quand je reçois ᗢ CATLIB - ready` → `répéter indéfiniment`), ajoute **avant** la mise à jour de `〉CURSOR x` :

```text
mettre [〉CURSOR speed x] à ( (abscisse souris) − 〉CURSOR x )
mettre [〉CURSOR speed y] à ( (ordonnée souris) − 〉CURSOR y )
```

Comme `〉CURSOR x` contient encore la valeur de l'image précédente, la différence est bien la **vitesse** de la souris.

## 6. Autres usages de la souris

- **Parallaxe** : `〉MOVE+ parallax` ([04](04-mouvements-effets.md#6-les-animations-qui-réagissent-à-la-souris)).
- **Tourner vers la souris** : `〉TOOL get rotate / from [x] [y] to [〉CURSOR x] [〉CURSOR y]` ([14 · TOOLS](14-tools.md)).
- **Clic dans une zone** : `〉TOOL check collide` avec `〉CURSOR x` et `〉CURSOR y` ([14](14-tools.md)).

---

⬅️ [Caméra](05-camera.md) · [Sommaire](../README.md) · ➡️ [UI Builder](07-ui.md)

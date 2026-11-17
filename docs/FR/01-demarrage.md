# 01 · Démarrage

> **Objectif de ce chapitre :** comprendre ce qu'est Catlib, ouvrir le projet, faire un premier lancement et savoir comment démarrer **ton propre jeu** à partir de lui.

⬅️ [Retour au sommaire](../README.md) · ➡️ [Chapitre suivant : Comment ça marche](02-fonctionnement.md)

---

## 1. C'est quoi, Catlib ?

Imagine que tu construis une cabane. Tu peux :

- 🪓 couper chaque planche et fabriquer chaque clou toi-même, **ou**
- 📦 acheter un **kit** avec les planches, les vis et le plan.

**Catlib, c'est le kit.** Dans un jeu Scratch, on a presque toujours besoin des mêmes choses : une caméra, des boutons, du texte, des menus, une sauvegarde… Catlib contient déjà tout ça, écrit une bonne fois pour toutes. Toi, tu te concentres sur **ton** jeu.

Un projet comme ça s'appelle un **framework** (« cadre de travail »).

## 2. Ce qu'il faut déjà savoir

Pas besoin d'être expert, mais tu dois connaître ces notions de Scratch :

| Notion | Rappel en une phrase |
|---|---|
| **Variable** | Une boîte qui contient une valeur (un score, un nom…). |
| **Liste** | Une suite de valeurs numérotées (1, 2, 3…). |
| **Message** (« diffuser ») | Un cri que tous les sprites entendent : « scène de jeu terminée ! » |
| **Clone** | Une copie d'un sprite qui vit sa propre vie. |
| **Bloc personnalisé** | Un bloc que tu inventes (catégorie *Mes blocs*). |

> [!TIP]
> Les **clones** sont partout dans Catlib. Si ce mot te fait peur, retiens juste : *le sprite d'origine est une « usine », les clones sont les « objets » qu'elle fabrique.* On en reparle au [chapitre 02](02-fonctionnement.md).

## 3. Comment lire les blocs dans cette documentation

Les blocs de Catlib commencent presque tous par un petit symbole **`〉`**. Dans la doc, on les écrit comme ça :

```text
〉MOVE smooth / xy [X] [Y] damp [DAMP]
```

| Ce que tu vois | Ce que ça veut dire |
|---|---|
| `〉MOVE smooth / xy …` | Le **nom du bloc**, tel qu'il apparaît dans *Mes blocs*. |
| `[X]`, `[Y]`, `[DAMP]` | Les **cases à remplir** (les « entrées ») du bloc. |
| `〉CAM x`, `〉SCENE` | Une **variable** globale de Catlib. |
| `ᗢ DATA save` | Une **liste** globale de Catlib. |
| `ᗢ CORE …` | Un bloc **interne** : il sert au fonctionnement de Catlib, **ne l'utilise pas** directement. |
| `〉〉UNIQUE_ID` | Une variable propre à un sprite, créée par Frame. |

Les petits encadrés :

> [!TIP]
> Un conseil pratique.

> [!WARNING]
> Une erreur classique à éviter.

> [!NOTE]
> Une information en plus.

## 4. Ouvrir le projet

1. Va sur [turbowarp.org](https://turbowarp.org/) (recommandé) ou sur l'éditeur Scratch.
2. **Fichier → Charger depuis votre ordinateur** et choisis `Catlib_v7.sb3`.

> [!NOTE]
> **Pourquoi TurboWarp ?** Catlib utilise énormément de clones et de boucles. TurboWarp est bien plus rapide et peut retirer la limite de 300 clones de Scratch. Le fichier a d'ailleurs été enregistré avec TurboWarp.

> [!WARNING]
> Le projet contient une **variable cloud**. Elle ne marche que sur le **site officiel de Scratch** avec un compte connecté. Dans TurboWarp ou hors connexion, la partie « cloud » de [11 · Données et sauvegardes](11-donnees-sauvegardes.md) ne fonctionnera pas.

## 5. Visite guidée : les sprites du projet

Quand tu ouvres le projet, tu vois **11 sprites** et la scène (*Stage*). Les sprites dont le nom commence par **ᗢ** sont les **moteurs** de Catlib.

| Sprite | Rôle | Tu y touches ? |
|---|---|---|
| **ᗢ Core** | **Le cerveau.** Démarre tout, envoie le « battement de cœur » (`tick`), gère les commandes, les scènes, les données, le terminal. | Un peu (réglages de départ) |
| **ᗢ Camera** | La caméra. | Oui (un bloc à modifier) |
| **ᗢ Cursor** | Le curseur personnalisé (survol, clic). | Oui (événements) |
| **ᗢ UI** | Fabrique de menus et de boutons. | Oui |
| **ᗢ Text** | Le moteur de texte et la police. | Oui, pour écrire du texte |
| **ᗢ Fader +** | Module de **fondu** entre deux scènes (commande `FADE`). | Rarement |
| **ᗢ Thumbnail** | Affiche la vignette du projet quand on arrête le jeu. | Non |
| **INTRO V12** | L'animation de logo au démarrage. | Tu peux la supprimer |
| **Frame** | **Le modèle de base** pour tous tes objets. On le **duplique**. | Tu le dupliques |
| **Extension** | **Le modèle** pour créer tes propres commandes. On le **duplique**. | Tu le dupliques |
| **DEMO** | Une copie de `Frame` remplie de **commentaires** qui expliquent chaque bloc. | Tu le lis |

> [!TIP]
> Le sprite **DEMO** est ton meilleur ami au début : passe ta souris sur les commentaires collés aux blocs, ils expliquent le rôle de chacun.

La scène (*Stage*) ne contient aucun script. Elle sert à **stocker les variables et listes globales** que tous les sprites partagent (voir [02 · Comment ça marche](02-fonctionnement.md#6-les-variables-et-listes-globales)). Elle a deux arrière-plans : `CATLIB` et `BLACK`.

## 6. Premier lancement

Clique sur le **drapeau vert** 🏁. Voilà ce qui se passe, dans l'ordre :

1. `ᗢ Core` se réveille et prépare tout (listes vidées, données par défaut créées, terminal prêt).
2. Catlib regarde ton **nom d'utilisateur Scratch**. Si ce n'est pas la même personne que la dernière fois (variable `〉USER`), c'est un **premier démarrage** : le message `ᗢ CATLIB - first start` est envoyé. Sinon, on va directement à la scène `MENU`.
3. L'intro `INTRO V12` joue son animation de logo, puis demande la scène `MENU`.
4. Un texte clignotant **`[ see inside ]`** apparaît au centre : c'est un exemple du moteur de texte.
5. Appuie sur la touche **`&`** : le **terminal** s'ouvre (et le curseur devient un curseur de texte). Tape `HELP` + `Entrée`. Rappuie sur `&` pour le fermer.

> [!NOTE]
> Sur un clavier **AZERTY**, la touche `&` est sur la touche du `1`. Tu peux changer la touche d'ouverture, voir [12 · Terminal](12-terminal.md#4-changer-les-touches-du-terminal).

## 7. Démarrer ton propre jeu

La façon la plus simple : **utiliser Catlib_v7.sb3 comme modèle** et construire ton jeu *dedans*.

1. **Garde l'original intact.** Ouvre le projet puis *Fichier → Sauvegarder sur votre ordinateur* sous un **nouveau nom** (ex. `MonJeu.sb3`).
2. **Choisis ta version de jeu.** Dans `ᗢ Core`, trouve le bloc `Config - CATLIB / game version [1.0]` (sous le chapeau *quand je reçois `ᗢ CATLIB - start`*) et mets ton numéro de version.
3. **Décide ce que tu gardes.** Tu peux supprimer `INTRO V12` (ou la remplacer par ton propre logo), `DEMO` et, plus tard, `Extension` si tu ne crées pas de commandes.
4. **Nettoie les données de test.** Les listes `ᗢ DATA game`, `ᗢ DATA save`, `〉SAVECODES` contiennent des valeurs d'exemple (notes, codes…). Vide celles dont tu n'as pas besoin avant de publier (voir [11 · Données](11-donnees-sauvegardes.md)).
5. **Crée tes objets** en dupliquant `Frame` ([03 · Frame](03-frame.md)).
6. **Crée tes scènes** : `MENU`, `GAME`, `OPTIONS`… ([09 · Scènes](09-scenes-fondus.md)).

### Et si je veux copier les sprites Catlib dans un autre projet ?

C'est possible mais **plus risqué**, car Catlib fonctionne avec des **variables et listes globales** stockées sur la scène. Si elles manquent, les scripts ne trouveront pas leurs données. Dans ce cas, vérifie que ton projet contient bien :

<details>
<summary>📋 Variables globales à avoir (cliquer pour déplier)</summary>

`〉SCENE`, `〉TIME clock`, `〉TIME date`, `☁ 〉CLOUD global` (cloud), `〉CAM x`, `〉CAM y`, `〉CAM z`, `〉CAM rotation`, `〉CURSOR x`, `〉CURSOR y`, `〉CURSOR speed`, `〉CURSOR speed x`, `〉CURSOR speed y`, `〉CURSOR clicked ?`, `〉CURSOR hovering ?`, `〉CURSOR text x`, `〉CURSOR text y`, `〉USER`
</details>

<details>
<summary>📋 Listes globales à avoir (cliquer pour déplier)</summary>

`ᗢ DATA game`, `ᗢ DATA save`, `ᗢ DATA cache`, `ᗢ DATA cloud`, `〉SAVECODES`, `〉FIND output`, `〉LOGS`, `〉PRESSED KEY`, `ᗢ CORE cmd`, `ᗢ CORE stack`, `ᗢ CORE modules`, `ᗢ CORE scenes`, `ᗢ CORE keys`, `ᗢ CORE pchars`, `ᗢ CORE sounds`, `ᗢ CORE layers`, `ᗢ CORE layers order`, `ᗢ CORE terminal`, `ᗢ CORE autocompletes`, `ᗢ CORE imported data`
</details>

## 8. Les 5 règles d'or

> [!IMPORTANT]
> 1. **Tout objet de ton jeu est un clone d'un sprite dupliqué depuis `Frame`.** Le sprite d'origine reste caché.
> 2. **Ne touche pas aux blocs `ᗢ CORE …`.** Ce sont les rouages internes.
> 3. **Ta logique va dans deux blocs : `〉SELF init` (préparer) et `〉SELF on tick` (à chaque image).**
> 4. **Pour supprimer un objet, utilise `〉SELF kill`**, jamais *supprimer ce clone* directement.
> 5. **Catlib efface le stylo à chaque image.** N'utilise pas le stylo pour des dessins permanents.

---

⬅️ [Retour au sommaire](../README.md) · ➡️ [Chapitre suivant : Comment ça marche](02-fonctionnement.md)

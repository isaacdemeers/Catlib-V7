# 17 · Dépannage et limites connues

> **Objectif :** résoudre les problèmes fréquents, et connaître les points du code qui méritent attention.

⬅️ [Référence rapide](16-reference-rapide.md) · [Sommaire](../README.md) · ➡️ [Glossaire et versions](18-glossaire-versions.md)

---

## 1. Questions fréquentes

### Mon objet est invisible
- `〉SELF init` met `〉FX ghost` à `100` par défaut (invisible). Appelle `〉FX ghost / val [0] speed [5]`.
- Le costume utilisé est-il `Icon` ou `_BLANK` ? Ce sont des costumes techniques (vides ou cachés).
- Le clone a-t-il bien été créé (`créer un clone de moi-même`) ?
- En mode tampon, `〉SELF stamp` doit être appelé **à chaque image**.

### Mon objet revient toujours au centre
Tu as gardé le **script d'exemple** de `Frame` (`quand je commence comme un clone` + `répéter indéfiniment` avec `〉MOVE bounce` vers `0 0`). Supprime-le ([03 §7](03-frame.md#7-le-script-dexemple-dans-frame-à-supprimer-)).

### Mon objet ne bouge pas / bouge d'un coup
- Les blocs `〉MOVE` / `〉SIZE` / `〉ROTATE` doivent être appelés **à chaque image**, dans `〉SELF on tick`.
- `〉UPDATE normal` (ou `camera`) doit être appelé **après**, pour appliquer le résultat.
- `damp = 1` est instantané : augmente-le.

### Mon texte ne reste pas affiché
Core efface le stylo à chaque image : appelle `〉WRITE` **à chaque image** dans un script `quand je reçois ᗢ CATLIB - tick` ([08](08-texte.md)).

### Ma commande `〉CMD` ne fait rien
- Le **nom** doit être exactement celui du module (`〉MODULE set name`). Une faute et rien ne se passe, sans message.
- Pas d'**espace** dans un argument (les espaces séparent les mots).
- Une seule commande est traitée **par image** : attends un instant.

### Mon bouton UI n'apparaît pas
- Le nom de scène dans `visible on scene` correspond-il exactement à `〉SCENE` ?
- Les costumes et sons demandés existent-ils **dans le sprite `ᗢ UI`** ?
- As-tu écrit `type [BUTTON]` pour un bouton cliquable ?
- Le script de création est-il dans `ᗢ UI` ?

### Je vois plusieurs curseurs
Le curseur est cloné à chaque entrée dans `SCENE MENU` ([06 §4](06-curseur.md#4-quand-apparaît-le-curseur-)).

### Le terminal ne s'ouvre pas
- Essaie la touche **`&`** (touche `1` sur AZERTY).
- La touche d'ouverture est la donnée `GAME` : `TERM.KEY.TOGGLE`. Elle doit faire partie des touches de la liste `ᗢ CORE keys`.
- `TERMINAL START` doit avoir été envoyé (c'est fait dans `Config - WHEN READY COMMANDS`).

### Le jeu est lent
- Utilise **TurboWarp**.
- Préfère le mode **tampon** (`〉SELF stamp`, `STAMP? [YES]`) aux nombreux clones visibles.
- Évite de créer beaucoup de clones sans les supprimer (`〉SELF kill`).
- Évite des numéros de calque énormes ([03 §5](03-frame.md#5-les-calques-ordre-daffichage)).

### Mon dessin au stylo disparaît
Normal : Core fait `effacer tout` à chaque image ([02](02-fonctionnement.md)).

### Le cloud ne marche pas
Il ne fonctionne que sur le **site officiel de Scratch**, connecté, et la valeur doit rester courte et numérique ([11 §5](11-donnees-sauvegardes.md#5-le-cloud)).

---

## 2. Limites connues et points d'attention

> [!IMPORTANT]
> Ces points viennent de la **lecture du code** (le projet n'a pas été exécuté pour les confirmer). Ils ne cassent pas l'usage normal de Catlib, mais mieux vaut les connaître. Chaque point propose, quand c'est possible, un **correctif**.

### 🔴 À corriger en priorité

**1. `SAVE IMPORT` ne semble pas écrire dans `ᗢ DATA save`.**
Dans `Func - IMPORT instant` (sprite `ᗢ Core`), la dernière partie copie les données déchiffrées si la source vaut **`GAME`**. Mais le terminal appelle l'import avec la source **`SAVE`** : aucune des deux branches (`CLOUD`, `GAME`) ne s'exécute.
*Correctif :* dans ce bloc, remplace `GAME` par `SAVE` dans le second `si`.

**2. La génération de la clé de sauvegarde peut se bloquer.**
Dans `Core - GEN KEY`, si la clé calculée fait **plus de 11** chiffres, elle est coupée à 10 ; sinon on ajoute des chiffres aléatoires **jusqu'à en avoir exactement 10**. Si la clé fait **exactement 11** chiffres, ni l'un ni l'autre ne s'applique : la boucle ajoute des chiffres sans jamais atteindre 10 et le bloc (sans rafraîchissement d'écran) **ne se termine plus**. Selon le pseudo Scratch et le tirage aléatoire, une simulation rapide montre que ce cas peut arriver régulièrement.
*Correctif :* remplace la condition `longueur > 11` par `longueur > 10`.

### 🟡 À savoir

**3. `〉CURSOR speed x` n'est jamais mis à jour.** `〉SIZE+ mouse speed` et `〉ROTATE+ mouse speed` restent donc sans effet. Correctif : [06 §5](06-curseur.md#5-alimenter-la-vitesse-de-la-souris).

**4. Sens de la caméra.** Le commentaire de `DEMO` décrit `rendu = x − (cam × mirror)`, alors que le bloc `〉UPDATE camera` calcule `x + (cam ÷ mirror)`. En mode `origine [CAMERA]`, le décalage de la caméra est de plus ajouté **deux fois** dans la formule. Teste visuellement et choisis `mirror` en conséquence ([05](05-camera.md)).

**5. Message `SCENE <nom> STOP`.** Il est diffusé avec le nom de la **nouvelle** scène. Pour détecter la sortie d'une scène, compare `〉SCENE` à chaque tick ([09](09-scenes-fondus.md)).

**6. Commandes proposées mais non branchées.** L'autocomplétion du terminal propose `SCENE GET <n>` et `ALERT NEW <sprite> [son]` : aucun code n'y répond. Des lignes `SOUND PLAY / LOOP / STOP` existent aussi dans Core mais ne sont rattachées à aucun chapeau (elles ne s'exécutent jamais). Utilise `〉SOUND play` dans les sprites ([13](13-son-clavier-temps.md)).

**7. Le curseur est cloné à chaque `SCENE MENU`** ([06 §4](06-curseur.md#4-quand-apparaît-le-curseur-)).

**8. `〉DATA` des sprites `Frame` n'a pas `ADD` pour `GAME`.** Utilise `GET` puis `SET`, ou passe par `〉CMD / name [GAME] option [ADD] …` (version de Core).

**9. Texte et caméra.** Par défaut le texte ne suit pas la caméra ([08 §6](08-texte.md#6-suivre-la-caméra)). Une seule police (`default`) est fournie, en blanc, avec les majuscules dessinées comme les minuscules.

**10. `VOL.MASTER` n'est pas appliqué automatiquement** ([13](13-son-clavier-temps.md)).

**11. `Config - CHECK USER`** ignore son paramètre « scène normale » : en usage normal, la scène demandée est toujours `MENU`.

**12. `FADE`** : les valeurs par défaut citées dans le commentaire du bloc ne sont pas appliquées ; donne toujours les vitesses. `awaited?` n'attend pas la fin du fondu.

**13. Données de test dans le fichier** : notes, valeurs d'exemple dans `ᗢ DATA save`, anciens codes dans `〉SAVECODES`, nom d'utilisateur dans `〉USER`. À nettoyer avant de publier.

**14. Sauvegarde :** jeu de 75 caractères seulement, sans distinction de casse ([11 §4](11-donnees-sauvegardes.md#4-les-codes-de-sauvegarde-safe-code)).

**15. Noms conservés tels quels :** `UPADTE CAM` et `〉FX pixalate` comportent une faute de frappe ; la doc utilise le nom réel pour que tu les retrouves.

**16. Éléments inutilisés :** le message `ᗢ - CATLIB init`, deux variables `TOOL #2` / `TOOL ##2` sur la scène, et le sprite `ᗢ Thumbnail` si tu n'utilises pas de vignette d'arrêt.

---

⬅️ [Référence rapide](16-reference-rapide.md) · [Sommaire](../README.md) · ➡️ [Glossaire et versions](18-glossaire-versions.md)

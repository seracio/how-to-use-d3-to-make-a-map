# how-to-use-d3-to-make-a-map

> d3.js et le GeoJSON, un tutoriel en français

## Prérequis

### Liste des outils node.js

> Le développement en JavaScript s'appuie dorénavant sur des outils en node.js. Cela peut rebuter le débutant mais il est important de les maîtriser, sous peine d'être rapidement limité.
> Ces outils ont plusieurs propos :

* chargement de librairies externes, nous utiliserons npm, le package manager par défaut de node
* transpilation : le JS est un langage qui évolue rapidement pour coller aux nouvelles exigences en terme d'interface graphique. Le problème est que chaque navigateur implémente ces nouveautés à son rythme, Babel.js permet de transformer un code pour qu'il soit compréhensible par tous les navigateurs qu'on aura choisi.
* création d'un bundle : une fois notre code écrit dans un ou plusieurs fichiers, il faut tout rassembler en un seul à partir d'un point d'entrée. Il faut également y agréger toutes les librairies externes que nous avons utilisé (d3.js par exemple). Parcel.js est un nouvel outil qui fait ça très simplement.

> [Installation de node.js](https://nodejs.org/en/download/)

On peut vérifier très simplement que node.js est bien installé. Dans un terminal, on tape :

```bash
node -v
```

Cela devrait afficher le numéro de version de node.

### IDE / éditeur de texte

Je recommande `Visual Studio Code` qui est gratuit et est un bon compromis entre IDE et simple éditeur de texte.

### Git

Git est un gestionnaire de version de votre code. Il s'est imposé comme la référence dans ce domaine depuis quelques années. Son installation et son utilisation se font généralement via un terminal, même s'il existe aussi des interfaces graphiques.

> [Installation de git](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git)

Une fois git installé, on peut vérifier sa version dans un terminal :

```bash
git --version
```

## Récupération du projet et installation

Dans un terminal :

```bash
git clone git@github.com:seracio/how-to-use-d3-to-make-a-map.git # on clone le projet sur notre ordinateur
cd how-to-use-d3-to-make-a-map # puis on se place à la racine du dossier
```

Examinons les différents fichiers récupérés :

* un dossier src dans lequel se trouve notre code
* un ficher .babelrc, qui contient la configuration babel du projet
* un fichier .gitignore, qui spécifie les fichiers à ignorer pour git (typiquement les logs, les librairies externes, ...)
* un fichier index.html : LA page html sur laquelle nous afficherons notre projet
* un fichier de licence
* package.json : ce fichier doit toujours être présent dans un projet node.js, nous verrons plus tard comment le créer, il contient :
  * les informations générales sur le projet (nom, version, ...)
  * les dépendances (d3, babel, parcel.js) - elles sont réparties entre `dependencies` (librairies dont dépend notre code) et `devDependencies` (outils)

Nous allons maintenant charger ces librairies externes grâce à npm

```bash
npm install # tout simplement
```

Cela va créer un dossier `node_modules` contenant toutes les librairies que nous voulions, plus leur dépendances. Cela fait beaucoup de dossiers mais n'y prêtons pas attention.

## Exécution du code

On peut désormais aller dans `src/index.js` pour y voir le code commenté.
Pour exécuter ce code avec parcel.js, il suffit de taper dans un terminal :

```bash
npm run start
```

`parcel.js` va créer un répertoire `dist` dans lequel il va copier la page `index.html` ainsi que le fichier JavaScript bundlé que je vous invite à inspecter pour constater qu'il contient désormais beaucoup de codes ; au notre, s'ajoute désormais les librairies externes dont il dépend.
`parcel.js` va également lancer un serveur de test local pour afficher la page : [http://localhost:1234](http://localhost:1234)

## Analyse du code

> 1. Chargement des dépendances :

```javascript
import * as d3 from 'd3-selection';
import { geoPath, geoOrthographic } from 'd3-geo';
import myGeojson from './custom.geo.json';
```

C'est la première étape, l'import des librairies. d3 est désormais fragmenté [en une multitudes de librairies](https://github.com/d3) plutôt qu'en une seule. Cela permet d'avoir un code plus léger et un temps de chargement qui s'en ressent pour l'utilisateur.
Nous utilisons ici [le mot-clé `import`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import) pour charger les dépendances.
Notons que le fichier JSON est chargé sans problèmes grâce à `parcel.js`, cela n'est normalement pas possible avec l'import standard.

> 2. Création du tag svg à l'aide de d3

```javascript
const container = d3.select('#root').style('width', '100%');

// définissons quelques variables :
// la largeur et la hauteur de notre SVG
// ces variables ne correspondent pas à des pixels mais plutôt à l'univers visible
// au sein de notre SVG
const width = 800,
    height = 600;

// on y ajoute un tag svg
const svg = container
    // d3 utilise le chaining pattern :
    // en gros, lorsque j'utilise un style ou un attr, je pointe toujours sur le même élément
    // (çàd que la fonction renvoie toujours l'élément sur lequel elle s'applique)
    // en revanche, quand je fais un append (ajout d'enfant html), la fonction append renvoie l'enfant ajouté
    .append('svg') // ==> renvoie le nouvel élément svg
    // ce qui veut dire que j'ajoute une classe au svg et non au conteneur initial
    .attr('class', 'map')
    // ce sont des attributs pour le resize automatique du svg :
    // ==> https://css-tricks.com/scale-svg/
    // inutile de comprendre ça pour le moment, il faut juste comprendre
    // que cela nous permet d'avoir un svg qui s'ajuste à son conteneur
    .attr('perserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', `0 0 ${width} ${height}`);
```

> 3. Définition de la projection utilisée

```javascript
// la projection
// ici on veut une projection de type orthogonales
// qui permette d'afficher notre geojson dans la taille du SVG
const projection = geoOrthographic()
    .fitSize([width, height], myGeojson)
    .center([0, 0]);
```

> 4. Définition du path generator

```javascript
// le path generator :
// notre pathGenerator est une fonction
// pour la construire, on a juste besoin de la projection
// Le path generator prendra ensuite en paramètre un objet geojson et renverra
// un chemin SVG
const pathGenerator = geoPath().projection(projection);
```

> 5. Dessin des pays dans le SVG

```javascript
// dessinons les différents pays
// notre geojson est une 'FeatureCollection', un objet geojson
// qui représente une liste (contenue dans l'attribut "features")
// nous allons injecter cette liste dans d3
// et construire les pays

// là, on définit le mapping entre nos donnée (nos features)
// et les éléments HTML à l'intérieur du SVG
const myCountries = svg.selectAll('.country').data(myGeojson.features);

// une fois le mapping effectué
// on peut dire :
myCountries
    // Pour tous les nouveaux éléments du mapping
    // (dans notre cas, TOUS les éléments puisque l'on vient juste de créer le mapping et qu'il n'y a
    // encore aucune balise)
    .enter()
    // On ajoute une balise path
    .append('path')
    // qui aura une class country
    .attr('class', 'country')
    // un chemin généré par notre path generator
    .attr('d', datum => pathGenerator(datum))
    // avec une couleur bleue
    .style('fill', 'blue')
    // et un contour gris pâle
    .style('stroke', '#efefef');
```

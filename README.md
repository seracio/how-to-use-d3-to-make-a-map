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

Puis ouvrir la page de test : [http://localhost:1234](http://localhost:1234)

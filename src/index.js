// d3-selection => manipilation du DOM
// + general update pattern
import * as d3 from 'd3-selection';
// d3-geo => projections basiques + helper pour dessiner en SVG ou en Canvas à partir d'un geojson
import { geoPath, geoOrthographic } from 'd3-geo';
//
import myGeojson from './custom.geo.json';

// on sélectionne notre conteneur déjà présent dans le DOM initial
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

// la projection
// ici on veut une projection de type Wiechel
// qui permette d'afficher notre geojson dans la taille du SVG
const projection = geoOrthographic()
    .fitSize([width, height], myGeojson)
    .center([0, 0]);

// le path generator :
// notre pathGenerator est une fonction
// pour la construire, on a juste besoin de la projection
// Le path generator prendra ensuite en paramètre un objet geojson et renverra
// un chemin SVG
const pathGenerator = geoPath().projection(projection);

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

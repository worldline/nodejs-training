<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline primary--text">Rappel JavaScript</v-card-title>
          <v-layout>
            <v-flex xs2>
              <img src="~/assets/javascript-logo.png" alt="JavaScript" class="mb-5 pl-5">
            </v-flex>
            <v-flex xs7>
              <v-card-text class="pt-3">
                <p>
                  Une bonne connaissance du langage
                  <b>JavaScript</b> est indispensable pour aborder sereinement l'apprentissage du Node.js.
                  <br>
                  <br>Cette partie contient les basiques du langage et les évolutions apportées par
                  <b>ES6</b>.
                </p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-card>
        <v-card-title class="title primary--text">Types et variables</v-card-title>
        <v-card-text>
          <p>JavaScript est un langage dont le typage est faible et dynamique. Cela signifie qu'il n'est pas nécessaire de déclarer le type d'une variable avant de l'utiliser. Le type de la variable sera automatiquement déterminé lorsque le programme sera exécuté. Cela signifie également que la même variable pourra avoir différents types au cours de son existence :</p>
          <pre v-highlightjs>
            <code class="javascript">
  const length = 16;           // Number
  const lastName = "Johnson";  // String
  const x = {                  // Object
    firstName:"John",
    lastName:"Doe"
  };
            </code>
          </pre>
          Les types sont dynamiques en JavaScript. Ce qui signifie qu'une même variable peut contenir des types de données différents, par exemple :
          <pre v-highlightjs>
            <code class="javascript">
  let x;           // Ici x est undefined
  x = 5;           // Ici x est un Number
  x = "John";      // Ici x est un String
            </code>
          </pre>
          <p class="subheading primary--text">Les types de données</p>
          <p>Le dernier standard ECMAScript définit 7 types de données :</p>
          <ul>
            <li>Les types de données primitifs : <i>Boolean</i>, <i>Null</i>, <i>Undefined</i>, <i>Number</i>, <i>String</i> et <i>Symbol</i> ;</li>
            <li>et le type <i>Object</i></li>
          </ul>
          <pre v-highlightjs>
            <code class="javascript">
  let isHolder = true;             // Type Boolean    - true / false
  let name = "John";               // Type String     - il est également possible d'utiliser les guillements simple : 'John'
  let size = 5;                    // Type Number     - les nombres flottants à précision double : de -(2<sup>53</sup> -1) et 2<sup>53</sup> -1
                                   //                   avec également +Infinity, -Infinity, et NaN
  let myPrivateMethod = Symbol();  // Type Symbol
  let x = null;                    // Type Null
  let x;                           // Type Undefined

            </code>
          </pre>
          <p>La langage propose également des <i>objets globaux standards</i> héritant d'<code>Object</code> avec des syntaxes litérales, comme par exemple :</p>
          <pre v-highlightjs>
            <code class="javascript">
  // Les tableaux : Array
  const fruits = ['apples', 'oranges', 'lemons'];
  // Les expressions régulières : RegExp
  const textFiles = /\.(rdf|txt)$/;
  // Les dates : Date
  const now = new Date();
  // Les erreurs : Error
  const err = new Error('did i do that?');
  // Les fonctions : Function
  const sayHi = function() { return 'Hi' };
            </code>
          </pre>
          <p>Ces classes sont typées comme des <code>Object</code>, elles héritent des méthodes comme : <code>toString</code>, <code>valueOf</code>, <code>hashCode</code>.</p>
          <v-alert :value="true" color="info" icon="info" outline>
            La liste complète de ces "objets globaux" est disponible sur la documentation du langage, voir <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux">Mozilla Developer Network - Objets globaux</a>
          </v-alert>
          <br>
          <p class="subheading primary--text">Les variables</p>
          <p>Il existe trois mots clés en JavaScript pour déclarer une variable : <code>var</code>, <code>let</code> et <code>const</code>.</p>
          <ul>
            <li>
              <code>const</code> permet de déclarer une variable à assignation unique bindée lexicalement, ce qui veut dire qu'une variable déclarée avec const ne contiendra qu'une valeur qui sera scopée au niveau du bloc :
              <pre v-highlightjs>
                <code class="javascript">
  function fn() {
    const foo = "bar"
    if (true) {
      const foo // SyntaxError, la variable a besoin d'être assignée
      const foo = "qux"
      foo = "norf" // SyntaxError, la variable ne peut pas être réassignée
      console.log(foo)
      // "qux", la variable appartient au scope de son bloc (le "if")
    }
    console.log(foo)
    // "bar", la variable appartient au scope de la fonction "fn"
  }
                </code>
              </pre>
              <v-alert :value="true" color="warning" icon="warning" outline>
                <code>const</code> définit une constante au niveau de la référence uniquement, il est possible de modifier le contenu d'un tableau ou d'un objet :
                <pre v-highlightjs>
                  <code class="javascript">
  const students = [];
  students.push('John'); // est valide !
                  </code>
                </pre>
              </v-alert>
            </li>
            <li>
              <code>let</code> est similaire au <code>const</code> sans la contrainte sur l'assignation. <code>let</code> est donc ré-assignable et scopé au bloc courant :
              <pre v-highlightjs>
                <code class="javascript">
  function fn() {
    let foo = "bar";
    if (true) {
      let foo; // pas d'erreur, foo === undefined
      foo = "qux";
      console.log(foo);
      // "qux", la variable appartient au scope de son blocs (le "if")
    }
    console.log(foo);
    // "bar", la variable appartient au scope de son bloc (la fonction "fn")
  }
                </code>
              </pre>
            </li>
            <li>
              <code>var</code> permet de déclarer une variable scopée au niveau de la fonction :
              <pre v-highlightjs>
                <code class="javascript">
  function fn() {
    try {
      console.log(x); // undefined dû au hoisting (au lieu de ReferenceError pour let ou const)
      var x = foo(); // la déclaration de x est valable pour toute la fonction "fn"
    } catch(err) {}
    bar(x); // ici x est bien initialisé avec la valeur de retour de foo()
  }
                </code>
              </pre>
              <v-alert :value="true" color="warning" icon="warning" outline>
                Le scope au niveau de la fonction et le mécanisme de hoisting ne sont pas naturels, nous vous conseillons d'utiliser <code>const</code> et <code>let</code> dans 99.9% des cas !
              </v-alert>
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Fonctions</v-card-title>
        <v-card-text>
          <p>Les <b>fonctions</b> font partie des briques fondamentales de JavaScript. Une fonction est une procédure JavaScript, un ensemble d'instructions effectuant une tâche ou calculant une valeur.</p>
          <br>
          <p>En JavaScript une fonction est définie par le mot clé <code>function</code> suivi d'un <b>nom</b> et de parenthèses <b>()</b></p>
          <pre v-highlightjs>
            <code class="javascript">
  function name(parameter1, parameter2, parameter3) {
    // code to be executed
  }
            </code>
          </pre>
          <p>Le nombre d'arguments d'une fonction est dynamique, <code>arguments</code> est un pseudo-tableau contenant les paramètres effectifs au moment de l'appel.</p>
          <v-alert :value="true" color="info" icon="info" outline>
            En ES6, il est préférable d'utiliser la syntaxe <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/param%C3%A8tres_du_reste">Mozilla Developer Network - Rest parameters</a> qui permet de représenter un nombre indéfini d'arguments sous forme de tableau : <code class="javascript">function sum(...theArgs) {}</code>
          </v-alert>
          <p>En JavaScript, par défaut, la valeur des paramètres d'une fonction sera undefined. Malgré tout, il peut être assez utile de pouvoir définir d'autres valeurs par défaut.</p>
          <pre v-highlightjs>
            <code class="javascript">
  function multiply(a, b = 1) {
    return a * b;
  }

  multiply(5, 2); // 10
  multiply(5);    // 5 - ici b est undefined, il prend la valeur de 1
            </code>
          </pre>
          <br>
          <p>Il est également possible de définir une fonction grâce aux <b>expressions de fonction</b>, ces fonctions peuvent ainsi être anonymes :</p>
          <pre v-highlightjs>
            <code class="javascript">
  let square = function (nb) { return nb * nb };
  let x = square(4); // x reçoit la valeur 16
            </code>
          </pre>
          <p>Cette syntaxe permet de passer une fonction comme argument d'une autre fonction ou de définir une fonction de manière conditionnelle.</p>
          <p class="subheading primary--text">Les fonctions fléchées</p>
          <p>Une <b>expression de fonction fléchée</b> (<i>arrow function</i> en anglais) permet d’avoir une syntaxe plus courte que les expressions de fonction et ne possède pas ses propres valeurs pour <code>this</code>, <code>arguments</code>, <code>super</code>, ou <code>new.target</code>. Les fonctions fléchées sont souvent anonymes et ne sont pas destinées à être utilisées pour déclarer des méthodes.</p>
          <pre v-highlightjs>
            <code class="javascript">
  const square = nb => nb * nb; // le return est implicite sur une seule ligne
  console.log(square(2)); // => 4

  const sum = (a, b) => { // les parenthèses sont obligatoires si vous avez au moins deux arguments
    return a + b;
  }
  console.log(sum(2, 3)); => 5
            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            Pour aller plus loin, voir <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Fonctions">Mozilla Developer Network - Fonctions</a>
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Structures itératives</v-card-title>
        <v-card-text>
          <p>JavaScript propose plusieurs <b>structures itératives</b> sur les tableaux et les objets.</p>
          <br>
          <p class="subheading primary--text">Parcourir un tableau</p>
          <pre v-highlightjs>
            <code class="javascript">
  // le for "classique" pour les tableaux
  const count = [ 'one', 'two', 'three' ];
  for (const i = 0; i &lt; count.length; i++) {
    console.log(i, count[i]);
  }

  // le forEach en mode fonctionel
  ['one', 'two', 'three'].forEach(elem => {
    console.log(elem);
  });
            </code>
          </pre>
          <p> Quelques méthodes supplémentaires utiles pour les tableaux : <code>map</code>, <code>filter</code> :</p>
          <pre v-highlightjs>
            <code class="javascript">
  const numbers = [1, 2, 3, 4];

  // map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau
  const squareNumbers = numbers.map(elem => elem * elem);
  console.log(squareNumbers); // [1, 4, 9, 16]

  // filter() crée un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée
  const evenNumbers = numbers.filter(elem => elem % 2 === 0);
  console.log(evenNumbers); // [2, 4]
            </code>
          </pre>
          <p class="subheading primary--text">Parcourir un objet</p>
          <pre v-highlightjs>
            <code class="javascript">
  // le for in pour les objets
  const person = { name: 'Jane', age: 28 };
  for (const attr in person) {
    console.log(attr, person[attr]);
  }

  // en utilisant Object.entries()
  console.log(Object.entries(person)); // [["name", "Jane"], ["age", 28]]
  // en utilisant Object.keys()
  Object.keys(person).forEach(key => {
    console.log(key, person[key]);
  });
            </code>
          </pre>
          <p>L'instruction <b>for...of</b> permet de créer une boucle Array qui parcourt un <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Les_protocoles_iteration#Le_protocole_.C2.AB_it.C3.A9rable_.C2.BB">objet itérable</a> (ce qui inclut les objets Array, Map, Set, String, TypedArray, l'objet arguments, etc.) et qui permet d'exécuter une ou plusieurs instructions pour la valeur de chaque propriété.</p>
          <pre v-highlightjs>
            <code class="javascript">
  const m = new Map([["foo", "hello"], ["bar", "world"]]);
  for (const [name, value] of m) {
    console.log(name + "->" + value); //"foo->hello", "bar->world"
  }

  const obj = { foo: "hello", bar: "world" };
  for (const key of Object.keys(obj)) {
    console.log(key + "->" + obj[key]); // "foo->hello", "bar->world"
  }
            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            D'autres opérations sont possibles sur les objets et les tableaux, voir Mozilla Developer Network - <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object">Object</a>, <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array">Array</a>
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Structures conditionnelles</v-card-title>
        <v-card-text>
          <p>Comme beaucoup de langages inspirés du C, JavaScript utilise le <a target="_blank" href="https://en.wikipedia.org/wiki/Short-circuit_evaluation">short-circuit evaluation</a> pour les conditions : </p>
          <p class="subheading primary--text">L'égalité</p>
          <p>
            JavaScript propose deux types de comparaison : <br>
            <ul>
              <li>La comparaison stricte <code>===</code> qui compare la valeur et le type des élèments ;</li>
              <li>La comparaison faible <code>==</code> qui convertit les deux opérandes en un même type et compare les valeurs.</li>
            </ul>
          </p>
          <!-- eslint-disable -->
          <runkit-embedded>
console.log(`'1' == 1 vaut ${'1' == 1}`);

console.log(`1 === 1 vaut ${1 === 1}`);

console.log(`'1' === 1 vaut ${'1' === 1}`);

console.log(`0 == false vaut ${0 == false}`);

console.log(`0 === false vaut ${0 === false}`);
          </runkit-embedded>
          <!-- eslint-enable -->
          <v-alert :value="true" color="info" icon="info" outline>
            Nous vous recommandons de toujours utiliser l'égalité stricte <code>===</code> !
          </v-alert>
          <br>
          <p class="subheading primary--text">Les valeurs fausses (falsy)</p>
          <p>
            Les valeurs fausses (<a href="https://developer.mozilla.org/fr/docs/Glossaire/Falsy">falsy</a>) sont des valeurs évaluées comme fausses quand elles sont évaluées dans un contexte booléen.<br>
            <ul>
              <li>Le booléen <code>false</code></li>
              <li>Les types <code>null</code> et <code>undefined</code></li>
              <li>Les nombres <code>0</code> et <code>NaN</code></li>
              <li>Les chaines de caractères vides <code>""</code> et <code>''</code></li>
            </ul>
          </p>
          <br>
          <p class="subheading primary--text">Le if / else</p>
          <pre v-highlightjs>
            <code class="javascript">
  if(name === 'John') {
    ...
  } else if (name === 'Jane') {
    ...
  } else {
    ...
  }
            </code>
          </pre>
          <p class="subheading primary--text">Le switch case</p>
          <pre v-highlightjs>
            <code class="javascript">
  switch (foo()) {
    case 'orange':
    case 'apple':
      console.log('fruit');
    break;
    default:
      console.log('unknown');
  }
            </code>
          </pre>
          <p class="subheading primary--text">L'opérateur ternaire</p>
          <p>L'opérateur ternaire est utilisable dans une expression à la différence du <code>if else</code> qui est une instruction.</p>
          <pre v-highlightjs>
            <code class="javascript">
  const passed = foo() ? ':+1:' : ':-1:';
            </code>
          </pre>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Les classes</v-card-title>
        <v-card-text>
          <p>
            En JavaScript, les <b>classes</b> sont des fonctions spéciales. Il est possible de les déclarer de la même façon que les fonctions : par déclaration, ou par expression.<br>
            Comme sur la plupart des langages, il est possible de définir un ou plusieurs <b>constructeurs</b>, méthodes de <b>prototype</b>, methodes <b>statiques</b> de classe.
          </p>
          <pre v-highlightjs>
            <code class="javascript">
  class Point {
    // Constructeur de la classe
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    // Méthode de prototype
    getPosition() {
      return `This is a point with x: ${this.x}, y: ${this.y}`;
    }

    // Il est également possible de lier une fonction à une propriété
    get position() {
      return `This is a point with x: ${this.x}, y: ${this.y}`;
    }

    // Méthode statique de classe
    static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.hypot(dx, dy);
    }
  }

  const p1 = new Point(5, 5);
  const p2 = new Point(10, 10);

  console.log(p1.getPosition()); // "This is a point with x: 5, y: 5", getPosition() est une fonction
  console.log(p1.position); // "This is a point with x: 5, y: 5", position est une propriété
  console.log(Point.distance(p1, p2)); // 7.0710678118654755

            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            Il est également possible de définir des propriétés de classe et de déclarer des champs privés et publiques (fonctionalité expérimentale). Plus d'information sur <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes">Mozilla Developer Network - Classes</a>
          </v-alert>

          <p class="subheading primary--text">L'héritage de classe</p>
          <p>Le mot-clé <code>extends</code>, utilisé dans les déclarations ou les expressions de classes, permet de créer une classe qui hérite d'une autre classe (on parle aussi de "sous-classe" ou de "classe-fille").</p>
          <pre v-highlightjs>
            <code class="javascript">
  class Animal {
    constructor(name) {
      this.name = name;
    }

    speak() {
      console.log(this.name + ' speaks');
    }
  }

  class Dog extends Animal {
    constructor(name) {
      super(name); // appelle le constructeur parent avec le paramètre
    }
    speak() {
      console.log(this.name + ' barks.');
    }
  }
            </code>
          </pre>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Astuce ES6</v-card-title>
        <v-card-text>
          <p>la spécification ES6 (ou ES2015) a apporté de nombreuses fonctionalités au langage.</p>

          <p class="subheading primary--text">Littéraux de gabarits</p>
          <p>Les littéraux de gabarits <code>` `</code> sont des littéraux de chaînes de caractères permettant d'intégrer des expressions. Avec eux, on peut utiliser des chaînes de caractères multi-lignes et des fonctionnalités d'interpolation.</p>
          <pre v-highlightjs>
            <code class="javascript">
  const a = 5;
  const b = 10;
  console.log(`${a} + ${b} equals
  ${a+b}.`);
  // "5 + 10 equals
  // 15."
            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            Il est également possible d'imbriquer des gabarits pour obtenir des chaînes de caractères configurables. Plus d'information sur <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits">Mozilla Developer Network - Littéraux de gabarits</a>
          </v-alert>

          <br>
          <p class="subheading primary--text">Syntaxe de décomposition</p>
          <p>La <b>syntaxe de décomposition</b> <code>...</code> (<i>spread operator</i> en anglais) permet d'étendre un itérable (par exemple une expression de tableau ou une chaîne de caractères) en lieu et place de plusieurs arguments (pour les appels de fonctions) ou de plusieurs éléments (pour les littéraux de tableaux) ou de paires clés-valeurs (pour les littéraux d'objets).</p>
          <pre v-highlightjs>
            <code class="javascript">
  // Améliorer les littéraux de tableau
  const articulations = ['épaules', 'genoux'];
  const corps = ['têtes', ...articulations, 'bras', 'pieds'];
  // ["têtes", "épaules", "genoux", "bras", "pieds"]

  // Copier un tableau
  const arr = [1, 2, 3];
  const arr2 = [...arr];

  // Concaténer deux tableaux
  arr = [...arr, ...arr2];
            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            La proposition relative à la décomposition des propriétés (actuellement au stade de <a href="https://github.com/tc39/proposal-object-rest-spread">proposition de niveau 4</a>) vise à ajouter la décomposition des propriétés pour les littéraux objets. Plus d'information sur <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Syntaxe_d%C3%A9composition">Mozilla Developer Network - Syntaxe de décomposition</a>
          </v-alert>

          <br>
          <p class="subheading primary--text">Affectation par décomposition</p>
          <p>L'<b>affectation par décomposition</b> (<i>destructuring</i> en anglais) est une expression JavaScript qui permet d'extraire (<i>unpack</i> en anglais) des données d'un tableau ou d'un objet grâce à une syntaxe dont la forme ressemble à la structure du tableau ou de l'objet.</p>
          <pre v-highlightjs>
            <code class="javascript">
// Destructuring d'un tableau avec des valeurs par défaut
var [a = 5, b = 7] = [1];
console.log(a); // 1
console.log(b); // 7

// Destructuring d'un objet avec des valeurs par défaut
var {a, b = 21} = {a:45};
console.log(a); // 45
console.log(b); // 21

var {a, b} = null;
console.log(a); // "TypeError: Cannot destructure property `a` of 'undefined' or 'null'.
            </code>
          </pre>
          <v-alert :value="true" color="info" icon="info" outline>
            Plus d'information et d'exemples sont disponibles sur <a target="_blank" href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition">Mozilla Developer Network - Affecter par décomposition</a>
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="title primary--text">Hands on!</v-card-title>
        <v-card-text>
          <ol>
            <li>Créez un tableau <code>days</code> contenant les jours de la semaine, et faites un extrait des jours ouvrés dans une variable <code>workingDays</code></li>
            <li>Affichez <code>days</code> <code>workingDays</code> et le troisième jour ouvré dans la console</li>
            <li>Créez une bière avec comme nom <b>Brewdog Punk Ipa</b> et 10 unités</li>
            <li>Créez une function <code>drink</code> qui accepte une bière et un nombre en paramètres. Elle décrémente le nombre d'unité de bière et renvoie une chaine avec le nom et le nombre de bières bues</li>
            <li>Créez une function <code>doMove</code> qui accepte une function, une bière et un nombre en paramètres. Elle renvoie une chaine avec la date courante et le résultat de la fonction sur les paramètres restants. Affichez le résultat de l'action de boire 2 bières</li>
          </ol>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RunkitEmbedded from '../components/runkit-embedded'
export default {
  components: { RunkitEmbedded }
}
</script>

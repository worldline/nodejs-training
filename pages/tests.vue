<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Les tests</v-card-title>
        <v-card-text>
          <v-card-title class="subheading primary--text">Executer des tests avec mocha</v-card-title>
          <p>
            <a href="https://mochajs.org/">Mocha</a> est un framework de test JavaScript qui fournit les fonctionnalités suivantes :
            <ul>
              <li>compatibilité Node.js et navigateur ;</li>
              <li>gestion du code synchrone et asynchrone (callback, promesses, async/await) ;</li>
              <li>plusieurs syntaxes (appelées <code>interfaces</code>) sont proposées : par défaut, c'est l'interface BDD (Behaviour Driven Development) ;</li>
              <li>plusieurs formats de rapport (appelées <code>reporters</code>) sont proposés.</li>
            </ul>
          </p>
          <p>
            Pour définir un test, il suffit d'utiliser la fonction <code>it()</code>. <code>describe()</code> permet de créer des groupes et sous-groupes de tests :

            <pre v-highlightjs><code language="javascript">
const assert = require('assert');
// describe() est une fonction qui définit un "groupe" de tests
describe('Array#indexOf', () => {
  // it() est une fonction qui définit un test (pas d'inclusion)
  it('should return -1 when the value is not present', () => {
    // contenu du test : si le test lance une exception, il échoue
    assert.equal(-1, [1,2,3].indexOf(5));
    assert.equal(-1, [1,2,3].indexOf(0));
  })

  it('should return index when the value is present', () => {
    assert.equal(2, [1,2,3].indexOf(3));
    assert.equal(0, [1,2,3].indexOf(1));
    // s'il arrive à la fin, il réussit
  })
})</code></pre>
            Dans l'exemple ci-dessus :
            <ul>
              <li><code>assert</code> est un module qui fait parti du coeur de Node.js (ci-dessous, nous présenterons la librairie <code>chai</code> qui est fonctionnellement plus riche) ;</li>
              <li><code>describe()</code> et <code>it()</code> sont des fonctions globales qui sont définies par mocha (il n'y a donc pas besoin d'utiliser <code>require</code> pour importer mocha) ;</li>
              <li>l'intérêt d'utiliser la syntaxe BDD est qu'elle permet de faire des phrases expliquant le cas de test (ex : "it should return -1 when the value is not present")</li>
            </ul>
          </p>

          <p>
            Il possible de tester une fonction asynchrone. Pour cela, il suffit de rajouter un callback comme paramètre de la fonction, et de l'appeler une fois que toutes les assertions ont été exécutées :

            <pre v-highlightjs><code language="javascript">
const assert = require('assert');
const fs = require('fs');
const path = require('path');
// describe() est une fonction qui définit un "groupe" de tests
describe('fs#stat', () => {
  // it() est une fonction qui définit un test (pas d'inclusion)
  it.only('should call callback with size in object', (done) => {
    // contenu du test : si le test lance une exception, il échoue
    fs.stat(path.join(__dirname, 'package.json'), (err, stat) => {
      assert.ifError(err);
      assert.ok(stat);
      assert.ok(stat.size);
      done();
    })
  })
})</code></pre>
          </p>

          <p>
            Il également possible :
            <ul>
              <li>d'ignorer un test ou groupe de tests en remplaçant <code>it</code> ou <code>describe</code> respectivement par <code>it.skip</code> ou <code>describe.skip</code> ;</li>
              <li>de n'exécuter qu'un test ou groupe de tests en remplaçant <code>it</code> ou <code>describe</code> respectivement par <code>it.only</code> ou <code>describe.only</code> ;</li>
              <li>de rajouter un "hook" <code>before</code> qui s'exécutera avant les tests du groupe de tests dans lequel il se situe ;</li>
              <li>de rajouter un "hook" <code>beforeEach</code> qui s'exécutera avant chaque test du groupe de tests dans lequel il se situe ;</li>
              <li>de rajouter un "hook" <code>after</code> qui s'exécutera après les tests du groupe de tests dans lequel il se situe ;</li>
              <li>de rajouter un "hook" <code>afterEach</code> qui s'exécutera après chaque test du groupe de tests dans lequel il se situe.</li>
            </ul>

            <pre v-highlightjs><code language="javascript">
describe('Array', () => {
  let array = []

  beforeEach((done) => {
    array = [1, 2, 3];
    done();
  })

  it('should splice() remove elements', {skip: true}, (done) => {
    expect(array.splice(1, 1)).to.deep.equals([1, 3]);
    done();
  })
})</code></pre>

            <v-alert outlined :value="true" color="info" icon="info" outline>
              Mocha s'exécute en 2 phases:
              <ul>
                <li>dans un premier temps, il exécute le code des <code>describe</code> et stocke en mémoire tous les tests et les "hooks" qu'il devra exécuter ;</li>
                <li>dans un second temps, il exécute les tests.</li>
              </ul>
              Il faut donc bien faire attention à ne pas initialiser les données de tests en dehors des "hooks" ou des tests.
            </v-alert>
          </p>

          <p>
            Pour lancer les tests, il ne reste plus qu'à lancer la commande <code>mocha</code>. Pour cela, il faut :
            <ul>
              <li>soit avoir installé mocha en <code>devDependencies</code>, et utiliser mocha dans le script <code>test</code> du fichier package.json (recommandé);</li>
              <li>soit avoir installé mocha de manière globale avec <code>npm install -g mocha</code>.</li>
            </ul>

            <v-alert outlined :value="true" color="info" icon="info" outline>
              Pour accélerer le développement, il est possible d'utiliser la commande <code>mocha -w</code>, qui relance automatiquement les tests dès qu'un fichier .js est modifié.
            </v-alert>
          </p>

          <v-card-title class="subheading primary--text">Calculer la couverture de code avec Istanbul/NYC</v-card-title>
          <p>
            <a href="https://istanbul.js.org/">NYC/Istanbul</a> est un outil permettant de calculer la couverture de code.
            Pour cela, il faut :
            <ul>
              <li>installer <code>nyc</code> (comme <code>devDependencies</code> ou de manière globale)</li>
              <li>préfixer la commande <code>mocha</code> par <code>nyc</code> (ex: <code>nyc mocha</code>)</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Ecrire des assertions avec chai</v-card-title>
          <p>
            <a href="https://www.chaijs.com/">Chai</a> permet de faire des assertions plus poussées que le module <code>assert</code> de Node.js.<br>
            Tout comme mocha, chai propose plusieurs syntaxes : nous utiliserons <a href="https://www.chaijs.com/api/bdd/">expect</a>.
            <pre v-highlightjs><code language="javascript">
// notez l'inclusion de chai
const expect = require('chai').expect;

describe('Array#indexOf', () => {
  it('should return -1 when the value is not present', (done) => {
    const array = [1, 2, 3];

    // permet de faire la même chose...
    expect(array.indexOf(5)).to.equal(-1);

    //...et des assertions bien plus expressives !
    expect(array).to.be.an.instanceof(Array).and.to.have.a.lengthOf(3);
    expect(array).to.include(2);
    expect(array).not.to.contain(4);
    done();
  });
});</code></pre>
          </p>
          <p>
            Il est possible de chaîner plusieurs mots-clés :
            <ul>
              <li>certains déclenchent une validation : <code>equal()</code> pour vérifier l'égalité, <code>include()</code> pour vérifier qu'un tableau contient un élément...</li>
              <li>d'autres permettent de modifier une validation : <code>not</code> pour inverser la conditition, <code>deep</code> pour comparer en profondeur (et non pas en référence)</li>
              <li>certains mots-clés sont sans effet, et ne servent qu'à la compréhension : <code>to</code>, <code>be</code>, <code>an</code>...</li>
            </ul>
          </p>
          <p>
            Les assertions les plus utilisées :
            <ul>
              <li>égalité : <code>expect(x)/*not.*/.to./*deep.*/equals(y)</code></li>
              <li>existance : <code>expect(x).to.be.null</code>, <code>expect(x).to.exist</code></li>
              <li>taille des tableaux : <code>expect(x).to.be.empty</code>, <code>expect(x).to.have.length(y)</code></li>
              <li>objets : <code>expect(x).to.have./*nested.*/property('model.name').that.equals(z)</code></li>
              <li>contenu : <code>expect(x).to.contain/*.keys*/(y)</code></li>
              <li>nombres : <code>expect(x).to.be.at.least(y).and.at.most(z)</code></li>
              <li>fourre-tout : <code>expect(1).to.satisfy((num) => {return num > 0;})</code></li>
              <li>exception : <code>expect(() => {}).to.throw(/message/)</code></li>
            </ul>
          </p>

          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Tester le module <code>app/fs-utils.js</code> avec mocha et chai :
            <ul>
              <li>ajouter un script <code>test</code> au package.json qui lance les tests ;</li>
              <li>ajouter un script <code>watch</code> au package.json qui relance automatiquement les tests à chaque modification de fichier ;</li>
              <li>
                tester avec mocha et chai les cas suivants :
                <ul>
                  <li>le chemin désigne un dossier qui existe ;</li>
                  <li>le chemin désigne un fichier ;</li>
                  <li>le chemin designe un dossier qui n'existe pas.</li>
                </ul>
              </li>
              <li>modifier le script <code>test</code> du package.json pour calculer la couverture de code.</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>
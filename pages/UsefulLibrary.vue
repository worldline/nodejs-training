<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Annexe : Librairies utiles</v-card-title>
        <v-card-text>
          Dans cette partie, nous allons détailler quelques librairies utiles sur vos futurs projets Node.js
        </v-card-text>
        <v-card-text>
          <v-card-title class="subheading primary--text">Lodash</v-card-title>
          <p>
            La librairie <a href="https://lodash.com">lodash</a> contient un ensemble de fonctions utilitaires permettant de gérer les <code>Array</code>, <code>Object</code>, <code>Function</code>, <code>Collection</code>, etc.<br><br>

            Les méthodes <code>_.get</code>, <code>_.set</code>, <code>_.has</code> sur un objet permettent d'éviter les <code>ReferenceError</code><br>
            <!-- eslint-disable -->
            <runkit-embedded>
const _ = require('lodash');

const a = {};
// Avec un chemin inexistant
let foo = _.get(a, 'b.c[3].d.e');
console.log(foo);

// et une valeur par défaut
foo = _.get(a, 'b.c[3].d.e', 'default');
console.log(foo);

// Exemple de set avec un chemin
_.set(a, 'b.c[3].d.e', 'e');
            </runkit-embedded>
            <!-- eslint-enable -->
            <br>
            <v-alert outlined :value="true" color="warning" icon="warning" outline>
              Les versions récentes de JavaScript permettent de limiter l'usage de lodash. Pour plus d'information <a href="https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore">You don't need lodash</a>
            </v-alert>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading primary--text">Moment.js</v-card-title>
          <p>
            La librarie <a href="https://momentjs.com/">moment</a> permet de manipuler simplement des dates : formatage, parsage, etc.<br><br>

            <!-- eslint-disable -->
            <runkit-embedded>
const moment = require('moment');

// Format de la date
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log(moment().format('YYYY [escaped] YYYY'));

// Opération relative
console.log(moment("20120620", "YYYYMMDD").fromNow());

// Support des locales
moment.locale('fr');
console.log(moment().format('LLL'));
moment.locale('en');
moment().format('LLL');
            </runkit-embedded>
            <!-- eslint-enable -->
            <br>

            Le support des <i>timezones</i> est ajouté par <a href="https://momentjs.com/timezone/">moment-timezone</a> :<br><br>

            <!-- eslint-disable -->
            <runkit-embedded>
const moment = require('moment-timezone');

var jun = moment("2014-06-01T12:00:00Z");
var dec = moment("2014-12-01T12:00:00Z");

console.log(jun.tz('America/Los_Angeles').format('ha z'));
console.log(dec.tz('America/Los_Angeles').format('ha z'));

console.log(jun.tz('Australia/Sydney').format('ha z'));
dec.tz('Australia/Sydney').format('ha z');
            </runkit-embedded>
            <!-- eslint-enable -->
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading primary--text">Sinon.js</v-card-title>
          <p>
            <a href="https://sinonjs.org/">Sinon.js</a> est une librairie qui propose notamment des <code>fakes</code>, et <code>mocks</code> pour JavaScript.<br><br>

            <v-card-title class="subheading secondary--text"><code>fake</code></v-card-title>
            Les <a href="https://sinonjs.org/releases/v7.3.1/fakes/">Fakes</a> ont été introduits avec Sinon v5. Ils simplifient et fusionnent les concepts de <a href="https://sinonjs.org/releases/v7.3.1/fakes/">Spies</a> et <a href="https://sinonjs.org/releases/v7.3.1/fakes/">Stubs</a>.<br><br>

            Un <code>fake</code> est une fonction qui enregistre ses arguments et retourne une valeur.<br>

            <!-- eslint-disable -->
            <runkit-embedded>
const sinon = require('sinon');

// Exemple de fake sans comportement
let fake = sinon.fake();
fake();
console.log(fake.callCount);

// Exemple de fake retournant une valeur
fake = sinon.fake.returns('apple pie');
console.log(fake());
console.log(fake.args);
console.log(fake);

// Exemple de fake propageant une exception
fake = sinon.fake.throws(new Error('not apple pie'));
fake();
            </runkit-embedded>
            <!-- eslint-enable -->
            <br>

            Ces fake peuvent être utilisés avec la fonction <code>sinon.replace</code> pour simuler le comportement d'un objet existant :<br><br>

            <!-- eslint-disable -->
            <runkit-embedded>
const sinon = require('sinon');

// Une object de fonctions utilitaires
const utils = {
  sayGoodMorning: name => `Good morning ${name}!`
};
console.log(utils.sayGoodMorning('Yann'));

// On remplace le comportement initial par un fake
const sayGoodAfternoon = sinon.fake.returns('Good afternoon Yann!');
sinon.replace(utils, 'sayGoodMorning', sayGoodAfternoon);
console.log(utils.sayGoodMorning('Yann'));

// Restaure toutes les propriétés modifiées par Sinon (replace, spies, stubs)
sinon.restore();
utils.sayGoodMorning('Yann');
            </runkit-embedded>
            <!-- eslint-enable -->
          </p><br>

          <v-card-title class="subheading secondary--text"><code>mock</code></v-card-title>
          Les <a href="https://sinonjs.org/releases/v7.3.1/mocks/">Mocks</a> ne modifient pas un objet mais créent un <i>objet mock</i> avec de fausses méthodes et des comportements attendus pré-définis.<br><br>

          Par exemple, si l'on souhaite s'assurer que la méthode <code>smsManager.sendTo</code> est bien appelée deux fois dans la fonction <code>api()</code> :
          <pre v-highlightjs>
            <code class="javascript">
const sinon = require('sinon');

const api() => {
smsManager.sendTo('Yann', 'Yo!');
smsManager.sendTo('Quentin', 'Yo!');
};

// On utilise un mock sur l'objet "smsManager"
const mock = sinon.mock(smsManager);
mock.expects('sendTo').twice();

// L'appel à la fonction "api" n'enverra pas les SMS
api();

// Propagera une exception s'il n'y a pas exactement 2 appels à "sendTo" dans "api()"
mock.verify();
            </code>
          </pre>
          <br>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            <code>Sinon</code> apporte également d'autres fonctionnalités comme les <code>stubs</code>, <code>spies</code>, <code>spy calls</code>, <code>fake timers</code>, pour plus d'informations voir la <a href="https://sinonjs.org/releases/v7.3.1/">documentation officielle</a>.
          </v-alert>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import RunkitEmbedded from '../components/runkit-embedded'
export default {
  components: { RunkitEmbedded }
}
</script>
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">La gestion des évènements</v-card-title>
        <v-flex xs2>
          <img src="~/assets/pubsub-1.png" alt="Event" class="mb-5 pl-5">
        </v-flex>

        <v-card-text>
          <v-card-title class="subheading primary--text">La classe EventEmitter</v-card-title>
          <p>
            Une grande partie du coeur de l'API Node.js est construite autour d'une architecture orientée évènements. Il y a deux rôles possibles :
            <ul>
              <li><b>Emetteur</b> : il émet un évènement identifié par son nom</li>
              <li><b>Auditeur</b> : il s'inscrit à l'évènement d'un émetteur, pour être réveillé lors de l'émission</li>
            </ul>
            <br>
            La classe <a href="https://nodejs.org/api/events.html">EventEmitter</a> implémente ce pattern :<br>
            <ul>
              <li><code>on(evt, callback)</code> enregistre la fonction auditrice pour <code>evt</code></li>
              <li><code>emit(evt, arg1, arg2...)</code> déclenche tous les auditeurs de <code>evt</code> en leur passant tous les paramètres</li>
              <li><code>removeListener(evt, cb)</code> désinscrit un auditeur</li>
              <li><code>removeAllListeners(evt)</code> désinscrit tous les auditeurs</li>
              <li><code>once(evt, cb)</code> inscrit un auditeur qui sera automatiquement désinscrit après le premier évènement</li>
            </ul>
            <br>

            <!-- eslint-disable -->
            <runkit-embedded>
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;

myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Prints: 2
            </runkit-embedded>
            <!-- eslint-enable -->

            <br>
            <v-alert :value="true" color="warning" icon="warning" outline>
              <ul>
                <li>Il est <b>impératif</b> de désinscrire les auditeurs !</li>
                <li>Si l'évènement <code>error</code> est émis et non écouté, il se transforme en <b>exception</b> !</li>
              </ul>
            </v-alert>
            <br>
            <!-- eslint-disable -->
            <runkit-embedded>
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.emit('error', new Error('whoops!'));
// Throws and crashes Node.js
            </runkit-embedded>
            <!-- eslint-enable -->
            <br>
            <ul>
              <li>Le bout de code précédent lève une exception et quitte le processus Node.js</li>
              <li>Complétez-le afin d'afficher un <code>console.log</code> à la place</li>
            </ul>
          </p>
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
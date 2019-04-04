<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Présentation</v-card-title>
        <v-card-text>
          <p>Node.js est un <b>environnement d'éxécution</b> JavaScript. Il est construit sur le moteur JavaScript <b>V8</b> de Chrome et se distingue des autres plateformes par son approche non bloquante permettant d'effectuer des <b>entrées / sorties</b> (I/O) de façon <b>asynchrone</b>.</p>
          <br>
          <div class="mb-5 text-xs-center">
            <img src="~/assets/nodejs-libuv-v8.png" alt="Node.js + libuv + V8" class="mb-5">
          </div>
          <ul>
            <li><b>libuv</b> est une bibliothèque C multi-plateforme qui prend en charge les entrées / sorties asynchrones basées sur des boucles d'événement</li>
            <li><b>V8</b> est un moteur JavaScript libre et open source développé par Google en C++</li>
          </ul>
          <br>
          <p>JavaScript est un langage <b>single-threaded</b> : le code s'exécute sur un seul et unique thread; aucun appel n'est dispatché. Node.js se base également sur le même principe, il est architecturé sur le modèle : "Single Thread Event Loop Model"</p>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">Historique</v-card-title>
        <v-card-text>
          <p>Quelques dates importantes :</p>
          <ul>
            <li>1995 : Création du langage LiveScript, inspiré du Java, interprété conçu pour écrire des serveur HTTP. Il sera renommé en JavaScript dans sa version intégré par Netscape;</li>
            <li>1997 : Spécification du langage par l'ECMA;</li>
            <li>2006 : Lancement de JQuery;</li>
            <li>2008 : Le moteur V8 est intégré dans Chrome et Chromium;</li>
            <li>2009 : Création de Node.js;</li>
            <li>2015 : EcmaScript 2015 (ES6) est approuvé le 17 juin;</li>
            <li>2018 : Node.js V10 en LTS (Support à Long Terme) le 24 avril.</li>
          </ul>
          <div class="mb-5 text-xs-center">
            <img src="~/assets/nodejs-history.png" alt="Node.js + libuv + V8" class="mb-5">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      sourceCode: 'const s = new Date().toString()'
    }
  }
}
</script>
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">L'asynchronisme avec les promesses</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Qu'est-ce qu'une promesse ?</v-card-title>
          <p>
            La promesse est une alternative aux callbacks. Plusieurs librairies fournissent une implémentation de la promesse.
            Cependant, cette fonctionnalité est maintenant implémentée en ES6 : nous pouvons donc les utiliser sans avoir besoin d'une dépendance externe.
          </p>

          <p>
            Concrètement, les promesses sont matérialisées par une classe <code>Promise</code> :
            <ul>
              <li>
                Le constructeur s'appelle de la manière suivante : <code>new Promise((resolve, reject) => { ... });</code> avec
                <ul>
                  <li><code>resolve()</code> qui doit être appelé en cas de succès (accepte en paramètre le résultat du traitement)</li>
                  <li><code>reject()</code> qui doit être appelé en cas d'erreur (accepte en paramètre l'erreur)</li>
                </ul>
                Le code de la fonction passée en paramètre du constructeur est executé dès la création de la promesse.
                <br>
                Par exemple:
                <pre v-highlightjs><code language="js">
const { readFile } = require('fs');
const { join } = require('path');
const getFileContent = () => {
  return new Promise((resolve, reject) => {
    readFile(join(__dirname, 'package.json'), (err, res) {
      if(err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}</code></pre><br>
              </li>
              <li>
                Les méthodes de la classe <code>Promise</code> sont :
                <ul>
                  <li><code>then()</code> qui définit la fonction qui sera appelée lorsque la promesse sera résolue (i.e. : l'opération asynchrone s'est terminée avec succès) ;</li>
                  <li><code>catch()</code> qui définit la fonction qui sera appelée lorsque la promesse sera rejetée (i.e. : l'opération asynchrone s'est terminée avec une erreur).</li>
                </ul>
                Par exemple:
                <pre v-highlightjs><code language="js">
getFileContent().then((res) => {
  console.log(res.statusCode);
})
.catch((err) => {
  console.log(err);
})</code></pre>
              </li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Exécuter plusieurs promesses en séries</v-card-title>
          <p>
            La méthode <code>.then()</code> retourne une promesse qui :
            <ul>
              <li>sera résolue avec la valeur retournée par la fonction en paramètre du <code>then</code> (dans le cas où il ne s'agit pas d'une promesse)</li>
              <li>sera rejetée avec l'erreur levée (<code>thrown</code> par la fonction en paramètre du <code>then</code></li>
              <li>sera résolue ou rejetée de la même manière que la promesse retournée par la fonction en paramètre du <code>then</code> (dans le cas où il s'agit d'une promesse)</li>
            </ul>

            Il est donc possible de chaîner les appels à <code>.then()</code> et avoir un seul <code>.catch()</code> :
            <pre v-highlightjs><code language="js">
doSomething().then((result) => {
  // doSomethingElse retourne une valeur qui n'est pas une promesse
  return doSomethingElse(result);
})
.then((newResult) => {
  // doThirdThing retourne une promesse
  return doThirdThing(newResult);
})
.then((finalResult) => {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);</code></pre>
          </p>

          <v-alert :value="true" color="info" icon="info" outline>
            C'est l'équivalent de la méthode <code>async.waterfall()</code> qui est utilisée pour les callbacks.
          </v-alert>

          <v-card-title class="subheading primary--text">Exécuter plusieurs promesses en parallèle</v-card-title>
          <p>
            La méthode <code>Promise.all()</code> :
            <ul>
              <li>accepte en paramètre un tableau de promesses ;</li>
              <li>permet d'exécuter plusieurs promesses en parallèle ;</li>
              <li>retourne une promesse, rejetée à la première erreur, ou résolue quand toutes les promesses en entrée sont résolues.</li>
            </ul>
          </p>

          <v-alert :value="true" color="info" icon="info" outline>
            C'est l'équivalent de la méthode <code>async.parallel</code> qui est utilisée pour les callbacks.
          </v-alert>

          <v-card-title class="subheading primary--text">Autres fonctions utilitaires</v-card-title>
          <p>
            Le module <code>util</code> propose :
            <ul>
              <li>la fonction <code>promisify</code> pour convertir une fonction "callback-style" en fonction "promise-style" ;</li>
              <li>la fonction <code>callbackify</code> pour convertir une fonction "promise-style" en fonction "callback-style".</li>
            </ul>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            <ol>
              <li>
                Dans le module <code>app/fs-utils.js</code> :
                <ul>
                  <li>modifier la fonction <code>getDirContent()</code> pour qu'elle retourne une promesse et n'utilise plus de callback ;</li>
                  <li>modifier la fonction <code>getDirStat()</code> pour qu'elle retourne une promesse et n'utilise plus de callback.</li>
                </ul>
              </li>
              <li>
                Modifier les tests en conséquence.
                <v-alert :value="true" color="info" icon="info" outline>
                  Mocha gère les promesses : <a href="https://mochajs.org/#working-with-promises">https://mochajs.org/#working-with-promises</a>.<br>
                  Pour Chai, il existe un plugin qui permet de faire des assertions sur les promesses : <a href="https://www.chaijs.com/plugins/chai-as-promised/">https://www.chaijs.com/plugins/chai-as-promised/</a>.
                </v-alert>
              </li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
</script>
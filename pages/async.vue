<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Les mots clés async / await</v-card-title>

        <v-card-text>
          <p>
            Afin de faciliter l'écriture de code asynchrone, JavaScript permet maintenant d'utiliser 2 nouveaux mots clés <code>async</code> et <code>await</code>.
            Ils sont disponibles depuis ES2017 (Node.js 8).
          </p>

          <v-card-title class="subheading primary--text">async</v-card-title>
          <p>
            <code>async</code> est un nouveau mot-clé qui se place avec la déclaration d'une fonction.
            La fonction retournera alors une promesse :
            <ul>
              <li>qui sera rejetée à la première erreur levée (<code>throw</code>) ;</li>
              <li>qui sera résolue avec la valeur retournée par la fonction s'il n'y a pas d'erreur.</li>
            </ul>
          </p>
          <p>
            Ainsi, les 2 fonctions suivantes sont équivalentes :
            <ul>
              <li>
                avec <code>async</code> :
                <pre v-highlightjs><code language="js">
const doHello = async (name) => {
  if(! name) {
    throw 'name is missing';
  }
  return `Hello ${name}`
};</code></pre>
              </li>
              <li>
                avec une promesse :
                <pre v-highlightjs><code language="js">
const doHello = (name) => {
  return new Promise((resolve, reject) => {
    if(! name) {
      reject('name is missing');
      return;
    }
    resolve(`Hello ${name}`);
  });
};</code></pre>
              </li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">await</v-card-title>
          <p>
            <code>await</code> est un nouveau mot-clé qui se place avant une promesse :
            <ul>
              <li>si la promesse est résolue, son résultat est retourné (on peut alors l'affecter à une variable) ;</li>
              <li>si la promesse est rejetée, une erreur est levée (<code>throw</code>).</li>
            </ul>
            A noter : le mot-clé <code>await</code> ne peut-être utilisé que dans une fonction <code>async</code>.
          </p>
          <p>
            Exemple :
            <pre v-highlightjs><code language="js">
const doHelloTwice = async () => {
  const hello1 = await doHello('bob');
  const hello2 = await doHello('alice');
  return `${hello1}, ${hello2}`;
};</code></pre>
          </p>

          <v-alert :value="true" color="info" icon="info" outline>
            Ces deux nouveaux mot-clés n'ajoutent pas de fonctionnalités par rapport aux promesses, mais permettent avant tout de simplifer le code.
            En effet :
            <ul>
              <li>la syntaxe est simplifiée (pas besoin d'utiliser <code>.then</code> et <code>.catch</code>) ;</li>
              <li>les lignes de code s'exécutent dans l'ordre dans lequel elles sont écrites (comme du code synchrone, mais sans bloquer le thread) ;</li>
              <li>les erreurs synchrones et asynchrones sont gérées de la même façon, en utilisant <code>throw</code> pour relever une erreur et <code>try/catch</code> pour les récupérer.</li>
            </ul>
          </v-alert>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            <ol>
              <li>
                Dans le module <code>app/fs-utils.js</code>, modifier les fonctions <code>getDirContent()</code> et <code>getDirStat()</code>
                pour utiliser <code>async</code> et <code>await</code> (et donc ne plus utiliser <code>new Promise()</code>, <code>.then()</code>...)
              </li>
              <li>
                Modifier les tests pour utiliser <code>async</code> et <code>await</code>.
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
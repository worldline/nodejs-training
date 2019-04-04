<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">L'asynchronisme avec les callbacks</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Pourquoi l'asynchronisme en Javascript ?</v-card-title>
          <p>
            JavaScript (executé par V8 en Node.js) est mono-thread, c'est à dire que :
            <ul>
              <li>il n'y a pas plus d'une instruction executée à la fois ;</li>
              <li>
                pour un serveur web, toutes les requêtes HTTP entrantes vont être traitées par le même thread.<br>
              </li>
            </ul>
          </p>
          <v-alert :value="true" color="error" icon="warning" outline>
            Il est important de ne pas bloquer le thread trop longtemps pour ne pas impacter les autres requêtes.
          </v-alert>

          <v-card-title class="subheading primary--text">Les fonctions asynchrones</v-card-title>
          <p>
            Ainsi, pour les opérations d'entrées/sorties (lecture/écriture de fichier, requête HTTP...), il faut utiliser des fonctions asynchrones afin de ne pas bloquer le thread.<br>
            La convention est que :
            <ul>
              <li>les fonctions asynchrones acceptent en dernier paramètre (souvent nommé <code>done</code>) une fonction (appelée <strong>callback</strong>) ;</li>
              <li>la fonction <strong>callback</strong> sera appelée une fois le traitement asynchrone terminée, et accepte comme premier paramètre une erreur.</li>
            </ul>
          </p>
          <p>
            L'exécution d'une fonction asynchrone ne bloque pas sur l'opération I/O : celle-ci est faite en arrière-plan par Node.js et l'exécution du code JavaScript continue.<br>
            A la fin de l'opération I/O, Node.js (<code>libuv</code> plus précisément) placera le callback dans un liste d'attente, qui sera dépilée et exécutée lorsque le thread sera disponible
            (les instructions en cours d'exécution ne sont pas interrompues).

            <v-alert :value="true" color="info" icon="info" outline>
              Node.js propose également des fonctions synchrones pour effectuer des opérations I/O : il ne faut pas les utiliser afin de ne pas dégrader les performances.<br>
              Il existe cependant quelques rares cas où il peut être nécessaire de les utiliser (par exemple au démarrage de l'application).
            </v-alert>
          </p>

          <p>
            Exemple de code asynchrone :
            <!-- eslint-disable -->
            <runkit-embedded>
const fs = require("fs");
const { join } = require("path");

fs.readdir(__dirname, (err, dirs) => {
    if(err) {
        console.log('cannot read dir');
        return;
    }
    console.log(`fichiers dans le dossier courant : ${dirs.join()}`);
});
fs.stat(join(__dirname, 'package.json'), (err, stat) => {
    if(err) {
        console.log('cannot read file package.json');
        return;
    }
    console.log(`taille du fichier package.json : ${stat.size}`);
});
console.log('fin du fichier');
            </runkit-embedded>
            <!-- eslint-enable -->

            A noter :
            <ul>
              <li><code>fin du fichier</code> sera toujours la première ligne affichée en console ;</li>
              <li>les 2 lectures disques sont faites en parallèle ;</li>
              <li>l'ordre des 2 autres lignes n'est pas défini.</li>
            </ul>
          </p>

          <p>
            Exemple de code synchrone :
            <!-- eslint-disable -->
            <runkit-embedded>
const fs = require("fs");
const { join } = require("path");

try {
    const dirs = fs.readdirSync(__dirname)
    console.log(`fichiers dans le dossier courant : ${dirs.join()}`);
} catch (err) {
    console.log('cannot read dir');
}

try {
    const stat = fs.statSync(join(__dirname, 'package.json'))
    console.log(`taille du fichier package.json : ${stat.size}`);
} catch (err) {
    console.log('cannot read file package.json');
}

console.log('fin du fichier');
            </runkit-embedded>
            <!-- eslint-enable -->

            A noter :
            <ul>
              <li>les lignes sont affichées dans l'ordre du code ;</li>
              <li>les 2 lectures disques sont faites en séquentiel ;</li>
              <li>NodeJS ne peut rien faire d'autre pendant que le code est executé.</li>
            </ul>
          </p>


          <v-card-title class="subheading primary--text">Asynchronisme vs. synchronisme</v-card-title>
          <p>
            Le code synchrone :
            <ul>
              <li>s'exécute dans l'ordre dans lequel il est écrit, ce qui le rend plutôt simple à comprendre et à lire ;</li>
              <li>
                par contre, dans un contexte de forte concurrence : beaucoup de threads vont être créés et
                le système d'exploitation va devoir sans cesse passer d'un thread à l'autre (ce qu'on appelle la <a href="https://fr.wikipedia.org/wiki/Commutation_de_contexte">commutation de contexte</a>).
                Dans le cas d'une application qui fait beaucoup d'I/O, le cumul de toutes ces commutations de contexte peut représenter une charge CPU relativement importante.
              </li>
            </ul>
          </p>
          <p>
            Le code asynchrone :
            <ul>
              <li>ne s'exécute pas dans l'ordre dans lequel il est écrit, ce qui le rend plutôt difficile à appréhender ;</li>
              <li>il n'y a qu'un seul thread, donc pas de commutation de contexte, ce qui est plus performant dans un contexte où il y a beaucoup d'I/O ;</li>
              <li>les opérations I/O sont (pour la plupart) gérées avec des méchanismes de traitement d'évènements (par exemple : <code>epoll</code> sous Linux...)</li>
            </ul>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            <ol>
              <li>
                Créer un module <code>app/fs-utils.js</code> qui exporte une fonction <code>getDirContent()</code> :
                <ul>
                  <li>la fonction accepte 2 paramètres : le chemin absolu du dossier et une fonction callback ;</li>
                  <li>la fonction invoque le callback avec 2 paramètres : une erreur et un tableau contenant les chemins absolus des fichiers et sous-dossiers.</li>
                </ul>
              </li>
              <li>
                Tester la fonction en l'invoquant avec les cas suivants :
                <ul>
                  <li>le chemin désigne un dossier qui existe ;</li>
                  <li>le chemin désigne un fichier ;</li>
                  <li>le chemin designe un dossier qui n'existe pas.</li>
                </ul>
              </li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RunkitEmbedded from '../components/runkit-embedded'

export default {
  components: { RunkitEmbedded },
  data: () => ({
    isVisible: false
  })
}
</script>
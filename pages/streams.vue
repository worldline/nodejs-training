<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Les streams</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">A quoi ça sert ?</v-card-title>
          <p>
            Il est parfois nécessaire de traiter de gros volumes de données. Dans ces cas-là, il n'est pas envisageable de charger toutes les données en mémoire.
            Il faut donc traiter les données au fil de l'eau.
          </p>

          <p>
            Pour cela, Node.js propose les <a href="https://nodejs.org/api/stream.html">streams</a>. Il existe 4 types de streams :
            <ul>
              <li><a href="https://nodejs.org/api/stream.html#stream_readable_streams">Readable</a> : c'est un flux sur lequel on peut lire des données ;</li>
              <li><a href="https://nodejs.org/api/stream.html#stream_class_stream_writable">Writable</a> : c'est un flux sur lequel on peut écrire des données ;</li>
              <li><a href="https://nodejs.org/api/stream.html#stream_class_stream_duplex">Duplex</a> : c'est un flux sur lequel on peut lire et/ou écrire des données ;</li>
              <li><a href="https://nodejs.org/api/stream.html#stream_class_stream_transform">Transform</a> : c'est un flux Duplex qui écrit des données en fonction des données qu'il lit.</li>
            </ul>
          </p>

          <p>
            La classe <code>Stream</code> hérite de <a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a>, et peut émettre divers évènements, notamment :
            <ul>
              <li><code>error</code> : quand une erreur survient ;</li>
              <li><code>end</code> : quand un <code>Readable</code> lorsqu'il n'y a plus de données à lire ;</li>
              <li><code>data</code> : quand un <code>Readable</code> a des données à lire (flowing mode : les données sont passées avec l'évènement) ;</li>
              <li><code>readable</code> : quand un <code>Readable</code> a des données à lire (paused mode : il faut appeler <code>read()</code> pour lire les données) ;</li>
              <li><code>drain</code> : quand un <code>Writable</code> à la capacité d'écrire des données ;</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Combiner des streams</v-card-title>
          <p>
            Il est également possible de combiner des opérations sur des flux de données grâce à la méthode <a href="https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options">pipe()</a>, par exemple :
            <pre v-highlightjs><code language="javascript">fs.createReadStream('file.txt').
    pipe(zlib.createGzip()).
    pipe(fs.createWriteStream('file.txt.gz'));</code></pre>
            <br>
            Ce bout de code va :
            <ul>
              <li>Lire un fichier ;</li>
              <li>Compresser le contenu en gzip ;</li>
              <li>Ecrire le tout dans un autre fichier.</li>
            </ul>

            Le principal intérêt d'utiliser la méthode <code>pipe()</code> est qu'elle gère elle-même le buffering (et les évènements <code>data</code>, <code>drain</code>...).
            Il faut tout de même gérer les cas d'erreur.
          </p>

          <p>
            Sans le savoir, nous avons utilisé des variables de type <code>Stream</code> :
            <ul>
              <li>le paramètre <code>req</code> des middlewares express est un <code>Readable</code> ;</li>
              <li>le paramètre <code>res</code> des middlewares express est un <code>Writable</code> ;</li>
              <li><code>got</code> peut retourner un <code>Duplex</code> avec l'option <code>stream: true</code> (voir <a href="https://www.npmjs.com/package/got#gotstreamurl-options">got stream</a>).</li>
            </ul>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Dans notre serveur express, rajouter et tester une nouvelle route <code>GET /download/foo/bar</code> (avec <code>foo</code> et <code>bar</code> qui sont des paramètres) :
            <ol>
              <li>qui retourne le contenu du fichier <code>foo/bar</code> ;</li>
              <li>qui retourne une erreur 404 si le fichier ne peut être lu (fichier inexistant...).</li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
</script>
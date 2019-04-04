<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">L'asynchronisme avec les callbacks (2) - La librairie async</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Aller plus loin avec les callbacks</v-card-title>
          <p>
            L'écriture de code avec plusieurs appels asynchrones (en série ou en parallèle) peut s'avérer compliqué. En effet, il faut :
            <ul>
              <li>appeler le callback une unique fois tout à la fin lorsque toutes les opérations asynchrones ont été effectuées avec succès ;</li>
              <li>appeler le callback une unique fois dans le cas où une erreur survient.</li>
            </ul>

            De ce fait, on se retrouve souvent à avoir un callback, qui va appeler un callback... C'est ce qu'on appelle le <strong>callback hell</strong> :
            <pre v-highlightjs><code language="js">
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})</code></pre>
          </p>

          <v-card-title class="subheading primary--text">La librairie async</v-card-title>
          <p>
            La solution est donc d'utiliser la librairie <a href="https://caolan.github.io/async/">async</a>,
            qui permet de facilement gérer des workflows d'appels asynchrones.
          </p>

          <p>
            Par exemple, <code>map</code> permet d'effectuer en parallèle la même opération asynchrone sur tous les éléments d'un tableau :
            <pre v-highlightjs><code language="js">async.map(['file1','file2','file3'], (file, next) => {
  // appliqué de manière asynchrone sur tous les éléments du tableau
  // la signature de next est next(err, result)
  fs.readFile(file, next);
}, (err, results) => {
  // err est la première erreur renvoyée (le callback est appelée dès la 1ère erreur)
  // results est le tableau (ordonné) des résultats intermédiaires
});</code></pre><br>
            Il existe également les variantes :
            <ul>
              <li><code>mapSeries</code> qui permet d'effectuer les traitements en séries ;</li>
              <li><code>mapLimit</code> qui permet de limiter le nombre d'éléments traités en parallèle.</li>
            </ul>
          </p>

          <p>
            La méthode <code>parallel</code> permet d'effectuer en parallèle plusieurs opérations asynchrones distinctes :
            <pre v-highlightjs><code language="js">async.parallel([
  (done) => {
    // la signature de done est done(err, result)
    fs.readFile('in.txt', done);
  }, (done) => {
    fs.writeFile('out.txt', 'finished !', done);
  }
], (err, results) => {
  // err est la première erreur renvoyée (le callback est appelée dès la 1ère erreur)
  // results est le tableau (ordonné) des resultats intermédiaires
});</code></pre><br>
            Il existe également les variantes :
            <ul>
              <li><code>series</code> qui permet d'effectuer les traitements en séries ;</li>
              <li><code>parallelLimit</code> qui permet de limiter le nombre d'éléments traités en parallèle.</li>
            </ul>
          </p>

          <p>
            La méthode <code>waterfall</code> permet d'effectuer une sucession d'opérations asynchrones,
            où chaque opération asynchrone utilise en entrée le résultat de l'opération asynchrone précédente :
            <pre v-highlightjs><code language="js">async.waterfall([
    (next) => {
        next(null, 'un', 'deux');
    },
    (arg1, arg2, next) => {
        // arg1 vaut 'un' et arg2 vaut 'deux'
        next(null, 'trois');
    },
    (arg1, next) => {
        // arg1 vaut maintenant 'trois'
        next(null, 'done');
    }
], function (err, result) => {
    // result vaut 'done'
});</code></pre>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            <ol>
              <li>
                Dans le module <code>app/fs-utils.js</code>, créer la fonction <code>getDirStat()</code> qui accepte 2 paramètres : le chemin absolu du dossier et une fonction callback.
                <code>getDirStat()</code> invoque le callback avec 2 paramètres :
                <ul>
                  <li>une erreur ;</li>
                  <li>
                    un tableau d'objets contenant pour chaque fichier :
                    <ul>
                      <li><code>name</code> : son nom ;</li>
                      <li><code>path</code> : son chemin absolu ;</li>
                      <li><code>isDirectory</code> : un booléen indiquant s'il s'agit d'un dossier ;</li>
                      <li><code>size</code> : sa taille.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Tester la fonction en l'invoquant avec les cas suivants :
                <ul>
                  <li>le chemin désigne un dossier qui existe ;</li>
                  <li>le chemin désigne un fichier ;</li>
                  <li>le chemin designe un dossier qui n'existe pas ;</li>
                </ul>
              </li>
              <li>En bonus : tester le cas où un des appels à <code>fs.stat</code> retourne une erreur (utiliser <a href="https://sinonjs.org/">Sinon.JS</a> pour faire un mock de la fonction).</li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
</script>
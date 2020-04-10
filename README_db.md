#Création d’une application mobile : _I Need A Mask_

## Installation d'un projet ExpressJS

### Création du dossier :

```shell script
npx express-generator --view pug --css sass [nom-du-projet]
```

### Installation des dépendances :

```shell script
npm install
```

- Utiliser SCSS à la place de SASS, dans le fichier app.js (lig. 15) :

```shell script
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
```

- Renommer le fichier public/stylesheets/style.sass en style.scss et corriger le code à l'intérieur.

- Installation de Nodemon

```shell script
npm install --save-dev nodemon
```

- Puis modifier le fichier package.json (lig. 6) :

```shell script
"scripts": {
    "start": "node ./bin/www",
    "watch": "nodemon ./bin/www"
  },
```

- Installation de dotenv

```shell script
npm install dotenv
```

- Puis ajouter tout en haut du fichier app.js (lig. 1) :

```shell script
require('dotenv').config();
```


### Création des fichiers d'environnement :

- Créer le fichier .env
```shell script
PORT=4000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=ineedamask
```

- Créer le fichier .gitignore
```shell script
node_modules/
```

## Mise en place de MongoDB

- Démarrer le serveur mongodb dans un terminal

```shell script
npm install mongodb
```

### Connexion à la base de données :

- bin/www.js =>Module dependencies. (lig. 10)
```shell script
const MongoClient = require('mongodb').MongoClient;
```

- bin/www.js =>Listen on provided port, on all network interfaces. (lig. 26)
```shell script
MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    app.locals.db = client.db(process.env.DB_NAME);
    server.listen(port);
  })
  .catch(err => console.log(err))
;
```

- routes/index.js (lig. 7)
```shell script
router.get('/', function(req, res, next) {
  const { db } = req.app.locals;
  db.collection('pharmacies').find().limit(5).toArray((err, pharmacies) => {
    res.render('index', { title: 'Express', pharmacies: pharmacies });
  });
});
```

- Correction CORS erreur
```shell script
npm install cors
```
- Configuration dans app.js
```shell script
var cors = require('cors');
app.use(cors());
```


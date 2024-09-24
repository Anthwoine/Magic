const http = require('http');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express(); // Correctement initialiser express

// Utilisation de CORS middleware pour permettre les requêtes cross-origin
app.use(cors());

const server = http.createServer(app); // Utiliser app (l'instance d'express) pour le serveur HTTP

// Route par défaut qui retourne une réponse simple
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('Voilà la réponse du serveur ! Mise à jour');
});



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'essai',
    });
    connection.connect(err => {
        if (err) {
            console.error('Erreur de connexion à MySQL :', err);
        } else {
            console.log('Connexion à MySQL réussie !');
        }
    }
); 



// Démarrer le serveur sur le port spécifié ou 3001
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

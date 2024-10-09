# Magic

Installation et Configuration
1. Lancer le Serveur

Depuis le dossier Magic/serveur/src, exécute la commande suivante pour démarrer le serveur :

```bash
node server
```

2. Lancer le Projet React

Depuis le dossier Magic/client, exécute la commande suivante pour démarrer l'application React :

```bash
npm start
```

Initialisation de la Base de Données

Le script SQL se trouve dans le dossier Magic/script/sql_cartes_script.sql. Ce script :

    Crée une base de données nommée magicDB.
    Insère des données pour permettre la visualisation des cartes dès le premier lancement.

Exécution du script :

    Assure-toi d'avoir configuré ton SGBD (par ex. MySQL ou PostgreSQL).
    Exécute le script en utilisant la commande appropriée pour ton SGBD.

Ajouter des Cartes dans la Base de Données

Pour ajouter des cartes à la base de données, il te faut :

    L'extension de la carte.
    Le nom de la carte.

Exemple de cartes à importer :

   | Extension	 |     Nom de la Carte      |
   |:----------:|:------------------------:|
   |    grn	    |   Arboretum Elemental    |
   |    grn	    |   Attendant of Vraska    |
   |    grn	    |       Kraul Raider       |
   |    lrw	    |       Mulldrifter        |
   |    lrw	    |        Sentry Oak        |
   |    lrw	    |    Thorn of Amethyst     |
   |    war	    |  Cyclops Electromancer   |
   |    war	    |       Dreadmalkin        |
   |    war	    |    Tamiyo's Epiphany     |
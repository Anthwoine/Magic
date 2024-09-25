const express = require('express');
const sequelizeConfig = require('./config/db.config');
const cors = require('cors');


const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/cartes', require('./routes/carte.route'));
app.all('*', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

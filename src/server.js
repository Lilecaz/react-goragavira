const mongoose = require('mongoose');

const uri = "mongodb+srv://KILLEURWWOLF:OMEGA2002@cluster0.ahtvrop.mongodb.net/esiee";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected…");
    })
    .catch(err => console.log(err))
const express = require('express');
const cors = require('cors');
const app = express();
const valid = require('card-validator');

app.use(cors());
app.use(express.json());
const port = 5000;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const cartes = mongoose.model(
    'cdsave',
    new mongoose.Schema({
        carte: Number,
        noms: String,
        dates: String,
        crs: String
    })
);

const data = [];
cartes.find({}).then((documents) => {
    documents.map((dt, index) => { data[index] = { carte: dt.carte, noms: dt.noms, date: dt.dates, crs: dt.crs }; })
    data.map((dt, index) => { })
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/validate-card', (req, res) => {
    let cardNumber = req.body.cardNumber; // Obtenez le numéro de la carte de la requête
    cardNumber = cardNumber.replace(/\s/g, ''); // Enlevez les espaces du numéro de carte
    const cardValidation = valid.number(cardNumber); // Validez le numéro de carte
    let cardType = 'inconnu';
    if (cardValidation.isValid && cardValidation.card.type !== null) {
        cardType = cardValidation.card.type;
    }
    // Comparez cardNumber avec les cartes qui sont dans data
    let matchingCard = null;
    data.forEach((card) => {
        if (card.carte == cardNumber) {
            matchingCard = card;
        }
    });

    if (matchingCard) {
        res.send(`La carte ${cardNumber} est valide et correspond à ${matchingCard.noms}`);
    } else {
        res.send(`La carte ${cardNumber} est valide mais ne correspond à aucune carte enregistrée`);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

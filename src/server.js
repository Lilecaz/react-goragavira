
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/validate-card', (req, res) => {
    // Code to validate card goes here
    res.send('Card validated!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

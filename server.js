const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const Medlem = require('./models/Medlem');

// 1. Koble til MongoDB database
mongoose.connect('mongodb://localhost:27017/tut_og_kjor')
  .then(() => console.log('Koblet til MongoDB!'))
  .catch((err) => console.error('Kunne ikke koble til MongoDB:', err));

// 2. Les skjemadata
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Statiske filer (CSS, bilder osv.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruter for HTML-sider
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Page.html'));
});

// POST-rute for medlemsskjemaet
app.post('/medlemmer', async (req, res) => {
  try {
    const nyttMedlem = new Medlem({
      navn: req.body.navn,
      adresse: req.body.adresse,
      postnr: req.body.postnr,
      poststed: req.body.poststed,
      regnr: req.body.regnr,
      mcType: req.body.mcType
    });

    // 1. Lagrer i MongoDB
    await nyttMedlem.save();

    // 2. Sender brukeren til contact.html
    res.redirect('/contact');
  } catch (err) {
    res.status(500).send('Feil ved lagring: ' + err.message);
  }
});

// Start serveren
app.listen(3000, () => {
  console.log('Serveren kjører på http://localhost:3000');
});
const express = require('express');
const path = require('path');
const product = require('./router')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 9091;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/v0', product);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`front corriendo en: http://localhost:${PORT}`);
});
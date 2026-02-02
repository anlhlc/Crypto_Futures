const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tradepulse_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));

app.use('/', authRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = app;


require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', require('./routes/api'));

app.use('/uploads', express.static(path.join(__dirname, '..', 'data', 'uploads')));
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));
app.use('/review', express.static(path.join(__dirname, '..', 'public', 'review')));
app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`佩柔團隊10天上手計劃已啟動： http://localhost:${PORT}`);
  console.log(`上級審核台：                 http://localhost:${PORT}/review`);
});

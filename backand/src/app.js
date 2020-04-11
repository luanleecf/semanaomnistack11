const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json
});

module.exports = app;
const express = require('express');
const app = express();
const user_routes = require('./routes/user.routes');

app.use(user_routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = app;
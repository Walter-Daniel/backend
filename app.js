const express = require('express');
const app = express();
const cors = require('cors');

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use( '/api', [
    user_routes,
    product_routes
] );

module.exports = app;
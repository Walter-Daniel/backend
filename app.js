const express = require('express');
const app = express();
const cors = require('cors');

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');
const order_routes = require('./routes/order.routes');
const auth_routes = require('./routes/auth.routes');
const category_routes = require('./routes/category.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Ruta princial de mi servidor')
});

app.use( '/api', [
    user_routes,
    product_routes,
    order_routes,
    category_routes,
    auth_routes
]);

app.use( '/api/auth', auth_routes );

module.exports = app;
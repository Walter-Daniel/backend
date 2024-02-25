const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload')

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');
const order_routes = require('./routes/order.routes');
const auth_routes = require('./routes/auth.routes');
const category_routes = require('./routes/category.routes');
const images_routes = require('./routes/image.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Ruta princial de mi servidor')
});

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use( '/api', [
    user_routes,
    product_routes,
    order_routes,
    category_routes,
    auth_routes,
    images_routes
]);

app.use( '/api/auth', auth_routes );

module.exports = app;
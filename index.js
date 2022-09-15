const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3400;
const password = 'purpl3sun';
const URL = `mongodb+srv://walter-daniel:${password}@cluster0.g08hg.mongodb.net/?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
    res.send('Hello World!')
});



(async function connectDB() {
    try {
        console.log('\x1b[36m iniciando la conexión\x1b[37m')
        await mongoose.connect(URL);
        console.log('\x1b[32m conectado a la base de datos \x1b[37m')
        app.listen(port, () => {
            console.log(`\x1b[35m Escuchando desde el puerto: ${port} \x1b[37m`)
        });
    } catch (error) {
        console.log('\x1b[31m error al conectarse a la base de datos \x1b[37m', error)
    }    
})();
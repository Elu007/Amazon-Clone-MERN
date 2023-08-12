const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connection URLs
const connection_url = "mongodb+srv://skelafahmed:Aelaf007@cluster0.3yymqum.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// API

app.get('/', (req,res) => res.status(200).send("Hello World"));

app.listen(port, ()=> console.log("Listensing on the port",port));
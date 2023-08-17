const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const Product = require('./Products.js');

// Middlewares
app.use(cors());
app.use(express.json());

// Connection URLs
const connection_url = "mongodb+srv://skelafahmed:elaf@cluster0.3yymqum.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// API

app.get('/', (req, res) => res.status(200).send("Hello World"));

// Add product API

app.post("/products/add", async (req, res) => {
    try {
        const productDetail = req.body;
        console.log("Product Detail >>>", productDetail);
        const data = await Product.create(productDetail);
        res.status(201).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

// Get product API

app.get('/products/get', async(req,res) =>{
    try {
        const data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



app.listen(port, () => console.log("Listensing on the port", port));
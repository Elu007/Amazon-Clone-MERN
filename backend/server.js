const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const stripe = require('stripe')("sk_test_51NeC2BSIt5ZXu8rJP8ybfZGzYpNDnN2TBMMUOodJhLP56IB91hpX9XLF9dXy5e6b9ehTF8hBLVVLDTvzPLneoiZs00ndg5jeQu");

const app = express();
const port = 5000;

const Product = require('./Products.js');
const Orders = require("./Orders.js");
const Users = require("./Users.js")

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
        const data = await Product.create(productDetail);
        res.status(201).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

// API for signup

app.post("/auth/signup", async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const encrypt_password = await bcrypt.hash(password, 10);

        const userDetail = {
            email: email,
            password: encrypt_password,
            fullName: fullName,
        };

        const userExist = await Users.findOne({ email: email });

        if (userExist) {
            res.send({ message: "The Email is already in use!" });
        } else {
            await Users.create(userDetail);
            res.send({ message: "User Created Successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// API for login

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDetail = await Users.findOne({ email: email });

        if (userDetail) {
            const isPasswordValid = await bcrypt.compare(password, userDetail.password);
            if (isPasswordValid) {
                res.send(userDetail);
            } else {
                res.send({ error: "Invalid Password" });
            }
        } else {
            res.send({ error: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


// Get product API

app.get('/products/get', async (req, res) => {
    try {
        const data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// API for payments

app.post('/payment/create', async (req, res) => {
    const total = req.body.amount;

    const payment = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'inr',
    });
    res.status(201).send({
        clientSecret: payment.client_secret,
    });
})

// API to add order details

app.post('/orders/add', (req, res) => {
    const products = req.body.basket;
    const price = req.body.price;
    const email = req.body.email;
    const address = req.body.address;

    const orderDetail = {
        products: products,
        price: price,
        address: address,
        email: email,
    };
    (async () => {
        try {
            const result = await Orders.create(orderDetail);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    })();
});

// Order details API, POST request because we need to find specific order details

app.post("/orders/get", async (req, res) => {
    const email = req.body.email;

    try {
        const userOrders = await Orders.find({ email });
        res.send(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => console.log("Listensing on the port", port));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes')
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error in connecting to MongoDB: " + err));


app.use('/api', transactionRoutes);
const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
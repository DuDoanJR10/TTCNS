const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${encodeURIComponent(process.env.PASSWORD_DB)}@ttcsn.ps1mguj.mongodb.net/`);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

router(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
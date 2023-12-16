const express = require('express');
const cors = require('cors');
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const app = express();
app.use(cors({ origin:true, credentials:true }));
app.use(cookieParser());
app.use(express.json());
dotenv.config();
// Xử lý khi đường dẫn là file tĩnh thì sẽ lao vào public
app.use(express.static(path.join(__dirname, "uploads")));

mongoose
    .connect(`mongodb+srv://${process.env.USERNAME_DB}:${encodeURIComponent(process.env.PASSWORD_DB)}@ttcsn.ps1mguj.mongodb.net/`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error))

router(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
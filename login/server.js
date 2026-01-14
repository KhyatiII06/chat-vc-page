const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Suptext backend running on port ${PORT}`));
// the database. It also includes a method to compare entered passwords with the stored hashed password.
// It uses bcryptjs for secure password handling and ensures that the password is hashed before saving to
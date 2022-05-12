const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config();
const { DB_HOST } = process.env;
const mongoose = require('mongoose');

mongoose
  .connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
// Dmytro;
// V7WxueJwKzBELPGl;
// mongodb+srv://Dmytro:V7WxueJwKzBELPGl@cluster0.8mxw1.mongodb.net/db-contacts?retryWrites=true&w=majority
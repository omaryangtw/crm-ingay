require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize } = require('./models');

// setup db connection
sequelize.sync().then(() => {});

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const caseRouter = require('./routes/case');
const contactRouter = require('./routes/contact');
const clientRouter = require('./routes/client');
const familyRouter = require('./routes/family');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/case', caseRouter);
app.use('/contact', contactRouter);
app.use('/client', clientRouter);
app.use('/family', familyRouter);

module.exports = app;

require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 5000;


app.use(express.json())
app.use('/api/v1', router);

app.listen( port, () => console.log(`Example app listening at http://localhost:${port}`));
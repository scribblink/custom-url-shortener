/*jslint node: true */
'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
import api from './routes/api';
import cors from 'cors';

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use("/", api.router);

app.listen(app.get("port"), () => {
  console.log(`Listening on port: ${app.get('port')}`);
});

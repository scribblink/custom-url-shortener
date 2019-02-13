/*jslint node: true */
'use strict';

import http from 'http';
const express = require('express');
import { createTerminus } from '@godaddy/terminus';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;
import  bodyParser from 'body-parser';
import api from './routes/api';
import cors from 'cors';


app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())

// create a write stream (in append mode)
var serverLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: serverLogStream }))


app.use("/", api.router);

const server = http.createServer(app);

function onSignal() {
  console.log('server is starting cleanup')
}

async function onHealthCheck() {
  console.log('healthy check')
}

const options = {
  signal: 'SIGINT',
   healthChecks: {
    '/healthcheck': onHealthCheck,
  },
  onSignal
}
createTerminus(server, options);


server.listen(app.get("port"), () => {
  console.log(`Listening on port: ${app.get('port')}`);
});
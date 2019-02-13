/*jslint node: true */
/*global describe: false, before: false, after: false, it: false */
"use strict";
// Declare the variables used
const expect = require('chai').expect;
import request from 'request';
import server from '../index';
import redis from 'redis';
const client = redis.createClient();


// Server tasks
// describe('server', function () {
//     // Beforehand, start the server
//     before(function (done) {
//         console.log('Starting the server');
//         done();
//     });
//     // Afterwards, stop the server and empty the database
//     after(function (done) {
//         console.log('Stopping the server');
//         client.flushdb();
//         done();
//     });
//     // Test the index route
//     describe('Test the index route', function () {
//         it('should return a page with the title Shortbread', function (done) {
//             request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
//                 expect(body).to.include('Shortbread');
//                 expect(response.statusCode).to.equal(200);
//                 expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
//                 done();
//             });
//         });
//     });
// });
const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const logHandler = require('./logHandler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post(`/:id/:name`, (req, res) => {
    handler(req, res, 'add', `./db/userCart.json`);
    logHandler(req, res, 'add', `./db/stats.json`)
});
router.put(`/:id/:name`, (req, res) => {
    handler(req, res, 'change', `./db/userCart.json`);
    logHandler(req, res, 'change', `./db/stats.json`)
});

router.delete(`/:id/:name`, (req, res) => {
    handler(req, res, 'remove', `./db/userCart.json`);
    logHandler(req, res, 'remove', `./db/stats.json`)
});

module.exports = router;
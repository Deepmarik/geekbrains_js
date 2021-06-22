const express = require('express');
const fs = require('fs');
const path = require('path');
const handler = require('./handler');
const logHandler = require('./logHandler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(path.resolve(__dirname, './db/userCart.json'), 'utf8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post('/:id/:name', (req, res) => {
    handler(req, res, 'add', path.resolve(__dirname, './db/userCart.json'));
    logHandler(req, res, 'add', path.resolve(__dirname, './db/stats.json'))
});
router.put('/:id/:name', (req, res) => {
    handler(req, res, 'change', path.resolve(__dirname, './db/userCart.json'));
    logHandler(req, res, 'change', path.resolve(__dirname, './db/stats.json'))
});

router.delete('/:id/:name', (req, res) => {
    handler(req, res, 'remove', path.resolve(__dirname, './db/userCart.json'));
    logHandler(req, res, 'remove', path.resolve(__dirname, './db/stats.json'))
});

module.exports = router;
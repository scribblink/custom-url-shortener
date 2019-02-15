import { Router } from "express";
import client from '../lib/redis';
import { validate } from '../lib/validate';
const shortid = require('shortid');

const router = Router();

router.get('/v1/namespaces', (req, res) => {
    let namespaceArray = []
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        
        for(var i = 0, len = keys.length; i < len; i++) {
            namespaceArray.push(keys[i].replace('namespace:',''));
        }
        res.status(200).send({namespaceArray})
    }); 
    
})

router.post('/v1/shorten', async (req, res) =>{
    const { url, namespace, customUrl } = req.body;
    const id = (customUrl === '') ? shortid.generate() : customUrl;
    const nmsp = namespace || 'global';
    console.log('shorten', url, namespace, customUrl);
    if (url && await validate(url)) {
        
        client.dbsize((err, count) => {
            if (!err) {
                client.hsetnx(`namespace:${nmsp}`, id, url, (err, result) => {
                    if (!err) {
                        (result === 0)
                            ? res.status(409).send({message: 'The Custom url already exist'})
                            : res.status(200).send({id, customUrl, nmsp});
                        
                    } else {
                        res.status(500).send({message: `in setting hsetnx - ${err}`})
                    }
                });
            } else {
                res.status(500).send({message: `in client.dbsize - ${err}`})
            }
        })
    } else {
        res.status(403).send({message: "Url not valid"})
    }
    
});

router.get('/:id', function(req, res) {
    const { id } = req.params;
    
    if (id) {
        client.hget(`namespace:global`, id, (err, url) => {
            if (!err && url) {
                console.log('/:id url ', url);
                res.status(301);
                res.set('Location', url);
                res.send();
            } else {
                res.status(404)
                    .send({message: "Url not found"})
                
            }
        });
    } else {
        return res.status(400)
            .send({message: "Invalid ID supplied"})
    }
    
});

router.get('/:namespace/:id', function(req, res) {
    const { id, namespace } = req.params;
    if (id) {
        client.hget(`namespace:${namespace}`, id, (err, url) => {
            if (!err && url) {
                res.status(301);
                res.set('Location', url);
                res.send();
            } else {
                res.status(404)
                    .send({message: "Url not found"})
                
            }
        });
    } else {
        return res.status(400)
            .send({message: "Invalid ID supplied"})
    }
    
});
    
module.exports = { router };
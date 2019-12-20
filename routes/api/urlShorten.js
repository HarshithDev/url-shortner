const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const shortid = require('shortid')
const validUrl = require('valid-url')
const errorUrl='http://localhost:5000/error';
//Load URL Model
const URL = require('../../models/URL');

router.get('/item/:urltoken',async (req,res)=>{
    var urltoken = req.params.urltoken;
    const item = await URL.findOne({urlCode:urltoken});
    if(item){
        return res.redirect(item.originalUrl);
    }
    else {
        return res.redirect(errorUrl);
    }
});

router.post('/url', async (req,res) => {
    const {originalUrl,shortBaseUrl } = req.body;
    if(validUrl.isUri(shortBaseUrl)){

    }else{
        return res.status(400).json({
            uriError: "Invalid Base URL"
        });
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if(validUrl.isUri(originalUrl)){
        try{
            const item = await URL.findOne({ inputUrl: originalUrl });
            if(item){
                res.status(200).json(item);
            }
            else{
                shortUrl = shortBaseUrl + "/" + urlCode;
                const item = new URL({
                    inputUrl: originalUrl,
                    shortUrl,
                    urlCode,
                    updatedAt
                })
                await item.save();
                res.status(200).json(item);
            }
        }
        catch(err){
            res.status(400).json({
                uriError: "Invalid request"
            })
        }
    }
    else{
        return res.status(400).json({
            uriError: "Invalid Original URL"
        });
    }
})

module.exports = router;
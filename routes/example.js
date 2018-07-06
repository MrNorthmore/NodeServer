var ExampleModel = require('../models/example');
var express = require('express');
var router = express.Router();


router.route('/')
    .post(function (request, response) {
        var example = new ExampleModel();
        example.exampleString = request.body.exampleString;
        
        example.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({"example saved successfully": "true"});
        });
        console.log("got here");
    })
    .get(function (request, response) {
        ExampleModel.find(function (error, example) {
            if (error) {
                response.send(error);
            }
            response.send(example);
        });
    });

module.exports = router;
//==========NPM IMPORTS========================================
var mongoose = require('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');


//=========GLOBAL SETTINGS========================================
mongoose.Promise = global.Promise;

//=========VARIABLES==============================================
var app        = express();
var router     = express.Router();
var db         = mongoose.connection; 
var port       = 8080;
var Schema     = mongoose.Schema;

//=========MONGODB CONFIGURATION=================================
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('mongodb://localhost:27017/database_example', { useNewUrlParser: true });

//========EXPRESS CONFIGURATION==================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

//=========ROUTE CONFIGURATION==================================
var example = require('./routes/example');
app.use('/api/example', example);

//==========EXAMPLE MONGOOSE SCHEMA CREATION======================
var TestSchema = new Schema({
    testString: String
});
var TestModel = mongoose.model('TestModel', TestSchema );

//=========EXAMPLE REST API ROUTES FOR COMMON HTTP METHODS========
router.route('/')
    .get(function (request, response) {
        TestModel.find(function (error, test) {
            if (error) {
                response.send(error);
            }
            response.send(test);
        });
    })
    .put(function (request, response) {
        TestModel.findOne(function (error, test) {
            if (error) {
                response.send({error: error});
            }
            test.testString = request.body.testString;
            test.save(function (error) {
                if (error) {
                    response.send(error);
                }
                
                response.json({test: test});
            });
        });
    })
    .post(function (request, response) {
        var test = new TestModel();
        test.testString = request.body.testString;
        
        test.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({"saved successfully": "true"});
        });
    })
    .delete(function (request, response) {
        TestModel.find(function (error, deleted) {
            if (error) {
                response.send(error);
            }
            response.json({test: deleted});
        }).remove().exec();
    });

//==========LISTEN FOR INCOMING CONNECTION=======================
app.listen(port);
console.log('Listening on port ' + port + '...');

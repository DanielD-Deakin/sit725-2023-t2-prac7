var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s222311422:fM95CKO1wWNBqmAt@cluster0.mampmog.mongodb.net/?retryWrites=true&w=majority";
let collection;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Scenery');
        //console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

io.on('connection', (socket) => {
    console.log('a client is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    setInterval(() => {
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

http.listen(port, () => {
    console.log("App listening to: " + port);
    runDBConnection();
});

app.get('/api/sceneries', (req, res) => {
    getAllScenery((err, result)=> {
        if (!err) {
            res.json({statusCode: 20, data:result, message:'Get All Scenery Successful'});
        }
    });
});

app.post('/api/scenery', (req, res)=> {
    let scenery = req.body;
    postScenery(scenery, (err, result) => {
        if (!err) {
            res.json({statusCode: 201, data:result, message:'Success'});
        }
    });
});

function postScenery(scenery, callback) {
    collection.insertOne(scenery, callback);
}

function getAllScenery(scenery, callback) {
    collection.find({}).toArray(scenery, callback);
}


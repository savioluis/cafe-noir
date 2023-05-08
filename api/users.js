const { MongoClient, ObjectId } = require("mongodb");

async function connect() {
    if (global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://adminovo:fLjGkmKayeMZVJA2@cluster0.igxb86a.mongodb.net/?retryWrites=true&w=majority");
    if (!conn) return new Error("ERRO de Conexao");
    global.db = await conn.db("cafenoir");
    return global.db;
}

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'ok' }));
app.use('/', router);

//API users

//GET
router.get('/users/:id?', async function (req, res, next) {
    try {
        const db = await connect();
        if (req.params.id) {
            res.json(await db.collection("users").findOne({ _id: new ObjectId(req.params.id) }));
        } else {
            res.json(await db.collection("users").find().toArray());
        }
    } catch (error) {

    }
})

//POST
router.post('/users', async function (req, res, next) {
    try {
        const users = req.body;
        const db = await connect();
        res.json(await db.collection("users").insertOne(users));
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
})

//PUT
router.put('/users/:id', async function (req, res, next) {
    try {
        const users = req.body;
        const db = await connect();
        res.json(await db.collection("users").updateOne({ _id: new ObjectId(req.params.id) }, { $set: users }))
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
});

//DELETE
router.delete('/users/:id', async function (req, res, next) {
    try {
        const db = await connect();
        res.json(await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) }))
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
});

app.listen(port);
console.log("ok");
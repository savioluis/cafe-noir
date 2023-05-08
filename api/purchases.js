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

//API purchases

//GET
router.get('/purchases/:id?', async function (req, res, next) {
    try {
        const db = await connect();
        if (req.params.id) {
            res.json(await db.collection("purchases").findOne({ _id: new ObjectId(req.params.id) }));
        } else {
            res.json(await db.collection("purchases").find().toArray());
        }
    } catch (error) {

    }
})

//POST
router.post('/purchases', async function (req, res, next) {
    try {
        const purchases = req.body;
        const db = await connect();
        res.json(await db.collection("purchases").insertOne(purchases));
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
})

//PUT
router.put('/purchases/:id', async function (req, res, next) {
    try {
        const purchases = req.body;
        const db = await connect();
        res.json(await db.collection("purchases").updateOne({ _id: new ObjectId(req.params.id) }, { $set: purchases }))
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
});

//DELETE
router.delete('/purchases/:id', async function (req, res, next) {
    try {
        const db = await connect();
        res.json(await db.collection("purchases").deleteOne({ _id: new ObjectId(req.params.id) }))
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({ error: `${error}` });
    }
});

app.listen(port);
console.log("ok");
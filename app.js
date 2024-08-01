require("dotenv").config();
const express = require("express");
const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const { mySplit } = require("./functions.js");
app.use(express.json());
const URI = process.env.URI;
const { MongoClient } = require("mongodb");
const client = new MongoClient(URI);


app.get("/search", async (req, res) => {
    const searchData = req.query.q;
    if (!searchData) {
        res.status(400).send("no data to search");
    }
    try {
        const collection = await connectDb("engine", "pages");
        const result = await collection.find({ terms: searchData }).toArray();
        return res.status(200).json({ findData: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    } finally {
        await client.close();
    }
});

app.post("/crawl", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send("field required");
    }
    try {
        let collecton = await connectDb("engine", "pages");
        const result = await collecton.insertOne({ title, terms: mySplit(content) });
        return res.status(200).json({ addedData: { title, terms: mySplit(content) }, message: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`app running on  http://localhost:${PORT}`);
});


async function connectDb(dbName, collectionName) {
    if (!dbName || !collectionName) {
        throw new Error("fields required");
    }
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    return collection;
}
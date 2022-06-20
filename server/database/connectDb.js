import { connectToDb, getDb } from './db.js';

let db;
connectToDb((err) => {
    if(!err) {
       console.log("Connected to MongoDB");
        db = getDb();
    }
})
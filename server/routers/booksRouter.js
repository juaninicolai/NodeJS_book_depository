import { Router } from "express";
const router = Router();
import { db } from "../database/connectDb.js";
import { ObjectId } from "mongodb";

//Get all books
router.get("/", (req, res) => {

  const page = req.query.page || 0;
  const booksPerPage = req.query.booksPerPage || 10;

  let books = [];

  db.collection('books')
      .find()
      .sort({ author: 1 })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .forEach(book => books.push(book))
      .then(() => {
          res.status(200).json(books);
          console.log(books);
          res.send({ data: books});
      })
      .catch(() => {
          res.status(500).json({error: 'Could not fetch the documents'});
      }); 
});

router.get("/books/:id", (req,res) => {

  if(ObjectId.isValid(req.params.id)){
      db.collection('books')
    .findOne({_id: ObjectId(req.params.id)})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(error => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
  } else {
      res.status(500).json({error: 'Not a valid document id'});
  }
});

router.post('/books', (req,res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(error => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});

router.delete('/books/:id', (req,res) => {

  if(ObjectId.isValid(req.params.id)){
      db.collection('books')
      .deleteOne({_id: ObjectId(req.params.id)})
      .then(result => {
          res.status(200).json(result);
      })
      .catch(error => {
          res.status(500).json({error: 'Could not delete the document'});
      });
  } else {
      res.status(500).json({error: 'Not a valid document id'});
  }
});

router.patch('/books/:id', (req,res) => {
  const updates = req.body;

  if(ObjectId.isValid(req.params.id)){
      db.collection('books')
      .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
          res.status(200).json(result);
      })
      .catch(error => {
          res.status(500).json({error: 'Could not delete the document'});
      });
  } else {
      res.status(500).json({error: 'Not a valid document id'});
  }
});

export default router;

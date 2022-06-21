import { db } from "../database/connectDb.js";
import { ObjectId } from "mongodb";

const get_all_books = ("/books", (req, res) => {

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
      })
      .catch(() => {
          res.status(500).json({error: 'Could not fetch the documents'});
      }); 
});

const get_book_by_id = ("/books/:id", (req,res) => {

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

const create_book = ('/books', (req,res) => {
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

const delete_book = ('/books/:id', (req,res) => {

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

const update_book = ('/books/:id', (req,res) => {
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
export default { get_all_books, get_book_by_id, create_book, delete_book, update_book };

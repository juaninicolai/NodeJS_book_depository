import { Router } from "express";
const router = Router();
import { db } from "../database/createConnection.js";

//Get all books
router.get("/", async (req, res) => {
  const books = await db.all("SELECT * FROM books");
  console.log(books);
  res.send({ data: books });
});

//Get book by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await db.get(`SELECT * FROM books WHERE id = ${id}`);
  res.send({ data: book });
});

//Add a book
router.post("/", async (req, res) => {
  const { title, author, genre, price, stock } = req.body;
  await db.run(
    `INSERT INTO books (title, author, genre, price, stock) VALUES ('${title}', '${author}', '${genre}', '${price}', '${stock}')`
  );
  const book = await db.get(`SELECT * FROM books WHERE title = '${title}'`);
  res.send({ data: book });
});

//Edit a book by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, price, stock } = req.body;
  await db.run(
    `UPDATE books SET title = '${title}', author = '${author}', genre = '${genre}', price = '${price}', stock = '${stock}' WHERE id = ${id}`
  );
  const book = await db.get(`SELECT * FROM books WHERE id = ${id}`);
  res.send({ data: book });
});

//Delete a book by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await db.get(`SELECT * FROM books WHERE id = ${id}`);
  await db.run(`DELETE FROM books WHERE id = ${id}`);
  res.send({ data: book });
});

//Get books by book_genre
router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;
  const books = await db.all(`SELECT * FROM books WHERE genre = '${genre}'`);
  res.send({ data: books });
});

export default router;

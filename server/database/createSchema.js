import { db } from "./createConnection.js";

const deleteMode = true;

if (deleteMode) {
  db.exec("DROP TABLE IF EXISTS books");
}

db.exec("DROP TABLE IF EXISTS books");

db.exec(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, genre TEXT, price INTEGER, stock INTEGER)"
);

db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('Harry Potter', 'J.K. Rowling', 'Fantasy', '100', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', '200', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '300', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Catcher in the Rye', 'J.D. Salinger', 'Novel', '400', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy', '500', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Hunger Games', 'Suzanne Collins', 'Fantasy', '600', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Da Vinci Code', 'Dan Brown', 'Thriller', '700', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Alchemist', 'Paulo Coelho', 'Adventure', '800', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('Dune', 'Frank Herbert', 'Sci-Fi', '100', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('Enders Game', 'Orson Scott', 'Sci-Fi', '150', '10')`
);
db.run(
  `INSERT INTO books (title, author, genre, price, stock) VALUES ('The Power of Now', 'Eckhart Tolle', 'Self-Help', '300', '10')`
);

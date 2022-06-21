import { Router } from "express";
import booksController from '../controllers/booksController.js';

const router = Router();

router.get('/books', booksController.get_all_books);
router.get('/books/:id', booksController.get_book_by_id);
router.post('/books', booksController.create_book);
router.patch('/books/:id', booksController.update_book);
router.delete('/books/:id', booksController.delete_book);
export default router;
import { Router } from "express";
import { getAllBooks } from "../controllers/booksController.js";

const router = Router();

router.get("/", getAllBooks);
export default router;

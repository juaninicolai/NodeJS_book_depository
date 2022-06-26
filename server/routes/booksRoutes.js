import { Router } from "express";
import { getAllBooks, goToCheckout, reduceInventory } from "../controllers/booksController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllBooks);
router.get('/checkout', requireAuth, goToCheckout);
router.post('/completeOrder', requireAuth, reduceInventory);
export default router;

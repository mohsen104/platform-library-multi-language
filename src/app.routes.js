import { Router } from "express";
import BooksRoutes from "./modules/books/books.routes.js";

const router = Router();

router.use(BooksRoutes);

export default router;
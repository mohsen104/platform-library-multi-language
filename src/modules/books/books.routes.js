import { Router } from "express";
import BooksController from "./books.controller.js";

const router = Router();

router.post("/books", BooksController.create);
router.get("/books/:id", BooksController.getOne);
// router.put("/books/:id", BooksController.edit);
router.delete("/books/:id", BooksController.remove);

export default router;
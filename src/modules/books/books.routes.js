import { Router } from "express";
import BooksController from "./books.controller.js";

const router = Router();

router.post("/books", BooksController.create);

export default router;
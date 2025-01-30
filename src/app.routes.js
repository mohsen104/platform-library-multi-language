import { Router } from "express";
import BooksRoutes from "./modules/books/books.routes.js";
import UsersRoutes from "./modules/users/users.routes.js";

const router = Router();

router.use(BooksRoutes);
router.use(UsersRoutes);

export default router;
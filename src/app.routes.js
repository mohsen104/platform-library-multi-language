import { Router } from "express";
import BooksRoutes from "./modules/books/books.routes.js";
import UsersRoutes from "./modules/users/users.routes.js";
import BorrowedRoutes from "./modules/borrowed/borrowed.routes.js";

const router = Router();

router.use(BooksRoutes);
router.use(UsersRoutes);
router.use(BorrowedRoutes);

export default router;
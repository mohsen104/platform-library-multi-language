import { Router } from "express";
import BorrowedController from "./borrowed.controller.js";

const router = Router();

router.get("/borrowed", BorrowedController.getAll);
router.get("/borrowed/:id", BorrowedController.getOne);
router.post("/borrowed", BorrowedController.record);
router.post("/borrowed/return", BorrowedController.return);

export default router;
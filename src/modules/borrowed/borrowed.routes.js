import { Router } from "express";
import BorrowedController from "./borrowed.controller.js";

const router = Router();

router.post("/borrowed", BorrowedController.record);
router.post("/borrowed/return", BorrowedController.return);

export default router;
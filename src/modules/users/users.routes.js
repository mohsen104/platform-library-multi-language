import { Router } from "express";
import UsersController from "./users.controller.js";

const router = Router();

router.get("/users", UsersController.getAll);
router.post("/users", UsersController.create);
router.get("/users/:id", UsersController.getOne);
router.put("/users/:id", UsersController.edit);
router.delete("/users/:id", UsersController.remove);

export default router;
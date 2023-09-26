import { Router } from "express";
import { AuthMiddleware } from "../../../middlewares/auth-middleware";
import { UserController } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter
    .put("/create", AuthMiddleware, UserController.create)
    .post("/change", AuthMiddleware, UserController.change)
    .get("/getAll", AuthMiddleware, UserController.getAll)
    .delete("/delete", AuthMiddleware, UserController.delete)
    .get("/roles/getAll", AuthMiddleware, UserController.getAllRoles)
    .post("/addAccess", AuthMiddleware, UserController.addAccess)

export { userRouter };

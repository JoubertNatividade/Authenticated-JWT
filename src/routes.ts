import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUsersContoller } from "./controller/ListUsersContoller";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listUsersAll = new ListUsersContoller()

router.get("/users/listAll",ensureAuthenticated, listUsersAll.handle )

router.post("/users", createUserController.handle )
router.post("/sessions", authenticateUserController.handle )

export { router }

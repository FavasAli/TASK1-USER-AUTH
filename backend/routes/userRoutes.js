import  express  from "express";
const router=express.Router()
import { getUsers, login, registerUser } from "../controllers/uesrController.js";

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/').get(getUsers)

export default router
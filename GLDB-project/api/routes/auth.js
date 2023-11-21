import express from "express"
import { login, register, logout, forgot_password, confirm_resetcode, reset_password, update_password} from "../controllers/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotpassword", forgot_password);
router.post("/confirmcode", confirm_resetcode);
router.put("/resetpassword", reset_password);
router.put("/changepassword/:id", update_password);

export default router


import express from "express";
import AuthRegister from "../controller/AuthController.js";
import AuthLogin from "../controller/AuthLoginController.js";

const routes= express.Router()

routes.post('/register',AuthRegister)

routes.post('/login',AuthLogin)

export default routes
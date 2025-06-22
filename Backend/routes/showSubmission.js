import express from "express";
import getSubmissions from "../controller/showSubmission.js";

const routes= express.Router()

routes.get('/getSubmission',getSubmissions)

export default routes
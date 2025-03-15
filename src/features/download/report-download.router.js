import express from "express";
const router = express.Router()
import { downloadPdf } from "./report-download.js";
router.get("/",)
router.post("/",downloadPdf)



export default router;
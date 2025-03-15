import express from "express"
import { getAddReciept,addRecipt,getAddReport } from "./recipet.controller.js";
const router = express.Router();



router.get("/add-report",getAddReport)
router.get("/",getAddReciept)
router.post("/",addRecipt);
export default router;
import dotenv from "dotenv"
import path from "path";
dotenv.config();
import express from "express"
import expressEjsLayouts from "express-ejs-layouts";
import connectToDb from "./src/config/database.js";
import downloadRouter from "./src/features/download/report-download.router.js"
import reciptRouter from "./src/features/reciept/reciept.router.js"
const PORT = 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(expressEjsLayouts);

app.use(express.static(path.join(path.resolve(),'public')));
app.set("view engine","ejs");
app.set("views",path.join(path.resolve(),"src","views"));

// app.use("/d",downloadRouter)


app.use("/",reciptRouter)
app.use("/d",downloadRouter)


app.listen(PORT,()=>{
    connectToDb();
    console.log(`Server is running at PORT ${PORT}`)
});
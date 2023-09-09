import express  from "express";
import cors from "cors";
import {connectDB} from "./db/mongoose.js";
import baseRouter from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger_output.json");
// import swaggerFile from "./swagger_output.json"  assert { type: "json" };

// Create app
const app = express();


connectDB().catch((err) => console.error(err));;

// Use middleware
app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.get("/test",(req,res,next)=>{    
    console.log("in test");
    res.send({"mm":"h"});
})

app.use("/api",baseRouter)

// Start the server
// const PORT = process.env.NODE_ENV === "test" ? 4000 : 3000 || 3000
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export  {app,server};
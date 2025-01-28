/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express from "express";
import router from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";

const app = express();

// getting data as json
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// use cors
app.use( cors({
  credentials: true,
  origin: ["http://localhost:3000"],
}));

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send({
    message: "Hallo, Server is working",
  });
});

app.use("/api/v1/", router);

app.use(globalErrorHandler)

app.use(notFound)

export default app;

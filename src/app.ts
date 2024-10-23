import express from "express";
import router from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

// getting data as json
app.use(express.json());

// use cors
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hallo, Server is working",
  });
});

app.use("/api/v1/", router);

app.use(globalErrorHandler)

export default app;

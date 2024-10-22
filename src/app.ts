import express from 'express';
import router from './app/routes';


const app = express();


app.get("/", (req, res) =>{
    res.send({
        message: "Hallo, Server is working"
    })
})


app.use(router)


export default app;
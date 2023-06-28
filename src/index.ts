import express, { json, Request, Response } from "express";
import router from "./routes/index.routes";


const app = express();
app.use(json());
app.use(router)

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("I'm ok!")
});


const port: number = parseInt(process.env.PORT) || 5000;
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
});
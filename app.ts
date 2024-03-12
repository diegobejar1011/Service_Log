import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();

config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.set("PORT", port);

app.listen(app.get("PORT"), () => {
    console.log("Server running");
});
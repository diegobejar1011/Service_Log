import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();

config();
app.use(cors());
app.use(express.json());

app.set("PORT", process.env.PORT || 3000);

app.listen(app.get("PORT"), () => {
    console.log("Server running");
});
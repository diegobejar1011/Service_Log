import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { indexRouter } from './shared/infraestructure/indexRouter';

const app = express();

config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.set("PORT", port);

app.use('/api', indexRouter);

app.listen(app.get("PORT"), () => {
    console.log("Server running");
});

import { db } from './shared/application/mysqlConn';

db.connect()
.then(()=> {
    console.log("Connected");
})
.catch((error) => {
    console.log(error);
})
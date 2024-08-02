import { Express } from "express";
import express from 'express'
import  env  from "dotenv"
import  dataSource  from  './db/dbConfig'  
import { customErrorHandler, DefaultErrorHandler } from './middleware/errorHandler';
import customerRoute from './routes/customer'

const app: Express = express();
env.config();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use("/customer" , customerRoute )

app.use(customErrorHandler)
app.use(DefaultErrorHandler)




dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});


app.listen(PORT , ()=> {
    console.log(`server is running on host:http://localhost:${PORT}`);
})

export default app 







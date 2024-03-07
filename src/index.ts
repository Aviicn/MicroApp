import { AppDataSource } from "./data-source"
import express, { Request, Response } from "express"
import  cors from "cors"
import route from "./route";
import 'dotenv/config'

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 3000
        
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }))
        app.use(express.json())
        app.use("/api", route)

        app.get('/hello', (req: Request, res: Response) => {
            res.status(200).json({ data: "Success get data" })
        })
      
    app.listen(port, () => console.log(`Server succes on PORT ${port}`))
    })


    

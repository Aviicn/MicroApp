import "reflect-metadata"
import { DataSource } from "typeorm"
    

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5000,
    username: "postgres",
    password: "0909",
    database: "MicroApp",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})

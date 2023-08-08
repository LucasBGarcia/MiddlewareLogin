import 'express-async-errors'
import express from 'express';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/error';
import routes from './routes'
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    app.use(routes)

    app.use(errorMiddleware)

    return app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    })
})
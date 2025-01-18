import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import AllExceptionHandler from './src/common/exceptions/all-exception.handler.js';
import NotFoundHandler from './src/common/exceptions/not-found.handler.js';
import AllRoutes from './src/app.routes.js';
import './src/common/configs/sequelize.config.js';

const RunServer = () => {
    const app = express();
    const port = process.env.PORT;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use('/api', AllRoutes);

    NotFoundHandler(app);
    AllExceptionHandler(app);

    app.listen(port, () => {
        console.log(`server run on port ${port}`);
    })
}

export default RunServer;
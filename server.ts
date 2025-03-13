import 'rootpath';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { errorHandler } from './_middleware/error-handler';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

initialize().then(() => {
    // api routes
    app.use('/users', usersController);

    // global error handler
    app.use(errorHandler);

    // start server
    const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
    app.listen(port, () => console.log('Server listening on port ' + port));
});
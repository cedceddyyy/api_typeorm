"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rootpath");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const error_handler_1 = require("./_middleware/error-handler");
const db_1 = require("./_helpers/db");
const users_controller_1 = __importDefault(require("./users/users.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, db_1.initialize)().then(() => {
    // api routes
    app.use('/users', users_controller_1.default);
    // global error handler
    app.use(error_handler_1.errorHandler);
    // start server
    const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
    app.listen(port, () => console.log('Server listening on port ' + port));
});

import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { User } from '../users/user.model';
import config from '../config';

export let connection: Connection;

export async function initialize() {
    const { host, port, username, password, database } = config.database;

    connection = await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [User],
        synchronize: true,
        logging: false
    });

    console.log('Database connection established');
}
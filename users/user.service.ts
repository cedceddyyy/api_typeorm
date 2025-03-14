import { getRepository } from 'typeorm';
import { User } from './user.model';
import bcrypt from 'bcryptjs';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await getRepository(User).find();
}

async function getById(id: number) {
    return await getUser(id);
}

async function create(params: any) {
    const userRepository = getRepository(User);

    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw `Email "${params.email}" is already registered`;
    }

    const user = new User();
    user.email = params.email;
    user.passwordHash = await bcrypt.hash(params.password, 10);
    user.title = params.title;
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.role = params.role;

    await userRepository.save(user);
}

async function update(id: number, params: any) {
    const userRepository = getRepository(User);
    const user = await getUser(id);

    if (params.email && user.email !== params.email && await userRepository.findOne({ where: { email: params.email } })) {
        throw `Email "${params.email}" is already taken`;
    }

    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    Object.assign(user, params);
    await userRepository.save(user);
}

async function _delete(id: number) {
    const userRepository = getRepository(User);
    const user = await getUser(id);
    await userRepository.remove(user);
}

async function getUser(id: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw 'User not found';
    return user;
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, typeorm_1.getRepository)(user_entity_1.User).find();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getUser(id);
    });
}
function create(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        if (yield userRepository.findOne({ where: { email: params.email } })) {
            throw `Email "${params.email}" is already registered`;
        }
        const user = new user_entity_1.User();
        user.email = params.email;
        user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        user.title = params.title;
        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.role = params.role;
        yield userRepository.save(user);
    });
}
function update(id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = yield getUser(id);
        if (params.email && user.email !== params.email && (yield userRepository.findOne({ where: { email: params.email } }))) {
            throw `Email "${params.email}" is already taken`;
        }
        if (params.password) {
            params.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        Object.assign(user, params);
        yield userRepository.save(user);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = yield getUser(id);
        yield userRepository.remove(user);
    });
}
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = yield userRepository.findOne({ where: { id } });
        if (!user)
            throw 'User not found';
        return user;
    });
}

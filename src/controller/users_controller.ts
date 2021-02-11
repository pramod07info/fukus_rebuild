import express from 'express';
import cors from 'cors';
import {UsersRepository} from "../repositories/users_repository";
var db = require('../dbconfig');
class UsersController {
    private userRepository = new UsersRepository();
    public path = '/user';
    public pathGetUserByEmailIdAndPassword = '/login';
    public pathLogout = '/logout/';
    public pathGetUsersList = '/users';
    public pathGetUserById = '/users/:userId';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
         this.router.post(this.path,cors(), this.createUser);
         this.router.get(this.pathGetUserByEmailIdAndPassword,cors(), this.getUserByEmailIdAndPassword);
         this.router.get(this.pathLogout,cors(), this.userLogout);
         this.router.get(this.pathGetUsersList,cors(), this.usersList);
         this.router.get(this.pathGetUserById,cors(), this.usersById);
}
    
    createUser = async (request: express.Request, response: express.Response) => {
        const result = await this.userRepository.createUsers(request);
        response.send(result);
    }
     getUserByEmailIdAndPassword = async (request: express.Request,response:express.Response) => {
        const result = await this.userRepository.getUserByEmailIdAndPassword(request);
        response.send(result);
    }
    userLogout = async (request: express.Request,response:express.Response) => {
        const result = await this.userRepository.userLogout(request);
        response.send(result);
    }
    usersList = async (request: express.Request,response:express.Response) => {
        const result = await this.userRepository.getUserList(request);
        response.send(result);
    }
    usersById = async (request: express.Request,response:express.Response) => {
        const result = await this.userRepository.getUserById(request);
        response.send(result);
    }
}

export default UsersController;
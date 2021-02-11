import express from 'express';
import { IPiece } from '../model/index'
import { isArray } from 'util';
import cors from 'cors';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';
import {PieceRepository} from "../repositories/piece_reository";
var db = require('../dbconfig');
class PieceController {
    private pieceRepository = new PieceRepository();
    public path = '/piece';
    public pathDeletePiece = '/piece/:id';
    public pathPiece = '/piece';
    public pathGetPieceById = '/piece/:pieceId';
    public pathGetAllCount = '/piece/getAllCount';
    public pathGetCountByUserId = '/piece/getCountByUserId';
    public pathUpdateTOArchive = '/piece/updateToArchive';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
         this.router.put(this.pathPiece,cors(), this.updatePiece);
         this.router.post(this.path,cors(), this.createPiece);
       
         this.router.get(this.pathGetPieceById,cors(), this.getSinglePiece);
        // this.router.get(this.path,cors(), this.getAllPiece);
        // this.router.post(this.pathPieceUserId,cors(), this.getPieceByUserId);
        // this.router.delete(this.pathDeletePiece,cors(), this.deletePiece);
        // this.router.post(this.pathGetAllCount, cors(),this.getAllCount);
        // this.router.post(this.pathGetCountByUserId, cors(),this.getCountByUserId);
        // this.router.put(this.pathUpdateTOArchive, cors(),this.updateToArchive);

}


    createPiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.createPieceAndVideo(request);
        response.send(result);
    }

    updatePiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.updatePiece(request);
        response.send(result);
    }
    getSinglePiece = async (request: express.Request, response: express.Response) => {
        const result = await this.pieceRepository.getSinglePiece(request);
        response.send(result);
    }
    // updatePiece = async (request: express.Request, response: express.Response) => {
    //     console.log("Request Body ",request.body);
    //     const result = await this.pieceRepository.updatePiece(request);
    //     response.send(result);
    // }
    // getSinglePiece = async (request: express.Request, response: express.Response) => {
        
    //     const result = await this.pieceRepository.getPieceById(request)
    //     response.send(result)
    // }
    // getAllPiece = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.get(request)
    //     response.send(result)
    // }
    // getPieceByUserId = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.getPieceByUserId(request)
    //     response.send(result)
    // }
    // deletePiece = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.deletePiece(request);
    //     response.send(result);
    // }
    // getAllCount = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.getAllCount(request);
    //     response.send(result);
    // }
    // getCountByUserId = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.getCountByUserId(request);
    //     response.send(result);
    // }
    // updateToArchive = async (request: express.Request, response: express.Response) => {
    //     const result = await this.pieceRepository.updateToArchive();
    //     response.send(result);
    // }
}

export default PieceController;
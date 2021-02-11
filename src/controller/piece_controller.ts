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
    public pathPiece = '/piece/:id';
    public pathPieceUserId = '/piece/getPieceByUserId';
    public pathGetAllCount = '/piece/getAllCount';
    public pathGetCountByUserId = '/piece/getCountByUserId';
    public pathUpdateTOArchive = '/piece/updateToArchive';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
         this.router.post(this.path,cors(), this.createPiece);
        // this.router.put(this.path,cors(), this.updatePiece);
        // this.router.get(this.pathPiece,cors(), this.getSinglePiece);
        // this.router.get(this.path,cors(), this.getAllPiece);
        // this.router.post(this.pathPieceUserId,cors(), this.getPieceByUserId);
        // this.router.delete(this.pathDeletePiece,cors(), this.deletePiece);
        // this.router.post(this.pathGetAllCount, cors(),this.getAllCount);
        // this.router.post(this.pathGetCountByUserId, cors(),this.getCountByUserId);
        // this.router.put(this.pathUpdateTOArchive, cors(),this.updateToArchive);

}
    formatDataCreatePieceAndUpdatePiece(requestData:any){
        var  actualData:any ;
        if(!requestData.hasOwnProperty('source_piece')){
            actualData = {      
                title:"",
                user_id: "",
                status:"",
                name:"",
                email:"",
                category_id:"",
                nickname:"",
                video_info:{
                    create:  [] as  any
                }
              };
        }else{
            actualData = {      
                title:"",
                user_id: "",
                status:"",
                name:"",
                email:"",
                category_id:"",
                nickname:"",
                video_info:{
                    create:  [] as  any
                },
                source_piece:{
                    create: [] as any
                }
              };
              requestData.source_piece?.forEach(function(value: any) {
                let source_piece = {
                    url:"",
                    name:""
                };
                source_piece.name = value.url;
                source_piece.url = value.name;
                actualData.source_piece.create.push(source_piece);
            });
        }

        
        actualData.title =requestData.title;
        actualData.status =requestData.status; 
        actualData.user_id =requestData.user_id;
        actualData.name = requestData.name;
        actualData.email = requestData.email;
        actualData.category_id = requestData.category_id;
        actualData.nickname = requestData.nickname;

        requestData.video_info?.forEach(function (value :any) {     
            let video_info ={
                video_url:"",
                status:""
            };
            video_info.video_url = value.video_url;
            video_info.status = value.status;
           // video_info.sentences.create = value.sentences;
            actualData.video_info.create.push(video_info);
              
        });
        
        return actualData;
    }
    
    formdataSentences(data:any){
        let sentences_object = {
            create: { sentence: '' },
            update: { sentence: '' },
            where: { id: 32},
        };
        let datainfo = {
            where : {id : data.id || 0 },
            data : {
                sentences: {
                   upsert:[] as  any
                 },
            },
        };

        data.videoInfo.sentences.forEach(function (value :any) {  
            sentences_object.create.sentence =   value.video_url;
            sentences_object.update.sentence =   value.video_url;
            sentences_object.where.id = value.id || 0 ;    
            datainfo.data.sentences.upsert.push(sentences_object);     
        });
        console.log(datainfo,"datainfo");
        return datainfo;
    }

    createPiece = async (request: express.Request, response: express.Response) => {
      
        let req_data = this.formatDataCreatePieceAndUpdatePiece(request.body);
        let pieceData = {
            id:request.body.id,
            data:req_data
         }
        const result = await this.pieceRepository.createPieceAndVideo(pieceData);
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
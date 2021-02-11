
import { IResponse } from '../model/index';
import { group } from 'console';
import { mainModule } from 'process';
import uuid from 'uuid-random';
//const prisma = new PrismaClient()
import { Approval } from '../model/approval'; 
var db = require('../dbconfig');

export class PieceRepository {
	
	

	async createPieceAndVideo(req: any) {
		try {
			let pieceId = uuid();
			console.log("Request",req.body);
			var query = "INSERT INTO pieces (id,title,uid,status,name,categoryid,nickname) VALUES("+pieceId+",'"+req.body.title+"',"+req.body.user_id+",'"+req.body.status+"','"+req.body.name+"',"+req.body.categoryid+",'"+req.body.nickname+"');";
			console.log("query ",query);
			var data = await db.query(query);
			if(data){
				for(let i=0; i<req.body.video_info.length; i++){
					let videoId = uuid();
					var query = "INSERT INTO videoinfo (id,videourl,pieceid,status) VALUES("+videoId+",'"+req.body.video_info[i].video_url+"','"+pieceId+"','"+req.body.video_info[i].status+"');";
					console.log("query ",query);
					var videoData = await db.query(query);
					if(videoData){
						for(let j = 0 ; j<req.body.video_info[i].sentences.length; j++){
							let sentencesId = uuid();
							var query = "INSERT INTO sentences (id,sentences,vid) VALUES("+sentencesId+",'"+req.body.video_info[i].sentences[j].sentence+"',"+videoId+");";
							console.log("query ",query);
							var sentencesData = await db.query(query);
							
						}	
					}
				}
				for(let i = 0; i < req.body.source_piece.length; i++){
					let sourceId = uuid();
					var query = "INSERT INTO sourcepiece (id,name,pieceid,url) VALUES("+sourceId+",'"+req.body.source_piece[i].name+"','"+pieceId+"','"+req.body.source_piece[i].url+"');";
					var sourceData = await db.query(query);
					console.log("query ",query);
				}
				const iResponse: IResponse = {
					statusCode: "200",
					message: "Data created successfully",
					data: "",
					uuid:"",
					error: ""
				}
				return iResponse;
				
			}
			
		} catch (error) {
			console.error(error.message);
			const iResponse: IResponse = {
				statusCode: "500",
				message: "Something went worng",
				data: "",
				uuid:"",
				error: error.message
			}
			return iResponse;
		} finally {
			//db.close();
		}

	}
	async updatePiece(req: any) {
		try {
			
			console.log("Request",req.body);
			var query = "UPDATE pieces SET title='"+req.body.title+"',status='"+req.body.status+"' WHERE id = "+req.body.id+";";
			console.log("query ",query);
			var data = await db.query(query);
			if(data){
				const iResponse: IResponse = {
					statusCode: "200",
					message: "Data updated successfully",
					data: "",
					uuid:"",
					error: ""
				}
				return iResponse;
			}
			
		} catch (error) {
			console.error(error.message);
			const iResponse: IResponse = {
				statusCode: "500",
				message: "Something went worng",
				data: "",
				uuid:"",
				error: error.message
			}
			return iResponse;
		} finally {
			//db.close();
		}

	}
	async getSinglePiece(req: any) {
		try {
			console.log("Request",req.body);
			var query = "SELECT * FROM pieces WHERE id="+req.params.pieceId+" ALLOW FILTERING;";
			console.log("query ",query);
			var pieceData = await db.query(query);
			console.log("Piece data ",pieceData);
			if(pieceData.rows.length > 0){
				var query = "SELECT * FROM videoinfo WHERE pieceid='"+req.params.pieceId+"' ALLOW FILTERING;";
				console.log("query ",query);
				var videoData = await db.query(query);
				var videoWithSentences =[];
				console.log("video: URl",videoData);
				if(videoData.rows.length > 0){
					for(let i = 0; i<videoData.rows.length; i++){
						var query = "SELECT * FROM sentences WHERE vid="+videoData.rows[i].id+" ALLOW FILTERING;";
						console.log("query ",query);
						var sentencesData = await db.query(query);
						let videoSentences ={
							video_info:videoData.rows[i],
							sentence:sentencesData.rows
						}
						videoWithSentences.push(videoSentences);
					}
				}

				var query = "SELECT * FROM sourcepiece WHERE pieceid='"+req.params.pieceId+"' ALLOW FILTERING;";
				console.log("query ",query);
				var sentencesData = await db.query(query);
				var data={
					piece:pieceData.rows,
					videoInfo:videoWithSentences,
					source:sentencesData.rows
				}
				const iResponse: IResponse = {
					statusCode: "200",
					message: "Data fetched successfully",
					data:data,
					uuid:"",
					error: ""
				}
				return iResponse;
			}else{
				const iResponse: IResponse = {
					statusCode: "200",
					message: "Data not found",
					data:"",
					uuid:"",
					error: ""
				}
				return iResponse;
			}
			
		} catch (error) {
			console.error(error.message);
			const iResponse: IResponse = {
				statusCode: "500",
				message: "Something went worng",
				data: "",
				uuid:"",
				error: error.message
			}
			return iResponse;
		} finally {
			//db.close();
		}

	}





	// async updatePiece(req: any) {
	// 	try {
	// 		const result = await prisma.piece.update({
	// 			where: {
	// 				id: req.body.id
	// 			},
	// 			data: {
	// 				title: req.body.title,
	// 				status: req.body.status,
	// 				category_id:req.body.category_id
	// 			}
	// 		})
			
	// 		if(req.body.status == 'PUBLISH'){
	// 			Approval.approve(req.body.id);
	// 		}
			
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Data updated successfully",
	// 			data: result,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect()
	// 	}

	// }

	// async get(req: any) {
	// 	try {
	// 		const result = await prisma.piece.findMany({
	// 			skip: req.body.skip,
	// 			take: req.body.take,
	// 			where: {
	// 				OR: req.body.status
	// 			},
	// 			select: {
	// 				id: true,
	// 				user_id: true,
	// 				status: true,
	// 				title: true,
	// 				category_id:true,
	// 				video_info: {
	// 					where: {
	// 						OR: req.body.status
	// 					},
	// 					select: {
	// 						id: true,
	// 						video_url: true,
	// 						video_id: true,
	// 						status: true,
	// 						sentences: {
	// 							select: {
	// 								id: true,
	// 								sentence: true
	// 							}
	// 						}
	// 					}
	// 				}
	// 			},
	// 			orderBy: {
	// 				id: 'desc'
	// 			}
	// 		})
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch all data successfully",
	// 			data: result,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect();
	// 	}
	// }
	// async getPieceById(req: any) {
	// 	try {
	// 		const result = await prisma.piece.findUnique({
	// 			where: {
	// 				id: parseInt(req.params.id)
	// 			},
	// 			select: {
	// 				id: true,
	// 				user_id: true,
	// 				status: true,
	// 				name:true,
	// 				email:true,
	// 				nickname:true,
	// 				title: true,
	// 				category_id:true,
	// 				video_info: {
	// 					where: {
	// 						status: req.params.status
	// 					},
	// 					select: {
	// 						id: true,
	// 						video_url: true,
	// 						video_id: true,
	// 						status: true,
	// 						sentences: {
	// 							select: {
	// 								id: true,
	// 								sentence: true
	// 							}
	// 						}
	// 					}
	// 				},
	// 				source_piece: {
	// 					select: {
	// 						id: true,
	// 						name: true,
	// 						url: true
	// 					}
	// 				}
	// 			}
	// 		})
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch single data successfully",
	// 			data: result,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect();
	// 	}
	// }
	// async getPieceByUserId(req: any) {
	// 	try {
	// 		const result = await prisma.piece.findMany({
	// 			skip: req.body.skip,
	// 			take: req.body.take,
	// 			where: {
	// 				OR: req.body.status,
	// 				AND: {
	// 					user_id: req.body.user_id,
	// 				}
	// 			},
	// 			select: {
	// 				id: true,
	// 				user_id: true,
	// 				status: true,
	// 				name:true,
	// 				email:true,
	// 				nickname:true,
	// 				title: true,
	// 				category_id:true,
	// 				video_info: {
	// 					select: {
	// 						id: true,
	// 						video_url: true,
	// 						video_id: true,
	// 						status: true,
	// 						sentences: {
	// 							select: {
	// 								id: true,
	// 								sentence: true
	// 							}
	// 						}
	// 					}
	// 				}
	// 			},
	// 			orderBy: {
	// 				id: 'desc'
	// 			}
	// 		})
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch user data successfully",
	// 			data: result,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect()
	// 	}
	// }
	// async deletePiece(req: any) {
	// 	try {
	// 		const result = await prisma.piece.update({
	// 			where: {
	// 				id: parseInt(req.params.id)
	// 			},
	// 			data: {
	// 				status: "DELETE",
	// 			}
	// 		})
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Data deleted successfully",
	// 			data: result,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect()
	// 	}
	// }
	// async getAllCount(req: any) {
	// 	try {
	// 		const Allresult = await prisma.piece.count()
	// 		const draftResult = await prisma.piece.count({
	// 			where: {
	// 				status: "DRAFT"
	// 			}
	// 		})
	// 		const publishedResult = await prisma.piece.count({
	// 			where: {
	// 				status: "PUBLISH"
	// 			}
	// 		})
	// 		const deletedResult = await prisma.piece.count({
	// 			where: {
	// 				status: "DELETE"
	// 			}
	// 		})

	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch count successfully",
	// 			data: {
	// 				"All": Allresult,
	// 				"Draft": draftResult,
	// 				"Published": publishedResult,
	// 				"Deleted": deletedResult
	// 			},
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect()
	// 	}
	// }
	// async getCountByUserId(req: any) {
	// 	try {
	// 		console.log("user id: ",req.body.user_id);
	// 		const Allresult = await prisma.piece.count({
	// 			where: {
	// 				user_id: req.body.user_id
	// 			}
	// 		})
	// 		const draftResult = await prisma.piece.count({
	// 			where: {
	// 				status: "DRAFT",
	// 				user_id: req.body.user_id
	// 			}
	// 		})
	// 		const publishedResult = await prisma.piece.count({
	// 			where: {
	// 				status: "PUBLISH",
	// 				user_id: req.body.user_id
	// 			}
	// 		})
	// 		const deletedResult = await prisma.piece.count({
	// 			where: {
	// 				status: "DELETE",
	// 				user_id: req.body.user_id
	// 			}
	// 		})

	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch count successfully",
	// 			data: {
	// 				"All": Allresult,
	// 				"Draft": draftResult,
	// 				"Published": publishedResult,
	// 				"Deleted": deletedResult
	// 			},
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect()
	// 	}
	// }
	// async updateToArchive() {
	// 	var datetime = require('node-datetime');
	// 	var past = '2020-12-14 02:43:19';
	// 	var pastDateTime = datetime.create(past);
	// 	pastDateTime.offsetInDays(-30);
	// 	var formatted = pastDateTime.format('yy-m-d H:M:S');
	// 	var date = new Date(formatted);
	// 	console.log("Date time ",formatted);
	// 	try {
	// 		const result = await prisma.piece.findMany({
	// 			where: {
					
	// 				AND:[
	// 					{
	// 						created:{
	// 							lte:date
	// 						}
	// 					},
	// 					{
	// 						status:'PUBLISH'
	// 					}	
	// 										]
	// 			},
	// 			select: {
	// 				id: true,
	// 			}
	// 		})
	// 		var archiveList: number[] = [];
	// 		result.forEach((key,value)=>{
	// 			console.log(key.id);
	// 			archiveList.push(key.id);
	// 		})
			
	// 		try {
	// 			const result = await prisma.piece.updateMany({
	// 				where: {
	// 					id:{in:archiveList}
	// 				},
	// 				data: {
	// 					status: 'ARCHIVE'
	// 				}
	// 			})
	// 			const iResponse: IResponse = {
	// 				statusCode: "200",
	// 				message: "Data updated successfully",
	// 				data: result,
	// 				error: ""
	// 			}
	// 			return iResponse;
	// 		} catch (error) {
	// 			console.error(error.message);
	// 			const iResponse: IResponse = {
	// 				statusCode: "200",
	// 				message: "Something went worng",
	// 				data: "",
	// 				error: error.message
	// 			}
	// 			return iResponse;
	// 		} finally {
	// 			async () => await prisma.$disconnect()
	// 		}
	

	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Fetch all data successfully",
	// 			data: archiveList,
	// 			error: ""
	// 		}
	// 		return iResponse;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		const iResponse: IResponse = {
	// 			statusCode: "200",
	// 			message: "Something went worng",
	// 			data: "",
	// 			error: error.message
	// 		}
	// 		return iResponse;
	// 	} finally {
	// 		async () => await prisma.$disconnect();
	// 	}
	// }
}
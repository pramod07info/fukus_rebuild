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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var index_1 = require("../repositories/index");
var cors_1 = __importDefault(require("cors"));
var PieceController = /** @class */ (function () {
    function PieceController() {
        var _this = this;
        this.pieceRepository = new index_1.PieceRepository();
        this.path = '/piece';
        this.pathDeletePiece = '/piece/:id';
        this.pathPiece = '/piece/:id';
        this.pathPieceUserId = '/piece/getPieceByUserId';
        this.pathGetAllCount = '/piece/getAllCount';
        this.pathGetCountByUserId = '/piece/getCountByUserId';
        this.router = express_1["default"].Router();
        this.app = express_1["default"]();
        this.createPiece = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var req_data, pieceData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req_data = this.formatDataCreatePieceAndUpdatePiece(request.body);
                        pieceData = {
                            id: request.body.id,
                            data: req_data
                        };
                        return [4 /*yield*/, this.pieceRepository.createPieceAndVideo(pieceData)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.updatePiece = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.updatePiece(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSinglePiece = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.getPieceById(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getAllPiece = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.get(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getPieceByUserId = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.getPieceByUserId(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.deletePiece = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.deletePiece(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getAllCount = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.getAllCount(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getCountByUserId = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pieceRepository.getCountByUserId(request)];
                    case 1:
                        result = _a.sent();
                        response.send(result);
                        return [2 /*return*/];
                }
            });
        }); };
        this.intializeRoutes();
    }
    PieceController.prototype.intializeRoutes = function () {
        this.router.post(this.path, cors_1["default"](), this.createPiece);
        this.router.put(this.path, cors_1["default"](), this.updatePiece);
        this.router.get(this.pathPiece, cors_1["default"](), this.getSinglePiece);
        this.router.get(this.path, cors_1["default"](), this.getAllPiece);
        this.router.post(this.pathPieceUserId, cors_1["default"](), this.getPieceByUserId);
        this.router["delete"](this.pathDeletePiece, cors_1["default"](), this.deletePiece);
        this.router.post(this.pathGetAllCount, cors_1["default"](), this.getAllCount);
        this.router.post(this.pathGetCountByUserId, cors_1["default"](), this.getCountByUserId);
    };
    PieceController.prototype.formatDataCreatePieceAndUpdatePiece = function (requestData) {
        var actualData = {
            title: "",
            user_id: "",
            status: "",
            video_info: {
                create: []
            }
        };
        console.log("requestData: ", requestData);
        actualData.title = requestData.title;
        actualData.status = requestData.status;
        actualData.user_id = requestData.user_id;
        requestData.video_info.forEach(function (value) {
            var video_info = {
                video_url: "",
                status: "",
                sentences: {
                    create: ''
                }
            };
            video_info.video_url = value.video_url;
            video_info.status = value.status;
            video_info.sentences.create = value.sentences;
            actualData.video_info.create.push(video_info);
        });
        return actualData;
    };
    PieceController.prototype.formdataSentences = function (data) {
        var sentences_object = {
            create: { sentence: '' },
            update: { sentence: '' },
            where: { id: 32 }
        };
        var datainfo = {
            where: { id: data.id || 0 },
            data: {
                sentences: {
                    upsert: []
                }
            }
        };
        data.videoInfo.sentences.forEach(function (value) {
            sentences_object.create.sentence = value.video_url;
            sentences_object.update.sentence = value.video_url;
            sentences_object.where.id = value.id || 0;
            datainfo.data.sentences.upsert.push(sentences_object);
        });
        console.log(datainfo, "datainfo");
        return datainfo;
    };
    return PieceController;
}());
exports["default"] = PieceController;
//# sourceMappingURL=piece_controller.js.map
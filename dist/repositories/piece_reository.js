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
exports.__esModule = true;
exports.PieceRepository = void 0;
var client_1 = require("@prisma/client");
//const prisma = new PrismaClient()
var prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
    log: [
        {
            emit: 'event',
            level: 'query'
        },
    ]
});
prisma.$on('query', function (e) {
    e.query, console.log(e);
});
var PieceRepository = /** @class */ (function () {
    function PieceRepository() {
    }
    PieceRepository.prototype.post = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var sentence, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req, "kkkkkkkkk");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, prisma.video_info.update(req)];
                    case 2:
                        sentence = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, error_1];
                    case 4:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.createPieceAndVideo = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_2, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.create({
                                data: req.data
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data created successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_2
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.updatePiece = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_3, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.update({
                                where: {
                                    id: req.body.id
                                },
                                data: {
                                    title: req.body.title,
                                    status: req.body.status
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data updated successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_3
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.get = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_4, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.findMany({
                                skip: req.body.skip,
                                take: req.body.take,
                                where: {
                                    OR: req.body.status
                                },
                                select: {
                                    id: true,
                                    user_id: true,
                                    status: true,
                                    title: true,
                                    video_info: {
                                        where: {
                                            OR: req.body.status
                                        },
                                        select: {
                                            id: true,
                                            video_url: true,
                                            video_id: true,
                                            status: true,
                                            sentences: {
                                                select: {
                                                    id: true,
                                                    sentence: true
                                                }
                                            }
                                        }
                                    }
                                },
                                orderBy: {
                                    created: 'asc'
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Fetch all data successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_4
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.getPieceById = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_5, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.findOne({
                                where: {
                                    id: parseInt(req.params.id)
                                },
                                select: {
                                    id: true,
                                    user_id: true,
                                    status: true,
                                    title: true,
                                    video_info: {
                                        where: {
                                            status: req.params.status
                                        },
                                        select: {
                                            id: true,
                                            video_url: true,
                                            video_id: true,
                                            status: true,
                                            sentences: {
                                                select: {
                                                    id: true,
                                                    sentence: true
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Fetch single data successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_5
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.getPieceByUserId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_6, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.findMany({
                                skip: req.body.skip,
                                take: req.body.take,
                                where: {
                                    OR: req.body.status,
                                    AND: {
                                        user_id: req.body.user_id
                                    }
                                },
                                select: {
                                    id: true,
                                    user_id: true,
                                    status: true,
                                    title: true,
                                    video_info: {
                                        select: {
                                            id: true,
                                            video_url: true,
                                            video_id: true,
                                            status: true,
                                            sentences: {
                                                select: {
                                                    id: true,
                                                    sentence: true
                                                }
                                            }
                                        }
                                    }
                                },
                                orderBy: {
                                    created: 'asc'
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Fetch user data successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_6 = _a.sent();
                        console.error(error_6);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_6
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.deletePiece = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result, iResponse, error_7, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, prisma.piece.update({
                                where: {
                                    id: parseInt(req.params.id)
                                },
                                data: {
                                    status: "DELETE"
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data deleted successfully",
                            data: result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_7 = _a.sent();
                        console.error(error_7);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_7
                        };
                        return [2 /*return*/, iResponse];
                    case 3:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.getAllCount = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var Allresult, draftResult, publishedResult, deletedResult, iResponse, error_8, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        return [4 /*yield*/, prisma.piece.count()];
                    case 1:
                        Allresult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "DRAFT"
                                }
                            })];
                    case 2:
                        draftResult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "PUBLISH"
                                }
                            })];
                    case 3:
                        publishedResult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "DELETE"
                                }
                            })];
                    case 4:
                        deletedResult = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Fetch count successfully",
                            data: {
                                "All": Allresult,
                                "Draft": draftResult,
                                "Published": publishedResult,
                                "Deleted": deletedResult
                            },
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 5:
                        error_8 = _a.sent();
                        console.error(error_8);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_8
                        };
                        return [2 /*return*/, iResponse];
                    case 6:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PieceRepository.prototype.getCountByUserId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var Allresult, draftResult, publishedResult, deletedResult, iResponse, error_9, iResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        console.log("user id: ", req.body.user_id);
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    user_id: req.body.user_id
                                }
                            })];
                    case 1:
                        Allresult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "DRAFT",
                                    user_id: req.body.user_id
                                }
                            })];
                    case 2:
                        draftResult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "PUBLISH",
                                    user_id: req.body.user_id
                                }
                            })];
                    case 3:
                        publishedResult = _a.sent();
                        return [4 /*yield*/, prisma.piece.count({
                                where: {
                                    status: "DELETE",
                                    user_id: req.body.user_id
                                }
                            })];
                    case 4:
                        deletedResult = _a.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Fetch count successfully",
                            data: {
                                "All": Allresult,
                                "Draft": draftResult,
                                "Published": publishedResult,
                                "Deleted": deletedResult
                            },
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 5:
                        error_9 = _a.sent();
                        console.error(error_9);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_9
                        };
                        return [2 /*return*/, iResponse];
                    case 6:
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return PieceRepository;
}());
exports.PieceRepository = PieceRepository;
//# sourceMappingURL=piece_reository.js.map
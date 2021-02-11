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
exports.SentencesRepository = void 0;
var client_1 = require("@prisma/client");
//const prisma = new PrismaClient()
var prisma = new client_1.PrismaClient({
    errorFormat: 'minimal'
});
var SentencesRepository = /** @class */ (function () {
    function SentencesRepository() {
    }
    SentencesRepository.prototype.createSentences = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, iResponse, error_1, iResponse;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        _a = this;
                        return [4 /*yield*/, prisma.sentences.create({
                                data: {
                                    sentence: req.body.sentence,
                                    video_info: {
                                        connect: { id: req.body.video_id }
                                    }
                                }
                            })];
                    case 1:
                        _a.result = _b.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data created successfully",
                            data: this.result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        iResponse = {
                            statusCode: "200",
                            message: "Something went worng",
                            data: "",
                            error: error_1
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
    SentencesRepository.prototype.updateSentances = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, iResponse, error_2, iResponse;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        _a = this;
                        return [4 /*yield*/, prisma.sentences.update({
                                where: { id: req.body.id },
                                data: {
                                    sentence: req.body.sentence,
                                    video_info: {
                                        connect: { id: req.body.video_id }
                                    }
                                }
                            })];
                    case 1:
                        _a.result = _b.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data updated successfully",
                            data: this.result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_2 = _b.sent();
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
    SentencesRepository.prototype.deleteSentances = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, iResponse, error_3, iResponse;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        _a = this;
                        return [4 /*yield*/, prisma.sentences["delete"]({
                                where: { id: parseInt(req.params.id) }
                            })];
                    case 1:
                        _a.result = _b.sent();
                        iResponse = {
                            statusCode: "200",
                            message: "Data deleted successfully",
                            data: this.result,
                            error: ""
                        };
                        return [2 /*return*/, iResponse];
                    case 2:
                        error_3 = _b.sent();
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
    return SentencesRepository;
}());
exports.SentencesRepository = SentencesRepository;
//# sourceMappingURL=sentences_repository.js.map
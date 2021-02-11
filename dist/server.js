"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var piece_controller_1 = __importDefault(require("./controller/piece_controller"));
var video_info_controller_1 = __importDefault(require("./controller/video_info_controller"));
var sentences_controller_1 = __importDefault(require("./controller/sentences-controller"));
var app = new app_1["default"]([
    new piece_controller_1["default"](),
    new video_info_controller_1["default"](),
    new sentences_controller_1["default"]()
], 8888);
app.listen();
//# sourceMappingURL=server.js.map
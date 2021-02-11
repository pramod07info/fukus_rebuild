"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1["default"]();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.json());
        this.app.use(cors_1["default"]({
            origin: '*'
        }));
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    return App;
}());
exports["default"] = App;
//# sourceMappingURL=app.js.map
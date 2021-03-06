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
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var ServiceOrdersController = /** @class */ (function () {
    function ServiceOrdersController() {
    }
    ServiceOrdersController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, initialDate, finalDate, sos, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.query, initialDate = _a.initialDate, finalDate = _a.finalDate;
                        return [4 /*yield*/, connection_1.default("os")
                                .join("cliente", "os.id_cliente", "=", "cliente.id")
                                .select("os.*", "cliente.nome", "cliente.cpf", "cliente.cep")
                                .where("os.data_entrada", ">=", initialDate + "T00:00:00")
                                .andWhere("os.data_entrada", "<=", finalDate + "T23:59:99")
                                .orderBy("os.data_entrada")
                                .groupBy("os.data_entrada")];
                    case 1:
                        sos = _b.sent();
                        if (sos.length === 0) {
                            return [2 /*return*/, response.status(404).json({ message: "SO's not found." })];
                        }
                        return [2 /*return*/, response.json(sos)];
                    case 2:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceOrdersController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, so, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default("os")
                                .join("cliente", "os.id_cliente", "=", "cliente.id")
                                .where("os.id", id)
                                .select("os.*", "cliente.nome", "cliente.cpf", "cliente.cep")
                                .first()];
                    case 1:
                        so = _a.sent();
                        if (!so) {
                            return [2 /*return*/, response.status(400).json({ message: "SO not found." })];
                        }
                        return [2 /*return*/, response.json(so)];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceOrdersController.prototype.getNumMax = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var count, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default("os").max("numero_os as count").first()];
                    case 1:
                        count = _a.sent();
                        if (!count) {
                            return [2 /*return*/, response.status(400).json({ message: "Error." })];
                        }
                        return [2 /*return*/, response.json(count)];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceOrdersController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var so, trx, err1_1, err2_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        so = request.body.os;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, trx("os").insert(so)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 5:
                        err1_1 = _a.sent();
                        console.log(err1_1);
                        return [4 /*yield*/, trx.rollback()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err2_1 = _a.sent();
                        console.log(err2_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ServiceOrdersController.prototype.change = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, so, trx, err1_2, err2_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        id = request.params.id;
                        so = request.body.os;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, trx("os").where("id", id).update(so)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 5:
                        err1_2 = _a.sent();
                        console.log(err1_2);
                        return [4 /*yield*/, trx.rollback()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err2_2 = _a.sent();
                        console.log(err2_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceOrdersController;
}());
exports.default = ServiceOrdersController;

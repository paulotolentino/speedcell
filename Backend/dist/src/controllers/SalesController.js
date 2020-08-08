"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var SalesController = /** @class */ (function () {
    function SalesController() {
    }
    SalesController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, initialDate, finalDate, sales, newSales, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.query, initialDate = _a.initialDate, finalDate = _a.finalDate;
                        return [4 /*yield*/, connection_1.default("venda")
                                .join("cliente", "venda.id_cliente", "=", "cliente.id")
                                .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
                                .select("venda.id", "venda.numero_venda", "venda.data", "venda.valor_desconto", "venda.forma_pagamento", "cliente.nome", "cliente.cpf", "cliente.cep", connection_1.default.raw("SUM(produto_venda.preco_dia) as valor"))
                                .where("venda.data", ">=", initialDate + "T00:00:00")
                                .andWhere("venda.data", "<=", finalDate + "T23:59:99")
                                .orderBy("venda.data")
                                .groupBy("venda.data")];
                    case 1:
                        sales = _b.sent();
                        if (sales.length === 0) {
                            return [2 /*return*/, response.status(404).json({ message: "Sales not found." })];
                        }
                        newSales = sales.map(function (sale) {
                            var val = sale.valor;
                            delete sale.valor;
                            return __assign(__assign({}, sale), { valor_descontado: val - sale.valor_desconto });
                        });
                        return [2 /*return*/, response.json(newSales)];
                    case 2:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalesController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, sale, newSales, items, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default("venda")
                                .join("cliente", "venda.id_cliente", "=", "cliente.id")
                                .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
                                .where("venda.id", id)
                                .select("venda.*", "cliente.nome", "cliente.cpf", "cliente.cep", connection_1.default.raw("SUM(produto_venda.preco_dia) as valor"))
                                .first()];
                    case 1:
                        sale = _a.sent();
                        if (!sale) {
                            return [2 /*return*/, response.status(400).json({ message: "Sale nor found." })];
                        }
                        newSales = __assign(__assign({}, sale), { valor_descontado: sale.valor - sale.valor_desconto });
                        return [4 /*yield*/, connection_1.default("produto")
                                .join("produto_venda", "produto.id", "=", "produto_venda.id_produto")
                                .join("estoque", "estoque.id_produto", "=", "produto_venda.id_produto")
                                .where("produto_venda.id_venda", id)
                                .select("produto_venda.preco_dia as preco_venda", "produto.codigo_barras", "produto.nome", "produto.id", "estoque.id as id_estoque", "estoque.quantidade", "estoque.data_modificacao")
                                .orderBy("produto.nome")];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, response.json({ sale: newSales, items: items })];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesController.prototype.getNumMax = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var count, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default("venda").max("numero_venda as count").first()];
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
    SalesController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sale, cart, trx_1, insertedSalesIds, point_id_1, produtoVendaParsed, err1_1, err2_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        _a = request.body, sale = _a.sale, cart = _a.cart;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx_1 = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, trx_1("venda").insert(sale)];
                    case 3:
                        insertedSalesIds = _b.sent();
                        point_id_1 = insertedSalesIds[0];
                        produtoVendaParsed = cart.map(function (item) {
                            return {
                                id_produto: item.id_produto,
                                preco_dia: item.preco_dia,
                                id_venda: point_id_1,
                            };
                        });
                        produtoVendaParsed.forEach(function (produto) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, trx_1("estoque")
                                            .decrement("quantidade", 1)
                                            .where("id_produto", produto.id_produto)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, trx_1("produto_venda").insert(produtoVendaParsed)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, trx_1.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 6:
                        err1_1 = _b.sent();
                        console.log(err1_1);
                        return [4 /*yield*/, trx_1.rollback()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err2_1 = _b.sent();
                        console.log(err2_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SalesController.prototype.change = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, sale, trx, error_1, err2_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        id = request.params.id;
                        sale = request.body.sale;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, trx("venda").where("id", id).update(sale)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [4 /*yield*/, trx.rollback()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, response.status(400).json({ message: "failes", error: error_1 })];
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
    SalesController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default("venda").del()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "done" })];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SalesController;
}());
exports.default = SalesController;

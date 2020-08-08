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
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var products, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default("produto")
                                .join("estoque", "produto.id", "=", "estoque.id_produto")
                                .select("produto.*", "estoque.quantidade", "estoque.data_modificacao")
                                .orderBy("produto.nome")];
                    case 1:
                        products = _a.sent();
                        if (products.length === 0) {
                            return [2 /*return*/, response.status(404).json({ message: "Products not found." })];
                        }
                        return [2 /*return*/, response.json(products)];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default("produto")
                                .join("estoque", "produto.id", "=", "estoque.id_produto")
                                .where("produto.id", id)
                                .select("produto.*", "estoque.id as id_estoque", "estoque.quantidade", "estoque.data_modificacao")
                                .first()];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            return [2 /*return*/, response.status(404).json({ message: "Product not found." })];
                        }
                        return [2 /*return*/, response.json(product)];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.searchByBarCode = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var codBarras, product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        codBarras = request.params.codBarras;
                        return [4 /*yield*/, connection_1.default("produto")
                                .join("estoque", "produto.id", "=", "estoque.id_produto")
                                .where("produto.codigo_barras", codBarras)
                                .select("produto.*", "estoque.id as id_estoque", "estoque.quantidade", "estoque.data_modificacao")
                                .first()];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            return [2 /*return*/, response.status(404).json({ message: "Product not found." })];
                        }
                        return [2 /*return*/, response.json(product)];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, product, storage, trx, insertedProductsIds, product_id, produtoEstoqueParsed, error_1, err2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        _a = request.body, product = _a.product, storage = _a.storage;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, trx("produto").insert(product)];
                    case 3:
                        insertedProductsIds = _b.sent();
                        product_id = insertedProductsIds[0];
                        produtoEstoqueParsed = __assign(__assign({}, storage), { id_produto: product_id });
                        return [4 /*yield*/, trx("estoque").insert(produtoEstoqueParsed)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 6:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [4 /*yield*/, trx.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, response.status(400).json({ message: "failes", error: error_1 })];
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
    ProductsController.prototype.change = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, product, storage, trx, error_2, err2_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        id = request.params.id;
                        _a = request.body, product = _a.product, storage = _a.storage;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, trx("produto").where("id", id).update({
                                nome: product.nome,
                                preco_compra: product.preco_compra,
                                preco_venda: product.preco_venda,
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, trx("estoque").where("id_produto", id).update({
                                quantidade: storage.quantidade,
                                data_modificacao: storage.data_modificacao,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.json({ message: "success" })];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [4 /*yield*/, trx.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, response.status(400).json({ message: "failes", error: error_2 })];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err2_2 = _b.sent();
                        console.log(err2_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1.default("estoque").del()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection_1.default("produto").del()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "done" })];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.deleteOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default("estoque").where("id_produto", id).del()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection_1.default("produto").where("id", id).del()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json({ message: "done" })];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductsController;
}());
exports.default = ProductsController;

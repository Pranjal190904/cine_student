"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const auth = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.ACCESS_TOKEN_SECRET);
        req.userId = decoded.aud;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.default = auth;

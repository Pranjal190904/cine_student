"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const Token = {
    signAccessToken: (id) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = env_config_1.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "4h",
                issuer: "cine_csi",
                audience: id,
            };
            jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
};
exports.default = Token;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student.model"));
const activity_model_1 = __importDefault(require("../models/activity.model"));
const token_middleware_1 = __importDefault(require("../middleware/token.middleware"));
const authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { studentNumber, password } = req.body;
            const student = yield student_model_1.default.findOne({ studentNumber, password });
            if (!student) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const activity = yield activity_model_1.default.findOne({ userId: student.id });
            if (activity && activity.isSubmitted) {
                return res.status(400).json({ message: "Test already submitted" });
            }
            const token = yield token_middleware_1.default.signAccessToken(student.id);
            res.cookie('accessToken', token, { httpOnly: true, secure: true });
            yield activity_model_1.default.findOneAndUpdate({ userId: student.id }, { lastActivity: Date.now() });
            return res.status(200).json({ message: "Login successful", userId: student.id });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    })
};
exports.default = authController;

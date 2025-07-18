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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        res.json({
            msg: "User signed up",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "error while signing up",
        });
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.user.findMany();
        console.log(response);
        res.json({
            msg: "Users found",
            users: response,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error",
        });
    }
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield client.todos.findMany({
            where: {
                user_id: id,
            },
            select: {
                user: true,
                title: true,
                description: true,
                done: true
            }
        });
        console.log(response);
        res.json({
            msg: "Todos",
            todos: response
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "server error"
        });
    }
}));
// async function createUser() {
//   try {
//     const response = await client.user.findMany({
//       where: {
//         id: 2,
//       },
//       include: {
//         todos: true,
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// createUser();
app.listen(3000, function () {
    console.log("server listening to port 3000");
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config({ path: '/.env' });
(0, database_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// importing routes
const petsRoutes_1 = __importDefault(require("./routes/petsRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const hospitalRoutes_1 = __importDefault(require("./routes/hospitalRoutes"));
// middlewares
app.use(express_1.default.json());
// using the imported routes
app.use('/', petsRoutes_1.default);
app.use('/', appointmentRoutes_1.default);
app.use('/', hospitalRoutes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

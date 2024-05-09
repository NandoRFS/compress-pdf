"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressPdf = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
const cwd = process.cwd();
const compressPdf = async (base64) => {
    const tempFolder = path_1.default.join(cwd, 'temp');
    const hasTempFolder = (0, fs_1.existsSync)(tempFolder);
    if (!hasTempFolder) {
        await promises_1.default.mkdir(tempFolder);
    }
    const originalFilePath = path_1.default.join(cwd, 'temp', 'original.pdf');
    const compressFilePath = path_1.default.join(cwd, 'temp', 'compress.pdf');
    await promises_1.default.writeFile(originalFilePath, base64, 'base64');
    await execPromise(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${compressFilePath}" ${originalFilePath}`);
    const compressFileBase64 = await promises_1.default.readFile(compressFilePath, 'base64');
    await promises_1.default.unlink(originalFilePath);
    // await fs.unlink(compressFilePath);
    return compressFileBase64;
};
exports.compressPdf = compressPdf;
//# sourceMappingURL=compressPDF.js.map
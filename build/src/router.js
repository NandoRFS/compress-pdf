"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const compressPDF_1 = require("./compressPDF");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const calculateBase64SizeInKB = (base64) => {
    const sizeInBytes = Buffer.byteLength(base64, 'base64');
    return (sizeInBytes / 1024).toFixed(2);
};
const deleteTempFile = (filePath) => {
    fs_1.default.unlink(filePath, err => {
        if (err) {
            console.error('Erro ao excluir o arquivo temporário:', err);
        }
    });
};
router.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo PDF enviado.');
    }
    const pdfFile = req.file;
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(pdfFile.path, async (err, data) => {
            if (err) {
                reject(res.status(500).send('Erro ao ler o arquivo PDF.'));
            }
            const base64 = data.toString('base64');
            deleteTempFile(pdfFile.path);
            const previousSize = calculateBase64SizeInKB(base64);
            const newFileBase64 = await (0, compressPDF_1.compressPdf)(base64);
            const newSize = calculateBase64SizeInKB(newFileBase64);
            resolve(res.send(`Tamanho do arquivo base64: ${previousSize} KB \n Tamanho do arquivo base64 comprimido: ${newSize} KB`));
        });
    });
});
exports.default = router;
//# sourceMappingURL=router.js.map
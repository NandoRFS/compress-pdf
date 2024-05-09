import express, {Request, Response} from 'express';
import multer from 'multer';
import fs from 'fs';
import {compressPdf} from './compressPDF';

const router = express.Router();
const upload = multer({dest: 'uploads/'});

const calculateBase64SizeInKB = (base64: string) => {
  const sizeInBytes = Buffer.byteLength(base64, 'base64');
  return (sizeInBytes / 1024).toFixed(2);
};

const deleteTempFile = (filePath: string) => {
  fs.unlink(filePath, err => {
    if (err) {
      console.error('Erro ao excluir o arquivo temporário:', err);
    }
  });
};

router.post(
  '/upload',
  upload.single('pdf'),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo PDF enviado.');
    }

    const pdfFile = req.file;

    return new Promise((resolve, reject) => {
      fs.readFile(pdfFile.path, async (err, data) => {
        if (err) {
          reject(res.status(500).send('Erro ao ler o arquivo PDF.'));
        }

        const base64 = data.toString('base64');
        deleteTempFile(pdfFile.path);

        const previousSize = calculateBase64SizeInKB(base64);
        const newFileBase64 = await compressPdf(base64);
        const newSize = calculateBase64SizeInKB(newFileBase64);

        resolve(
          res.send(
            `Tamanho do arquivo base64: ${previousSize} KB \n Tamanho do arquivo base64 comprimido: ${newSize} KB`
          )
        );
      });
    });
  }
);

export default router;

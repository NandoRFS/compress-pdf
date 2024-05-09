import {exec} from 'child_process';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import path from 'path';
import {promisify} from 'util';

const execPromise = promisify(exec);

const cwd = process.cwd();

export const compressPdf = async (base64: string): Promise<string> => {
  const tempFolder = path.join(cwd, 'temp');
  const hasTempFolder = existsSync(tempFolder);

  if (!hasTempFolder) {
    await fs.mkdir(tempFolder);
  }

  const originalFilePath = path.join(cwd, 'temp', 'original.pdf');
  const compressFilePath = path.join(cwd, 'temp', 'compress.pdf');

  await fs.writeFile(originalFilePath, base64, 'base64');

  await execPromise(
    `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${compressFilePath}" ${originalFilePath}`
  );

  const compressFileBase64 = await fs.readFile(compressFilePath, 'base64');

  await fs.unlink(originalFilePath);
  // await fs.unlink(compressFilePath);

  return compressFileBase64;
};

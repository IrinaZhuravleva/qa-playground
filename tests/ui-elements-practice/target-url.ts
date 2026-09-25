import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

export const targetUrl = pathToFileURL(
  resolve(here, '../../targets/ui-elements-practice/index.html')
).toString();

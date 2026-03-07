import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  server: {
    open: true,
    port,
    strictPort: true,
  },
});

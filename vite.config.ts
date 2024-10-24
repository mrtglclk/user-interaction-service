import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'UserInteractiveService',
      fileName: 'user-interactive-service'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'firebase'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          firebase: 'Firebase'
        }
      }
    }
  }
});
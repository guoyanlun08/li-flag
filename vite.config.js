import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          plugins: [visualizer()],
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 将node_modules中的依赖分组
              if (id.includes('react')) {
                return 'vendor-react';
              }
              if (id.includes('antd')) {
                return 'vendor-antd';
              }
              if (id.includes('axios')) {
                return 'vendor-axios';
              }
              if (id.includes('slate') || id.includes('slate-react')) {
                return 'vendor-slate';
              }
              return 'vendor'; // 其他依赖
            }
          }
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3000
    }
  };
});

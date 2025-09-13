import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          plugins: [visualizer()],
          manualChunks: {
            'vendor-react': ['react', 'react-router', 'react-dom', 'react-contexify', 'react-redux', 'redux'],
            'vendor-antd': ['antd'],
            'vendor-axios': ['axios'],
            'vendor-slate': ['slate', 'slate-react']
          }
        }
      }
    },
    plugins: [
      react(),
      compression({
        // 启用详细日志输出，显示压缩过程信息
        verbose: true,
        disable: false,
        threshold: 1024 * 100, // 压缩阈值
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 压缩文件后缀名
      })
    ],
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

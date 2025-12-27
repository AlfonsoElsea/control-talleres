import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  // Build para CommonJS
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist/cjs',
      }),
    ],
    external: ['zod', 'rxjs'],
  },
  
  // Build para ES Modules
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist/esm',
      }),
    ],
    external: ['zod', 'rxjs'],
  },
  
  // Build para navegador (bundle completo)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/browser/taller-leads.min.js',
      format: 'umd',
      name: 'TallerLeads',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        target: 'ES5',
      }),
      terser(),
    ],
  },
];

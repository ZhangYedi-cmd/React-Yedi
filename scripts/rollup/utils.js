import path from 'path';
import fs from 'fs';
import ts from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';

const pckPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export const resolvePkgPath = (pckName, isDist) => {
  // 打包后状态，从node_modules目录下找
  if (isDist) {
    return `${distPath}/${pckName}`;
  }
  return `${pckPath}/${pckName}`;
};

// 解析指定包的package.json内容
export const resolvePkgJSON = pkgName => {
  // 获取包的路径
  const pckPath = resolvePkgPath(pkgName);
  const pkgJSON = fs.readFileSync(`${pckPath}/package.json`, 'utf-8');
  return JSON.parse(pkgJSON);
};

// 获取基础的rollup插件配置
export const getBasicRollupPlugin = ({ typescript = {} } = {}) => {
  return [
    cjs(),
    ts({
      tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
      declaration: false, // 禁用声明文件生成，避免路径冲突
      sourceMap: true,
      ...typescript,
    }),
  ];
};

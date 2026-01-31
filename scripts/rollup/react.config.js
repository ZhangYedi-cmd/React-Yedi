import { getBasicRollupPlugin, resolvePkgJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = resolvePkgJSON('react');
const pckPath = resolvePkgPath(name);
const distPath = resolvePkgPath(name, true);

export default [
  // react
  {
    input: `${pckPath}/${module}`,
    output: {
      file: `${distPath}/index.js`,
      name: 'index.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      ...getBasicRollupPlugin({}),
      generatePackageJson({
        inputFile: `${pckPath}/package.json`,
        outputFolder: distPath,
        baseContents: ({ name, description, version }) => {
          return {
            name,
            description,
            version,
          };
        },
      }),
    ],
  },
  // react-runtime
  {
    // react-dev-runtime
    input: `${pckPath}/src/jsx.ts`,
    output: [
      {
        file: `${distPath}/jsx-dev-runtime.js`,
        name: 'jsx.js',
        format: 'umd',
        sourcemap: true,
      },
      // react-runtime
      {
        file: `${distPath}/jsx-runtime.js`,
        name: 'jsx.js',
        format: 'umd',
        sourcemap: true,
      },
    ],
    plugins: getBasicRollupPlugin({}),
  },
];

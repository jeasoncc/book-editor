module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ["svelte3", "@typescript-eslint"],
  overrides: [
    // {
    //   files: ["*.svelte"],
    //   processor: "svelte3/svelte3",
    // },
  ],
  ignorePatterns: ["*.test.js", "public/**/*"],
  // extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  extends: [ // then, enable whichever type-aware rules you want to use
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  settings: {
    "svelte3/ignore-styles": () => true,
    // 'svelte3/typescript': () => require('typescript'),
    'svelte3/typescript': true,
  },
};

/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-08-03 13:53:39
 * @LastEditTime: 2020-08-03 15:03:01
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // NOTE: generator 的空格
    'generator-star-spacing': 'off',
    // NOTE: 强制使用单引号
    quotes: ['error', 'single'],
    // NOTE: 强制不使用分号结尾
    semi: ['error', 'never'],
    // NOTE: prettier 的设置
    'prettier/prettier': [
      'error',
      {
        printWidth: 180, // 一行的字符数，如果超过会进行换行，默认为80
        tabWidth: 2, // 一个tab代表几个空格数，默认为80
        useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
        singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
        semi: false, // 行位是否使用分号，默认为true
        trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
        bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
        jsxBracketSameLine: true,
        alwaysParens: 'avoid',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
}

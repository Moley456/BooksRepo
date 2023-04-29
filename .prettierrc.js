'use strict';

module.exports = {
  overrides: [
    {
      files: '*',
      options: {
        singleQuote: true,
        bracketSpacing: false,
        printWidth: 80,
        eslintIntegration: true,
        insertSpaceBeforeFunctionParenthesis: false,
      },
    },
  ],
};

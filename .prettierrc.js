"use strict";

module.exports = {
  overrides: [
    {
      files: ["server/**", "common/**", "tests/**"],
      options: {
        singleQuote: true,
        bracketSpacing: false,
        printWidth: 80,
        eslintIntegration: true,
        insertSpaceBeforeFunctionParenthesis: false,
      },
    },
    {
      files: ["client/**"],
      options: {
        singleQuote: true,
        printWidth: 80,
      },
    },
  ],
};

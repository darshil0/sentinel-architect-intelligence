import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginImport from "eslint-plugin-import";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "*.config.js", "vite.config.*"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Vite/React needs Node globals
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      import: pluginImport,
    },
    rules: {
      // React 17+ New JSX Transform
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      
      // Essential React rules
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-unescaped-entities": "error",
      
      // Hooks enforcement
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // React Refresh (Vite)
      "react-refresh/only-export-components": "warn",
      
      // TypeScript + React
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_", 
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      
      // Import rules
      "import/order": ["error", {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      }],
      
      // Performance
      "react/jsx-max-depth": ["warn", 10],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    // JSX-only files
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/prop-types": "off",
    },
  },
  {
    // Test files
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  }
);

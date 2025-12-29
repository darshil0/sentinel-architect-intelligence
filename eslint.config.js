import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", ".eslintrc.cjs", "eslint.config.js", "vite.config.ts"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Added for Node.js globals (common in Vite/React apps)
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname, // Fixed: modern flat config approach
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      // React 17+ / New JSX Transform
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      
      // Essential React rules
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error", // Security
      "react/jsx-no-useless-fragment": "warn",
      
      // Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // React Refresh (Vite-specific)
      "react-refresh/only-export-components": "warn",
      
      // TypeScript + React synergy
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // Separate config for JSX-only files (covers .jsx if needed)
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/prop-types": "off", // Disabled for TypeScript
    },
  }
);

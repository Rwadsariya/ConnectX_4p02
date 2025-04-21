const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up test environment...');

// Install additional dependencies if needed
console.log('Installing test dependencies...');
try {
  // Add @types/jest to fix TypeScript errors in test files
  execSync('pnpm add -D @types/jest identity-obj-proxy', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}

// Create tsconfig.test.json if it doesn't exist
const testTsConfigPath = path.join(process.cwd(), 'tsconfig.test.json');
if (!fs.existsSync(testTsConfigPath)) {
  console.log('Creating tsconfig.test.json...');
  const tsConfig = {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "jsx": "react-jsx",
      "types": ["jest", "node"]
    },
    "include": [
      "src/**/*.ts",
      "src/**/*.tsx",
      "tests/**/*.ts",
      "tests/**/*.tsx"
    ]
  };
  
  fs.writeFileSync(
    testTsConfigPath,
    JSON.stringify(tsConfig, null, 2),
    'utf8'
  );
  console.log('tsconfig.test.json created successfully.');
}

console.log('Test environment setup complete.');
console.log('');
console.log('To run tests, use: pnpm test');
console.log('To run tests with coverage: pnpm test:coverage');
console.log('To run tests in watch mode: pnpm test:watch'); 
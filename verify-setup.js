#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de tests...\n');

const checks = [
  {
    name: 'Jest Config',
    path: 'jest.config.js',
    required: true
  },
  {
    name: 'Jest Setup',
    path: 'jest.setup.ts',
    required: true
  },
  {
    name: 'Playwright Config',
    path: 'playwright.config.ts',
    required: true
  },
  {
    name: 'Package.json',
    path: 'package.json',
    required: true,
    check: (content) => {
      const pkg = JSON.parse(content);
      return pkg.scripts['test:ci'] && pkg.devDependencies['jest'];
    }
  }
];

const testFiles = [
  'components/__tests__/NavItems.test.tsx',
  'components/__tests__/UserDropdown.test.tsx',
  'components/__tests__/TradingViewWidget.test.tsx',
  'components/ui/__tests__/button.test.tsx',
  'hooks/__tests__/useTradingViewWidget.test.tsx',
  'lib/__tests__/utils.test.ts',
  'e2e/homepage.spec.ts',
  'e2e/navigation.spec.ts'
];

let allGood = true;

// Check configuration files
checks.forEach(check => {
  const filePath = path.join(process.cwd(), check.path);
  if (fs.existsSync(filePath)) {
    if (check.check) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (check.check(content)) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`❌ ${check.name} - Invalid configuration`);
        allGood = false;
      }
    } else {
      console.log(`✅ ${check.name}`);
    }
  } else if (check.required) {
    console.log(`❌ ${check.name} - Missing`);
    allGood = false;
  }
});

console.log('\n📝 Archivos de test:');

// Check test files
testFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allGood = false;
  }
});

console.log('\n📊 Resumen:');
console.log(`Total de archivos de test: ${testFiles.length}`);

if (allGood) {
  console.log('\n✅ Configuración completa y correcta!');
  console.log('\n🚀 Comandos disponibles:');
  console.log('  npm run test       - Tests en modo watch');
  console.log('  npm run test:ci    - Tests con coverage');
  console.log('  npm run test:e2e   - Tests E2E');
  console.log('  npm run test:all   - Todos los tests');
  process.exit(0);
} else {
  console.log('\n❌ Hay problemas en la configuración');
  process.exit(1);
}

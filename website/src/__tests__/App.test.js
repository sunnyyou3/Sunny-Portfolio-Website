// Test that the App entry point file is valid
describe('App Entry Point', () => {
  it('has valid JavaScript syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../index.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('ReactDOM.createRoot');
    expect(content).toContain('InitializeApp');
    expect(content).toContain('ScrollManager');
    expect(content).toContain('Loader');
  });

  it('imports required dependencies', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../index.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('framer-motion');
    expect(content).toContain('./styles/index.css');
  });

  it('renders in StrictMode', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../index.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('React.StrictMode');
  });
});

// Test that the CameraScene module exports correctly
describe('CameraScene Module', () => {
  it('has valid JavaScript syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraScene.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('export const CameraScene');
    expect(content).toContain('Canvas');
  });

  it('contains lighting setup', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraScene.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('ambientLight');
    expect(content).toContain('directionalLight');
    expect(content).toContain('Environment');
  });

  it('renders the camera model', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraScene.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('AnimatedCamera');
    expect(content).toContain('CameraModel');
  });
});

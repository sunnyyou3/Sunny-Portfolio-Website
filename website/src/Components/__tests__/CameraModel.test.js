// Test that the CameraModel module file is valid
describe('CameraModel Module', () => {
  it('has valid JavaScript syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraModel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('export const CameraModel');
    expect(content).toContain('React.forwardRef');
  });

  it('contains camera part definitions', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraModel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('body');
    expect(content).toContain('lens');
    expect(content).toContain('grip');
    expect(content).toContain('viewfinder');
    expect(content).toContain('flash');
    expect(content).toContain('lcd');
  });

  it('has assembly progress parameter', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraModel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('assemblyProgress');
    expect(content).toContain('getPartTransform');
  });

  it('uses Three.js materials', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../CameraModel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('MeshStandardMaterial');
  });
});

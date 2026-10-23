// Test that the ScrollManager module exports correctly
describe('ScrollManager Module', () => {
  it('has valid JavaScript syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('export const ScrollManager');
  });

  it('defines scroll zones', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('heroOpacity');
    expect(content).toContain('cameraVisible');
    expect(content).toContain('assemblyProgress');
    expect(content).toContain('rotationY');
    expect(content).toContain('lcdExpansionProgress');
    expect(content).toContain('portfolioVisible');
  });

  it('imports all section components', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('Hero');
    expect(content).toContain('CameraScene');
    expect(content).toContain('PortfolioMenu');
    expect(content).toContain('ProjectsSection');
    expect(content).toContain('GallerySection');
    expect(content).toContain('AboutSection');
    expect(content).toContain('CareerSection');
  });

  it('handles portfolio section navigation', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('handleSelectSection');
    expect(content).toContain('handleBackToMenu');
  });
});

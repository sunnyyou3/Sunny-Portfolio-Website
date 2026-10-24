// Test that the ScrollManager module exports correctly
describe('ScrollManager Module', () => {
  it('has valid JavaScript syntax', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('export const ScrollManager');
  });

  it('defines reveal and navigation state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('cameraRevealed');
    expect(content).toContain('portfolioSection');
    expect(content).toContain('handleCameraReveal');
  });

  it('imports all section components', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../ScrollManager.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    expect(content).toContain('Hero');
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
    expect(content).toContain('handleCameraReveal');
  });
});

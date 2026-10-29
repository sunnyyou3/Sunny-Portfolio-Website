/* global gsap, Flip, Draggable, InertiaPlugin, CustomEase */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './GallerySection.css';

// Load local gallery images from the project
let localGalleryImages = [];
try {
  const imageContext = require.context(
    '../../assets/Portfolio/Images/Gallery',
    false,
    /\.(png|jpe?g|webp|gif)$/i
  );
  localGalleryImages = imageContext
    .keys()
    .sort()
    .map((filePath) => imageContext(filePath).default || imageContext(filePath));
} catch (e) {
  localGalleryImages = [];
}

/* ------------------------------------------------------------------ */
/*  PreloaderManager — canvas loading animation (ported to React refs) */
/* ------------------------------------------------------------------ */
class PreloaderManager {
  constructor({ overlayRef, duration = 2000, onComplete }) {
    this.overlayRef = overlayRef;
    this.duration = duration;
    this.onComplete = onComplete;
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.startTime = null;
    this.createLoadingScreen();
  }

  createLoadingScreen() {
    this.overlay = this.overlayRef.current;
    if (!this.overlay) return;

    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
    `;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    this.overlay.appendChild(this.canvas);

    this.startAnimation();
  }

  startAnimation() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    let time = 0;
    let lastTime = 0;

    const dotRings = [
      { radius: 20, count: 8 },
      { radius: 35, count: 12 },
      { radius: 50, count: 16 },
      { radius: 65, count: 20 },
      { radius: 80, count: 24 }
    ];

    const colors = { primary: '#2C1B14', accent: '#A64B23' };

    const hexToRgb = (hex) => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];

    const animate = (timestamp) => {
      if (!this.startTime) this.startTime = timestamp;
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw center dot
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      const rgb = hexToRgb(colors.primary);
      this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`;
      this.ctx.fill();

      // Draw Line Pulse Wave animation
      dotRings.forEach((ring, ringIndex) => {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2;
          const radiusPulse = Math.sin(time * 2 - ringIndex * 0.4) * 3;
          const x = centerX + Math.cos(angle) * (ring.radius + radiusPulse);
          const y = centerY + Math.sin(angle) * (ring.radius + radiusPulse);

          const opacityWave =
            0.4 + Math.sin(time * 2 - ringIndex * 0.4 + i * 0.2) * 0.6;
          const isActive = Math.sin(time * 2 - ringIndex * 0.4 + i * 0.2) > 0.6;

          this.ctx.beginPath();
          this.ctx.moveTo(centerX, centerY);
          this.ctx.lineTo(x, y);
          this.ctx.lineWidth = 0.8;

          if (isActive) {
            const accentRgb = hexToRgb(colors.accent);
            this.ctx.strokeStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${opacityWave * 0.7})`;
          } else {
            const primaryRgb = hexToRgb(colors.primary);
            this.ctx.strokeStyle = `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${opacityWave * 0.5})`;
          }
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          if (isActive) {
            const accentRgb = hexToRgb(colors.accent);
            this.ctx.fillStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${opacityWave})`;
          } else {
            const primaryRgb = hexToRgb(colors.primary);
            this.ctx.fillStyle = `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${opacityWave})`;
          }
          this.ctx.fill();
        }
      });

      if (timestamp - this.startTime >= this.duration) {
        this.complete();
        return;
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  complete() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.overlay) {
      this.overlay.style.opacity = '0';
      this.overlay.style.transition = 'opacity 0.8s ease';
      setTimeout(() => {
        if (this.overlay) this.overlay.remove();
        this.overlay = null;
        if (this.onComplete) this.onComplete();
      }, 800);
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    this.overlay = null;
  }
}

/* ------------------------------------------------------------------ */
/*  FashionGallery — main grid + zoom experience (ported to React)     */
/* ------------------------------------------------------------------ */
class FashionGallery {
  constructor(refs) {
    this.refs = refs;

    // Custom eases (fall back to standards if GSAP CustomEase is missing)
    this.customEase =
      typeof CustomEase !== 'undefined'
        ? CustomEase.create('smooth', '.87,0,.13,1')
        : 'power2.inOut';
    this.centerEase =
      typeof CustomEase !== 'undefined'
        ? CustomEase.create('center', '.25,.46,.45,.94')
        : 'power2.out';

    // Configuration (responsive base; adjusted by initGridConfig)
    this.config = {
      itemSize: 320,
      baseGap: 16,
      rows: 8,
      cols: 12,
      currentZoom: 0.6,
      currentGap: 32
    };

    // State
    this.zoomState = {
      isActive: false,
      selectedItem: null,
      flipAnimation: null,
      scalingOverlay: null
    };
    this.gridItems = [];
    this.gridDimensions = {};
    this.lastValidPosition = { x: 0, y: 0 };
    this.draggable = null;
    this.viewportObserver = null;
    this.descriptionLines = null;

    // Sound system
    this.soundSystem = {
      enabled: false,
      sounds: {
        click: new Audio('https://assets.codepen.io/7558/glitch-fx-001.mp3'),
        open: new Audio('https://assets.codepen.io/7558/click-glitch-001.mp3'),
        close: new Audio('https://assets.codepen.io/7558/click-glitch-001.mp3'),
        'zoom-in': new Audio('https://assets.codepen.io/7558/whoosh-fx-001.mp3'),
        'zoom-out': new Audio('https://assets.codepen.io/7558/whoosh-fx-001.mp3'),
        'drag-start': new Audio('https://assets.codepen.io/7558/preloader-2s-001.mp3'),
        'drag-end': new Audio('https://assets.codepen.io/7558/preloader-2s-001.mp3')
      },
      play: (soundName) => {
        if (!this.soundSystem.enabled || !this.soundSystem.sounds[soundName]) return;
        try {
          const audio = this.soundSystem.sounds[soundName];
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch (e) {
          // Silently handle audio errors
        }
      },
      toggle: () => {
        this.soundSystem.enabled = !this.soundSystem.enabled;
        const soundToggle = this.refs.soundToggle.current;
        if (soundToggle) soundToggle.classList.toggle('active', this.soundSystem.enabled);
        if (this.zoomState.isActive) return;
        if (this.soundSystem.enabled) {
          setTimeout(() => this.soundSystem.play('click'), 50);
        }
      }
    };

    Object.values(this.soundSystem.sounds).forEach((audio) => {
      audio.preload = 'auto';
      audio.volume = 0.3;
    });

    // Image data
    // Use local project images, falling back to the original assets if none load
    this.fashionImages =
      localGalleryImages.length > 0
        ? [...localGalleryImages]
        : (() => {
            const imgs = [];
            for (let i = 1; i <= 14; i++) {
              const paddedNumber = String(i).padStart(2, '0');
              imgs.push(
                `https://assets.codepen.io/7558/orange-portrait_${paddedNumber}.jpg`
              );
            }
            return imgs;
          })();

    this.imageData = [
      { number: '01', title: 'Begin Before You’re Ready', description: 'The work starts when you notice the quiet pull. Breathe once, clear the room inside you, and move one pixel forward.' },
      { number: '02', title: 'Negative Space, Positive Signal', description: 'Leave room around the idea. In the silence, the design answers back and shows you what to remove.' },
      { number: '03', title: 'Friction Is a Teacher', description: 'When the line resists, listen. Constraints are coordinates—plot them, then chart a cleaner route.' },
      { number: '04', title: 'Golden Minute', description: 'Catch the light while it’s honest. One honest frame beats a hundred almosts.' },
      { number: '05', title: 'Shadow Carries Form', description: 'The dark reveals the edge. Let contrast articulate what you mean but can’t yet say.' },
      { number: '06', title: 'City Breath', description: 'Steel, glass, heartbeat. Edit until the street’s rhythm fits inside a single grid.' },
      { number: '07', title: 'Soft Focus, Sharp Intent', description: 'Blur the noise, not the purpose. What matters remains in crisp relief.' },
      { number: '08', title: 'Time-Tested, Future-Ready', description: 'Classics survive because they serve. Keep the spine, tune the surface, respect the lineage.' },
      { number: '09', title: 'Grace Under Revision', description: 'Drafts don’t apologize. They evolve. Let elegance emerge through cuts, not flourishes.' },
      { number: '10', title: 'Style That Outlasts Seasons', description: 'Trends talk. Principles walk. Build on principles and let trends accessorize.' },
      { number: '11', title: 'Edges and Experiments', description: 'Push just past comfort. Leave a fingerprint the algorithm can’t fake.' },
      { number: '12', title: 'Portrait of Attention', description: 'Form is what you see. Presence is what you feel. Aim for presence.' },
      { number: '13', title: 'Light Speaks First', description: 'Expose for truth. Shadows are sentences, highlights the punctuation.' },
      { number: '14', title: 'Contemporary Is a Moving Target', description: 'Design for now by listening deeper than now. The signal is older than the feed.' },
      { number: '15', title: 'Vision, Then Precision', description: 'Dream wide, ship tight. Let imagination roam and execution walk in single-point focus.' },
      { number: '16', title: 'Geometry of Poise', description: 'Angles carry attitude. Align posture, light, and line until the frame breathes.' },
      { number: '17', title: 'Natural Light, Natural Truth', description: 'Open the window and remove the mask. Authenticity needs less wattage, more honesty.' },
      { number: '18', title: 'Studio: The Controlled Wild', description: 'Dial every knob, then listen for the unscripted moment. Keep the lens ready.' },
      { number: '19', title: 'Invent the Angle', description: 'Rotate the problem ninety degrees. Fresh perspective isn’t luck—it’s a habit.' },
      { number: '20', title: 'Editorial Nerve', description: 'Carry yourself like you belong, then earn it with craft. The camera can tell.' },
      { number: '21', title: 'Profession Is Practice', description: 'Repeat the fundamentals until they disappear. Mastery is subtle on purpose.' },
      { number: '22', title: 'Final Frame, Open Door', description: 'Endings are launchpads. Archive the take, thank the light, and start again at one.' }
    ];

    // Bind methods for event listeners
    this.handleSplitAreaClick = this.handleSplitAreaClick.bind(this);
    this.handleZoomKeys = this.handleZoomKeys.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);
  }

  /* ---- responsive grid config ------------------------------------- */
  initGridConfig() {
    const vw = window.innerWidth;
    if (vw <= 480) {
      this.config.itemSize = 140;
      this.config.cols = 4;
      this.config.rows = 4;
    } else if (vw <= 900) {
      this.config.itemSize = 220;
      this.config.cols = 8;
      this.config.rows = 6;
    } else {
      this.config.itemSize = 320;
      this.config.cols = 12;
      this.config.rows = 8;
    }
  }

  /* ---- DOM helpers ------------------------------------------------ */
  el(id) {
    return document.getElementById(id);
  }

  /* ---- sound ------------------------------------------------------ */
  initSoundSystem() {
    const canvas = this.refs.soundWaveCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 32;
    const height = 16;
    const centerY = Math.floor(height / 2);
    let startTime = Date.now();
    let currentAmplitude = this.soundSystem.enabled ? 1 : 0;

    const interpolateColor = (color1, color2, factor) => {
      const r1 = parseInt(color1.substring(1, 3), 16);
      const g1 = parseInt(color1.substring(3, 5), 16);
      const b1 = parseInt(color1.substring(5, 7), 16);
      const r2 = parseInt(color2.substring(1, 3), 16);
      const g2 = parseInt(color2.substring(3, 5), 16);
      const b2 = parseInt(color2.substring(5, 7), 16);
      const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, '0');
      const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, '0');
      const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    };

    const animate = () => {
      const targetAmplitude = this.soundSystem.enabled ? 1 : 0;
      currentAmplitude += (targetAmplitude - currentAmplitude) * 0.08;
      ctx.clearRect(0, 0, width, height);
      const time = (Date.now() - startTime) / 1000;
      const muteFactor = 1 - currentAmplitude;
      const primaryColor = '#2C1B14';
      const accentColor = '#A64B23';
      const muteColor = '#D9C4AA';
      if (!this.soundSystem.enabled && currentAmplitude < 0.01) {
        ctx.fillStyle = muteColor;
        ctx.fillRect(0, centerY, width, 2);
      } else {
        ctx.fillStyle = interpolateColor(primaryColor, muteColor, muteFactor);
        for (let i = 0; i < width; i++) {
          const x = i - width / 2;
          const e = Math.exp((-x * x) / 50);
          const y =
            centerY +
            Math.cos(x * 0.4 - time * 8) * e * height * 0.35 * currentAmplitude;
          ctx.fillRect(i, Math.round(y), 1, 2);
        }
        ctx.fillStyle = interpolateColor(accentColor, muteColor, muteFactor);
        for (let i = 0; i < width; i++) {
          const x = i - width / 2;
          const e = Math.exp((-x * x) / 80);
          const y =
            centerY +
            Math.cos(x * 0.3 - time * 5) * e * height * 0.25 * currentAmplitude;
          ctx.fillRect(i, Math.round(y), 1, 2);
        }
      }
      this.soundWaveAnimId = requestAnimationFrame(animate);
    };
    animate();
  }

  /* ---- grid ------------------------------------------------------- */
  splitTextIntoLines(element, text) {
    element.innerHTML = '';
    const sentences = text.split(/(?<=[.!?])\s+/);
    const lines = [];
    const temp = document.createElement('div');
    temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: ${element.offsetWidth || 400}px;
      font-family: 'PPNeueMontreal', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.4;
    `;
    document.body.appendChild(temp);
    let currentLine = '';
    sentences.forEach((sentence) => {
      const words = sentence.split(' ');
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        temp.textContent = testLine;
        if (temp.offsetWidth > (element.offsetWidth || 400) && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
    });
    if (currentLine) lines.push(currentLine);
    document.body.removeChild(temp);
    lines.forEach((lineText) => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'description-line';
      lineSpan.textContent = lineText;
      element.appendChild(lineSpan);
    });
    return element.querySelectorAll('.description-line');
  }

  calculateGapForZoom(zoomLevel) {
    if (zoomLevel >= 1.0) return 16;
    else if (zoomLevel >= 0.6) return 32;
    else return 64;
  }

  calculateGridDimensions(gap = this.config.currentGap) {
    const totalWidth =
      this.config.cols * (this.config.itemSize + gap) - gap;
    const totalHeight =
      this.config.rows * (this.config.itemSize + gap) - gap;
    this.gridDimensions = {
      width: totalWidth,
      height: totalHeight,
      scaledWidth: totalWidth * this.config.currentZoom,
      scaledHeight: totalHeight * this.config.currentZoom,
      gap: gap
    };
    return this.gridDimensions;
  }

  generateGridItems() {
    this.config.currentGap = this.calculateGapForZoom(this.config.currentZoom);
    this.calculateGridDimensions();
    const canvasWrapper = this.refs.canvasWrapper.current;
    const gridContainer = this.refs.gridContainer.current;
    if (canvasWrapper) {
      canvasWrapper.style.width = this.gridDimensions.width + 'px';
      canvasWrapper.style.height = this.gridDimensions.height + 'px';
    }
    gridContainer.innerHTML = '';
    this.gridItems = [];

    let imageIndex = 0;
    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.cols; col++) {
        const item = document.createElement('div');
        item.className = 'grid-item';

        const x = col * (this.config.itemSize + this.config.currentGap);
        const y = row * (this.config.itemSize + this.config.currentGap);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.opacity = '0';

        const imageUrl = this.fashionImages[imageIndex % this.fashionImages.length];
        imageIndex++;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Fashion Portrait ${imageIndex}`;
        item.appendChild(img);

        const itemData = {
          element: item,
          img: img,
          row: row,
          col: col,
          baseX: x,
          baseY: y,
          imageUrl: imageUrl,
          index: this.gridItems.length
        };

        item.addEventListener('click', () => {
          if (!this.zoomState.isActive) {
            this.soundSystem.play('click');
            this.enterZoomMode(itemData);
          }
        });

        gridContainer.appendChild(item);
        this.gridItems.push(itemData);
      }
    }
  }

  setupViewportObserver() {
    if (this.viewportObserver) this.viewportObserver.disconnect();
    this.viewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            this.zoomState.selectedItem &&
            entry.target === this.zoomState.selectedItem.element
          ) {
            return;
          }
          if (entry.isIntersecting) {
            entry.target.classList.remove('out-of-view');
            gsap.to(entry.target, { opacity: 1, duration: 0.6, ease: 'power2.out' });
          } else {
            entry.target.classList.add('out-of-view');
            gsap.to(entry.target, { opacity: 0.1, duration: 0.6, ease: 'power2.out' });
          }
        });
      },
      { root: null, threshold: 0.15, rootMargin: '10%' }
    );
    this.gridItems.forEach((item) => this.viewportObserver.observe(item.element));
  }

  updateTitleOverlay(imageIndex) {
    const data = this.imageData[imageIndex % this.imageData.length];
    const numberElement = this.refs.imageSlideNumber.current?.querySelector('span');
    const titleElement = this.refs.imageSlideTitle.current?.querySelector('h1');
    const descriptionElement = this.refs.imageSlideDescription.current;
    if (numberElement && titleElement && descriptionElement) {
      numberElement.textContent = data.number;
      titleElement.textContent = data.title;
      this.descriptionLines = this.splitTextIntoLines(descriptionElement, data.description);
    }
  }

  createScalingOverlay(sourceImg) {
    const overlay = document.createElement('div');
    overlay.className = 'scaling-image-overlay';
    const img = document.createElement('img');
    img.src = sourceImg.src;
    img.alt = sourceImg.alt;
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    const sourceRect = sourceImg.getBoundingClientRect();
    gsap.set(overlay, {
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      opacity: 1
    });
    return overlay;
  }

  /* ---- zoom mode -------------------------------------------------- */
  enterZoomMode(selectedItemData) {
    if (this.zoomState.isActive) return;
    this.zoomState.isActive = true;
    this.zoomState.selectedItem = selectedItemData;
    this.soundSystem.play('open');
    if (this.draggable) this.draggable.disable();
    document.body.classList.add('zoom-mode');

    const splitContainer = this.refs.splitScreenContainer.current;
    const zoomTarget = this.refs.zoomTarget.current;
    splitContainer.classList.add('active');
    gsap.to(splitContainer, { opacity: 1, duration: 1.2, ease: this.customEase });

    this.zoomState.scalingOverlay = this.createScalingOverlay(selectedItemData.img);
    gsap.set(selectedItemData.img, { opacity: 0 });

    this.zoomState.flipAnimation = Flip.fit(this.zoomState.scalingOverlay, zoomTarget, {
      duration: 1.2,
      ease: this.customEase,
      absolute: true,
      onComplete: () => {
        this.updateTitleOverlay(selectedItemData.index);
        const imageTitleOverlay = this.refs.imageTitleOverlay.current;
        gsap.set('#imageSlideNumber span', { y: 20, opacity: 0 });
        gsap.set('#imageSlideTitle h1', { y: 60, opacity: 0 });
        gsap.set(this.descriptionLines, { y: 80, opacity: 0 });
        imageTitleOverlay.classList.add('active');
        gsap.to(imageTitleOverlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to('#imageSlideNumber span', { duration: 0.8, y: 0, opacity: 1, ease: this.customEase, delay: 0.1 });
        gsap.to('#imageSlideTitle h1', { duration: 0.8, y: 0, opacity: 1, ease: this.customEase, delay: 0.15 });
        gsap.to(this.descriptionLines, { duration: 0.8, y: 0, opacity: 1, ease: this.customEase, delay: 0.2, stagger: 0.15 });
      }
    });

    this.refs.controlsContainer.current.classList.add('split-mode');
    gsap.fromTo(
      this.refs.closeButton.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.9 }
    );
    this.refs.closeButton.current.classList.add('active');

    const splitLeft = this.refs.splitLeft.current;
    const splitRight = this.refs.splitRight.current;
    if (splitLeft) splitLeft.addEventListener('click', this.handleSplitAreaClick);
    if (splitRight) splitRight.addEventListener('click', this.handleSplitAreaClick);
    document.addEventListener('keydown', this.handleZoomKeys);
  }

  handleSplitAreaClick(e) {
    if (e.target === e.currentTarget) this.exitZoomMode();
  }

  exitZoomMode() {
    if (!this.zoomState.isActive || !this.zoomState.selectedItem || !this.zoomState.scalingOverlay) return;
    this.soundSystem.play('close');
    document.removeEventListener('keydown', this.handleZoomKeys);
    const splitLeft = this.refs.splitLeft.current;
    const splitRight = this.refs.splitRight.current;
    if (splitLeft) splitLeft.removeEventListener('click', this.handleSplitAreaClick);
    if (splitRight) splitRight.removeEventListener('click', this.handleSplitAreaClick);
    const splitContainer = this.refs.splitScreenContainer.current;
    const selectedElement = this.zoomState.selectedItem.element;
    const selectedImg = this.zoomState.selectedItem.img;

    if (this.zoomState.flipAnimation) this.zoomState.flipAnimation.kill();

    const overlayElement = this.refs.imageTitleOverlay.current;
    gsap.to(overlayElement, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to('#imageSlideNumber span', { duration: 0.4, y: -20, opacity: 0, ease: 'power2.out' });
    gsap.to('#imageSlideTitle h1', { duration: 0.4, y: -60, opacity: 0, ease: 'power2.out' });
    if (this.descriptionLines) {
      gsap.to(this.descriptionLines, {
        duration: 0.4,
        y: -80,
        opacity: 0,
        ease: 'power2.out',
        stagger: -0.05,
        onComplete: () => {
          overlayElement.classList.remove('active');
          gsap.set('#imageSlideNumber span', { y: 20, opacity: 0 });
          gsap.set('#imageSlideTitle h1', { y: 60, opacity: 0 });
          gsap.set(this.descriptionLines, { y: 80, opacity: 0 });
        }
      });
    }

    gsap.to(this.refs.closeButton.current, { duration: 0.3, opacity: 0, x: 40, ease: 'power2.in' });
    splitContainer.classList.remove('active');
    this.refs.controlsContainer.current.classList.remove('split-mode');
    gsap.to(splitContainer, { opacity: 0, duration: 0.8, ease: 'power2.out' });

    Flip.fit(this.zoomState.scalingOverlay, selectedElement, {
      duration: 1.2,
      ease: this.customEase,
      absolute: true,
      onComplete: () => {
        gsap.set(selectedImg, { opacity: 1 });
        if (this.zoomState.scalingOverlay) {
          document.body.removeChild(this.zoomState.scalingOverlay);
          this.zoomState.scalingOverlay = null;
        }
        splitContainer.classList.remove('active');
        document.body.classList.remove('zoom-mode');
        this.refs.closeButton.current.classList.remove('active');
        if (this.draggable) this.draggable.enable();
        this.zoomState.isActive = false;
        this.zoomState.selectedItem = null;
        this.zoomState.flipAnimation = null;
      }
    });
    if (this.zoomState.scalingOverlay) {
      gsap.to(this.zoomState.scalingOverlay, { opacity: 0.4, duration: 0.8, ease: 'power2.out' });
    }
  }

  handleZoomKeys(e) {
    if (!this.zoomState.isActive) return;
    if (e.key === 'Escape') this.exitZoomMode();
  }

  /* ---- drag / pan ------------------------------------------------- */
  calculateBounds() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { scaledWidth, scaledHeight } = this.gridDimensions;
    const marginX = this.config.currentGap * this.config.currentZoom;
    const marginY = this.config.currentGap * this.config.currentZoom;
    let minX, maxX, minY, maxY;
    if (scaledWidth <= vw) {
      const centerX = (vw - scaledWidth) / 2;
      minX = maxX = centerX;
    } else {
      maxX = marginX;
      minX = vw - scaledWidth - marginX;
    }
    if (scaledHeight <= vh) {
      const centerY = (vh - scaledHeight) / 2;
      minY = maxY = centerY;
    } else {
      maxY = marginY;
      minY = vh - scaledHeight - marginY;
    }
    return { minX, maxX, minY, maxY };
  }

  initDraggable() {
    if (this.draggable) this.draggable.kill();
    this.calculateGridDimensions(this.config.currentGap);
    const bounds = this.calculateBounds();
    const hasInertia = typeof InertiaPlugin !== 'undefined';

    this.draggable = Draggable.create(this.refs.canvasWrapper.current, {
      type: 'x,y',
      bounds: bounds,
      edgeResistance: 0.8,
      inertia: hasInertia,
      ...(hasInertia && {
        throwProps: {
          x: { velocity: 'auto', resistance: 300, end: (endValue) => Math.round(endValue) },
          y: { velocity: 'auto', resistance: 300, end: (endValue) => Math.round(endValue) }
        }
      }),
      onDragStart: () => {
        document.body.classList.add('dragging');
        this.soundSystem.play('drag-start');
        this.lastValidPosition.x = this.draggable.x;
        this.lastValidPosition.y = this.draggable.y;
      },
      onDrag: () => {
        this.lastValidPosition.x = this.draggable.x;
        this.lastValidPosition.y = this.draggable.y;
      },
      onDragEnd: () => {
        document.body.classList.remove('dragging');
        this.soundSystem.play('drag-end');
      }
    })[0];
  }

  handleMouseLeave() {
    if (document.body.classList.contains('dragging')) {
      document.body.classList.remove('dragging');
      gsap.to(this.refs.canvasWrapper.current, {
        duration: 0.6,
        x: this.lastValidPosition.x,
        y: this.lastValidPosition.y,
        ease: 'power2.out'
      });
      if (this.draggable) this.draggable.endDrag();
    }
  }

  /* ---- zoom controls ---------------------------------------------- */
  calculateFitZoom() {
    const vw = window.innerWidth;
    const vh = window.innerHeight - 80;
    const currentGap = this.calculateGapForZoom(1.0);
    const gridWidth =
      this.config.cols * (this.config.itemSize + currentGap) - currentGap;
    const gridHeight =
      this.config.rows * (this.config.itemSize + currentGap) - currentGap;
    const margin = 40;
    const availableWidth = vw - margin * 2;
    const availableHeight = vh - margin * 2;
    const zoomToFitWidth = availableWidth / gridWidth;
    const zoomToFitHeight = availableHeight / gridHeight;
    const fitZoom = Math.min(zoomToFitWidth, zoomToFitHeight);
    return Math.max(0.1, Math.min(2.0, fitZoom));
  }

  updatePercentageIndicator(zoomLevel) {
    const percentage = Math.round(zoomLevel * 100);
    const el = this.refs.percentageIndicator.current;
    if (el) el.textContent = `${percentage}%`;
  }

  setCurrentButton(zoomLevel) {
    document.querySelectorAll('.switch-button').forEach((btn) => {
      btn.classList.remove('switch-button-current');
    });
    const buttons = document.querySelectorAll('.switch-button');
    if (zoomLevel === 0.3) buttons[0]?.classList.add('switch-button-current');
    else if (zoomLevel === 0.6) buttons[1]?.classList.add('switch-button-current');
    else if (zoomLevel === 1.0) buttons[2]?.classList.add('switch-button-current');
    else if (zoomLevel < 0.6) buttons[0]?.classList.add('switch-button-current');
  }

  setZoom(zoomLevel, buttonElement = null) {
    if (this.zoomState.isActive) {
      this.exitZoomMode();
      return;
    }
    const newGap = this.calculateGapForZoom(zoomLevel);
    const oldZoom = this.config.currentZoom;
    this.config.currentZoom = zoomLevel;
    this.soundSystem.play(zoomLevel < oldZoom ? 'zoom-out' : 'zoom-in');
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const currentScaledWidth = this.gridDimensions.width * oldZoom;
    const currentScaledHeight = this.gridDimensions.height * oldZoom;
    const centerX = (vw - currentScaledWidth) / 2;
    const centerY = (vh - currentScaledHeight) / 2;

    gsap.to(this.refs.canvasWrapper.current, {
      duration: 0.6,
      x: centerX,
      y: centerY,
      ease: this.centerEase,
      onComplete: () => {
        if (newGap !== this.config.currentGap) {
          this.gridItems.forEach((itemData) => {
            const newX = itemData.col * (this.config.itemSize + newGap);
            const newY = itemData.row * (this.config.itemSize + newGap);
            itemData.baseX = newX;
            itemData.baseY = newY;
            gsap.to(itemData.element, { duration: 1.2, left: newX, top: newY, ease: this.customEase });
          });
          const newWidth = this.config.cols * (this.config.itemSize + newGap) - newGap;
          const newHeight = this.config.rows * (this.config.itemSize + newGap) - newGap;
          gsap.to(this.refs.canvasWrapper.current, { duration: 1.2, width: newWidth, height: newHeight, ease: this.customEase });
          this.config.currentGap = newGap;
        }
        this.calculateGridDimensions(newGap);
        const finalScaledWidth = this.gridDimensions.width * zoomLevel;
        const finalScaledHeight = this.gridDimensions.height * zoomLevel;
        const finalCenterX = (vw - finalScaledWidth) / 2;
        const finalCenterY = (vh - finalScaledHeight) / 2;
        gsap.to(this.refs.canvasWrapper.current, {
          duration: 1.2,
          scale: zoomLevel,
          x: finalCenterX,
          y: finalCenterY,
          ease: this.customEase,
          onComplete: () => {
            this.lastValidPosition.x = finalCenterX;
            this.lastValidPosition.y = finalCenterY;
            this.calculateGridDimensions(newGap);
            this.initDraggable();
          }
        });
      }
    });

    this.updatePercentageIndicator(zoomLevel);
    this.setCurrentButton(zoomLevel);
    if (buttonElement) buttonElement.classList.add('switch-button-current');
  }

  autoFitZoom(buttonElement = null) {
    if (this.zoomState.isActive) {
      this.exitZoomMode();
      return;
    }
    const fitZoom = this.calculateFitZoom();
    this.config.currentZoom = fitZoom;
    const newGap = this.calculateGapForZoom(fitZoom);
    this.soundSystem.play(fitZoom < 0.6 ? 'zoom-out' : 'zoom-in');
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const currentScaledWidth = this.gridDimensions.width * this.config.currentZoom;
    const currentScaledHeight = this.gridDimensions.height * this.config.currentZoom;
    const centerX = (vw - currentScaledWidth) / 2;
    const centerY = (vh - currentScaledHeight) / 2;

    gsap.to(this.refs.canvasWrapper.current, {
      duration: 0.6,
      x: centerX,
      y: centerY,
      ease: this.centerEase,
      onComplete: () => {
        if (newGap !== this.config.currentGap) {
          this.gridItems.forEach((itemData) => {
            const newX = itemData.col * (this.config.itemSize + newGap);
            const newY = itemData.row * (this.config.itemSize + newGap);
            itemData.baseX = newX;
            itemData.baseY = newY;
            gsap.to(itemData.element, { duration: 1.0, left: newX, top: newY, ease: this.customEase });
          });
          const newWidth = this.config.cols * (this.config.itemSize + newGap) - newGap;
          const newHeight = this.config.rows * (this.config.itemSize + newGap) - newGap;
          gsap.to(this.refs.canvasWrapper.current, { duration: 1.0, width: newWidth, height: newHeight, ease: this.customEase });
          this.config.currentGap = newGap;
        }
        this.calculateGridDimensions(newGap);
        const finalScaledWidth = this.gridDimensions.width * fitZoom;
        const finalScaledHeight = this.gridDimensions.height * fitZoom;
        const finalCenterX = (vw - finalScaledWidth) / 2;
        const finalCenterY = (vh - finalScaledHeight) / 2;
        gsap.to(this.refs.canvasWrapper.current, {
          duration: 1.2,
          scale: fitZoom,
          x: finalCenterX,
          y: finalCenterY,
          ease: this.customEase,
          onComplete: () => {
            this.lastValidPosition.x = finalCenterX;
            this.lastValidPosition.y = finalCenterY;
            this.initDraggable();
          }
        });
      }
    });

    this.updatePercentageIndicator(fitZoom);
    this.setCurrentButton(fitZoom);
    if (buttonElement) buttonElement.classList.add('switch-button-current');
  }

  resetPosition() {
    if (this.zoomState.isActive) {
      this.exitZoomMode();
      return;
    }
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { scaledWidth, scaledHeight } = this.gridDimensions;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;
    gsap.to(this.refs.canvasWrapper.current, {
      duration: 1.0,
      x: centerX,
      y: centerY,
      ease: this.centerEase,
      onComplete: () => {
        this.lastValidPosition.x = centerX;
        this.lastValidPosition.y = centerY;
        this.initDraggable();
      }
    });
  }

  /* ---- intro animation -------------------------------------------- */
  playIntroAnimation() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const screenCenterX = vw / 2;
    const screenCenterY = vh / 2;
    const canvasWrapper = this.refs.canvasWrapper.current;
    const canvasStyle = getComputedStyle(canvasWrapper);
    const canvasMatrix = new DOMMatrix(canvasStyle.transform);
    const canvasX = canvasMatrix.m41;
    const canvasY = canvasMatrix.m42;
    const canvasScale = canvasMatrix.a;
    const centerX =
      (screenCenterX - canvasX) / canvasScale - this.config.itemSize / 2;
    const centerY =
      (screenCenterY - canvasY) / canvasScale - this.config.itemSize / 2;

    this.gridItems.forEach((itemData, index) => {
      const zIndex = this.gridItems.length - index;
      gsap.set(itemData.element, {
        left: centerX,
        top: centerY,
        scale: 0.8,
        zIndex: zIndex,
        opacity: 0
      });
    });

    gsap.to(this.gridItems.map((item) => item.element), {
      duration: 0.2,
      left: (index) => this.gridItems[index].baseX,
      top: (index) => this.gridItems[index].baseY,
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
      stagger: { amount: 1.5, from: 'start', grid: [this.config.rows, this.config.cols] },
      onComplete: () => {
        this.gridItems.forEach((itemData) => {
          gsap.set(itemData.element, { zIndex: 1 });
        });
        this.showControls();
      }
    });
  }

  showControls() {
    const controlsContainer = this.refs.controlsContainer.current;
    const percentageIndicator = this.refs.percentageIndicator.current;
    const switchElement = this.refs.controls.current;
    const soundToggle = this.refs.soundToggle.current;

    gsap.set(controlsContainer, { opacity: 0 });
    gsap.set(percentageIndicator, { x: '-3em' });
    gsap.set(switchElement, { y: '2em' });
    gsap.set(soundToggle, { x: '3em' });

    const navTimeline = gsap.timeline();
    navTimeline.to(controlsContainer, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0);
    navTimeline.to(percentageIndicator, { x: 0, duration: 0.2, ease: 'power2.out' }, 0.25);
    navTimeline.to(switchElement, { y: 0, duration: 0.2, ease: 'power2.out' }, 0.3);
    navTimeline.to(soundToggle, { x: 0, duration: 0.2, ease: 'power2.out' }, 0.35);
    controlsContainer.classList.add('visible');
  }

  /* ---- init ------------------------------------------------------- */
  setupEventListeners() {
    window.addEventListener('resize', this.handleWindowResize);
    document.addEventListener('mouseleave', this.handleMouseLeave);
    const viewport = this.refs.viewport.current;
    if (viewport) viewport.addEventListener('mouseleave', this.handleMouseLeave);
    const closeButton = this.refs.closeButton.current;
    if (closeButton) closeButton.addEventListener('click', () => this.exitZoomMode());
    const soundToggle = this.refs.soundToggle.current;
    if (soundToggle) soundToggle.addEventListener('click', () => this.soundSystem.toggle());
    document.addEventListener('keydown', this.handleGlobalKeyDown);
  }

  handleWindowResize() {
    setTimeout(() => {
      this.resetPosition();
      this.initDraggable();
    }, 100);
  }

  handleGlobalKeyDown(e) {
    if (this.zoomState.isActive) return;
    switch (e.key) {
      case '1': this.setZoom(0.3); break;
      case '2': this.setZoom(0.6); break;
      case '3': this.setZoom(1.0); break;
      case 'f':
      case 'F': this.autoFitZoom(); break;
      default: break;
    }
  }

  init() {
    this.initGridConfig();
    this.config.currentGap = this.calculateGapForZoom(this.config.currentZoom);
    this.generateGridItems();

    gsap.set(this.refs.viewport.current, { opacity: 0 });
    gsap.set(this.refs.canvasWrapper.current, { scale: this.config.currentZoom });
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { scaledWidth, scaledHeight } = this.gridDimensions;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;
    gsap.set(this.refs.canvasWrapper.current, { x: centerX, y: centerY });
    this.lastValidPosition.x = centerX;
    this.lastValidPosition.y = centerY;
    this.updatePercentageIndicator(this.config.currentZoom);

    this.setupEventListeners();

    gsap.to(this.refs.viewport.current, {
      duration: 0.6,
      opacity: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        this.playIntroAnimation();
        gsap.to('.header', { duration: 1.2, opacity: 1, ease: 'power2.out', delay: 0.8 });
        gsap.to('.footer', { duration: 1.4, opacity: 1, ease: 'power2.out', delay: 1 });
        setTimeout(() => {
          this.initDraggable();
          this.setupViewportObserver();
        }, 1500);
      }
    });
  }

  /* ---- cleanup ---------------------------------------------------- */
  destroy() {
    if (this.viewportObserver) {
      this.viewportObserver.disconnect();
      this.viewportObserver = null;
    }
    if (this.draggable) {
      this.draggable.kill();
      this.draggable = null;
    }
    if (this.soundWaveAnimId) {
      cancelAnimationFrame(this.soundWaveAnimId);
    }
    window.removeEventListener('resize', this.handleWindowResize);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    document.removeEventListener('keydown', this.handleZoomKeys);
    document.removeEventListener('keydown', this.handleGlobalKeyDown);
    const viewport = this.refs.viewport.current;
    if (viewport) viewport.removeEventListener('mouseleave', this.handleMouseLeave);
    const closeButton = this.refs.closeButton.current;
    if (closeButton) closeButton.removeEventListener('click', () => this.exitZoomMode());
    const soundToggle = this.refs.soundToggle.current;
    if (soundToggle) soundToggle.removeEventListener('click', () => this.soundSystem.toggle());
    const splitLeft = this.refs.splitLeft.current;
    const splitRight = this.refs.splitRight.current;
    if (splitLeft) splitLeft.removeEventListener('click', this.handleSplitAreaClick);
    if (splitRight) splitRight.removeEventListener('click', this.handleSplitAreaClick);
    gsap.killTweensOf('.header');
    gsap.killTweensOf('.footer');
    document.body.classList.remove('dragging', 'zoom-mode');
    this.zoomState.isActive = false;
    this.zoomState.selectedItem = null;
    this.zoomState.flipAnimation = null;
    this.zoomState.scalingOverlay = null;
  }
}

/* ------------------------------------------------------------------ */
/*  React component                                                    */
/* ------------------------------------------------------------------ */
export const GallerySection = () => {
  // Refs for every DOM node the gallery touches
  const preloaderOverlayRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const gridContainerRef = useRef(null);
  const splitScreenContainerRef = useRef(null);
  const splitLeftRef = useRef(null);
  const splitRightRef = useRef(null);
  const zoomTargetRef = useRef(null);
  const imageTitleOverlayRef = useRef(null);
  const imageSlideNumberRef = useRef(null);
  const imageSlideTitleRef = useRef(null);
  const imageSlideDescriptionRef = useRef(null);
  const closeButtonRef = useRef(null);
  const controlsContainerRef = useRef(null);
  const percentageIndicatorRef = useRef(null);
  const controlsRef = useRef(null);
  const soundToggleRef = useRef(null);
  const soundWaveCanvasRef = useRef(null);

  const galleryRef = useRef(null);
  const preloaderRef = useRef(null);

  const refs = useMemo(
    () => ({
      preloaderOverlay: preloaderOverlayRef,
    viewport: viewportRef,
    canvasWrapper: canvasWrapperRef,
    gridContainer: gridContainerRef,
    splitScreenContainer: splitScreenContainerRef,
    splitLeft: splitLeftRef,
    splitRight: splitRightRef,
    zoomTarget: zoomTargetRef,
    imageTitleOverlay: imageTitleOverlayRef,
    imageSlideNumber: imageSlideNumberRef,
    imageSlideTitle: imageSlideTitleRef,
    imageSlideDescription: imageSlideDescriptionRef,
    closeButton: closeButtonRef,
    controlsContainer: controlsContainerRef,
    percentageIndicator: percentageIndicatorRef,
    controls: controlsRef,
    soundToggle: soundToggleRef,
    soundWaveCanvas: soundWaveCanvasRef
    }),
    []
  );

  const startGallery = useCallback(() => {
    // Preloader runs first, then the gallery
    preloaderRef.current = new PreloaderManager({
      overlayRef: preloaderOverlayRef,
      duration: 2000,
      onComplete: () => {
        const gallery = new FashionGallery(refs);
        galleryRef.current = gallery;
        gallery.initSoundSystem();
        gallery.init();
      }
    });
  }, [refs]);

  // Wait for GSAP to be available (CDN scripts load asynchronously)
  useEffect(() => {
    let timer;
    const waitForGsap = () => {
      if (typeof gsap !== 'undefined') {
        startGallery();
        return;
      }
      timer = setTimeout(waitForGsap, 50);
    };
    waitForGsap();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [startGallery]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (galleryRef.current) galleryRef.current.destroy();
      if (preloaderRef.current) preloaderRef.current.destroy();
    };
  }, []);

  return (
    <div className="gallery-section" data-testid="gallery-section">
      {/* Preloader */}
      <div id="preloader-overlay" ref={preloaderOverlayRef} />

      {/* Header Navigation */}
      <div className="header">
        <div className="nav-section">
          <div className="logo-container" aria-label="Logo">
            <div className="logo-circles">
              <div className="circle circle-1" />
              <div className="circle circle-2" />
            </div>
          </div>
        </div>
        <div className="values-section">
          <h3>+Menu</h3>
          <ul>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">Work</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">About</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">Services</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="location-section">
          <h3>+Studio</h3>
          <p>Los Angeles</p>
          <p>California</p>
        </div>
        <div className="contact-section">
          <h3>+Connect</h3>
          <p><a href="mailto:hi@filip.fyi">hi@filip.fyi</a></p>
        </div>
        <div className="social-section">
          <h3>+Follow</h3>
          <ul>
            <li><a href="https://instagram.com/filipz__">Instagram</a></li>
            <li><a href="https://x.com/filipz">Twitter</a></li>
            <li><a href="https://linkedin.com/in/filipzrnzevic">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="viewport" id="viewport" ref={viewportRef}>
        <div className="canvas-wrapper" id="canvasWrapper" ref={canvasWrapperRef}>
          <div className="grid-container" id="gridContainer" ref={gridContainerRef}>
            {/* Grid items generated by JavaScript */}
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="split-screen-container" id="splitScreenContainer" ref={splitScreenContainerRef}>
        <div className="split-left" id="splitLeft" ref={splitLeftRef}>
          <div className="zoom-target" id="zoomTarget" ref={zoomTargetRef} />
        </div>
        <div className="split-right" id="splitRight" ref={splitRightRef} />
      </div>

      {/* Image Title Overlay */}
      <div className="image-title-overlay" id="imageTitleOverlay" ref={imageTitleOverlayRef}>
        <div className="image-slide-number" id="imageSlideNumber" ref={imageSlideNumberRef}>
          <span>01</span>
        </div>
        <div className="image-slide-title" id="imageSlideTitle" ref={imageSlideTitleRef}>
          <h1>Fashion Portrait</h1>
        </div>
        <div className="image-slide-description" id="imageSlideDescription" ref={imageSlideDescriptionRef} />
      </div>

      {/* Close button */}
      <button className="close-button" id="closeButton" ref={closeButtonRef} aria-label="Close zoom">
        <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z" fill="white" />
        </svg>
      </button>

      {/* Controls Container */}
      <div className="controls-container" id="controlsContainer" ref={controlsContainerRef}>
        <div className="percentage-indicator" id="percentageIndicator" ref={percentageIndicatorRef}>
          60%
        </div>
        <div className="switch" id="controls" ref={controlsRef}>
          <button
            className="switch-button"
            type="button"
            onClick={() => {
              if (galleryRef.current) galleryRef.current.setZoom(0.3);
            }}
          >
            <span className="indicator-dot" /> ZOOM OUT
          </button>
          <button
            className="switch-button switch-button-current"
            type="button"
            onClick={() => {
              if (galleryRef.current) galleryRef.current.setZoom(0.6);
            }}
          >
            <span className="indicator-dot" /> NORMAL
          </button>
          <button
            className="switch-button"
            type="button"
            onClick={() => {
              if (galleryRef.current) galleryRef.current.setZoom(1.0);
            }}
          >
            <span className="indicator-dot" /> ZOOM IN
          </button>
          <button
            className="switch-button"
            type="button"
            onClick={() => {
              if (galleryRef.current) galleryRef.current.autoFitZoom();
            }}
          >
            <span className="indicator-dot" /> FIT
          </button>
        </div>
        <button
          className="sound-toggle"
          id="soundToggle"
          ref={soundToggleRef}
          type="button"
          aria-label="Toggle sound"
        >
          <canvas className="sound-wave-canvas" id="soundWaveCanvas" ref={soundWaveCanvasRef} width="32" height="16" />
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="footer">
        <div className="info-section">
          <p>Est. 2025 • Summer Days</p>
          <p>34.0522° N, 118.2437° W</p>
        </div>
      </div>

      {/* Page vignette effects */}
      <div className="page-vignette-container">
        <div className="page-vignette-extreme" />
      </div>
    </div>
  );
};

export default GallerySection;

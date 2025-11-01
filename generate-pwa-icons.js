// Simple PWA Icon Generator using Canvas
// Run with: node generate-pwa-icons.js

import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient (approximation with solid color)
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, size, size);

  // Draw white circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  // Draw checkmark
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(centerX - radius * 0.4, centerY);
  ctx.lineTo(centerX - radius * 0.1, centerY + radius * 0.3);
  ctx.lineTo(centerX + radius * 0.5, centerY - radius * 0.4);
  ctx.stroke();

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filename = join(process.cwd(), 'public', `pwa-${size}x${size}.png`);
  writeFileSync(filename, buffer);
  console.log(`✓ Generated ${filename}`);
}

console.log('Generating PWA icons...');
generateIcon(192);
generateIcon(512);
console.log('Done! Icons saved to /public directory');

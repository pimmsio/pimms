#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Simple SVG optimization function
function optimizeSVG(svgContent) {
  return (
    svgContent
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Remove unnecessary whitespace
      .replace(/>\s+</g, "><")
      // Remove empty attributes
      .replace(/\s+[a-zA-Z-]+=["']['"]/g, "")
      // Simplify fill="none" to just fill if it's the only fill
      .replace(/fill="none"/g, 'fill="none"')
      // Remove unnecessary precision in numbers (keep 2 decimal places)
      .replace(/(\d+\.\d{3,})/g, (match) => {
        return parseFloat(match).toFixed(2);
      })
      .trim()
  );
}

function optimizeSVGsInDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      optimizeSVGsInDirectory(filePath);
    } else if (path.extname(file) === ".svg") {
      const originalContent = fs.readFileSync(filePath, "utf8");
      const optimizedContent = optimizeSVG(originalContent);

      if (originalContent !== optimizedContent) {
        const originalSize = Buffer.byteLength(originalContent, "utf8");
        const optimizedSize = Buffer.byteLength(optimizedContent, "utf8");
        const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

        fs.writeFileSync(filePath, optimizedContent);
        console.log(`✓ Optimized ${file}: ${originalSize}B → ${optimizedSize}B (${savings}% smaller)`);
      }
    }
  });
}

// Run optimization on public/static directory
const staticDir = path.join(__dirname, "..", "public", "static");
if (fs.existsSync(staticDir)) {
  console.log("🎨 Optimizing SVG files...");
  optimizeSVGsInDirectory(staticDir);
  console.log("✅ SVG optimization complete!");
} else {
  console.log("❌ Static directory not found");
}

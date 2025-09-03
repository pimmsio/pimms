const fs = require("fs");
const path = require("path");

/**
 * Validates all internal links in MDX files against pathnames.ts
 * Checks both pathname keys and language-specific values
 */

// Read pathnames and extract valid paths by language
const pathnamesContent = fs.readFileSync("./i18n/pathnames.ts", "utf8");

// Extract pathnames object
const pathnames = {};
const entryMatches = pathnamesContent.matchAll(/"([^"]+)":\s*{([^}]+)}/g);

for (const match of entryMatches) {
  const key = match[1];
  const content = match[2];

  // Extract language-specific paths
  const enMatch = content.match(/"en":\s*"([^"]+)"/);
  const frMatch = content.match(/"fr":\s*"([^"]+)"/);

  if (!pathnames[key]) pathnames[key] = {};
  if (enMatch) pathnames[key].en = enMatch[1];
  if (frMatch) pathnames[key].fr = frMatch[1];
}

console.log(`📋 Found ${Object.keys(pathnames).length} pathname entries`);

// Function to extract internal links from MDX content
function extractInternalLinks(content) {
  const linkPattern = /\]\((\/[^h][^)]*)\)/g;
  const matches = [];
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

// Function to check all MDX files
function checkAllMDXFiles(dir) {
  const results = [];

  function checkDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        checkDirectory(filePath);
      } else if (file.endsWith(".mdx")) {
        // Determine language from path
        const isEnglish = filePath.includes("/en/");
        const isFrench = filePath.includes("/fr/");
        const language = isEnglish ? "en" : isFrench ? "fr" : "unknown";

        const content = fs.readFileSync(filePath, "utf8");
        const links = extractInternalLinks(content);

        for (const link of links) {
          let isValid = false;
          let suggestedFix = null;

          // CORRECT VALIDATION: Internal links should be pathname KEYS, not values
          if (pathnames[link]) {
            isValid = true;
          } else {
            // If not found as key, try to find a suggestion
            for (const [key, langs] of Object.entries(pathnames)) {
              // Look for similar keys or if this link matches a pathname value
              if (
                key.includes(link.split("/").pop()) ||
                link.includes(key.split("/").pop()) ||
                langs[language] === link
              ) {
                suggestedFix = key;
                break;
              }
            }
          }

          if (!isValid) {
            results.push({
              file: filePath.replace("./content/", ""),
              link: link,
              language: language,
              suggestedFix: suggestedFix,
              status: "BROKEN"
            });
          }
        }
      }
    }
  }

  checkDirectory(dir);
  return results;
}

// Check all content
const brokenLinks = checkAllMDXFiles("./content");

if (brokenLinks.length === 0) {
  console.log("✅ All internal links are valid!");
} else {
  console.log(`❌ Found ${brokenLinks.length} broken internal links:`);
  console.log("");

  // Group by file for better readability
  const byFile = {};
  brokenLinks.forEach(({ file, link, language, suggestedFix }) => {
    if (!byFile[file]) byFile[file] = [];
    byFile[file].push({ link, language, suggestedFix });
  });

  Object.entries(byFile).forEach(([file, links]) => {
    console.log(`\n📄 ${file}:`);
    links.forEach(({ link, language, suggestedFix }) => {
      console.log(`   ❌ ${link} (${language})${suggestedFix ? ` → fix: ${suggestedFix}` : ""}`);
    });
  });
}

console.log(`\n📊 Validation complete - checked all MDX files for internal link integrity.`);

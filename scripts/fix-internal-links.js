const fs = require("fs");
const path = require("path");

/**
 * Automatically fixes broken internal links in MDX files
 * Uses pathnames.ts to find correct link destinations
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
    matches.push({
      fullMatch: match[0],
      link: match[1],
      index: match.index
    });
  }

  return matches;
}

// Function to find the correct pathname key for a broken link
function findCorrectPath(brokenLink, language) {
  // Try to find the pathname key that has this broken link as its language value
  for (const [key, langs] of Object.entries(pathnames)) {
    if (langs[language] === brokenLink) {
      return key;
    }
  }

  // If not found, look for similar paths
  const linkSlug = brokenLink.split("/").pop();
  for (const [key, langs] of Object.entries(pathnames)) {
    if (key.includes(linkSlug) || (langs[language] && langs[language].includes(linkSlug))) {
      return key;
    }
  }

  return null;
}

// Function to fix all MDX files
function fixAllMDXFiles(dir) {
  let totalFixed = 0;
  const results = [];

  function fixDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        fixDirectory(filePath);
      } else if (file.endsWith(".mdx")) {
        // Determine language from path
        const isEnglish = filePath.includes("/en/");
        const isFrench = filePath.includes("/fr/");
        const language = isEnglish ? "en" : isFrench ? "fr" : "unknown";

        let content = fs.readFileSync(filePath, "utf8");
        const links = extractInternalLinks(content);
        let fileFixed = false;
        const fileResults = [];

        for (const linkData of links) {
          const { link, fullMatch } = linkData;

          // Check if link is valid (should be a pathname key)
          if (!pathnames[link]) {
            const correctPath = findCorrectPath(link, language);

            if (correctPath) {
              // Replace the broken link with the correct one
              const newMatch = fullMatch.replace(link, correctPath);
              content = content.replace(fullMatch, newMatch);
              fileFixed = true;
              totalFixed++;

              fileResults.push({
                from: link,
                to: correctPath,
                status: "FIXED"
              });
            } else {
              fileResults.push({
                from: link,
                to: null,
                status: "NO_FIX_FOUND"
              });
            }
          }
        }

        // Write the file back if changes were made
        if (fileFixed) {
          fs.writeFileSync(filePath, content, "utf8");
          results.push({
            file: filePath.replace("./content/", ""),
            fixes: fileResults.filter((r) => r.status === "FIXED")
          });
        } else if (fileResults.length > 0) {
          results.push({
            file: filePath.replace("./content/", ""),
            fixes: fileResults
          });
        }
      }
    }
  }

  fixDirectory(dir);
  return { results, totalFixed };
}

// Fix all content
const { results, totalFixed } = fixAllMDXFiles("./content");

if (totalFixed === 0) {
  console.log("✅ No broken links found to fix!");
} else {
  console.log(`🔧 Fixed ${totalFixed} broken internal links:`);
  console.log("");

  results.forEach(({ file, fixes }) => {
    if (fixes.length > 0) {
      console.log(`\n📄 ${file}:`);
      fixes.forEach(({ from, to, status }) => {
        if (status === "FIXED") {
          console.log(`   ✅ ${from} → ${to}`);
        } else {
          console.log(`   ❌ ${from} → No fix found`);
        }
      });
    }
  });
}

console.log(`\n📊 Link fixing complete - regenerate pathnames if needed.`);

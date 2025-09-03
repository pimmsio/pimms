#!/usr/bin/env node

/**
 * Simple script to check redirects by making HTTP requests to pimms.io
 */

const fs = require("fs");
const path = require("path");

// Import redirects
const redirectsPath = path.join(__dirname, "../redirect.ts");
const redirectsContent = fs.readFileSync(redirectsPath, "utf8");

// Parse the redirects
const redirects = [];
const redirectMatches = redirectsContent.matchAll(
  /{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*permanent:\s*true\s*}/g
);

for (const match of redirectMatches) {
  redirects.push({
    source: match[1],
    destination: match[2]
  });
}

console.log(`🔍 Checking ${redirects.length} redirects on pimms.io...\n`);

async function checkUrl(url) {
  try {
    const fullUrl = `https://pimms.io${url}`;
    const response = await fetch(fullUrl, {
      method: "HEAD",
      redirect: "manual" // Don't follow redirects, we want to check the destination
    });

    return {
      url: fullUrl,
      status: response.status,
      ok: response.status >= 200 && response.status < 400
    };
  } catch (error) {
    return {
      url: `https://pimms.io${url}`,
      status: "ERROR",
      ok: false,
      error: error.message
    };
  }
}

async function checkAllRedirects() {
  const brokenRedirects = [];
  const validRedirects = [];

  console.log("Checking destination URLs...\n");

  for (let i = 0; i < redirects.length; i++) {
    const redirect = redirects[i];
    const result = await checkUrl(redirect.destination);

    if (result.ok) {
      validRedirects.push(redirect);
      console.log(`✅ ${redirect.source} → ${redirect.destination} (${result.status})`);
    } else {
      brokenRedirects.push({ ...redirect, ...result });
      console.log(`❌ ${redirect.source} → ${redirect.destination} (${result.status})`);
    }

    // Add small delay to be nice to the server
    if (i < redirects.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`✅ Valid redirects: ${validRedirects.length}`);
  console.log(`❌ Broken redirects: ${brokenRedirects.length}`);

  if (brokenRedirects.length > 0) {
    console.log(`\n=== BROKEN REDIRECTS ===`);
    brokenRedirects.forEach((redirect) => {
      console.log(`${redirect.source} → ${redirect.destination} (${redirect.status})`);
    });

    process.exit(1);
  } else {
    console.log(`\n🎉 All redirects are working!`);
  }
}

checkAllRedirects().catch(console.error);

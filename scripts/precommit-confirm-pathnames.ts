import { execSync } from "child_process";
import readlineSync from "readline-sync";

// Check if pathnames.ts has unstaged or staged changes
const diffOutput = execSync(
  "git diff --name-only && git diff --name-only --cached"
).toString();
const hasChanged = diffOutput.includes("i18n/pathnames.ts");

if (hasChanged) {
  const answer = readlineSync.question(
    "⚠️  pathnames.ts has been modified. Do you want to commit this change? (y/N) "
  );

  if (answer.toLowerCase() === "y") {
    // Stage the file (whether it was staged or not)
    execSync("git add i18n/pathnames.ts");
    console.log("✅ pathnames.ts will be committed.");
  } else {
    // Restore both staged and unstaged changes to pathnames.ts
    execSync("git restore --staged i18n/pathnames.ts || true");
    execSync("git restore i18n/pathnames.ts || true");
    console.log("❌ pathnames.ts changes discarded.");
  }
}

process.exit(0); // Always allow the commit to proceed

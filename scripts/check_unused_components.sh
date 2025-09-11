#!/bin/bash

echo "Checking for unused components..."
echo "================================"

# Get all component files
components=$(find components -name "*.tsx" -o -name "*.ts" | grep -v index.ts | sort)

unused_components=()

for component in $components; do
    # Extract component name from file path
    filename=$(basename "$component" .tsx)
    filename=$(basename "$filename" .ts)
    
    # Skip some special cases
    if [[ "$filename" == "types" || "$filename" == "chart-context" ]]; then
        continue
    fi
    
    # Search for imports of this component across the codebase
    # Check for various import patterns
    import_count=0
    
    # Check for direct imports like: from "./component" or from "@/components/..."
    import_count=$(grep -r "from.*['\"].*${filename}['\"]" . --include="*.tsx" --include="*.ts" --include="*.mdx" --exclude-dir=node_modules --exclude-dir=.next | wc -l)
    
    # Also check for default imports and named imports
    usage_count=$(grep -r "import.*${filename}" . --include="*.tsx" --include="*.ts" --include="*.mdx" --exclude-dir=node_modules --exclude-dir=.next | wc -l)
    
    # Check for component usage in JSX (like <ComponentName>)
    jsx_usage=$(grep -r "<${filename}" . --include="*.tsx" --include="*.ts" --include="*.mdx" --exclude-dir=node_modules --exclude-dir=.next | wc -l)
    
    # Check for component references without angle brackets
    ref_usage=$(grep -r "${filename}" . --include="*.tsx" --include="*.ts" --include="*.mdx" --exclude-dir=node_modules --exclude-dir=.next | grep -v "^${component}:" | wc -l)
    
    total_usage=$((import_count + usage_count + jsx_usage))
    
    if [ $total_usage -le 1 ]; then
        echo "POTENTIALLY UNUSED: $component (usage: $total_usage)"
        unused_components+=("$component")
    else
        echo "USED: $component (usage: $total_usage)"
    fi
done

echo ""
echo "Summary of potentially unused components:"
echo "========================================"
for component in "${unused_components[@]}"; do
    echo "$component"
done

echo ""
echo "Total potentially unused components: ${#unused_components[@]}"

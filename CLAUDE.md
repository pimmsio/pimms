# Project Guidelines for Claude

## Package Management

- **Always use pnpm** for package management operations (install, add, remove, etc.)
- Never suggest npm or yarn commands

## Development Commands

- Use `pnpm dev` to start the development server
- Use `pnpm build` to build the project
- Use `pnpm install` to install dependencies

## Key Project Context

- This is a Next.js application with TypeScript
- Uses Tailwind CSS for styling
- Internationalization (i18n) support with multiple locales
- Performance monitoring and optimization features implemented

## URL and Link Guidelines

### Universal Routing System

**CRITICAL UNDERSTANDING:**

- **ALL content links** use `/articles/filename` regardless of file location
- **File directory** (guides/, blog/, tutorials/) does NOT affect the URL
- **Only exception**: Special pages like tools use `/freetools/slug`

### Content Linking Rules

1. **Articles/Guides/Blog/Tutorials**: ALWAYS use `/articles/filename`
2. **Tools/Special Pages**: Use `/freetools/slug` (check pathnames.ts)
3. **Filename**: Use actual filename without .mdx extension
4. **Never**: Use the frontmatter slug in URLs

### LinkCard Component Usage

**CORRECT Examples:**

```mdx
<!-- ANY guide/blog/tutorial content -->

<LinkCard title="Cal.com Guide" description="Description" href="/articles/start-with-cal-com-and-zapier" />

<LinkCard title="No-Code Guide" description="Description" href="/articles/no-code-guide-for-website" />

<LinkCard title="Blog Post" description="Description" href="/articles/blog-post-filename" />

<!-- Special tools/pages -->

<LinkCard
  href="/freetools/pimms-tracking-site-checker-install"
  title="Site Checker"
  description="Check script installation"
/>
```

**WRONG Examples:**

```mdx
<!-- NEVER use /guides/ or /blog/ in hrefs -->

<LinkCard href="/guides/filename" />
<LinkCard href="/blog/filename" />

<!-- NEVER use frontmatter slug -->

<LinkCard href="/articles/slug-from-frontmatter" />
```

### Related Section in Frontmatter

**ALWAYS use filenames (without .mdx extension), NEVER slugs:**

```yaml
# CORRECT - use actual filenames
related:
  - start-with-cal-com-and-zapier
  - how-to-track-calendly
  - no-code-guide-for-website

# WRONG - using slugs from frontmatter
related:
  - how-to-track-cal-com-bookings-marketing-attribution
  - calcom-direct-webhook-integration-pimms
```

### Verification Checklist

1. ✅ Use `/articles/filename` for ALL content links
2. ✅ Use actual filename without .mdx extension
3. ✅ Check pathnames.ts only for special pages/tools
4. ✅ Test the link works in development
5. ✅ Use filenames (not slugs) in `related` sections

### Common Mistakes to Avoid

- ❌ Using `/guides/` or `/blog/` in LinkCard hrefs
- ❌ Using frontmatter `slug` instead of filename
- ❌ Thinking file directory affects the URL structure
- ❌ Forgetting `/articles/` prefix for content links
- ❌ Including .mdx extension in URLs

# AGENTS.md

This file explains how to add new photo posts to this site when the user asks for a new post.

## Project Overview

This is a simple static site with:

- `index.html` for the archive page
- `post.html` for the single-post page
- one JavaScript file per post in `posts/`
- `scripts/posts.js` as the list of all posts
- shared page scripts in `scripts/`
- site styles in `styles/`
- Google Analytics 4 tracking on every HTML page

Posts are not generated from a CMS or markdown. Each post is a JavaScript object attached to `window`.

## Where To Find Things

- Root project folder: `/mnt/d/Coding/Birding Website`
- Original photos: `/mnt/d/Coding/Birding Website/assets/Photos/`
- Web-facing post images: `/mnt/d/Coding/Birding Website/assets/Web/`
- Existing post files live in `/mnt/d/Coding/Birding Website/posts/`:
  - `/mnt/d/Coding/Birding Website/posts/SandHilledCranePost.js`
  - `/mnt/d/Coding/Birding Website/posts/SawWetPost.js`
  - `/mnt/d/Coding/Birding Website/posts/BeaverMarshTrailheadPost.js`
  - `/mnt/d/Coding/Birding Website/posts/ProthonotaryWarblerPost.js`
- GitHub commit and push workflow notes live in `/mnt/d/Coding/Birding Website/docs/github/AGENTS.md`

## Analytics Tracking

Every HTML page in this site must include the GA4 Google tag immediately after the opening `<head>` tag so all visits and post views are tracked.

Current GA4 measurement ID: `G-C0PHWVSHPL`

Use this exact snippet on any new HTML page, and keep it in existing pages when editing:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C0PHWVSHPL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-C0PHWVSHPL');
</script>
```

Pages that should have this tag include:

- `/mnt/d/Coding/Birding Website/index.html`
- `/mnt/d/Coding/Birding Website/post.html`
- `/mnt/d/Coding/Birding Website/about.html`
- any future `.html` page added to the site

## How New Posts Work

For every new post:

1. Find the source image folder in `assets/Photos/`.
2. Create a matching folder in `assets/Web/` if it does not already exist.
3. Copy the photos that should appear in the post into the matching `assets/Web/` folder.
4. Create a new post file in `posts/` named like `CardinalPost.js` or `LakeEriePost.js`.
5. Add the new script tag to both `index.html` and `post.html`.
6. Add the post object to `window.BIRD_POSTS` in `scripts/posts.js`.

## Required File Updates

When adding a post, always check these files:

- `/mnt/d/Coding/Birding Website/index.html`
- `/mnt/d/Coding/Birding Website/post.html`
- `/mnt/d/Coding/Birding Website/scripts/posts.js`

If the new post file is not loaded in both HTML files, the archive or single-post page will not work correctly.

## Post File Template

Use the same shape as the existing posts:

```js
window.EXAMPLE_POST = {
  slug: "example-slug",
  title: "Example Title",
  date: "April 21, 2026",
  year: "2026",
  location: "Example Location, Ohio",
  image: "assets/Web/Example Folder/IMG_0001.jpg",
  displayImage: "assets/Web/Example Folder/IMG_0002.jpg",
  images: [
    "assets/Web/Example Folder/IMG_0001.jpg",
    "assets/Web/Example Folder/IMG_0002.jpg"
  ],
  alt: "Short description of the main photo.",
  summary: "A short one-sentence summary for the archive.",
  body: [
    "First short paragraph.",
    "Second short paragraph."
  ]
};
```

## Field Notes

- `slug`: must be unique and URL-safe, lowercase with hyphens
- `title`: the post title shown on archive and detail pages
- `date`: use a readable format like `April 16, 2026`
- `year`: must match the year in `date`
- `location`: shown as `location / date` on both pages
- `image`: the primary image path
- `displayImage`: optional archive cover image; if omitted, the first image is used
- `images`: include all photos that should appear in the gallery, in display order
- `alt`: short accessible image description
- `summary`: brief one-line summary
- `body`: short array of paragraphs for the detail page

## Image Rules

- Prefer using the matching folder name under both `assets/Photos/` and `assets/Web/`
- Keep image paths relative, like `assets/Web/Folder Name/IMG_1234.jpg`
- If the user says to use all photos from a folder, include every image in the `images` array
- If the user does not specify image count, use good judgment, but preserve the site's style
- The site supports galleries, so multiple images are expected and handled automatically

## Naming Conventions

- Post file names should be descriptive and use PascalCase with `Post.js` at the end
- Window variable names should be uppercase with underscores, like `window.BEAVER_MARSH_TRAILHEAD_POST`
- Folder names in `assets/Web/` should usually match the corresponding `assets/Photos/` folder

## Style Expectations For New Posts

- Match the tone of the existing posts
- Keep descriptions short and simple
- Usually write 1 summary sentence and 2 body paragraphs
- Use plain, natural wording
- When the user mentions a location, include it clearly in the `location` field and description

## Quick Checklist

- New post file created in `posts/`
- Images copied into `assets/Web/...`
- Script added to `index.html`
- Script added to `post.html`
- Post added to `scripts/posts.js`
- `slug`, `title`, `date`, `year`, `location`, `alt`, `summary`, and `body` filled in
- All desired images included in `images`

## Example Workflow

If the user says: "Make a new post from the Beaver Marsh Trailhead folder"

Do this:

1. Read `/mnt/d/Coding/Birding Website/assets/Photos/Beaver Marsh Trailhead/`
2. Copy the requested photos into `/mnt/d/Coding/Birding Website/assets/Web/Beaver Marsh Trailhead/`
3. Create `/mnt/d/Coding/Birding Website/posts/BeaverMarshTrailheadPost.js`
4. Add the script to both HTML files
5. Add the post to `/mnt/d/Coding/Birding Website/scripts/posts.js`
6. Verify the image paths and ordering

## Important Reminder

Do not only create the post file. A new post is complete only when:

- the images exist in `assets/Web/`
- the post file is loaded by both HTML pages
- the post is included in `scripts/posts.js`

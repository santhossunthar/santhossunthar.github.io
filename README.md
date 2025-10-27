# Blog Management Guide

This guide explains how to create, edit, and manage blog posts in the file-based blog system.

## 📁 File Structure

```
src/data/blog-posts/
├── understanding-xss-vulnerabilities.md
├── react-performance-optimization.md
├── linux-security-best-practices.md
├── nextjs-vs-vite-comparison.md
└── python-security-tools.md
```

## 📝 Creating New Blog Posts

### 1. Create a New Markdown File

Create a new `.md` file in the `src/data/blog-posts/` directory with a descriptive filename:

```bash
# Example: my-new-blog-post.md
touch src/data/blog-posts/my-new-blog-post.md
```

### 2. Add Frontmatter

Every blog post must start with frontmatter (YAML metadata) between `---` markers:

```markdown
---
id: "unique-id"
title: "Your Blog Post Title"
date: "2024-01-20"
category: "Security" | "Programming" | "DevOps"
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min read"
author: "Santhos Suntharalingam"
featured: true | false
---

# Your Blog Post Content

Your markdown content goes here...
```

### 3. Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (use kebab-case) |
| `title` | string | ✅ | Blog post title |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) |
| `category` | string | ✅ | Post category |
| `tags` | array | ✅ | Array of tag strings |
| `readTime` | string | ✅ | Estimated reading time |
| `author` | string | ✅ | Author name |
| `featured` | boolean | ✅ | Whether post is featured |

### 4. Supported Categories

- **Security**: Security-related posts
- **Programming**: Programming and development posts
- **DevOps**: DevOps and infrastructure posts

## ✍️ Writing Content

### Markdown Support

The blog supports full markdown with the following features:

#### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
```

#### Code Blocks
```markdown
```javascript
const example = "Hello World";
console.log(example);
```
```

#### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

#### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

#### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](image-url)
```

#### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

## 🚀 Publishing Process

### 1. Create the File
```bash
# Create new post file
touch src/data/blog-posts/my-new-post.md
```

### 2. Add Content
Edit the file with your content and frontmatter.

### 3. Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000/blog` to see your new post.

### 4. Deploy
```bash
git add .
git commit -m "Add new blog post: [title]"
git push
```

## 📋 Example Blog Post

```markdown
---
id: "my-awesome-post"
title: "My Awesome Blog Post"
date: "2024-01-20"
category: "Programming"
tags: ["React", "JavaScript", "Tutorial"]
readTime: "10 min read"
author: "Santhos Suntharalingam"
featured: true
---

# My Awesome Blog Post

This is an example of how to write a blog post.

## Introduction

Start with an introduction that hooks the reader.

## Main Content

Write your main content here with proper markdown formatting.

### Code Example

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

## Conclusion

Wrap up your post with a conclusion.

## Key Takeaways

- Point 1
- Point 2
- Point 3
```

## 🔧 Troubleshooting

### Post Not Showing
- Check that the file is in `src/data/blog-posts/`
- Verify frontmatter is properly formatted
- Ensure all required fields are present

### Markdown Not Rendering
- Check that `react-markdown` is installed
- Verify the content is between frontmatter and end of file

### Build Errors
- Check for syntax errors in frontmatter
- Ensure all required fields have values
- Verify file encoding is UTF-8

## 🎨 Styling

The blog uses a black and white cyber theme with:
- **Font**: JetBrains Mono (cyber font)
- **Colors**: Black background, white text
- **Code blocks**: Dark background with syntax highlighting
- **Tables**: White borders with hover effects

## 📊 Analytics

Currently, view counts are mock data. To implement real analytics:
1. Add a database to track views
2. Update the `getTopPosts` function
3. Implement view tracking in `BlogPostDetail`

## 🔄 Updating Posts

To update an existing post:
1. Edit the markdown file directly
2. Update the `date` field if needed
3. Test locally with `npm run dev`
4. Deploy changes

## 🗑️ Deleting Posts

To delete a post:
1. Remove the markdown file from `src/data/blog-posts/`
2. Test locally to ensure no errors
3. Deploy the changes

---

**Happy Blogging! 🚀**

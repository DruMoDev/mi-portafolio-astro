---
description: Create a new project in the portfolio from a description or repository.
---

# Create New Project Workflow

Follow these steps to generate a new project entry in the portfolio.

## 1. Gather Information

- Ask the user for the project description or the absolute path to the local repository.
- If a repository path is provided, use `ls -R` or `view_file` on `README.md` and other key files to understand the project stack and features.

## 2. Generate Content

Create two markdown files:

1. `src/content/projects/es/[slug].md` (Spanish)
2. `src/content/projects/en/[slug].md` (English)

Use the following template for both files, translating the content appropriately:

```markdown
---
title: "Project Title"
description: "Short description (120-160 chars) for the project card."
publishedAt: YYYY-MM-DD
thumbnail: "/images/projects/[slug].webp" # Placeholder or ask user for image
thumbnailAlt: "Descriptive alt text"
tags:
  - "category1"
  - "category2"
stack:
  - "Tech1"
  - "Tech2"
  - "Tech3"
liveUrl: "https://demo.com" # Optional
repoUrl: "https://github.com/user/repo" # Optional
featured: false
draft: false
order: 10 # Check other files to determine next order
---

## Description / Descripción

[Detailed description in the target language]

## Key Features / Características Principales

- Feature 1
- Feature 2
- Feature 3
```

## 3. Verify

- Ensure the `slug` matches the folder/filename structure.
- Check that tags and stack technologies are consistent with existing projects.
- Verify the `publishedAt` date format.

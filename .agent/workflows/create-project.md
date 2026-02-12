---
description: Create a new project in the portfolio from a description or repository.
---

# Create New Project Workflow

Follow these steps to generate a new project entry in the portfolio.

## 1. Gather Information

- Ask the user for the project description or the GitHub repository URL/name (e.g., `user/repo`).
- If a repository is provided:
  1. Clone it to a temporary directory: `gh repo clone <repo> .tmp/<repo_name>`
  2. Analyze the codebase to understand the stack, features, and architecture.
     - Read `README.md`, `package.json` (or equivalent), and other key configuration files.
     - Explore the source code structure.
  3. **Important:** After analysis, remove the temporary directory to keep the workspace clean: `rm -rf .tmp/<repo_name>`

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
thumbnail: "/images/projects/default.svg" # Default image
thumbnailAlt: "Project thumbnail"
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
inProgress: false
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

import { resumeData, experiences } from "./src/data/resume";
import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "content");
const experienceDir = path.join(contentDir, "experience");
const skillsDir = path.join(contentDir, "skills");

// Ensure directories exist
if (!fs.existsSync(experienceDir))
  fs.mkdirSync(experienceDir, { recursive: true });
if (!fs.existsSync(skillsDir)) fs.mkdirSync(skillsDir, { recursive: true });

// Migrate Experience
experiences.forEach((exp) => {
  const slug = exp.company.toLowerCase().replace(/\s+/g, "-");
  const filePath = path.join(experienceDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(exp, null, 2));
  console.log(`Created ${filePath}`);
});

// Migrate Skills
resumeData.skills.forEach((skill) => {
  const slug = skill.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const filePath = path.join(skillsDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(skill, null, 2));
  console.log(`Created ${filePath}`);
});

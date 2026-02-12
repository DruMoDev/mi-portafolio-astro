import type { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  name: "Dru Portfolio",
  url: "https://drumorera.com",
  author: {
    realName: "Roger Morera",
    displayName: "Dru",
    email: "contacto@drumorera.com",
    avatar: "/images/profile.jpg",
  },
  social: [
    {
      platform: "github",
      url: "https://github.com/DruMoDev",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/roger-morera/",
      label: "LinkedIn",
    },
    {
      platform: "email",
      url: "mailto:contacto@drumorera.com",
      label: "Email",
    },
  ],
  defaultLocale: "es",
  locales: ["es", "en"],
};

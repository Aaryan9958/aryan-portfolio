# Aryan Bansal - Portfolio Website

A modern, data-driven portfolio website built with React, featuring a luxurious metallic theme inspired by Audemars Piguet's "Vault of Design" aesthetic.

## Table of Contents

1. [Directory Overview](#directory-overview)
2. [How to Edit Experience](#how-to-edit-experience)
3. [How to Edit Projects](#how-to-edit-projects)
4. [How to Edit Home Content](#how-to-edit-home-content)
5. [How to Edit Contact Page](#how-to-edit-contact-page)
6. [How to Update Media](#how-to-update-media)
7. [How to Run Locally](#how-to-run-locally)
8. [Configuration Options](#configuration-options)
9. [Deployment](#deployment)

---

## Directory Overview

### Main Pages (React Components)

```
frontend/src/pages/
├── Home.jsx         # Homepage with hero, KPIs, skills chart, and skill categories
├── Experience.jsx   # Interactive roadmap timeline of work experience
├── Projects.jsx     # Project portfolio cards
└── Contact.jsx      # Contact form and social links
```

### JSON Content Files (Edit These!)

All content is driven by JSON files. **To update website content, edit these files only:**

```
frontend/src/content/
├── home.json        # Hero section, KPI cards, skills, skill categories, footer
├── experience.json  # Work experience timeline data
├── projects.json    # Project portfolio data
├── contact.json     # Contact page content and form configuration
└── site.json        # Site-wide settings (navigation, preloader, theme)
```

### Components

```
frontend/src/components/
├── Navigation.jsx      # Top navbar with signature logo
├── Footer.jsx          # Footer with social links
├── Preloader.jsx       # Loading animation screen
├── MetricCard.jsx      # KPI count-up cards
├── SkillsChart.jsx     # Vertical bar chart with growth animation
├── CinematicScroll.jsx # Slide-based scrolling container
├── CinematicSection.jsx # Individual slide sections
└── PageTransition.jsx  # Page transition animations
```

---

## How to Edit Experience

### File: `frontend/src/content/experience.json`

### Structure

```json
{
  "timeline": {
    "startYear": 2022,
    "endYear": 2024,
    "startLabel": "Start",
    "endLabel": "Current"
  },
  "experiences": [
    {
      "id": "unique-id",
      "role": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "startDate": "2022-06-01",
      "endDate": "2022-09-01",
      "displayPeriod": "Jun 2022",
      "displayYear": "2022",
      "isCurrent": false,
      "summary": "Brief description of the role",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ],
      "techStack": ["Skill1", "Skill2"],
      "order": 1,
      "position": { "x": 12 }
    }
  ]
}
```

### Field Descriptions

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Unique identifier (lowercase, hyphenated) | Yes |
| `role` | Job title | Yes |
| `company` | Company name | Yes |
| `location` | City, Country | No |
| `startDate` | ISO date (YYYY-MM-DD) | No |
| `endDate` | ISO date or empty if current | No |
| `displayPeriod` | Shown in card (e.g., "Jun 2022") | Yes |
| `displayYear` | Year label on timeline | Yes |
| `isCurrent` | `true` if ongoing | No |
| `summary` | Brief role description | No |
| `highlights` | Array of achievements | Yes |
| `techStack` | Skills/tools used | No |
| `order` | Display order (1 = first) | Yes |
| `position.x` | Horizontal position (0-100%) | Yes |

### Adding a New Experience

1. Copy an existing experience object
2. Change the `id` to something unique
3. Update all fields with new data
4. Set `order` to the next number
5. Set `position.x` to place it on the timeline (0 = left, 100 = right)

### Removing an Experience

Simply delete the entire object from the `experiences` array.

---

## How to Edit Projects

### File: `frontend/src/content/projects.json`

### Structure

```json
{
  "sectionTitle": "Featured Projects",
  "sectionSubtitle": "Real-world analytics delivering measurable impact",
  "ctaText": "Want to see more?",
  "githubProfileUrl": "https://github.com/username",
  "githubProfileButtonText": "Visit GitHub Profile",
  "projects": [
    {
      "id": "project-id",
      "title": "Project Title",
      "role": "Your Role",
      "period": "2025",
      "shortDescription": "Brief description of the project",
      "bullets": [
        "Key achievement 1",
        "Key achievement 2"
      ],
      "techStack": ["Python", "Pandas"],
      "tags": ["Analytics", "Operations"],
      "links": {
        "github": "https://github.com/...",
        "slides": "",
        "report": ""
      },
      "order": 1,
      "featured": true,
      "thumbnail": ""
    }
  ]
}
```

### Field Descriptions

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Unique identifier | Yes |
| `title` | Project title | Yes |
| `role` | Your role in the project | No |
| `period` | Year or date range | No |
| `shortDescription` | Main description text | Yes |
| `bullets` | Array of key achievements | No |
| `techStack` | Technologies used | No |
| `tags` | Category tags (displayed as chips) | Yes |
| `links.github` | GitHub repository URL | No |
| `links.slides` | Presentation slides URL | No |
| `links.report` | Report/documentation URL | No |
| `order` | Display order | Yes |
| `featured` | Show on homepage | No |
| `thumbnail` | Image URL for card | No |

### Adding a New Project

1. Copy an existing project object
2. Update the `id` and all content fields
3. Set `order` to control position (lower = first)

---

## How to Edit Home Content

### File: `frontend/src/content/home.json`

### Hero Section

```json
{
  "hero": {
    "name": "Your Name",
    "headline": "Your Tagline",
    "subheadline": "Role | Skills",
    "bio": "Your bio paragraph...",
    "education": {
      "degree": "Degree Name",
      "school": "School Name",
      "graduationDate": "Dec 2025",
      "highlights": ["Scholarship", "Certificate"]
    },
    "ctaButton": {
      "text": "Get in Touch",
      "link": "/contact"
    }
  }
}
```

### Media (Headshot)

```json
{
  "media": {
    "headshot": "https://url-to-your-photo.jpg",
    "headshotAlt": "Alt text for image",
    "heroVideo": "",
    "backgroundPattern": ""
  }
}
```

### KPI Cards

```json
{
  "kpiCards": [
    {
      "id": "projects",
      "label": "Projects Completed",
      "value": 4,
      "suffix": "+",
      "description": "Description text",
      "icon": "Briefcase"
    }
  ]
}
```

**Available icons:** `Briefcase`, `Target`, `TrendingUp`, `Users`, `Brain`, `Code`, `BarChart3`, `Database`

### Skills Chart

```json
{
  "skillsChart": {
    "title": "Years of Experience",
    "subtitle": "Subtitle text",
    "maxYears": 5,
    "floatingMessage": "Message after animation",
    "skills": [
      { "name": "SQL", "years": 2, "futureYears": 3.5 }
    ]
  }
}
```

### Skill Categories

```json
{
  "skillCategories": [
    {
      "id": "analytics",
      "title": "Analytics",
      "icon": "Brain",
      "skills": ["Skill 1", "Skill 2"]
    }
  ]
}
```

### Footer

```json
{
  "footer": {
    "name": "Your Name",
    "title": "Your Title",
    "socialLinks": [
      {
        "platform": "LinkedIn",
        "url": "https://linkedin.com/in/...",
        "icon": "Linkedin"
      }
    ]
  }
}
```

---

## How to Edit Contact Page

### File: `frontend/src/content/contact.json`

### Form Configuration

```json
{
  "form": {
    "title": "Send a Message",
    "endpoint": "https://formspree.io/f/your-form-id",
    "fields": [
      {
        "name": "name",
        "label": "Name",
        "type": "text",
        "placeholder": "Your name",
        "required": true
      }
    ],
    "submitButton": "Send Message",
    "successMessage": "Message sent!",
    "errorMessage": "Failed to send."
  }
}
```

### Social Links

```json
{
  "connectSection": {
    "title": "Connect With Me",
    "description": "Description text...",
    "socialLinks": [
      {
        "platform": "LinkedIn",
        "url": "https://...",
        "subtitle": "Connect professionally",
        "icon": "Linkedin"
      }
    ]
  }
}
```

---

## How to Update Media

### Image Locations

You can use:

1. **External URLs**: Host images on a CDN or service like Cloudinary
   ```json
   "headshot": "https://your-cdn.com/images/headshot.jpg"
   ```

2. **Local images** (if deploying with assets):
   - Place images in `frontend/public/assets/`
   - Reference as `/assets/filename.jpg`

### Recommended Image Specs

| Image Type | Recommended Size | Format |
|------------|------------------|--------|
| Headshot | 800x800px | JPG/PNG |
| Project Thumbnails | 600x400px | JPG/PNG |
| Background Images | 1920x1080px | JPG |

### Updating the Headshot

1. Upload your image to a hosting service
2. Copy the URL
3. Edit `frontend/src/content/home.json`:
   ```json
   "media": {
     "headshot": "YOUR_NEW_URL_HERE"
   }
   ```

---

## How to Run Locally

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

```bash
cd frontend
yarn install
```

### Development Server

```bash
yarn start
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
yarn build
```

---

## Configuration Options

### File: `frontend/src/content/site.json`

### Preloader Settings

```json
{
  "preloader": {
    "enabled": true,
    "duration": 5000,
    "respectReducedMotion": true,
    "keywords": ["SQL", "Python", "Analytics"]
  }
}
```

| Setting | Description |
|---------|-------------|
| `enabled` | Set to `false` to disable the loading screen |
| `duration` | Loading time in milliseconds (default: 5000) |
| `respectReducedMotion` | Skip animations for users who prefer reduced motion |
| `keywords` | Words that float during loading |

### Navigation

```json
{
  "navigation": [
    { "path": "/", "label": "Home" },
    { "path": "/experience", "label": "Experience" },
    { "path": "/projects", "label": "Projects" },
    { "path": "/contact", "label": "Contact" }
  ]
}
```

---

## Deployment

### Vercel (Recommended)

1. Push changes to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on each push

### Manual Build

```bash
cd frontend
yarn build
```

The `build` folder contains the production-ready files.

---

## Quick Reference

### To update your bio:
Edit `home.json` → `hero.bio`

### To add a new job:
Add object to `experience.json` → `experiences[]`

### To add a new project:
Add object to `projects.json` → `projects[]`

### To change your photo:
Edit `home.json` → `media.headshot`

### To disable the loader:
Edit `site.json` → `preloader.enabled: false`

### To change navigation links:
Edit `site.json` → `navigation[]`

---

## Support

For questions or issues, please open a GitHub issue or contact via the website's contact form.

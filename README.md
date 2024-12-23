# pkurto.com — Personal Portfolio

This repository holds the source code for **pkurto.com**, my personal portfolio website built with **Next.js**, **Redux**, **Shadcn UI**, and **Tailwind CSS**. It showcases my projects, professional timeline, contact information, and more. If you’d like to explore how I structure code, handle global state, or build custom UI components, this repo is a great starting point.

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Live Demo](#live-demo)  
- [File Structure](#file-structure)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Project Highlights](#project-highlights)  

---

## Overview

**pkurto.com** is a modern, responsive website designed to highlight my journey, skills, and portfolio of projects. Built using Next.js (App Router) to leverage static site generation (SSG) and server-side rendering (SSR), the site delivers top-notch performance and SEO benefits. The project uses **Redux** for global state management, **Shadcn UI** for a cohesive design system, and **Tailwind CSS** for rapid, utility-first styling.

Primary goals:

- **Showcase Projects** – Includes project cards with carousels to display images, GitHub links, Devpost links, and technology tags.  
- **Highlight Timeline** – Depicts key academic, internship, and hackathon milestones with dynamic animations.  
- **Provide Contact** – Simple, typed contact form integrated with a Next.js API route and Redux to handle form state and submission.  
- **Deploy & Scale** – Built with best practices so it can easily be deployed to [Vercel](https://vercel.com/) or any Node-compatible platform.

---

## Features

1. **Hero & Background Effects**  
   - Animated main home section with Framer Motion transitions, plus decorative Lucide icons floating in the background.

2. **Projects Section**  
   - Displays my project data from a JSON file with a carousel of images, tags, and links to project (GitHub, Devpost).

3. **Timeline**  
   - Animated vertical/horizontal timeline representing major milestones like education, internships, and hackathons.

4. **Redux-Managed Contact Form**  
   - Fully typed form with [Redux Toolkit](https://redux-toolkit.js.org/) for state management.  
   - Sends form data to a serverless Next.js API route for flexible email or backend integrations in the future.

5. **Shadcn UI + Tailwind**  
   - Composable React components (Alerts, Cards, Buttons, etc.) seamlessly themed with Tailwind CSS.  
   - Ensures uniform, modern styling site-wide.

6. **Framer Motion Animations**  
   - Subtle fade-ins, parallax effects, and motion transitions giving the UI a polished, dynamic feel.

7. **TypeScript**  
   - Strict type checking across components, Redux slices, and Next.js APIs for robust developer experience.

---

## Live Demo

- **Visit:** [pkurto.com](https://pkurto.com)

Explore my portfolio site in real time, view my projects, timeline, and contact form. Let me know what you think!

---

## File Structure

    .
    ├── app
    │   ├── StoreProvider.tsx        # Redux store provider for Next.js
    │   ├── api
    │   │   └── send-email
    │   │       └── route.ts         # Serverless API route (Contact form)
    │   ├── components
    │   │   ├── BackgroundDecorations.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Hero.tsx
    │   │   ├── Projects.tsx
    │   │   └── Timeline.tsx
    │   ├── data
    │   │   ├── projects.ts          # JSON data for Projects
    │   │   └── timelineEvents.ts    # JSON data for Timeline
    │   ├── favicon.ico
    │   ├── globals.css              # Global Tailwind styles
    │   ├── layout.tsx               # Root layout for Next.js App Router
    │   └── page.tsx                 # Main landing page
    ├── components
    │   └── ui                       # Shadcn UI components
    │       ├── alert.tsx
    │       ...
    │       └── toaster.tsx
    ├── features
    │   └── email
    │       └── emailSlice.ts        # Redux slice for form data & async submission
    ├── hooks
    │   └── use-toast.ts             # Custom hook for toast notifications
    ├── lib
    │   ├── hooks.ts                 # Additional shared hooks
    │   ├── store.ts                 # Redux store configuration
    │   └── utils.ts                 # General utilities
    └── types
        └── email.ts                 # Type definitions for email-related data

---

## Tech Stack

- **[Next.js](https://nextjs.org/) (App Router)** – SSR and SSG  
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – State management  
- **[Shadcn UI](https://ui.shadcn.com/)** – Accessible, themeable components  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling  
- **[Framer Motion](https://www.framer.com/motion/)** – Animations and transitions  
- **[TypeScript](https://www.typescriptlang.org/)** – Strict typing for robust code  

---

## Setup & Installation

1. **Clone the Repository**  
   - `git clone https://github.com/pkurto16/portfolio.git`  
   - `cd portfolio`

2. **Install Dependencies**  
   - `npm install`  

3. **Environment Variables**  
   - Optionally create `.env.local` for secrets (e.g., email API keys).  
   - Example:

         GMAIL_USER=your-name@gmail.com
         GMAIL_APP_PASSWORD=16-char-password

4. **Run the Development Server**  
   - `npm run dev`  

   The site is now live at [http://localhost:3000](http://localhost:3000)

5. **Build for Production**  
   - `npm run build`  

6. **Start Production Server**  
   - `npm start`  

---

## Usage

- Navigate to **[http://localhost:3000](http://localhost:3000)** in your browser for the local version.  
- Explore the **Projects** section, where each project includes a carousel with images, tags, and optional GitHub/Devpost links.  
- Check the **Timeline** to follow educational and professional milestones.  
- Use the **Contact** form to send inquiries/messages. It leverages Redux for form state and a Next.js API route (`send-email/route.ts`).

---

## Project Highlights

1. **Dynamic Project Cards**  
   - Each card uses a multi-image carousel, plus badges that detail the relevant technologies.  
   - Links to external resources (GitHub, Devpost) appear when available.

2. **Redux Email Form**  
   - Entire contact form is managed via `emailSlice.ts`, illustrating async action handling and typed form data.  
   - Submits to a custom Next.js serverless endpoint for backend logic or integration with third-party email services.

3. **Timeline & Hero Animations**  
   - Smooth transitions courtesy of **Framer Motion**, with background Lucide icons that animate for a visually engaging experience.

4. **Shadcn UI**  
   - Carefully composed UI building blocks like **Button**, **Card**, and **Badge** unify aesthetics across the site.  
   - Dark, modern theme consistent with Tailwind CSS utility classes.

5. **TypeScript Everywhere**  
   - Strict typing guards against runtime errors, ensures maintainability, and makes development more intuitive.

---

Thank you for visiting **[pkurto.com](https://pkurto.com)**. If you have any questions or suggestions, feel free to reach out. I appreciate your interest in my work!

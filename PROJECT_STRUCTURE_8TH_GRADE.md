# Project Structure Overview (8th Grade Level)

This project is a website built with a tool called Next.js, which helps you make fast and modern web pages using JavaScript and React. Here’s a simple explanation of the main folders and files you’ll see in this project:

## Main Folders and Files

- **app/**
  - This folder holds the main pages and layouts for the website.
  - **layout.jsx**: Sets up the basic look and feel for all pages.
  - **page.jsx**: The main homepage of the website.
  - **globals.css**: The main style sheet that makes the website look nice.
  - **api/**: This folder is for special code that runs on the server (like handling chat messages).
    - **demo-chat/route.js**: Handles chat demo requests.

- **components/**
  - This folder has reusable building blocks for the website.
  - **Footer.jsx**: The bottom part of the website, shown on every page.
  - **LucioFloatingWidget.jsx**: A chat widget that floats on the page so users can talk to Lucio AI.
  - **SnapLaunchSalesLandingPage.jsx**: The main landing page with all the features and sections.

- **public/**
  - This folder holds images and files that anyone can see, like pictures for the website.

- **knowledge/**
  - This folder has markdown files (like this one) with information, FAQs, and pricing.

- **package.json**
  - This file lists all the tools and libraries the project uses. It’s like a recipe for building the website.

- **README.md**
  - A file that explains what the project is and how to use it.

## Important Terminology

- **Component**: A piece of the website you can reuse, like a button or a chat box.
- **JSX**: A way to write HTML inside JavaScript, used to build React components.
- **API**: Code that lets the website talk to the server or other services.
- **Props**: Information you pass to a component to change how it looks or works.
- **State**: Data that can change in a component, like if a chat is open or closed.
- **Export/Import**: Ways to share code between files.
- **Route**: A path or URL that shows a certain page or runs some code.
- **CSS**: Code that makes the website look good (colors, layout, fonts).
- **Markdown (.md)**: A simple way to write formatted text, like this file.

## How It All Works Together

- The **app** folder is where the main pages live.
- The **components** folder has the building blocks you use on those pages.
- The **public** folder has images and files you want to show on the website.
- The **knowledge** folder has extra info, like pricing or FAQs, written in markdown.
- The **package.json** file keeps track of all the tools you need to run the website.

This structure helps keep everything organized so it’s easy to find and update different parts of the website!

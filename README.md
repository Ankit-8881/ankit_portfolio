# Developer portfolio — your learning-first starter

This is a fast static site: no package install or build command is required. Open `index.html` in a browser while learning, then deploy the same files to GitHub Pages, Netlify, or Vercel.

## How the project is organised

- `index.html` is the page structure and SEO/accessibility metadata.
- `styles.css` controls responsive layout, themes, and animations.
- `data.js` is your editable professional profile: skills and projects live here.
- `script.js` renders the data, runs theme/navigation/chat behavior, and protects the contact form from being accidentally submitted before configuration.
- `locomotive.js` initializes Locomotive Scroll v5 for the gentle scroll effect; `data-scroll` and `data-scroll-speed` in the HTML identify the parallax elements.
- `experience.css`, `timeline.css`, and `preview.css` style the stacked internship/training timeline. Static preview images are used instead of browser PDF viewers, so visitor controls do not appear.

## Your first edits

1. Your résumé and photo have been added. Search for `YOUR_FORM_ID` to finish the contact form setup.
2. The portfolio now uses the two projects, skills, education, internships, and achievement from Ankit’s résumé. Add project-specific GitHub repository URLs and deployed demo URLs when available.
3. Make a free Formspree form, replace `YOUR_FORM_ID` in `index.html`, and test the contact form. Formspree sends messages without revealing credentials in public code.
5. Update the title, description, social preview tags, and optional `og:image` after choosing your live domain.

## The chatbot

The initial chatbot is deliberately local, so it costs nothing, works without an API key, and only answers facts you have placed in `data.js`. In `script.js`, `answer(question)` matches a visitor's topic (skills, projects, education, location, contact) and returns a response from that data.

For a generative AI chatbot later, create a serverless endpoint that holds the AI key, sends a carefully curated professional profile as context, rate-limits requests, and has the browser call that endpoint. Never put an AI API key in `script.js`.

## Analytics and deployment

For privacy-focused analytics, add your chosen provider's script in the marked `<head>` location only after publishing. Deploy by importing this folder into Netlify/Vercel, or push it to GitHub and enable **Settings → Pages → Deploy from a branch**. Verify the contact form, résumé URL, social URLs, mobile menu, light mode, and page title on the public site.

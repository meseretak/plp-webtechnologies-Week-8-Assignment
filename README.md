# EthioOps QA Portfolio - Multipage Website

This project is a sample multipage portfolio website tailored for a QA/DevOps practitioner. It includes:

- Home, About, Services, Contact pages
- Responsive design using HTML5 & CSS3
- JavaScript interactivity: mobile nav, testimonial slider, form validation
- Contact form with optional Firebase (Firestore) integration and localStorage fallback

## Run locally

1. Clone or unzip project.
2. To serve via a simple static server (recommended):
   - Install `http-server` (if you have Node): `npm i -g http-server`
   - Run: `http-server` in the project folder and open `http://localhost:8080`
   - Or use VS Code Live Server extension.

## Enable Firebase (optional)

1. Create a Firebase project and add a Web app.
2. Enable Firestore in test mode (or set rules appropriately).
3. Copy the Web SDK snippets and your `firebaseConfig` into `firebase/firebase-config.js`.
4. Uncomment the Firebase SDK script tags in `contact.html`.

## Deployment

- **GitHub Pages**: Create a repo, push the files, then enable Pages in repository Settings (select `main` branch / root).
- **Netlify / Vercel**: Drag & drop or connect repo for automatic deploy.

## Notes

All images are Unsplash placeholders — replace with your own images (store in `assets/`) before sharing publicly.


# chore-credit

A simple Progressive Web App (PWA) with GitHub Pages deployment automation.

## Features

- 📱 Progressive Web App with offline support
- 🔢 Interactive counter with local storage
- 📝 Notes section with auto-save
- 🎨 Modern, responsive design
- 🚀 Automated deployment to GitHub Pages

## Deployment

This repository includes GitHub Actions workflows for automatic deployment to GitHub Pages.

### Automatic Deployment

The app is automatically deployed when you push to the `main` or `master` branch. By default, it deploys `simple_pwa_app.html` as `index.html`.

### Manual Deployment

You can manually trigger deployment with a custom filename:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Optionally specify a different HTML file to deploy
5. Click **Run workflow**

### Deployment Configuration

The deployment workflow:
- Validates that the specified file exists
- Copies the HTML file to `index.html` for GitHub Pages
- Deploys to GitHub Pages using the official GitHub Actions
- Provides deployment status and URL information

### Accessing Your Deployed App

Once deployed, your app will be available at:
```
https://[your-username].github.io/[repository-name]/
```

## Local Development

To run the app locally, simply open `simple_pwa_app.html` in your web browser. The app works offline and can be installed as a PWA on supported devices.

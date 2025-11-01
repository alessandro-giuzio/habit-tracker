# 📱 PWA Setup Guide

Your Habit Tracker is now configured as a Progressive Web App (PWA)!

## ✅ What's Been Configured

- ✓ PWA integration with `@vite-pwa/astro`
- ✓ Web App Manifest with app metadata
- ✓ Service Worker for offline functionality
- ✓ App icons (192x192 and 512x512)
- ✓ Apple Touch icon support
- ✓ Theme color and mobile optimizations

## 🧪 Testing Your PWA Locally

1. **Build the production version:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Open in your browser:**

   - Navigate to `http://localhost:4321`
   - Open DevTools (F12 or Cmd+Option+I)

3. **Test PWA features:**
   - **Chrome/Edge**:
     - Go to DevTools > Application > Manifest
     - Check "Service Workers" section
     - Look for install prompt icon in address bar
   - **Firefox**:
     - DevTools > Application > Manifest
   - **Safari (iOS)**:
     - Must test on actual device
     - Tap Share button → Add to Home Screen

## 📱 Installing on Mobile Devices

### iOS (iPhone/iPad)

1. Open Safari and navigate to your deployed site
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it and tap **Add**
5. App icon appears on home screen!

### Android (Chrome)

1. Open Chrome and navigate to your site
2. Tap the **menu** (three dots)
3. Tap **"Add to Home Screen"** or **"Install app"**
4. Confirm the installation
5. App appears in app drawer!

### Desktop (Chrome/Edge)

1. Navigate to your site
2. Look for **install icon** in address bar (⊕)
3. Click it and confirm installation
4. App opens in standalone window!

## 🚀 Deployment Options

To make your PWA available online, deploy to:

### Option 1: Vercel (Recommended - Free)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify (Free)

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Cloudflare Pages (Free)

1. Push code to GitHub
2. Connect repo at [Cloudflare Pages](https://pages.cloudflare.com)
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 4: GitHub Pages

1. Update `astro.config.mjs`:

   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/habit-tracker',
     // ... rest of config
   });
   ```

2. Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on: push
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
         - run: npm ci && npm run build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: dist
     deploy:
       needs: build
       runs-on: ubuntu-latest
       permissions:
         pages: write
         id-token: write
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v3
           id: deployment
   ```

## 🔍 PWA Features Included

### Offline Support

- Service worker caches app assets
- Works without internet after first visit
- Automatic updates when online

### Install Prompt

- Users can install to home screen
- No app store needed!
- Opens in standalone mode

### Mobile Optimizations

- Splash screen support
- Status bar styling
- Orientation lock (portrait)
- Full-screen capable

### Performance

- Aggressive caching strategy
- Pre-caching of static assets
- Background sync ready

## 🛠️ Customization

### Change App Colors

Edit `astro.config.mjs`:

```js
manifest: {
  theme_color: '#yourcolor',
  background_color: '#yourcolor',
}
```

### Update App Name

Edit `astro.config.mjs`:

```js
manifest: {
  name: 'Your App Name',
  short_name: 'Short Name',
}
```

### Create Custom Icons

1. Open `generate-icons.html` in your browser
2. Click download buttons
3. Replace files in `/public` folder
4. Or design your own and export as PNG

### Modify Caching Strategy

Edit `astro.config.mjs`:

```js
workbox: {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.yourapi\.com\/.*/,
      handler: 'NetworkFirst',
    },
  ];
}
```

## ✅ PWA Checklist

Before deploying, ensure:

- [ ] HTTPS enabled (required for PWA)
- [ ] Icons are properly sized (192x192, 512x512)
- [ ] Manifest file is valid
- [ ] Service worker is registered
- [ ] App works offline
- [ ] Install prompt appears
- [ ] Tested on mobile device
- [ ] Performance is good (use Lighthouse)

## 🔧 Testing Tools

### Lighthouse (Chrome DevTools)

1. Open DevTools → Lighthouse tab
2. Select "Progressive Web App"
3. Click "Generate report"
4. Fix any issues reported

### PWA Testing

- [PWABuilder](https://www.pwabuilder.com/) - Test and package your PWA
- Chrome DevTools > Application tab
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## 📊 Analytics & Monitoring

Consider adding:

- Google Analytics for usage tracking
- Sentry for error monitoring
- Workbox for advanced service worker features

## 🎉 Next Steps

1. **Deploy your app** using one of the options above
2. **Test on real devices** - iOS and Android
3. **Share the URL** - users can install directly!
4. **Monitor usage** - see how many users install
5. **Iterate** - add more features based on feedback

## 💡 Tips

- PWAs work best with HTTPS (required)
- Test on multiple devices and browsers
- Keep your service worker updated
- Use Lighthouse to optimize performance
- Consider adding push notifications later
- Users can uninstall like any other app

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Astro PWA Guide](https://docs.astro.build/en/guides/integrations-guide/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Can I Use PWA?](https://caniuse.com/serviceworkers)

---

Your PWA is ready! Just deploy and share the link. Users can install it directly from their browser—no App Store needed! 🚀

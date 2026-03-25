# Okeke LLC Website

Static website for Okeke LLC - okeke.us

## Deployment

### Azure Static Web Apps

1. Push this folder to a GitHub repository
2. In Azure Portal, create a new Static Web App
3. Connect to your GitHub repo
4. Set the app location to `/` (root)
5. Leave API location empty
6. Set output location to `/` (root)
7. Deploy!

The site will auto-deploy on every push to main.

## Site Structure

```
okeke-site/
├── index.html              # Homepage
├── styles.css              # Main stylesheet
├── services/
│   ├── index.html          # Services page
│   └── services.css
├── research/
│   ├── index.html          # Research & Technology page
│   └── research.css
├── apps/
│   ├── index.html          # All Apps page
│   ├── apps.css
│   ├── aircontrolla/       # Individual app landing pages
│   ├── moviemaker/
│   └── scanprice/
├── about/
│   ├── index.html          # About page
│   └── about.css
├── contact/
│   ├── index.html          # Contact page
│   └── contact.css
└── images/                  # Add app icons here
    └── apps/
        ├── aircontrolla.png
        ├── moviemaker.png
        └── ...etc
```

## App Store Icons

### Getting the Correct Icon URLs

Apple provides app icons through the iTunes Lookup API. To get the correct icon URL for any app:

1. **Use the iTunes Lookup API:**
   ```
   https://itunes.apple.com/lookup?id=APP_ID
   ```

2. **Your App IDs:**
   - AirControlla: `6467008935`
   - Movie Maker: `6473829583`
   - ScanPrice: `6478866498`
   - Mini Business Manager: `6502629041`
   - .Scroll: `6737844498`
   - PixelLearn: `6739592041`
   - Peg-Plug: `6740544207`
   - Find Medicare Providers: `6503202729`

3. **In the JSON response, look for:**
   - `artworkUrl512` - 512x512 icon (best quality)
   - `artworkUrl100` - 100x100 icon

4. **To get different sizes**, replace the size in the URL:
   ```
   Original: https://is1-ssl.mzstatic.com/image/.../512x512bb.jpg
   Custom:   https://is1-ssl.mzstatic.com/image/.../200x200bb.jpg
   ```

### Adding Icons to the Site

**Option 1: Use App Store URLs directly** (current setup)
- Icons load from Apple's CDN
- Always up-to-date when you update the app
- Requires internet connection

**Option 2: Download and host locally**
1. Download icons from the iTunes API URLs
2. Save to `/images/apps/` folder
3. Update the `src` attributes in HTML

### Recommended Icon Sizes
- App cards on homepage: 72x72px
- App cards on Apps page: 120x120px
- Individual app pages: 128x128px

## Customization

### Colors (in styles.css)
```css
:root {
    --color-text: #1a1a1a;
    --color-primary: #2563eb;
    --color-bg-alt: #f8f9fa;
    /* etc... */
}
```

### Snowfall Animation
The light blue snowfall effect is in each HTML file's `<script>` section.
- Color: `rgba(173, 216, 230, opacity)` (light blue)
- Particle count: `maxSnowflakes = 100`
- Respects `prefers-reduced-motion` for accessibility

### Fonts
Using Inter from Google Fonts. To change:
1. Update the `<link>` tag in `<head>`
2. Update `--font-main` in CSS variables

## SEO

Each page includes:
- Descriptive `<title>` tag
- Meta description
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) where applicable
- Proper heading hierarchy
- Alt text for images
- ARIA labels for accessibility

### Adding a Sitemap

Create `sitemap.xml` in root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://okeke.us/</loc></url>
    <url><loc>https://okeke.us/services/</loc></url>
    <url><loc>https://okeke.us/research/</loc></url>
    <url><loc>https://okeke.us/apps/</loc></url>
    <url><loc>https://okeke.us/about/</loc></url>
    <url><loc>https://okeke.us/contact/</loc></url>
    <url><loc>https://okeke.us/apps/aircontrolla/</loc></url>
    <url><loc>https://okeke.us/apps/moviemaker/</loc></url>
    <url><loc>https://okeke.us/apps/scanprice/</loc></url>
</urlset>
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://okeke.us/sitemap.xml
```

## Contact Info to Update

- Email: `contact@okeke.us` (update in all pages if different)
- LinkedIn: `https://www.linkedin.com/company/okeke-llc/`

## Next Steps

1. Add actual app icons (download from App Store or use API URLs)
2. Create `sitemap.xml` and `robots.txt`
3. Submit to Google Search Console
4. Set up Google Analytics (optional)
5. Connect to social media accounts

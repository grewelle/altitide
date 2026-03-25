# Deploying to Azure Static Web Apps

This guide walks you through deploying the Okeke LLC website to Azure Static Web Apps with a custom domain.

---

## Prerequisites

- Azure account ([create free account](https://azure.microsoft.com/free))
- GitHub account
- Your domain (okeke.us) with DNS access

---

## Step 1: Push to GitHub

### Create a new repository

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Okeke LLC website"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/okeke-site.git
git branch -M main
git push -u origin main
```

### Files to exclude (optional .gitignore)

```gitignore
.DS_Store
*.docx
README 2.md
```

---

## Step 2: Create Azure Static Web App

### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource**
3. Search for **Static Web App**
4. Click **Create**

### Configuration

| Setting | Value |
|---------|-------|
| **Subscription** | Your subscription |
| **Resource Group** | Create new: `okeke-rg` |
| **Name** | `okeke-site` |
| **Plan type** | Free |
| **Region** | Choose closest (e.g., East US 2) |
| **Source** | GitHub |

### GitHub Settings

| Setting | Value |
|---------|-------|
| **Organization** | Your GitHub username |
| **Repository** | `okeke-site` |
| **Branch** | `main` |

### Build Settings

| Setting | Value |
|---------|-------|
| **Build Presets** | Custom |
| **App location** | `/` |
| **API location** | (leave empty) |
| **Output location** | `/` |

5. Click **Review + create**, then **Create**

---

## Step 3: Verify Deployment

Azure will:
1. Add a GitHub Actions workflow to your repo
2. Trigger the first deployment automatically

Check progress:
- **GitHub:** Go to Actions tab in your repo
- **Azure:** Check the Static Web App overview page

Your site will be live at: `https://your-app-name.azurestaticapps.net`

---

## Step 4: Configure Custom Domain

### Add custom domain in Azure

1. In Azure Portal, go to your Static Web App
2. Click **Custom domains** in the left menu
3. Click **+ Add**
4. Enter `okeke.us`

### Configure DNS

Add these records at your domain registrar:

#### For apex domain (okeke.us)

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | Azure's IP (shown in portal) |
| **TXT** | `@` | Verification code (shown in portal) |

#### For www subdomain (optional)

| Type | Name | Value |
|------|------|-------|
| **CNAME** | `www` | `your-app-name.azurestaticapps.net` |

### Verify domain

1. After adding DNS records, click **Validate** in Azure
2. Wait for DNS propagation (can take up to 48 hours, usually faster)
3. Azure will automatically provision an SSL certificate

---

## Step 5: Configure Routing (staticwebapp.config.json)

Create this file in your project root for proper routing:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["*.css", "*.js", "*.png", "*.jpg", "*.svg", "*.ico", "*.xml", "*.txt"]
  },
  "routes": [
    {
      "route": "/services",
      "redirect": "/services/",
      "statusCode": 301
    },
    {
      "route": "/research",
      "redirect": "/research/",
      "statusCode": 301
    },
    {
      "route": "/apps",
      "redirect": "/apps/",
      "statusCode": 301
    },
    {
      "route": "/about",
      "redirect": "/about/",
      "statusCode": 301
    },
    {
      "route": "/contact",
      "redirect": "/contact/",
      "statusCode": 301
    }
  ],
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".xml": "application/xml"
  }
}
```

Commit and push this file - it will auto-deploy.

---

## Step 6: Post-Deployment Verification

### Check all pages

- [ ] https://okeke.us
- [ ] https://okeke.us/services/
- [ ] https://okeke.us/research/
- [ ] https://okeke.us/apps/
- [ ] https://okeke.us/about/
- [ ] https://okeke.us/contact/
- [ ] https://okeke.us/apps/aircontrolla/
- [ ] https://okeke.us/apps/moviemaker/
- [ ] https://okeke.us/apps/scanprice/

### Check SEO

- [ ] View page source - verify meta tags
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check robots.txt: https://okeke.us/robots.txt
- [ ] Check sitemap: https://okeke.us/sitemap.xml

### Submit to search engines

1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property: `https://okeke.us`
   - Verify via DNS TXT record
   - Submit sitemap: `https://okeke.us/sitemap.xml`

2. **Bing Webmaster Tools**
   - Go to https://www.bing.com/webmasters
   - Add site and verify
   - Import from Google Search Console (easiest)

---

## Continuous Deployment

Every push to `main` will automatically:
1. Trigger GitHub Actions workflow
2. Build and deploy to Azure
3. Update the live site in ~1-2 minutes

### Manual deployment

If needed, you can trigger a deployment manually:
- Go to GitHub repo → Actions → Select workflow → Run workflow

---

## Troubleshooting

### Site not updating after push

1. Check GitHub Actions for errors
2. Clear browser cache / use incognito
3. Azure CDN may cache - wait a few minutes

### Custom domain not working

1. Verify DNS records are correct
2. Check Azure portal for validation status
3. DNS propagation can take up to 48 hours

### 404 errors on page refresh

Add the `staticwebapp.config.json` file (see Step 5)

### SSL certificate issues

Azure auto-provisions SSL. If issues:
1. Remove and re-add custom domain
2. Wait for certificate provisioning (up to 24 hours)

---

## Costs

**Azure Static Web Apps Free Tier includes:**
- 100 GB bandwidth/month
- 2 custom domains
- Free SSL certificates
- GitHub Actions integration

This is more than enough for a business website.

---

## Support

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)

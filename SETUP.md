# filmedbylogen — Setup Guide

## What you have
- `public/index.html` — your portfolio site
- `public/admin.html` — your admin panel (login at yoursite.com/admin.html)
- `api/login.js` — handles password login
- `api/content.js` — saves/loads all your site content
- `api/upload-signature.js` — handles secure photo uploads to Cloudinary
- `vercel.json` — tells Vercel how to run everything
- `package.json` — project dependencies

---

## Step 1 — Create a Cloudinary account
1. Go to cloudinary.com → Sign up free
2. After signup, go to your Dashboard
3. Note down these 3 values:
   - Cloud name
   - API Key
   - API Secret

---

## Step 2 — Push to GitHub
1. Go to github.com → your filmedbylogen repo
2. Delete the old index.html file
3. Upload ALL files from this folder, keeping the folder structure:
   - vercel.json (root)
   - package.json (root)
   - public/index.html
   - public/admin.html
   - api/login.js
   - api/content.js
   - api/upload-signature.js

---

## Step 3 — Set environment variables in Vercel
This is the most important step. Go to:
Vercel → your project → Settings → Environment Variables

Add these 5 variables:

| Name                    | Value                        |
|-------------------------|------------------------------|
| ADMIN_PASSWORD          | (pick any password you want) |
| JWT_SECRET              | (any long random string)     |
| CLOUDINARY_CLOUD_NAME   | (from Cloudinary dashboard)  |
| CLOUDINARY_API_KEY      | (from Cloudinary dashboard)  |
| CLOUDINARY_API_SECRET   | (from Cloudinary dashboard)  |

For JWT_SECRET, use something like: xK9mP2qR8vL5nJ3wY7tA1sD4fG6hB0cE
(just mash your keyboard for a long random string, nobody needs to remember it)

---

## Step 4 — Redeploy
After adding environment variables:
Vercel → Deployments → three dots → Redeploy

---

## Step 5 — Access your admin panel
Go to: yoursite.vercel.app/admin.html
Enter the ADMIN_PASSWORD you set above.

---

## What you can edit in the admin panel

### Portfolio tab
- Upload photos (click any photo card)
- Change titles and categories
- Add new items
- Remove items
- Save all changes

### Hero tab
- Upload your background photo
- Edit the headline text

### About tab
- Edit your bio paragraphs
- Edit the heading

### Contact tab
- Edit description text
- Add your Formspree form ID

### Footer tab
- Update Instagram link and handle

---

## Adding Formspree (contact form emails)
1. Go to formspree.io → Sign up free
2. Create a new form
3. Copy your Form ID (looks like: xyzabcde)
4. In admin panel → Contact tab → paste the ID → Save

---

## Important notes
- Content is saved in server memory — it resets if Vercel restarts the function
- For permanent storage, upgrade later to Upstash Redis (still free tier available)
- Photos are permanently stored on Cloudinary — they never disappear
- Your admin URL is /admin.html — keep this private, don't share it publicly

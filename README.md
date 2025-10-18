About Me — Simple static site

How to view

Open `index.html` in your browser. On Windows you can double-click the file or run:

```powershell
Start-Process index.html
```

Customize

- The page is pre-filled for Baloyi Nwayitelo in `index.html`.
- Replace the placeholder avatar src with your photo.
- Update the email in `script.js` (const email = 'baloyi.nwayitelo@example.com') if you want a different address.

Files

- `index.html` — main page
- `styles.css` — styles
- `script.js` — small interactive helpers

Projects

- Joy Hair Salon — https://joyhairsalon.netlify.app/
- Baloyi Birthday Wishes — https://baloyi-bithday-wishs.netlify.app/

Skills

- HTML
- CSS
- JavaScript

Contact

- Email: baloyinwayitelo6@gmail.com
- Phone / WhatsApp: +27 71 834 2937

Deploying to Netlify (enable contact form)

1. Create a free Netlify account at https://app.netlify.com/
2. Create a new site: you can drag-and-drop the site folder, or connect your Git repository (GitHub/GitLab/Bitbucket).
3. If connecting a repo, point Netlify to the branch to deploy and click "Deploy site".
4. Netlify automatically detects the `data-netlify="true"` form and will capture submissions. To test:
	- Deploy the site, open the live URL, fill the contact form, and submit.
	- Submissions will appear in the Netlify dashboard under Site > Forms.
5. To receive email notifications for new submissions:
	- In Netlify, open your Site > Forms > Settings and configure notification email(s).

Notes

- Local testing: Netlify Forms are only captured by Netlify when the site is hosted there. To test locally, you can deploy to Netlify or use a server that forwards POSTs to Netlify.
- Alternatively, if you prefer not to use Netlify, I can wire Formspree (which posts to their endpoint) so messages are emailed to you without Netlify.
 
Extras added to this template

- `resume.pdf` — drop your resume file in the site root to enable the "Download resume" link on the homepage.
- Projects now include thumbnails and links; update the `src` attributes for real screenshots.
- A simple testimonials section was added; replace or add real quotes as you get feedback.
 
Production notes

- `favicon.ico` and `site.webmanifest`: add your favicon and web manifest for PWA/bookmarking. `site.webmanifest` should reference your icon files and basic metadata.
- Open Graph image: replace the `og:image` meta in `index.html` with a real thumbnail URL for better sharing previews on social platforms.
- JSON-LD: update the `sameAs` and `url` values in `index.html` to your real profile URLs.

License: CC0

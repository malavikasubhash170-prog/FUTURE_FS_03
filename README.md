# Crumb & Co. — Artisan Bakery 🥐

A warm, responsive artisan bakery website created as a static front-end project for **Future Interns Task 3: Local Business Website & Live Pitch Project**.

## Live 


[**Visit Crumb & Co. — Artisan Bakery**](https://malavikasubhash170-prog.github.io/FUTURE_FS_03/)


## Features

- Responsive layout for mobile, tablet, and desktop
- Warm artisan-inspired design, custom typography, product photography, and subtle hover animations
- Navigation links and mobile menu
- Product menu with category filters
- Demo shopping cart with item count, subtotal, quantity controls, and remove buttons
- Demo checkout confirmation (no payment is collected)
- Customer review carousel
- Contact form with front-end validation
- Accessible labels, keyboard Escape-to-close cart, reduced-motion support, and image fallbacks
- No framework, backend, database, or paid service required

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts and remotely hosted Unsplash images (internet connection required for these assets)

## Run locally in VS Code

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser. You can also use VS Code's built-in **Open in Default Browser** command if available.
4. To preview while editing, install no extra tools unless you want to: simply save your files and refresh the browser.

## Project structure

```text
crumb-and-co/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Publish with GitHub Pages

1. Push these files to the **root** of your GitHub repository.
2. Open the repository on GitHub.com.
3. Select **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then select **Save**.
6. Wait for the Pages deployment to finish. The live URL will appear in the Pages settings. It normally looks like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

This project is static, so GitHub Pages supports it. No backend or other hosting provider is needed.

## Push from VS Code to GitHub

If the repository is already cloned and connected:
1. Open **Source Control** in VS Code.
2. Review the changed files.
3. Enter a commit message such as `Build Crumb & Co bakery website`.
4. Click **Commit**.
5. Click **Sync Changes** or **Push**.

If you have not connected a local folder to GitHub yet, create an empty repository on GitHub, then use VS Code's integrated terminal in this folder:

```bash
git init
git add .
git commit -m "Build Crumb & Co bakery website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your actual GitHub details. If the remote is already configured, do not add it again.

## Customise before your internship submission

- Replace the sample address, phone number, and email with the business details you are allowed to use.
- Update product names, prices, and photos in the `products` array at the top of `script.js`.
- The contact form is a demo: it validates fields in the browser but does not send email.
- The checkout is a demo: it clears the cart and shows a confirmation without taking payment.
- External fonts and images require an internet connection. If an image fails, a styled fallback appears.

## Suggested screenshots for your submission

Capture these views at desktop width and mobile width:
1. Home / hero section
2. Menu with category filters
3. Cart open with multiple items and subtotal
4. Contact form validation or success state
5. Mobile navigation open

On Windows, use **Win + Shift + S**, select the area, then save the screenshot as a PNG. Use descriptive names such as `01-home.png`, `02-menu.png`, `03-cart.png`, and `04-mobile.png`.

## Project note

Crumb & Co. is a fictional portfolio concept. Product names, reviews, address, contact details, and order flow are sample content. Replace sample details or clearly label them as a demo before presenting the site as a real business website.

## Author

**Malavika Subhash**

GitHub: https://github.com/malavikasubhash170-prog

LinkedIn:https://www.linkedin.com/in/malavika-subhash/

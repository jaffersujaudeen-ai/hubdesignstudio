# UN Digital Hub Design Studio

A React + Vite design workspace for exploring brand directions and website UI concepts.

## What's included

- 15 navigable studio modules.
- Enhanced real-time 3D hero scene with metallic geometry, glass orbs, particles and studio lighting.
- Scroll-controlled 3D journey with four chapters: origin, interactive universe, portal transition and final outcome.
- A sticky 3D stage that rotates, shifts camera, animates orbit rings and transforms the portal as visitors scroll.
- Mobile-aware rendering and reduced-motion support.
- 520 three-colour palettes across 13 collections, with search, filters and favourites.
- Light and dark theme previews.
- Typography, iconography, mood boards, components, branding, wireframes and website mockups.
- Desktop, tablet and mobile preview modes.
- Save design directions and submit sample briefs in browser storage.
- Larger, clearer typography, improved spacing and responsive layouts.

## Requirements

- Node.js 20 or later recommended.
- VS Code.
- Internet connection for dependency installation and Google Fonts.

## Run on Windows or macOS

1. Extract this ZIP file.
2. Open the extracted `un-digital-hub-design-studio` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## Important

This is a frontend prototype. Customer accounts, secure admin authentication, cloud database, file uploads, CRM integration and email notifications are not connected yet. Favourites, saved designs and sample briefs use browser localStorage. Do not use localStorage as a permanent customer database or put private service credentials in frontend code.

## Main source files

- `src/App.jsx` - application layout and module interactions.
- `src/components/Scene3D.jsx` - enhanced Three.js 3D scene.
- `src/components/PaletteCard.jsx` - palette cards.
- `src/data/palettes.js` - palette generation.
- `src/styles.css` - interface styling and responsive rules.


## Expanded Theme & Typography Studio (v1.1)
- 10 selectable theme presets: Classic Light, Midnight Dark, Soft Minimal, Luxury Noir, Corporate Blue, Pastel Bloom, Vibrant Gradient, Nature Calm, Glass Studio and Editorial Warmth.
- 24 font families with live specimen previews.
- Selected theme and typography are included in locally saved design directions and design briefs.
- No database or account is required. Browser-local storage remains in use for saved designs and favourites.

Run `npm install` followed by `npm run dev`. Google Fonts are loaded from Google Fonts when the browser is online.


## Experience upgrade

This version adds a more immersive 3D hero scene, pointer-responsive 3D movement, animated material previews, page transitions, stagger-friendly hover interactions, a scroll progress indicator, ambient lighting effects, smoother scrolling, and responsive layouts for desktop, tablet and mobile. It also respects the device reduced-motion preference.

### Run locally on Windows

1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Open Terminal and run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed in the terminal.

The 3D scene uses WebGL through React Three Fiber. Devices without WebGL support will not render the live 3D canvas. Google Fonts are loaded from Google Fonts when an internet connection is available.


## Public website experience (v2.0)
- New public-facing UN Digital Hub website with an editorial 3D hero, capabilities, process, contact CTA and responsive navigation.
- Digital Index gallery with interactive filters for categories, creative tags and technology stacks, plus search and sorting.
- Twelve original concept explorations. They are clearly labelled as concepts, not represented as client work.
- Integrated scroll-driven 3D journey combining a travelling 3D form, orbiting design elements and a portal transition.
- Existing 15-module Design Studio remains available from the public navigation.
- Design brief includes WhatsApp enquiry generation with selected palette name and HEX colour values, theme, typography and requirements.

### WhatsApp setup
Set `VITE_WHATSAPP_NUMBER` to your WhatsApp Business number with country code and digits only (example format: `919876543210`) in your local `.env` file and in your hosting provider's environment variables. If it is not set, the website asks for the number when a visitor clicks a WhatsApp enquiry button.

Example `.env` file:
```env
VITE_WHATSAPP_NUMBER=919876543210
```

### Deploy to Vercel
1. Push the extracted project folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Add `VITE_WHATSAPP_NUMBER` in Project Settings → Environment Variables.
5. Deploy.

This is a static frontend. It does not require a database. Customer enquiry details are placed into a WhatsApp message and are not sent to a server by this website. Saved studio favourites and designs remain in the visitor's browser storage.


## Public website and 75-style visual index (v3.0)

The public website opens first. Visitors can browse the concept directory, explore a searchable style library, enter the 15-module Design Studio, and send selected directions to WhatsApp.

### Style library
- 75 original visual style directions in 15 collections, five styles per collection.
- Collections 01–50 follow the creative groupings requested for Clean & Professional, People & Campaigns, Retro-Futuristic & Tech, Bold & Raw, Luxury & Premium, Retro & Nostalgic, Print & Texture, Concept & Collage, Product Advertising, and Playful & Illustrated.
- Five additional collections extend the library to 75: Nature & Organic, Architecture & Spaces, Editorial & Typography, Minimal & Monochrome, and Motion & Experimental.
- Filter by collection, creative tags, and suggested technology stack. Search style names and metadata.
- Each style card includes an original generated CSS art preview, tags, suggested technologies, and an enquiry action. These are style directions, not a claim that each is a finished client website.

### 3D and motion
- Procedural Three.js / React Three Fiber hero scene.
- Scroll-linked 3D journey with a travelling metallic form, orbiting objects, a portal reveal and chapter progress.
- CSS-generated animated style previews, responsive transitions and hover feedback.
- Reduced-motion support and lower device pixel ratio settings for more modest devices.

### WhatsApp enquiries
- Add your WhatsApp Business number to `.env` using country code and digits only.
- The public site can start a general enquiry. Each style card sends its style number, collection, tags and suggested technology.
- The Design Studio brief sends the customer's name, business, service, selected palette name, HEX values, selected theme, typography and requirements.
- If the number is not configured, the site prompts for it when the visitor starts an enquiry.
- This is a direct `wa.me` handoff. It does not store or transmit customer data to a database.

Example `.env` file:
```env
VITE_WHATSAPP_NUMBER=919876543210
```

### Run locally
```bash
npm install
npm run dev
```

### Build for deployment
```bash
npm run build
npm run preview
```

### Deploy on Vercel
1. Extract the project and open the project folder in VS Code.
2. Create a GitHub repository and push the project. Do not upload `node_modules`, `dist` or `.env`.
3. In Vercel, import the GitHub repository. Select the Vite framework preset.
4. Build command: `npm run build`. Output directory: `dist`.
5. Add `VITE_WHATSAPP_NUMBER` under Project Settings → Environment Variables. Use digits only, including country code.
6. Deploy. Redeploy after changing environment variables.

### Important production notes
- No database or login is required for this static enquiry website.
- Saved favourites and studio drafts use browser localStorage on the visitor's device. They are not a central customer-management system.
- 3D scenes require WebGL support. Google Fonts need an internet connection. Reduced-motion preferences are respected.
- Before launch, replace concept copy with approved business information, confirm your WhatsApp number, add your privacy policy and terms, and test on real iOS and Android devices.

# Student 3D Developer Portfolio

A modern, responsive portfolio for internship applications built with React, Vite, Tailwind CSS, Three.js, React Three Fiber, Drei, Framer Motion, and GSAP.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

If PowerShell blocks `npm`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy To Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the defaults: Framework `Vite`, build command `npm run build`, output directory `dist`.
4. Deploy.

## Where To Edit Personal Information

Edit `src/data/portfolio.js` for name, headline, college details, about text, skills, projects, experience, social links, and contact details.

Replace `public/resume.pdf` with your real resume and keep the same file name, or update the link in `src/data/portfolio.js`.

## Replacing 3D Models And Images

The current 3D scene uses optimized procedural meshes for speed. To use a GLTF model:

1. Download compressed `.glb` files from free sources like Sketchfab, Poly Pizza, Kenney, or Google Model Viewer samples.
2. Put the file in `public/models/your-model.glb`.
3. Use Drei's `useGLTF('/models/your-model.glb')` inside `src/components/scene/DeveloperScene.jsx`.
4. Compress large models with `gltf-transform optimize model.glb output.glb` before shipping.

Suggested free asset resources:

- https://poly.pizza
- https://sketchfab.com/features/free-3d-models
- https://kenney.nl/assets
- https://github.com/KhronosGroup/glTF-Sample-Models
- https://unsplash.com for project thumbnails

## Important Files

- `src/App.jsx`: Page composition and lazy-loaded sections.
- `src/data/portfolio.js`: Editable portfolio content.
- `src/components/Hero.jsx`: Landing section and 3D canvas mount.
- `src/components/scene/DeveloperScene.jsx`: Lightweight Three.js/R3F scene.
- `src/components/Navbar.jsx`: Glass navigation with mobile menu.
- `src/index.css`: Tailwind setup, theme polish, and global effects.
- `vite.config.js`: Vite config with manual chunks for better caching.
- `vercel.json`: SPA routing support on Vercel.

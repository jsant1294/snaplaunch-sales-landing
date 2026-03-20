# SnapLaunch Sales Landing v2

This is the upgraded landing page build with:
- full conversion-focused sales layout
- floating Lucio widget
- standalone demo chat route
- mobile and tablet responsive design
- pricing, industry, and booking sections

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Included
- `app/page.jsx`
- `app/layout.jsx`
- `app/globals.css`
- `app/api/demo-chat/route.js`
- `components/SnapLaunchSalesLandingPage.jsx`
- `components/LucioFloatingWidget.jsx`
- `public/lucio-mascot.png`

## Notes
- The floating widget is fully interactive in demo mode.
- It uses `/api/demo-chat` so the zip runs standalone.
- You can later swap `/api/demo-chat` for your real `/api/chat` route.

import type { NextConfig } from "next";

/* ---------------------------------------------------------------------------
   STATIC EXPORT, OPT-IN (Aug 2026)

   Firebase Hosting serves files, not a Node server. Every route in this app is
   already prerendered (`○ Static` for all thirteen) — there are no route
   handlers, no server actions, and the enquiry form submits client-side — so
   `output: "export"` is a legitimate target rather than a compromise.

   IT IS BEHIND A FLAG ON PURPOSE. `output: "export"` forces
   `images.unoptimized`, which turns the Next image optimiser off site-wide:
   every plate would then ship at its authored weight, and `hero-horizon.png`
   alone is 2MB. Leaving that on for local work and for any Node-hosted deploy
   would be a silent, permanent performance regression in exchange for a
   deploy target most builds are not using.

   So:  npm run build                       normal build, images optimised
        FIREBASE_STATIC=1 npm run build     static export into ./out

   If this site later moves to Firebase App Hosting (which runs Next properly;
   Blaze billing required), delete the flag rather than flipping the default.
   ------------------------------------------------------------------------ */
const staticExport = process.env.FIREBASE_STATIC === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      // Required by `output: "export"` — there is no optimiser at runtime.
      images: { unoptimized: true },
      // Emits /costs/index.html rather than /costs.html, so Firebase serves
      // the route at /costs without a rewrite rule.
      trailingSlash: true,
    }
  : {};

export default nextConfig;

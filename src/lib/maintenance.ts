// Site-wide maintenance switch. While true, src/proxy.ts answers every public
// page with /mantenimiento and a 503; /admin and /api keep working.
// To reopen the site, set it to false and deploy.
export const MAINTENANCE_MODE = true

# Mitra Work

A team work hub with CEO and employee workspaces, daily updates, task history, team notes, employee reports, and task attachments.

## Run locally

1. Use Node.js 22 or newer.
2. Run `npm install`.
3. Run `npm start` and open `http://localhost:3000`.
4. Create the first CEO account from the first-run setup page.

Local records are stored in `data/novacrm.sqlite`; local attachments are in `data/uploads/`. Those files are excluded from Git.

## Deploy on Vercel

Vercel runs API routes as serverless functions, so production uses Turso for persistent SQLite-compatible database storage and Vercel Blob for private task files. The deployed database starts empty; create the CEO account from the first-run setup page after deployment.

1. Add a Turso database to the Vercel project (or create one in Turso and add its credentials in Vercel).
2. Make sure the project has `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` environment variables.
3. Add a private Vercel Blob store to the project. It must provide `BLOB_READ_WRITE_TOKEN`.
4. Import this GitHub repository in Vercel. Use **Other** as the framework preset and `public` as the output directory. Leave the build command blank.
5. Deploy after the database and Blob store variables are present.

Task attachments on Vercel are limited to 3 MB each to fit the server request limit. Local attachments can be up to 8 MB each.

## Security and operations

Passwords are hashed with scrypt. Sessions use HTTP-only cookies, and management actions are enforced on the server. Use HTTPS in production. Before using this for sensitive or regulated work, add rate limiting, CSRF protections, backup/restore procedures, monitoring, and a security review.

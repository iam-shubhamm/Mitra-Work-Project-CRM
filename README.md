# Mitra Work

Mitra Work is a lightweight team workspace for assigning work, tracking progress, recording daily updates, and keeping team communication together.

- **Live app:** https://mitra-work-project-crm.vercel.app/
- **Source code:** https://github.com/iam-shubhamm/Mitra-Work-Project-CRM

**NOTE :-** Please enter your ID and password on the website.

    CEO Account
        - ID: Shubham-CEO@gmail.com
        - Password: SHUBHceo@2211
    Employee Account
        - ID: Shivam-EMP@gmail.com
        - Password: SHIVemp@2211    
 
## Why I built it

I built Mitra Work to make everyday team coordination easier to follow. Tasks, progress updates, and follow-ups can become scattered across conversations and documents. This project brings the core workflow into one place so a team can see what needs to be done, who owns it, what has changed, and where attention is needed.

The goal is not to add more process. It is to give a small team a clear, shared view of its work.

## What it does

- **Role-aware workspace:** CEO, general manager, manager, team leader, and employee roles receive different access.
- **Task management:** create and assign tasks with a due date, priority, instructions, project name, status, and optional files.
- **Task history:** employees can record dated updates and status changes against their work.
- **Daily activity:** employees can save a daily work summary; managers can see submission status, and monthly reports include the recorded summaries.
- **Team overview:** managers can review employee roles, workload, task progress, and recent activity.
- **Messages and notes:** send in-app messages to teammates, and share management notes with employees.
- **Planning:** managers can save private notes and priorities for the next day.
- **Reports:** managers can export a monthly daily-work workbook.
- **Approval workflow:** the CEO can review employee requests to delete tasks.
- **Profiles and help:** employees can update their profile and use the built-in feature guide.

## How the workflow works

1. The first CEO creates the workspace from the first-run setup link on the home page.
2. Employees create an employee account and sign in to their workspace.
3. A manager creates a task, assigns an owner, and adds a due date, priority, instructions, or attachment.
4. The employee updates the task status, adds work history, and records a daily update.
5. Managers review progress and follow up through team notes or in-app messages.
6. The dashboard and monthly report give the team a summary of current work and activity.

The CEO account is created through first-run setup. Public registration creates employee accounts; it does not create another CEO.

## How it is built

The app uses a small browser-based frontend connected to a Node.js API. The same API handler is used in local development and on Vercel, which keeps the local and deployed workflows similar:

1. The browser loads the static files from `public/`.
2. `public/app.js` renders the client-side pages and calls JSON endpoints under `/api/`.
3. Locally, `local-server.js` serves the app and API handler.
4. On Vercel, `api/[...route].js` forwards API requests to `server.js`.
5. `server.js` validates requests and roles, reads and writes workspace data, and stores uploaded files.

### Technology

| Technology | Use |
| --- | --- |
| HTML | Page structure and forms |
| CSS | Layout, responsive styling, and visual design |
| JavaScript (ES modules) | Browser interactions and the Node.js API |
| Node.js 22.5+ | Local server and Vercel API runtime |
| SQLite / libSQL | Relational workspace data |
| Turso | Persistent hosted database for Vercel |
| Vercel Blob | Private storage for production task attachments |
| Vercel | Static frontend hosting and serverless API deployment |

There is no frontend framework or build step. The browser app is written in plain JavaScript, HTML, and CSS. SQL is used to store and query relational records.

### Why these technologies

- **Plain HTML, CSS, and JavaScript** keep the frontend small and avoid a bundler or framework setup for this project.
- **Node.js and JavaScript** let the browser and server share one language and keep the API dependencies focused.
- **SQLite locally** makes it simple to run and test the app on a developer machine.
- **Turso in production** provides a persistent SQLite-compatible database that works with Vercel's serverless runtime.
- **Vercel Blob** stores production attachments outside the function filesystem, which is not durable storage.
- **Vercel** serves the static frontend and deploys the API when changes are pushed to the GitHub repository.

## Repository layout

```text
api/[...route].js   Vercel API entry point
public/
  index.html        Browser app entry point
  app.js            Client-side pages and interactions
  styles.css        Application styles
server.js           API routes, authorization, and data access
local-server.js     Local development server
vercel.json         Static asset cache headers
```

## Run locally

Requirements: Node.js 22.5 or newer.

```bash
npm install
npm start
```

Open http://localhost:3000 and use the first-run setup link to create the first CEO account.

Local workspace records are stored in `data/novacrm.sqlite`, and local attachments are stored in `data/uploads/`. The `data/` directory and `node_modules/` are excluded from Git.

## Deploy on Vercel

The project is configured for Vercel's **Other** preset, with `public` as the output directory and no build command. Configure these environment variables in the Vercel project:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN` or the integration-generated `TURSO_DATABASE_TURSO_AUTH_TOKEN`
- `BLOB_READ_WRITE_TOKEN`

Connect a Turso database and a private Vercel Blob store before deploying. Production data is separate from the local SQLite file. After the first deployment, open the home page and use **Set up your workspace** to create the first CEO account in the production database.

Vercel task attachments are limited to 3 MB each; local attachments can be up to 8 MB each. `vercel.json` lets browsers cache the JavaScript and CSS assets briefly while Vercel revalidates them.

## Security and current limitations

- Passwords are stored as scrypt hashes, not plaintext.
- Sessions use random tokens in HTTP-only cookies; only a hash of each token is stored in the database.
- The server checks authorization for management actions; hiding a page in the frontend is not the only access control.
- Production attachments use private Blob storage.
- The password-reset link is not connected to an email delivery service yet.
- Before using the app for sensitive or regulated data, add rate limiting, CSRF protections, tested database backups and restores, monitoring, and a security review.

## Future direction

The roadmap is to make the workspace safer and more useful as a team grows:

1. Add verified email-based password recovery and account notifications.
2. Add rate limiting, CSRF defenses, and stronger account/session management.
3. Automate Turso backups and test restore procedures.
4. Improve dashboard filters, workload views, and reporting.
5. Add optional calendar and notification integrations.
6. Improve mobile and accessibility testing as the interface evolves.

These are ideas for future work, not features currently available in the app.

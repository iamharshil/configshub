## 1. Product Vision

ConfigsHub is a SaaS platform where developers can **store, organize, share, and sync** their configuration files (VSCode, Neovim, Zsh, Docker, etc.).

It consists of:

-   A **web dashboard** for managing projects & config files.
-   A **CLI tool** for syncing configs directly from/to local machines.

ConfigsHub solves:

-   Messy local configs spread across machines.
-   Sharing configs with team members or community.
-   Versioning and rollback for critical environment files.
-   Providing reusable templates (marketplace-like experience).

---

## 2. Core Concepts (Data Model)

Hierarchy:

```
User → Project → Config Group → Config File → Version

```

-   **User:** Registered developer. Has plan (free/pro).
-   **Project:** Logical collection of configs (e.g., "My Dev Setup").
-   **Config Group:** Sub-collection inside project (e.g., "VSCode", "Neovim").
-   **Config File:** Actual file (e.g., `settings.json`).
-   **Version:** History of changes for a file (with commit message).

---

## 3. Features Breakdown

### 3.1 Free Tier

-   3 projects
-   Unlimited config groups
-   20 config files per project
-   1 private project, others public
-   50MB storage
-   5 versions per file
-   Browse/fork community templates

### 3.2 Pro Tier ($6/month or $60/year)

-   Unlimited projects
-   Unlimited private projects
-   Unlimited files (fair use 1GB)
-   Unlimited version history
-   CLI sync (push/pull)
-   Private shareable links
-   Team collaboration (up to 5 members)

### 3.3 Team/Enterprise (Future)

-   $15/user/month
-   Org-wide projects, SSO
-   Audit logs, permissions
-   Custom storage backend
-   Analytics dashboards

---

## 4. User Perspective (Web)

### Flows:

1. **Sign Up/Login**
    - Google, GitHub, or Email.
    - Free tier starts by default.
2. **Create Project**
    - Choose: Public or Private.
    - Add description, tags.
3. **Add Config Groups**
    - Example: "VSCode", "Neovim", "Terminal".
    - Represented as collapsible sections in UI.
4. **Upload Config Files**
    - Drag & drop file(s).
    - Inline code editor to edit configs.
    - Syntax highlighting (JSON, Lua, Vimscript, YAML, etc.).
5. **Versioning**
    - Each save creates a new version.
    - Users can rollback to older versions.
6. **Sharing**
    - Share project publicly (link).
    - Share config group separately (Pro feature).

---

## 5. User Perspective (CLI)

### Example CLI Commands:

```bash
# Login
confighub login

# Initialize a new project
confighub init my-dev-setup

# Add config file to group
confighub push ~/.config/nvim/init.lua --group "Neovim"

# Pull entire project
confighub pull my-dev-setup

# Pull just VSCode configs
confighub pull my-dev-setup --group "VSCode"

# View history of a file
confighub history init.lua

```

CLI will use **API tokens** for authentication.

---

## 6. Founder/Dev Perspective

### 6.1 Tech Stack

-   **Frontend:** Next.js 15 (App Router), Tailwind, shadcn/ui
-   **Backend (API):** Next.js server routes, Express-like routes
-   **Database:** MongoDB Atlas (Mongoose ORM)
-   **Auth:** NextAuth.js (Google, GitHub, Email)
-   **Storage:** Mongo GridFS or S3 (for larger files in future)
-   **CLI:** Node.js (TypeScript), communicates with REST/GraphQL API
-   **Deployment:** Render.com (web + backend), npm (CLI package)
-   **CI/CD:** GitHub Actions

---

## 7. System Design

### 7.1 Architecture Overview

```
   [Web UI - Next.js]              [CLI Tool]
           │                            │
           └───> HTTPS (REST/GraphQL API) ─────┐
                                               │
                                     [API Layer - Next.js]
                                               │
                           ┌───────────────────┴───────────────────┐
                           │                                       │
                   [MongoDB Atlas]                         [File Storage]
                   - Users                                  - GridFS (MVP)
                   - Projects                               - S3 (Future)
                   - Groups
                   - ConfigFiles
                   - Versions

```

---

### 7.2 API Endpoints (MVP)

-   `POST /api/projects` → Create project
-   `GET /api/projects/:id` → Get project details
-   `POST /api/groups` → Create config group
-   `POST /api/groups/:id/files` → Add file
-   `GET /api/files/:id/versions` → Get version history
-   `POST /api/files/:id/versions` → Add new version
-   `POST /api/auth/login` → Login (token)

---

### 7.3 Scaling Plan

-   **MVP:** MongoDB for everything (GridFS for files).
-   **Later:**
    -   Move files to S3/GCP storage.
    -   Use Redis for caching frequent configs.
    -   Add WebSockets for live collaboration.

---

## 8. Security

-   JWT tokens for CLI auth.
-   Role-based access control (owner, collaborator).
-   Private projects protected by subscription checks.
-   HTTPS everywhere (via Render + Cloudflare).

---

## 9. Roadmap

### Phase 1 (MVP – 2 months)

-   Auth (Google, GitHub, Email)
-   Projects, Groups, Files, Versions
-   Web dashboard basic CRUD
-   CLI push/pull basic functionality
-   Free vs Pro tier logic

### Phase 2 (3–6 months)

-   Collaboration (invite members)
-   CLI improvements (history, rollback)
-   Community templates (public marketplace)
-   Basic billing integration (Stripe)

### Phase 3 (6–12 months)

-   Enterprise features (SSO, audit logs)
-   Advanced CLI (sync profiles, machine-specific configs)
-   Plugin ecosystem (export configs to dotfiles)
-   Scaling infra (S3, Redis, microservices if needed)

---

## 10. Differentiators

-   Combines **Web + CLI**.
-   Clear **grouping system** (VSCode, Neovim, etc.).
-   **Versioning** for configs (like Git but simpler).
-   **Monetization hooks:** privacy, team collaboration, CLI sync.

---

## 11. Example User Stories

### Solo Developer (Free Tier)

-   Logs in with GitHub.
-   Creates "My Dev Setup" project.
-   Adds groups: VSCode, Neovim, Zsh.
-   Uploads configs, gets auto-versioning.
-   Shares project publicly.

### Pro User (Paid)

-   Has unlimited private projects.
-   Uses CLI to sync configs across work & personal laptops.
-   Shares private link with teammate.
-   Rolls back to older version after bad plugin update.

### Team User (Future)

-   Agency creates org account.
-   Maintains "Frontend Setup" & "Backend Setup" projects.
-   Team members pull configs via CLI.
-   Manager monitors usage & updates templates.

---

# ✅ MVP Conclusion

This document outlines a **comprehensive MVP** for ConfigsHub from both user and founder perspectives.

-   **Web** → CRUD, UI grouping, sharing.
-   **CLI** → push/pull, sync, versioning.
-   **System Design** → scalable path from MongoDB-only to distributed infra.
-   **Monetization** → clear free vs pro limits with upgrade incentives.

ConfigsHub’s strength is combining **GitHub-like versioning + npm-like sharing + Dropbox-like sync** but optimized for **developer configs**.

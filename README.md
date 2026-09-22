## Project setup

Personal website hosted at https://dishuk.github.io

Every command works with `make <target>` or, without make, `npm run <script>`. All logic lives in Node scripts, so both behave the same on Windows, macOS and Linux.

| make | npm | What it does |
|---|---|---|
| `make install` | `npm install` | Install dependencies |
| `make dev` | `npm run serve` | Dev server with hot reload on http://localhost:8081 |
| `make build` | `npm run build` | Production build into `dist/`, plus a page per route, `404.html`, `sitemap.xml` and `robots.txt` |
| `make lint` | `npm run lint` | ESLint |
| `make preview` | `npm run preview` | Serve `dist/` like GitHub Pages on http://localhost:8090 (`make preview` builds first) |
| `make clean` | `npm run clean` | Remove `dist/` and the build cache |

### Deploying

Deploys run from the **Deploy** workflow in GitHub Actions, started manually (Actions → Deploy → Run workflow) on `main`. It:

1. Installs dependencies with `npm ci`, lints and builds.
2. Publishes `dist/` to GitHub Pages.
3. Tags the deployed commit `vX.Y.Z`. The major version comes from `package.json`, so bumping it there starts a new series (for example `3.0.0`); otherwise the patch number of the latest tag in that series is incremented.

Pages must be set to deploy from GitHub Actions (Settings → Pages → Source).

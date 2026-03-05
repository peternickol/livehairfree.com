# Live Hair Free Website

This repository contains the Live Hair Free website.

## GitHub Pages hosting

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-github-pages.yml` that deploys on every push to `main`.

1. Push this repository to GitHub.
2. In GitHub: `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` (or run the workflow manually from `Actions`).
5. Optional custom domain: add a `CNAME` file at repo root with your domain and configure DNS.

Notes:
- The workflow automatically handles project-site base paths.
- `url` in `_config.yml` should match your production domain when live.

## Local development

1. Install Ruby and Bundler.
2. Install dependencies:

```bash
bundle install
```

3. Run the site:

```bash
bundle exec jekyll serve
```

4. Open http://127.0.0.1:4000

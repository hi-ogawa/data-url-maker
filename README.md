# Data URL Maker

Small example to show how to deploy express application as [Netlify Functions](https://docs.netlify.com/functions/overview/).

```bash
$ curl https://data-url-maker-hiro18181.netlify.app/api/url/https://fonts.gstatic.com/s/i/materialicons/language/v11/24px.svg
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiB4PSIwIi8+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Ik05LjAxLDE0SDJ2Mmg3LjAxdjNMMTMsMTVsLTMuOTktNFYxNHogTTE0Ljk5LDEzdi0zSDIyVjhoLTcuMDFWNUwxMSw5TDE0Ljk5LDEzeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==
```

## Development

```bash
# Development
npm install
npm run build -- -w
npm run backend
npm run frontend
npm run test

# Deployment
npm run build:netlify
npm run deploy

# (Deployment setup on first time)
npx netlify login
npx netlify sites:create --name data-url-maker-hiro18181
npx netlify link --name data-url-maker-hiro18181
```

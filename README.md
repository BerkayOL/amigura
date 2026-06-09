# Amigurumirem

El yapimi amigurumi vitrin sitesi - https://www.amigurumirem.com.tr

## Deploy (Firebase Hosting)

```bash
firebase use amigurumirem-9223e
firebase deploy --only hosting
```

## Performans ölçümü

Yerel (geliştirme):

```bash
npm run lighthouse:ci
```

DNS aktif olduktan sonra canlı site:

```bash
npm run lighthouse:prod
```

Alternatif: [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https://www.amigurumirem.com.tr/)

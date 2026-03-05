---
layout: null
title: About Redirect
permalink: /about/
noindex: true
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="0; url={{ '/contact/' | relative_url }}" />
    <link rel="canonical" href="{{ '/contact/' | absolute_url }}" />
    <title>Redirecting...</title>
  </head>
  <body>
    <p>Redirecting to <a href="{{ '/contact/' | relative_url }}">Contact</a>...</p>
    <script>
      window.location.replace("{{ '/contact/' | relative_url }}");
    </script>
  </body>
</html>

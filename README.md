# Vellore Ads (Next.js + PHP)

Next.js (React, App Router, Tailwind) front end with a PHP + MySQL API.
The build is a static site, so it runs on normal PHP hosting (Hostinger) and uploads by FTP.

```
src/            Next.js pages and components
  lib/api.js    axios client for the PHP API
backend/api/    PHP API (PHP 7.3+), one file per endpoint
  _lib/         shared code: settings, database (PDO), JSON replies
  sites/        per-domain settings (database login, city); only example.com.php is in git
tools/          build helpers
```

## Develop

Needs Node 20+, PHP with pdo_mysql, and MAMP's MySQL running (database `velloreads`).

```
npm install
npm run dev        # Next on http://localhost:3000, PHP API on :8000 (/api is forwarded)
```

## Build and upload

```
npm run build      # makes out/: the pages plus api/
```

Upload the contents of `out/` into `public_html/`, then upload that site's
`backend/api/sites/<domain>.php` into `public_html/api/sites/`
(copy `example.com.php` to make one; it holds the database login).

## Adding an endpoint

Create `backend/api/<name>.php`:

```php
<?php
require __DIR__ . '/_lib/bootstrap.php';

handle(function () {
	$rows = db()->query('SELECT ...')->fetchAll();
	reply(array('items' => $rows));
});
```

and call it from `src/lib/api.js` with `api.get('<name>.php')`.

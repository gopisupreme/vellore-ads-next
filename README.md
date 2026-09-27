# Vellore Ads (Next.js + PHP)

The dashboards of the Vellore Ads sites, rebuilt as a React (Next.js) front end
with a PHP + MySQL API. The build is a static site, so it runs on normal PHP
hosting (Hostinger) and uploads by FTP. It uses the same database as the
vellore-ads PHP site.

```
src/
  app/                 pages: / (home), /login, /register, /forgot-password, /reset-password,
                       /verify-email, /admin, /admin/soon
  components/ui/       reusable pieces: Card, DataTable, StatTile, Badge, ConfirmDialog, Breadcrumbs, Button ...
  components/layout/   DashboardShell (top bar + side menu), shared by every role's dashboard
  components/admin/    the admin pages' content
  components/site/     the public site: layout/ (sticky header, footer, search), home/ (home page sections),
                       auth/ (sign in, register, password pages), ui/
  components/auth/     RequireAuth, LoginForm
  config/              adminMenu.js (side menu; items without href open /admin/soon), roles.js
  config/site/         the public pages' fixed content (home.js) and link lists taken from the PHP templates
  lib/siteLinks.js     links into the PHP site's pages (listings, categories, blog ...)
  hooks/               useSession, useSite
  services/api.js      axios calls to the PHP API
  store/               Redux Toolkit slices (reducers/) and redux-saga side effects (sagas/)
  assets/font-awesome/ Font Awesome 4 from the PHP site
public/assets/         images from the PHP site
backend/api/           PHP API (PHP 7.3+), one file per endpoint
  _lib/                shared code: settings, database (PDO), session sign-in, JSON replies
  sites/               per-domain settings (database login); only example.com.php is in git
tools/                 build helpers
```

## Develop

Needs Node 20+, PHP with pdo_mysql, and MAMP's MySQL running (database `velloreads`).
`backend/api/sites/localhost.php` holds the local database login (not in git).

```
npm install
npm run dev        # Next on http://localhost:3000, PHP API on :8000 (/api is forwarded)
```

Sign in at http://localhost:3000/login with an admin account from the `users` table.

## API

| Endpoint | Does |
|---|---|
| `GET api/health.php` | PHP version and whether the database answers |
| `GET api/site.php` | site name, city, logos (`companyinfo`) |
| `POST api/auth/login.php` | `{email, password}` -> `{user}`, starts the session |
| `POST api/auth/register.php` | `{accountType, firstName, lastName, mobile, email, password, confirmPassword, captcha?}`; emails a verify link |
| `POST api/auth/verify-email.php` | `{token}` from the registration email |
| `POST api/auth/forgot-password.php` | `{email}`; emails a link to choose a new password (valid 1 hour) |
| `POST api/auth/reset-password.php` | `{token, password, confirmPassword}` |
| `GET api/auth/me.php` | the signed-in `{user}`, or 401 |
| `POST api/auth/logout.php` | ends the session |
| `GET api/layout.php` | public header/footer: site, categories, areas, visitor count (counts the visit) |
| `GET api/home.php` | home page: ads, theatres, news, service counts, trending listings, videos, attractions |
| `GET api/search/suggest.php?type=title\|city&q=` | search suggestions |
| `POST api/quick-request.php` | `{name, mobile, email, service}` -> quick_service, emails via SMTP_* settings |
| `GET api/admin/menu-counts.php` | numbers beside the admin menu links |
| `GET api/admin/dashboard.php` | `{stats, topListings}`: the 10 counters and the 100 most viewed listings |
| `POST api/admin/listing-toggle.php` | `{id, field}` switches `status`, `verified`, `trusted` or `plan` (free/gold) |
| `POST api/admin/listing-delete.php` | `{id}` deletes a listing and its reviews |

POSTs must send JSON. New endpoints start with:

```php
<?php
require __DIR__ . '/_lib/bootstrap.php';

handle(function () {
	require_method('GET');
	require_user(array('admin'));
	reply(array('items' => query('SELECT ... WHERE id = ?', array($id))->fetchAll()));
});
```

## Build and upload

```
npm run build      # makes out/: the pages plus api/
```

Upload the contents of `out/`, then upload that site's
`backend/api/sites/<domain>.php` into `api/sites/`
(copy `example.com.php` to make one; it holds the database login).

// After `next build`: copies the PHP API into out/ so out/ is the complete site
// to upload into public_html. Per-site settings (api/sites/*.php other than
// example.com.php) are left out: upload each site's own file separately.
import { cpSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

if (!existsSync('out')) {
  console.error('out/ is missing: run next build first.');
  process.exit(1);
}
cpSync('backend/api', 'out/api', {
  recursive: true,
  filter: (src) => !/[\\/]sites[\\/][^\\/]+\.php$/.test(src) || basename(src) === 'example.com.php',
});
console.log('out/ is ready to upload: pages + api/');

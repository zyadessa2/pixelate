import assert from 'node:assert/strict'

// Run against `next start` or the deployed site: node scripts/verify-seo.mjs <base-url>
const base = (process.argv[2] || 'http://localhost:3100').replace(/\/$/, '')
const canonicalOrigin = 'https://www.pixelateuae.com'
const get = path => fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000), redirect: 'manual' })
const sitemapResponse = await get('/sitemap.xml')
assert.equal(sitemapResponse.status, 200, 'Sitemap must return 200')
const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.ok(urls.length >= 16, 'Sitemap must include home, contact, projects and all services')
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs')
assert.ok(urls.every(url => url.startsWith(canonicalOrigin) && !url.includes('#')), 'Canonical URLs without fragments')

const titles = new Set()
const descriptions = new Set()
for (const url of urls) {
  const path = new URL(url).pathname
  const response = await get(path)
  assert.equal(response.status, 200, `${path}: HTTP status`)
  assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'), `${path}: must be indexable`)
  const html = await response.text()
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: exactly one H1 in server HTML`)
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]*)"/g)?.[0]
  assert.ok(title && !titles.has(title), `${path}: unique title`)
  assert.ok(description && !descriptions.has(description), `${path}: unique description`)
  titles.add(title)
  descriptions.add(description)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(canonical, url, `${path}: self-referencing canonical`)
  assert.ok(!/pixelate\.ae|your-google-verification-code|aggregateRating|\+971-XX/.test(html), `${path}: no placeholder SEO data`)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
  assert.ok(schemas.some(schema => schema['@type'] === 'ProfessionalService'), `${path}: business schema present in HTML`)
  if (path.startsWith('/services/')) {
    assert.ok(schemas.some(schema => schema['@type'] === 'Service'), `${path}: service schema`)
    assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'), `${path}: breadcrumb schema`)
  }
  console.log(`PASS ${path}`)
}

const robots = await (await get('/robots.txt')).text()
assert.ok(robots.includes(`${canonicalOrigin}/sitemap.xml`), 'Robots sitemap URL')
assert.ok(!robots.includes('Disallow: /\n'), 'Production public routes must be crawlable')
for (const path of ['/admin/login', '/api/auth/providers']) {
  const response = await get(path)
  assert.ok(response.headers.get('x-robots-tag')?.includes('noindex'), `${path}: noindex header`)
}
for (const path of ['/services/does-not-exist', '/projects/not-an-object-id', '/projects/000000000000000000000000']) {
  assert.equal((await get(path)).status, 404, `${path}: real HTTP 404`)
}
const image = await get('/opengraph-image')
assert.equal(image.status, 200, 'Social image status')
assert.ok(image.headers.get('content-type')?.includes('image/png'), 'Social card must be PNG')
const bytes = new Uint8Array(await image.arrayBuffer())
assert.deepEqual(Array.from(bytes.slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10], 'Valid PNG signature')
console.log(`SEO checks passed for ${urls.length} public pages, robots, admin exclusions, 404s and social image.`)

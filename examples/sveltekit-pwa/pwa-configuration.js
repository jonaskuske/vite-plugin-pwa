const pwaConfiguration = {
  srcDir: './build',
  outDir: './.svelte-kit/output/client',
  mode: 'development',
  includeManifestIcons: false,
  scope: '/',
  base: '/',
  manifest: {
    short_name: "PWA Router",
    name: "PWA Router",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ]
  },
}

const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const sw = process.env.SW === 'true'
const replaceOptions = {
  __DATE__: new Date().toISOString(),
  __RELOAD_SW__: reload ? 'true' : 'false',
}

const workboxOrInjectManifestEntry = {
  // vite and sveltekit are not aligned: pwa plugin will use /\.[a-f0-9]{8}\./ by default: #164 optimize workbox work
  dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
  globDirectory: './build/',
  globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
  globIgnores: sw ? (claims ? ['**/claims-sw*'] : ['**/prompt-sw*']) : ['**/sw*', '**/workbox-*'],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  manifestTransforms: [async(entries) => {
    // manifest.webmanifest is added always by pwa plugin, so we remove it
    const manifest = entries.filter(({ url }) =>
      url !== 'manifest.webmanifest' && url !== 'sw.js' && !url.startsWith('workbox-')
    ).map((e) => {
      const url = e.url
      if (url) {
        if (url.endsWith('.html')) {
          if (url === 'index.html') {
            e.url = '/'
            console.log(`${url} => ${e.url}`)
          }
          else {
            e.url = `/${url.substring(0, url.lastIndexOf('/'))}`
            console.log(`${url} => ${e.url}`)
          }
        }
      }

      return e
    })
    return { manifest }
  }]
}

if (sw) {
  pwaConfiguration.srcDir = 'src'
  pwaConfiguration.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaConfiguration.strategies = 'injectManifest'
  pwaConfiguration.manifest.name = 'PWA Inject Manifest'
  pwaConfiguration.manifest.short_name = 'PWA Inject'
  pwaConfiguration.injectManifest = workboxOrInjectManifestEntry
} else {
  workboxOrInjectManifestEntry.mode = 'development'
  workboxOrInjectManifestEntry.navigateFallback = '/'
  pwaConfiguration.workbox = workboxOrInjectManifestEntry
}

if (claims)
  pwaConfiguration.registerType = 'autoUpdate'

export { pwaConfiguration, replaceOptions }
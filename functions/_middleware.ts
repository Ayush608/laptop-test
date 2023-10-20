import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "laptop-test.pages.dev/test/*",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://www.pornhub.com/" },
    website: {
      // list resource requests for your website below
      resources: [
        "pornhub.com/*"
      ],
    },
  },
]

// `PagesFunction` is from @cloudflare/workers-types
export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: true },
        routes,
      },
    })(context),
  // other Pages plugins and middleware
]

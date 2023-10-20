import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { Route } from "@flaregun-net/proxyflare-for-pages/build/types/configuration"

const routes: Route[] = [
  {
    from: {
      pattern: "laptop-test.pages.dev/test",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://www.bestlaptopsfor.com" },
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
import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "laptop-test.pages.dev/test/*",
      alsoMatchWWWSubdomain: false,
    },
    to: { url: "https://tool.toolxd.com/*" },
    website: {
      // list resource requests for your website below
      resources: [
        "tool.toolxd.com/*"
      ],
    },
  },
]

// `PagesFunction` is from @cloudflare/workers-types
export const onRequest: PagesFunction[] = [
  async (context) => {
    const response = await proxyflare({
      config: {
        global: { debug: true },
        routes,
      },
    })(context)

    // Check if the response is HTML
    if (response.headers.get('Content-Type')?.includes('text/html')) {
      // Get the original body
      const originalBody = await response.text()

      // Define your HTML to be added
      const additionalHTML = `
        <div>
          <h1>Welcome to laptop-test.pages.dev/test/</h1>
          <p>This is some additional HTML content.</p>
        </div>
      `

      // Create a new response with the additional HTML
      return new Response(additionalHTML + originalBody, response)
    }

    return response
  },
  // other Pages plugins and middleware
]

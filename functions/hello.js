export async function onRequest(context) {
  // Get the request object
  const request = context.request;

  // Get the cache object
  const cache = caches.default;

  // Check if the response is already cached
  let response = await cache.match(request);

  // If not, generate a new response
  if (!response) {
    response = new Response("Hello, world!");
    // Set a cache-control header to specify how long the response should be cached
    response.headers.append("cache-control", "s-maxage=60");
    // Store the response in the cache
    await cache.put(request, response.clone());
  }

  // Return the response
  return response;
}

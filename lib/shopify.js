/**
 * Minimal Shopify Storefront API (GraphQL) client.
 *
 * Fill in the two environment variables below (see .env.local.example)
 * and this function is ready to use from Server Components, Route
 * Handlers, or Server Actions.
 *
 * Usage:
 *   import { shopifyFetch } from "@/lib/shopify";
 *
 *   const { data } = await shopifyFetch({
 *     query: `#graphql
 *       query Products {
 *         products(first: 6) {
 *           edges { node { id title handle } }
 *         }
 *       }
 *     `,
 *   });
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN; // e.g. 8mgrmc-sc.myshopify.com
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // private access token
const API_VERSION = "2026-07";

export async function shopifyFetch({ query, variables }) {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN. " +
        "Add them to .env.local — see .env.local.example."
    );
  }

  const res = await fetch(
    `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      // Cache product data for a minute; tune per-query as needed once
      // webhooks are wired up for on-demand revalidation.
      next: { revalidate: 60 },
    }
  );

  const raw = await res.text();
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(
      `Shopify returned a non-JSON response (HTTP ${res.status} ${res.statusText}) ` +
        `for domain "${DOMAIN}". First 300 chars: ${raw.slice(0, 300)}`
    );
  }

  if (!res.ok) {
    throw new Error(
      `Shopify API request failed (HTTP ${res.status} ${res.statusText}) ` +
        `for domain "${DOMAIN}": ${JSON.stringify(json).slice(0, 500)}`
    );
  }

  if (json.errors) {
    const message = Array.isArray(json.errors)
      ? json.errors.map((e) => e.message || JSON.stringify(e)).join("; ")
      : JSON.stringify(json.errors);
    throw new Error(`Shopify GraphQL error: ${message}`);
  }

  return json;
}

/**
 * Fetch the first N products.
 * @param {number} first
 * @param {string} [sortKey] - Shopify ProductSortKeys: TITLE | PRICE | CREATED_AT | BEST_SELLING | RELEVANCE
 * @param {boolean} [reverse]
 * @param {string} [searchQuery] - Shopify product query string for full-text search
 */
export async function getProducts(first = 9, sortKey, reverse, searchQuery) {
  const gql = `#graphql
    query Products($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            productType
          }
        }
      }
    }
  `;
  const variables = { first };
  if (sortKey) variables.sortKey = sortKey;
  if (reverse !== undefined) variables.reverse = reverse;
  if (searchQuery) variables.query = searchQuery;
  const { data } = await shopifyFetch({ query: gql, variables });
  return data.products.edges.map((e) => e.node);
}


/** Fetch products from a specific collection by handle. */
export async function getCollectionProducts(handle, first = 9) {
  const query = `#graphql
    query CollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              description
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch({ query, variables: { handle, first } });
  return data.collection?.products?.edges.map((e) => e.node) || [];
}

/**
 * Fetch all storefront-visible collections.
 * Used to populate the Collections filter in the shop sidebar.
 * @param {number} [first=50]
 */
export async function getCollections(first = 50) {
  const query = `#graphql
    query Collections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            products(first: 1) {
              edges { node { id } }
            }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch({ query, variables: { first } });
  return (
    data.collections.edges
      .map((e) => ({
        id: e.node.id,
        title: e.node.title,
        handle: e.node.handle,
        // Whether the collection has at least one product
        hasProducts: e.node.products.edges.length > 0,
      }))
      // Exclude Shopify's internal/empty system collections
      .filter(
        (c) =>
          c.hasProducts &&
          !c.handle.startsWith("asset-pack-") &&
          c.handle !== "frontpage"
      )
  );
}

/** Fetch a single product by its handle (the slug in its Shopify URL). */
export async function getProductByHandle(handle) {
  const query = `#graphql
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        images(first: 5) {
          edges { node { url altText } }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch({ query, variables: { handle } });
  return data.product;
}

/** Create a new cart with an optional starting line item. */
export async function createCart(merchandiseId, quantity = 1) {
  const query = `#graphql
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors { field message }
      }
    }
  `;
  const variables = merchandiseId
    ? { lines: [{ merchandiseId, quantity }] }
    : { lines: [] };
  const { data } = await shopifyFetch({ query, variables });
  return data.cartCreate.cart;
}

/** Add a line item to an existing cart. */
export async function addToCart(cartId, merchandiseId, quantity = 1) {
  const query = `#graphql
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors { field message }
      }
    }
  `;
  const { data } = await shopifyFetch({
    query,
    variables: { cartId, lines: [{ merchandiseId, quantity }] },
  });
  return data.cartLinesAdd.cart;
}

/** Re-hydrate an existing cart by ID. */
export async function getCart(cartId) {
  const query = `#graphql
    query Cart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch({ query, variables: { cartId } });
  return data.cart;
}

/** Remove a line item from an existing cart. */
export async function removeFromCart(cartId, lineId) {
  const query = `#graphql
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount { amount currencyCode }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      title
                      featuredImage { url altText }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const { data } = await shopifyFetch({
    query,
    variables: { cartId, lineIds: [lineId] },
  });
  return data.cartLinesRemove.cart;
}

/** Update the quantity of a line item in an existing cart. */
export async function updateCartLine(cartId, lineId, quantity) {
  const query = `#graphql
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount { amount currencyCode }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      title
                      featuredImage { url altText }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `;
  const { data } = await shopifyFetch({
    query,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  return data.cartLinesUpdate.cart;
}
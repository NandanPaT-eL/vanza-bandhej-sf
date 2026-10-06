/**
 * AppHeader — server component wrapper for Header.
 * Fetches live Shopify collections and passes them to the client Header
 * so the navbar mega-menu auto-shows/hides links based on what's live in Shopify.
 *
 * Use <AppHeader /> instead of <Header /> in every page.
 */
import Header from "./Header";
import { getCollections } from "@/lib/shopify";

export default async function AppHeader() {
  let shopifyCollections = [];
  try {
    shopifyCollections = await getCollections();
  } catch (err) {
    console.error("AppHeader: could not load collections:", err.message);
  }

  return <Header shopifyCollections={shopifyCollections} />;
}

# Vanza Bandhej — Shopify Admin Guide

> This document covers:
> 1. How to add a **Payment Method** in Shopify
> 2. How to add **Products** with the correct tags and categories so they appear in the right filters on the website

---

## Part 1 — Adding a Payment Method in Shopify

### Step 1: Log in to Shopify Admin
1. Go to [admin.shopify.com](https://admin.shopify.com)
2. Log in with your store credentials
3. Select your Vanza Bandhej store

---

### Step 2: Navigate to Payment Settings
1. In the left sidebar, click **Settings** (bottom-left gear icon)
2. Click **Payments**

---

### Step 3: Choose Your Payment Provider

Shopify offers several options for Indian stores:

#### Option A — Shopify Payments *(Not available in India as of 2025)*
Shopify Payments is not supported in India. Use one of the options below.

---

#### Option B — Razorpay *(Recommended for India)*
Razorpay supports UPI, cards, net banking, and wallets — ideal for Indian customers.

1. Under **Third-party payment providers**, click **Choose third-party provider**
2. Search for **Razorpay** in the list and click it
3. You will need:
   - **Razorpay Key ID** (from your Razorpay dashboard → Settings → API Keys)
   - **Razorpay Key Secret**
4. Click **Activate Razorpay**
5. Click **Save**

> **Important:** Enable **Test Mode** first. Once you have verified a test payment, disable Test Mode to go live.

---

#### Option C — PayU *(Alternative for India)*
1. Under **Third-party payment providers**, click **Choose third-party provider**
2. Search for **PayU** and select it
3. Enter your PayU **Merchant Key** and **Merchant Salt**
4. Click **Activate PayU** then **Save**

---

#### Option D — Manual Payments (Bank Transfer / COD)

For **Cash on Delivery** or **Bank Transfer** orders (common for Indian boutique shoppers):

1. In **Payment Settings**, scroll to **Manual Payment Methods**
2. Click **Add manual payment method**
3. Choose from:
   - **Cash on delivery (COD)**
   - **Bank deposit** — add your bank details in the instructions field
4. Add payment instructions (e.g., "Transfer to: HDFC Bank, A/c: XXXXXXXXXX, IFSC: HDFC0000001")
5. Click **Activate** then **Save**

---

#### Option E — UPI / Google Pay / PhonePe via Razorpay
These are automatically available once Razorpay is connected — no separate setup needed.

---

### Step 4: Enable Test Mode (Before Going Live)
1. In Payments settings, check **Enable test mode** under your provider
2. Place a test order on your storefront
3. Verify the test payment completes successfully
4. Return to Payment Settings and **disable test mode**
5. Your store is now ready to accept real payments

---

## Part 2 — How to Add Products with Correct Tags and Categories

### Step 1: Go to Products in Admin
1. In the Shopify Admin sidebar, click **Products**
2. Click **Add product** (top right)

---

### Step 2: Fill In Product Details

| Field | What to Enter | Example |
|-------|--------------|---------|
| **Title** | Full product name | `Red Gaji Silk Bandhani Saree` |
| **Description** | Describe fabric, knot count, care, occasion | `Pure Gaji silk with 5000+ hand-tied knots...` |
| **Media** | Upload 3-5 high-quality product images | Front, drape, close-up of knots |
| **Price** | INR price | `4500` |
| **Compare at price** | Original price if on sale | `5500` |
| **SKU** | Stock Keeping Unit code | `VB-GS-RED-001` |
| **Inventory** | Stock quantity | `5` |
| **Weight** | For shipping calculation | `500g` |

---

### Step 3: Assign Product Type

The **Product Type** is used by the website filter. Set it to one of:

| Product Type | When to Use |
|-------------|-------------|
| `Saree` | All saree products |
| `Dupatta` | Dupattas / stoles |
| `Lehenga` | Lehenga sets |
| `Dress Material` | Unstitched dress materials |

> **How:** In the product edit page, find the **Product type** field on the right panel and type/select the type.

---

### Step 4: Add Tags — The Most Important Step for Filters

Tags control which filters the product appears in on the website. Add every relevant tag from the table below.

#### Fabric Tags
| Tag | When to Add |
|-----|------------|
| `gaji-silk` | Products made from Gaji Silk |
| `pure-silk` | Pure silk products |
| `georgette` | Georgette fabric products |
| `cotton` | Cotton bandhani products |
| `chanderi` | Chanderi or Rai-dana bandhej |

#### Occasion Tags
| Tag | When to Add |
|-----|------------|
| `bridal` | Bridal / wedding pieces |
| `festive` | Festive season items |
| `daily-wear` | Everyday, casual products |
| `office-wear` | Fusion / office wear |
| `gift` | Items suitable for gifting |

#### Collection Tags
| Tag | When to Add |
|-----|------------|
| `new-arrival` | Newly added products |
| `best-seller` | Top-selling items |
| `natural-dye` | Products dyed with natural colours (haldi, madder, indigo) |
| `sindoor-edit` | Part of the Sindoor Edit seasonal collection |

#### Price Range Tags (add these based on selling price)
| Tag | Price Range |
|-----|------------|
| `under-5000` | Products priced under Rs 5,000 |
| `under-10000` | Products priced under Rs 10,000 |

> **How to add tags:** In the product edit page, find the **Tags** field on the right panel. Type each tag and press Enter or comma to add it.

> **Tag format rules:** Use lowercase, hyphens instead of spaces. Example: `gaji-silk` NOT `Gaji Silk` or `gaji_silk`

---

### Step 5: Assign to a Collection

Collections group products in Shopify and power the website's collection filter dropdowns.

1. In the product edit page, scroll to the **Collections** field on the right
2. Click it and assign the product to relevant collections:

| Collection Handle | Collection Name | Products to Include |
|------------------|----------------|-------------------|
| `sindoor-edit` | The Sindoor Edit | Deep red / maroon bandhani pieces |
| `new-arrivals` | New Arrivals | All newly added products |
| `best-sellers` | Best Sellers | Top selling products |
| `natural-dyes` | Natural Dyes | Haldi, madder, indigo dyed pieces |
| `bridal-wedding` | Wedding Season | Bridal sarees, lehengas |
| `festive` | Festive | Festive occasion pieces |
| `daily-wear` | Daily Wear | Lightweight, everyday products |
| `office-wear` | Fusion Wear | Fusion / office wear |
| `gifting` | Gifting | Curated gift-worthy pieces |
| `gaji-silk` | Gaji Silk | Gaji silk fabric products |
| `pure-silk` | Pure Silk | Pure silk products |
| `georgette` | Georgette | Georgette products |
| `cotton-bandhani` | Cotton Bandhani | Cotton fabric products |
| `chanderi` | Rai-dana Bandhej | Chanderi / Rai-dana products |
| `dupattas` | Dupattas | All dupattas |
| `lehengas` | Lehengas | All lehengas |
| `dress-material` | Dress Material | Dress materials |

> **Important:** You need to **create these collections first** in Shopify Admin then Products then Collections, then assign products to them. Collection handles (the URL slug) must match exactly as shown above.

---

### Step 6: How to Create a Collection

1. Go to **Products then Collections** in admin sidebar
2. Click **Create collection**
3. Enter the **Title** (e.g., `New Arrivals`)
4. Set the **Collection type** to `Manual` (you add products manually) or `Automated` (auto-adds based on conditions)
5. In the URL handle field, make sure it matches the handle in the table above (e.g., `new-arrivals`)
6. Click **Save**
7. Then add products to the collection

---

### Step 7: Publish the Product

1. In the product page, scroll to the **Sales channels** section (right panel)
2. Make sure **Online Store** is checked
3. If using the Headless Storefront / Storefront API, also enable the Hydrogen or headless channel
4. Click **Save** (top right)

---

## Quick Checklist Before Saving a Product

- [ ] Title filled in
- [ ] Description written (fabric, knots, care instructions, dimensions)
- [ ] At least 3 product images uploaded
- [ ] Price set in INR
- [ ] Product Type assigned (Saree / Dupatta / Lehenga / Dress Material)
- [ ] All relevant Tags added (fabric + occasion + collection tags)
- [ ] Assigned to correct Collections
- [ ] SKU assigned
- [ ] Inventory quantity set
- [ ] Weight set for shipping
- [ ] Published to Online Store

---

## Example: Adding a Red Bridal Gaji Silk Saree

| Field | Value |
|-------|-------|
| **Title** | `Sindoor Red Gaji Silk Bridal Bandhani Saree` |
| **Product Type** | `Saree` |
| **Price** | `8500` |
| **Tags** | `bridal`, `gaji-silk`, `sindoor-edit`, `natural-dye`, `new-arrival` |
| **Collections** | `sindoor-edit`, `bridal-wedding`, `gaji-silk`, `new-arrivals`, `natural-dyes` |

---

## WhatsApp Business — Update the Number

The website WhatsApp button uses a placeholder number. To update it:

1. Open the file `components/WhatsAppButton.js` in the project
2. Replace the `WA_NUMBER` value with your actual WhatsApp Business number:

```
const WA_NUMBER = "91XXXXXXXXXX";
// Country code 91 for India + your 10-digit mobile number, no + sign, no spaces
```

3. Optionally update the `WA_MESSAGE` greeting text
4. Save the file and redeploy the site

---

*Document prepared for Vanza Bandhej — October 2026*

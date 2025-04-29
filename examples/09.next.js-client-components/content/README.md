# Interleaving Server and Client Components Examples

This example demonstrates practical ways to interleave Server Components (SCs) and Client Components (CCs) in a Next.js application using the App Router. It showcases two primary patterns and integrates Server Actions for mutations.

**Core Concept:** Leverage the strengths of both component types:

* **Server Components (Default):** Run only on the server. Ideal for data fetching, accessing backend resources securely, reducing client-side JavaScript, and initial HTML rendering. Cannot use hooks like `useState`, `useEffect`, or browser APIs.
* **Client Components (`'use client'`):** Initially render on the server (for HTML), then "hydrate" and run on the client. Needed for interactivity, state management (`useState`), effects (`useEffect`), event listeners, and browser APIs.

**The Golden Rule:** Server Components can import and render Client Components. Client Components *cannot* directly import Server Components. However, Server Components (or their rendered output) can be passed as props (like `children`) to Client Components.

---

## Example 1: Server Component Renders a Client Component (SC -> CC)

* **Scenario:** Displaying product details fetched on the server, with an interactive "Add to Cart" button.
* **Pattern:** The main page (`ProductPage`) is a Server Component fetching data. It renders a Client Component (`AddToCartButton`) for user interaction.
* **Why:** Keeps data fetching and main content rendering on the server for performance and SEO, while delegating only the interactive part (button clicks, state changes) to the client.
* **Files:**
  * `app/product/[id]/page.jsx` (Server Component - Fetches data via `getProductDetails`, renders `AddToCartButton`)
  * `app/product/[id]/AddToCartButton.jsx` (Client Component - Uses `'use client'`, `useState`, `useTransition`)
  * `app/lib/data.js` (Contains `getProductDetails` - standard server-side function, **no** `'use server'` needed here)
  * `app/lib/cartActions.js` (Contains `addToCart` Server Action - uses `'use server'`, called from `AddToCartButton`)
* **Key Features:**
  * `'use client'` marks the boundary.
  * Server Action (`addToCart`) called directly from the Client Component using `useTransition` for pending states.

---

## Example 2: Client Component Accepts Server Component via `children` (CC <- SC as `children`)

* **Scenario:** An interactive UI element (like an Accordion) needs to display content that is best rendered on the server (e.g., content fetched from a file or database).
* **Pattern:** The `HomePage` (Server Component) renders an `Accordion` (Client Component). Critically, it passes instances of `ServerContentSection` (another Server Component) *as the `children` prop* to the `Accordion`.
* **Why:** Allows the interactive "shell" (`Accordion`) to manage its open/close state on the client, while the *content* inside (`ServerContentSection`) benefits from server-rendering (e.g., accessing the filesystem, complex data fetching).
* **Files:**
  * `app/page.jsx` (Server Component - Renders `Accordion` components)
  * `app/components/Accordion.jsx` (Client Component - Uses `'use client'`, manages `isOpen` state, accepts `children`)
  * `app/components/ServerContentSection.jsx` (Server Component - **No** `'use client'`, reads file content, rendered output passed *into* `Accordion`)
* **Key Features:**
  * The `children` prop acts as a "slot" where server-rendered content can be placed within a client-rendered structure.
  * `ServerContentSection` demonstrates server-only capabilities (using `fs/promises`, `path`).

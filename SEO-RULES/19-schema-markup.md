# SEO Factor 19: Schema and Structured Data Markup

## Purpose
Structured data markup is machine-readable semantic metadata adhering to the Schema.org vocabulary. Embedded directly into HTML documents using JSON-LD format, structured data explicitly defines entities, relationships, services, pricing, business coordinates, and brand identity for search engine crawlers and artificial intelligence models. While search engines utilize structured data to render enhanced SERP features (Rich Results, Knowledge Graph panels, review stars), modern AI systems (Google Gemini / AI Overviews, OpenAI ChatGPT Search, Perplexity) rely heavily on structured entities for semantic comprehension and factual citation retrieval (RAG). Proper implementation enhances credibility, protects brand identity, and improves search click-through rates.

---

## Guidelines
1. **JSON-LD as the Sole Format**:
   All structured data must be authored in **JSON-LD** (`<script type="application/ld+json">`). Avoid Microdata and RDFa inline attributes, which clutter template presentation and are prone to syntax corruption during DOM manipulation.
2. **True Representation of Visible Content**:
   Every entity, service name, price, and business detail included in JSON-LD must be explicitly visible to human visitors in the rendered body copy. Marking up hidden text, phantom prices, or unrendered reviews violates Google's Structured Data Spam Policies and triggers manual actions that revoke rich result eligibility.
3. **Core Entities for HelpIt Stack**:
   - **`LocalBusiness` / `ProfessionalService`**: Sitewide or homepage entity defining legal name, logo, phone (+91), address (Delhi NCR / India), operating hours, and geocoordinates.
   - **`Service` with `Offer`**: On individual service landing pages, nest services inside `Offer` structures declaring `price` (e.g., `"500.00"` for remote, `"1500.00"` for doorstep visit) and `priceCurrency: "INR"`.
   - **`Organization` & `WebSite`**: Define site name, search action, and canonical organization profiles (`sameAs` links to social media, GitHub, or LinkedIn).
   - **`FAQPage`**: While Google restricted visual SERP accordion dropdowns in 2023/2026, retain `FAQPage` schema on troubleshooting pages to feed conversational AI answer engines and RAG retrieval systems.
4. **Valid Schema.org Syntax & Google Supported Types**:
   Validate that properties exist in the Schema.org core specification and meet Google Search feature criteria. Validate both with Schema Markup Validator (`validator.schema.org`) for syntax and Google's Rich Results Test for feature eligibility.
5. **Escape Special Characters in JSON**:
   Properly escape quotation marks (`\"`), backslashes, and line breaks within JSON-LD string values to prevent JSON parse errors.

---

## Limits & Constraints
- **Format**: Strictly `application/ld+json`.
- **Vocabulary Context**: `@context` must always be `"https://schema.org"`.
- **Currency Code**: `priceCurrency` must follow ISO 4217 standard (`"INR"` for Indian Rupees).
- **Price Format**: Must be formatted as a numeric string without currency symbols (e.g., `"500.00"`, NOT `"₹500"`).
- **Hidden Text**: 0 tolerance for schema properties not visible in user-facing page content.
- **Syntactic Errors**: Exactly **0 errors** in Schema Markup Validator.

---

## Validation Rules
| Rule ID | Rule Name | Description | Severity | Pass Criteria |
|---|---|---|---|---|
| `R19-1` | JSON-LD Implementation | Structured data must be embedded using `<script type="application/ld+json">`. | Critical | Valid script tag with type `application/ld+json`. |
| `R19-2` | Valid JSON Syntax | The content of the JSON-LD script must parse as valid JSON without errors. | Critical | `JSON.parse()` succeeds without syntax exceptions. |
| `R19-3` | Schema Context Declaration | Every root schema object must declare `"@context": "https://schema.org"`. | Critical | `@context` strictly equals `https://schema.org`. |
| `R19-4` | LocalBusiness / Service Presence | Commercial service pages must include `Service` or `ProfessionalService` schema. | High | Target service page includes `Service` or `ProfessionalService` type. |
| `R19-5` | Accurate Currency & Price | Pricing offers must declare `priceCurrency: "INR"` and numeric `price` strings. | High | `priceCurrency` is "INR"; `price` contains only digits and decimal. |
| `R19-6` | Visible Content Parity | Schema data points (price, title, address) must match visible page text. | Critical | No discrepancy between schema and rendered DOM text. |
| `R19-7` | Zero Validator Errors | Schema must produce 0 errors in Google Rich Results Test / Schema Validator. | Critical | Automated schema audit passes with 0 errors. |

---

## Good Examples

### Example 1: LocalBusiness & Service Schema for HelpIt Commercial Service Page
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://helpit.in/#organization",
  "name": "HelpIt Digital Solutions",
  "url": "https://helpit.in/",
  "logo": "https://helpit.in/images/brand/helpit-logo.png",
  "image": "https://helpit.in/images/services/remote-pc-support.webp",
  "description": "On-demand technical assistance, remote PC troubleshooting, and doorstep computer setup in Delhi NCR.",
  "telephone": "+91-9876543210",
  "priceRange": "₹500 - ₹1500",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tech Support Center, Saket",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110017",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.5244,
    "longitude": 77.2066
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "New Delhi"
    },
    {
      "@type": "City",
      "name": "Gurugram"
    },
    {
      "@type": "City",
      "name": "Noida"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Technical Support Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remote PC Troubleshooting & Virus Removal",
          "description": "Instant remote desktop diagnostic session resolving software glitches, printer drivers, and OS errors."
        },
        "price": "500.00",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep In-Person Tech Visit (Delhi NCR)",
          "description": "On-site hardware troubleshooting, optical fiber setup, and computer assembly across Delhi NCR."
        },
        "price": "1500.00",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
}
</script>
```
*Why this is good*: Fully qualified `ProfessionalService` entity, includes geocoordinates and areaServed for local SEO in Delhi NCR, formats prices accurately in INR with `Offer` layers, and matches actual site pricing (₹500 remote, ₹1,500 doorstep).

### Example 2: FAQPage Schema for AI Model Retrieval & Knowledge Extraction
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does HelpIt connect to my computer remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our engineers connect via secure, encrypted one-time remote desktop software such as AnyDesk or TeamViewer. You maintain full visibility of the engineer's cursor and can terminate the session at any moment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the fee if my technical issue cannot be resolved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HelpIt operates on a No-Fix, No-Fee guarantee. If our technical specialists are unable to diagnose or resolve your reported software problem, you receive a 100% refund."
      }
    }
  ]
}
</script>
```
*Why this is good*: Provides clear, factual Q&A mapping that AI search engines (Perplexity, ChatGPT, Gemini) can parse and cite directly in response to user queries.

---

## Bad Examples

### Example 1: Broken Syntax and Invalid Currency Format
```html
<!-- BAD: Syntax errors and unescaped currency symbols -->
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Service"
  "name": "PC Repair",
  "price": "₹500",
  "currency": "Rupees"
}
</script>
```
*Why this is bad*:
1. Missing comma after `"@type": "Service"` causes fatal JSON parse failure.
2. Insecure `@context` (`http://` instead of `https://`).
3. Schema requires `price` to be a numeric string without symbols; `"₹500"` triggers validation error.
4. Schema property is `priceCurrency: "INR"`, not `currency: "Rupees"`.

### Example 2: Phantom Reviews and Hidden Markup
```html
<!-- BAD: Fabricating 5-star aggregate rating not backed by on-page reviews -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Doorstep Support",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "250"
  }
}
</script>
```
*Why this is bad*: If the page does not display 250 real user reviews and ratings visible to visitors, this triggers a manual action for "Spammy Structured Markup", revoking all rich snippets sitewide.

---

## Common Mistakes & Anti-Patterns
| Mistake / Anti-Pattern | Why It Fails | Correction |
|---|---|---|
| Comma-missing or trailing commas in JSON-LD | Invalid JSON; parser crashes and ignores entire block. | Validate JSON with linter or `JSON.stringify()`. |
| Currency symbol in `price` property (`price: "₹500"`) | Fails ISO schema validation rules. | Use numeric value (`price: "500.00"`) and `priceCurrency: "INR"`. |
| Discrepancy between schema and visible page content | Violates Google Structured Data Spam Policy; causes manual action. | Ensure every schema property mirrors visible text. |
| Using Microdata inline instead of JSON-LD | Difficult to maintain and breaks easily with component refactoring. | Migrate all structured data to JSON-LD script blocks. |
| Deprecated FAQ schema expectations | Expecting Google Search SERP dropdowns for commercial sites. | Maintain FAQ schema for AI search/LLM citations, not SERP accordions. |

---

## How to Implement in HelpIt Stack (Astro 5 + Tailwind)
1. **Schema Component (`src/components/Schema.astro`)**:
   Create a reusable component that serializes typed JavaScript objects safely using `JSON.stringify()`:
   ```astro
   ---
   interface Props {
     item: Record<string, any>;
   }

   const { item } = Astro.props;
   const jsonString = JSON.stringify(item);
   ---
   <script type="application/ld+json" set:html={jsonString} />
   ```
2. **Master Layout Integration**:
   Inject global `Organization` and `WebSite` schema on every page.
3. **Service Page Integration**:
   Inject targeted `ProfessionalService` and `Service` schema specifically on `src/pages/services/[slug].astro`.

---

## How to Verify / Test
1. **Schema Markup Validator (`validator.schema.org`)**:
   Copy rendered page HTML source -> Paste into validator -> Verify **0 Errors** and **0 Warnings**.
2. **Google Rich Results Test (`search.google.com/test/rich-results`)**:
   Input production URL -> Verify eligible features (Organization, LocalBusiness, Breadcrumbs).
3. **Search Console Monitoring**:
   Check Search Console under **Enhancements** to ensure zero structured data errors are detected across crawled URLs.

---

## Official Documentation vs General SEO Advice
- **Google Search Central Official Stance**: JSON-LD is the strongly recommended format. Structured data must accurately reflect visible content. Violations trigger manual actions for spammy markup. FAQ rich snippet dropdowns are deprecated for commercial sites, but structured data remains foundational for entity understanding.
- **Industry & AI Optimization Standards**: Detailed schema feeds AI retrieval engines (RAG), conversational bots, and local entity search clusters.

---

## Research Log
- **Date**: 2026-11-10
- **Queries Conducted**:
  1. `Google Search Central structured data intro schema JSON-LD official guide` (Source: `google.com`) — Outlined core guidelines: JSON-LD preferred format, `@context: "https://schema.org"`, visible content requirements, and testing tools.
  2. `LocalBusiness ProfessionalService Service schema JSON-LD offers priceCurrency INR Google` (Source: `stackoverflow.com`) — Constructed production JSON-LD template using `ProfessionalService`, `hasOfferCatalog`, `Offer`, and `priceCurrency: "INR"` with numeric pricing.
  3. `Google FAQ schema update 2023 rich snippets restriction AI search value` (Source: `honchosearch.com`) — Analyzed timeline of Google's FAQ rich result restrictions (Aug 2023 authority limit, May 2026 full SERP deprecation) and highlighted ongoing value for AI retrieval/RAG.
  4. `Rich Results Test vs Schema Markup Validator errors vs warnings Google SEO` (Source: `crawltide.com`) — Contrasted Schema Markup Validator (Schema.org syntax & vocabulary) vs Rich Results Test (Google feature eligibility & mandatory properties).
  5. `Google Search Central spam policies structured data manual action hidden text misleading price` (Source: `google.com`) — Documented structured data spam policies: hidden text violations, price mismatches, and manual actions revoking rich snippet eligibility.

---

## Sources
- Google Search Central: Introduction to Structured Data (`https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`)
- Google Search Central: General Structured Data Guidelines (`https://developers.google.com/search/docs/appearance/structured-data/sd-policies`)
- Schema.org: ProfessionalService Specification (`https://schema.org/ProfessionalService`)
- Schema.org: Offer Specification (`https://schema.org/Offer`)
- Google Rich Results Test (`https://search.google.com/test/rich-results`)

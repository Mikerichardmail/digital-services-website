# Digital Services Website

A blazing-fast, static + serverless digital services website engineered with **Astro**, **Tailwind CSS**, and **Cloudflare Pages**, featuring payments powered by **Razorpay**.

## 🚀 Features

- **162 Deduplicated Digital Services** across **17 Categories**
- **Central Data Configuration**: `src/data/site.json`, `src/data/services.json`, `src/data/categories.json`, `src/data/locations.json`
- **Lead Generation & Checkout**:
  - Direct Razorpay Payment Links with server-side price validation
  - Verified Webhooks (`HMAC-SHA256`)
  - WhatsApp Click-to-Chat integrations with prefilled service inquiries
- **Local SEO & NCR Hubs**: Tailored landing pages for Noida, Gurgaon, Delhi, Ghaziabad, and Faridabad
- **Trust & Compliance Pages**: Complete Privacy Policy, Terms of Service, Refund & Cancellation Policy, and Digital Delivery Policy
- **Zero-Password Security Standard**: Strict privacy guarantee for all tech support

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional for testing)
Copy `.dev.vars.example` to `.dev.vars`:
```bash
cp .dev.vars.example .dev.vars
```
Set your test keys from your Razorpay Dashboard:
```env
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment on Cloudflare Pages

1. Push this repository to GitHub.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set Build Settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under **Environment variables**, add:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
6. Click **Save and Deploy**.

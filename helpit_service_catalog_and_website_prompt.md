# HelpIt Digital Solutions — Service Catalog & Website Integration Prompt

## Business Rules

- **Minimum charge:** ₹500 per service.
- **Remote service:** Available across India where the task can be completed remotely.
- **Home visit:** Add ₹1,000 to the applicable service price, in addition to the service charge. Confirm travel availability and the total price before booking.
- **Payment:** Advance payment through the website's UPI/payment gateway, after the scope and price are confirmed.
- **Customer communication:** WhatsApp confirmation after verified payment.
- **Custom requests:** Customers can describe a task that is not listed. Review feasibility, then quote a price of at least ₹500 before taking payment.
- **Do not promise:** Guaranteed outcomes for SEO rankings, Google Business Profile reinstatement, software activation, data recovery, or complex repairs.
- **Remote-access safety:** Obtain consent before connecting. Never request passwords or OTPs. Customers should enter sensitive credentials themselves.
- **Home visits:** Offer only where actually available; confirm address, travel availability, scope, and total price before accepting payment.

## Service Categories and Listings

### 1. AI Setup & AI Assistance
- AI tool setup and troubleshooting
- Custom AI prompts and workflows
- AI image and video creation assistance
- AI tools for business
- Reel-to-Result assistance

### 2. Project & Deadline Assistance
- Help Me Meet My Project Deadline
- Project troubleshooting
- Website or technical project assistance
- Custom project feasibility and scope assessment

### 3. File Format & Document Help
- PDF and Word conversion
- Image format conversion
- Excel and CSV conversion
- File size reduction
- Scanned PDF and OCR assistance
- Document formatting
- Batch file conversion
- File opening and compatibility troubleshooting
- File backup and transfer assistance

### 4. Windows & Computer Support
- Windows activation troubleshooting
- Windows product key assistance
- Windows update error fixes
- Slow laptop optimization
- Driver installation and troubleshooting
- Software installation and setup
- Printer and Wi-Fi troubleshooting
- Computer boot and startup errors
- Browser and extension troubleshooting

### 5. Business Consultation & Digital Setup
- Custom Business Consultation
- Digital business setup
- Business workflow improvement
- Product catalogue setup
- Software and tool selection
- Custom digital solution planning
- Google Business Profile assistance
- WhatsApp Business setup
- E-commerce product listing assistance

### 6. Website & SEO Services
- Website creation
- Website troubleshooting and repairs
- Domain and DNS configuration
- Website speed optimization
- SEO audit and keyword research

### 7. Design, Images & Video Assistance
- Social media post design
- Promotional banners and posters
- Logo and basic branding
- Video captions and subtitles
- YouTube thumbnails
- Product image editing
- AI image and video creation assistance

### 8. Android App & Digital Tool Assistance
- Android app listing assistance
- App listing content and asset preparation
- Browser and extension troubleshooting
- Software and tool selection

## Website Implementation Prompt

You are updating the existing HelpIt Digital Solutions website. Inspect the current website structure, design system, framework, routing, service listings, checkout, and WhatsApp contact flow before making changes. Preserve the existing branding and working features.

### Goal
Smartly merge the service categories and listings above into the existing website. Avoid duplicate services and confusing navigation. The site should make it easy for a customer who does not know the technical name of their problem to request help.

### Navigation and service discovery
1. Create or update a main **Services** page with the eight categories above.
2. Use clear, responsive service cards with a service name, short plain-language description, remote starting price, delivery type, and **View Details / Book Now** action.
3. Keep each service in one primary category. Where relevant, link to it from another category rather than creating duplicate listings.
4. Add a prominent **“Tell us what you're stuck on” / “Custom Digital Help Request”** option for unlisted tasks.
5. Feature these services prominently:
   - AI Setup & Help
   - Reel-to-Result Assistance
   - Help Me Meet My Project Deadline
   - File Format Help
   - Custom Business Consultation
   - Windows & Computer Support
6. Do not publish services as immediately bookable unless the business can actually deliver them. Support “Available”, “Request a Quote”, or “Coming Soon” statuses as appropriate.

### Pricing rules
1. Enforce a minimum service price of **₹500** throughout the UI and backend. Do not display or accept a paid service price below ₹500.
2. For remote delivery, show the confirmed service price, with a minimum of ₹500.
3. For a home visit, calculate **home-visit total = service price + ₹1,000**. Show the additional ₹1,000 clearly and show the final total before checkout. For example, a ₹500 service costs ₹1,500 with a home visit.
4. Do not imply that home visits are available everywhere. Require the customer to provide their area/pincode and confirm availability before payment.
5. For complex or unclear work, collect the request first, assess feasibility, and send a quote of at least ₹500. Do not take payment until the scope and total are agreed.
6. Do not silently change prices or add fees during checkout.

### Booking form
Collect only necessary information:
- Customer name
- WhatsApp number with country code
- Email (optional)
- Selected service
- Short description of the problem or desired result
- Relevant reference link (optional)
- File upload (optional, with sensible file-size/type limits and privacy notice)
- Preferred delivery: remote or home visit
- Area/pincode for home-visit availability
- Preferred appointment/deadline
- Consent to the service terms and privacy policy

Do not collect passwords, OTPs, full card details, or unnecessary sensitive information.

### Checkout and confirmation
1. Use the website's existing payment integration if present. Otherwise, implement a supported Indian payment gateway with UPI support, subject to account approval.
2. Create orders on the server and calculate prices server-side. Never trust a price supplied by the browser.
3. Verify payment status/signatures server-side and use verified webhooks where supported. Make webhook processing idempotent to avoid duplicate orders.
4. Mark an order as paid only after verified gateway confirmation.
5. After payment is verified, show the booking reference and provide WhatsApp confirmation. Do not rely solely on a success-page redirect as proof of payment.
6. WhatsApp confirmation should include booking ID, service, delivery method, amount paid, appointment/next steps, and support contact.
7. For custom requests and unconfirmed home-visit availability, do not charge until the scope, availability, and total price have been confirmed.
8. Provide clear cancellation, rescheduling, refund, privacy, and terms pages.

### Service detail pages
Each service page should include:
- What the service solves
- What is included and excluded
- Remote starting price (minimum ₹500)
- Home-visit option and extra ₹1,000 charge, subject to availability
- Estimated duration, clearly marked as an estimate
- What the customer must provide
- How booking and payment work
- FAQs
- A clear Book Now or Request a Quote action

Do not invent guaranteed outcomes, qualifications, reviews, customer counts, or service coverage.

### Design and accessibility
- Reuse the existing visual design and components.
- Make the service directory mobile-first and fast.
- Use plain language rather than technical jargon.
- Provide accessible labels, keyboard navigation, readable contrast, and clear validation errors.
- Add search/filter by category or problem if useful, without making the page crowded.
- Avoid unnecessary animations and large images that slow the website.

### Security and operational requirements
- Preserve current website functionality and existing data.
- Validate and sanitize inputs on the server.
- Protect uploaded files and restrict access; specify file types/limits and a retention/deletion policy.
- Do not expose payment secrets or private API keys in frontend code.
- Get explicit consent before remote access; customers must retain control and enter their own sensitive credentials.
- For Windows activation, provide genuine-license troubleshooting only; do not offer activation bypasses.
- For Google Business Profile, SEO, and technical repairs, do not guarantee outcomes.
- For deadline work, confirm feasibility and deliverables before accepting payment.
- For academic work, offer tutoring, feedback, formatting, and guidance rather than completing work dishonestly on a customer's behalf.
- Record booking status clearly: Request Received, Quote Sent, Awaiting Payment, Paid, Scheduled, In Progress, Completed, Cancelled, or Refunded.

### Required deliverables
1. Update the existing website rather than creating a disconnected duplicate site.
2. Provide the final service/category data in a maintainable structure (CMS/database/config, as appropriate for the existing stack).
3. Implement pricing logic for the ₹500 minimum and ₹1,000 home-visit surcharge on both frontend and backend.
4. Implement the custom-request workflow, checkout verification, and WhatsApp confirmation.
5. Test on mobile and desktop, including remote and home-visit totals, invalid prices, payment failures, duplicate webhooks, unavailable home-visit areas, and custom quotes.
6. Summarize files/components changed, setup steps, environment variables needed, and any tasks that still require manual gateway/WhatsApp account configuration.

Before coding, inspect the current project and adapt this plan to its existing stack. Do not replace working integrations or invent credentials.

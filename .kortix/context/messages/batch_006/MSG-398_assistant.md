# MSG-398 [ASSISTANT]
Archived: 2026-03-27T17:34:34.729241+00:00

---

I see! You already have your PayPal Client ID. You need to replace `YOUR_PAYPAL_CLIENT_ID` with your actual ID.

**In your payment.html file, replace this line:**

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
```

**With your actual Client ID (from your screenshot):**

```html
<script src="https://www.paypal.com/sdk/js?client-id=AWZzWnuVoRvMPg1USGx8qayGnR0VNISe65kdIskc6iLg9lx9_l9O0AsF0IL_Wn6_G6SfL4J6rrAiBFJL&currency=USD"></script>
```

**Steps:**
1. Open `payment.html`
2. Find line 177 (where it says `YOUR_PAYPAL_CLIENT_ID`)
3. Replace with: `AWZzWnuVoRvMPg1USGx8qayGnR0VNISe65kdIskc6iLg9lx9_l9O0AsF0IL_Wn6_G6SfL4J6rrAiBFJL`
4. Save the file

**Then test it:**
- Open payment.html
- Select a plan
- Click PayPal button
- It should open PayPal checkout

**Important:** You're in "Sandbox mode" (testing), so use PayPal test credentials, not real money. Once ready for real payments, you'll switch to "Live mode."

Need help with anything else?
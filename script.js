const $ = (id) => document.getElementById(id);

const sample = {
  businessName: 'Tasty Bowl Abuja',
  businessType: 'food vendor',
  offers: 'Party jollof pack - ₦2,500\nChicken rice bowl - ₦4,000\nOffice lunch bundle - ₦18,000 for 5 packs',
  faqs: 'Do you deliver? Yes, within Abuja. Delivery fee depends on location.\nCan I pay on delivery? No, transfer before dispatch.\nHow long does delivery take? Usually 45-90 minutes depending on distance.',
  orderFields: 'name, location, order, quantity, delivery time, payment proof',
  handoff: 'WhatsApp/call 08000000000 for final confirmation'
};

function lines(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function value(id, fallback) {
  return ($(id).value || fallback).trim();
}

function buildFlow(data) {
  const offers = lines(data.offers);
  const faqs = lines(data.faqs);
  const orderFields = data.orderFields || 'name, location, order, quantity, delivery time';
  const handoff = data.handoff || 'the business owner';

  return `WHATSAPP SALES ASSISTANT DEMO FOR ${data.businessName.toUpperCase()}

POSITIONING MESSAGE TO CLIENT
Hi, I made a quick WhatsApp assistant demo for ${data.businessName}. It can welcome customers, answer common questions, collect order details, and hand serious buyers over to you.

This is the starter flow. If you like it, I can set it up properly today.

CUSTOMER WELCOME MESSAGE
Hi 👋 Welcome to ${data.businessName}. I can help you with prices, availability, delivery, and orders.

What would you like to do?
1. See products/services
2. Ask a question
3. Place an order
4. Speak to someone

PRODUCT / SERVICE MENU
${offers.length ? offers.map((offer, i) => `${i + 1}. ${offer}`).join('\n') : 'Add product/service list here.'}

FAQ REPLIES
${faqs.length ? faqs.map((faq, i) => `${i + 1}. ${faq}`).join('\n') : 'Add FAQs here.'}

ORDER COLLECTION FLOW
Great. To process your order, please send:
${orderFields.split(',').map((field) => `- ${field.trim()}`).join('\n')}

After you send these details, I’ll confirm availability and total cost.

QUALIFY SERIOUS BUYERS
Before I hand this over, quick check:
- Are you ready to order today?
- What is your budget/range?
- What time do you need it?

OWNER HANDOFF
Thanks. I’ve collected the details. ${handoff} will confirm your order shortly.

OBJECTION HANDLERS
Customer: Is this a bot?
Reply: It’s an assistant for fast replies. A real person still confirms important details.

Customer: Can I talk to someone?
Reply: Yes. Send “human” and I’ll pass you to the owner.

Customer: Is there a discount?
Reply: Discounts depend on quantity/package. What quantity are you ordering?

WHATSAPP BUSINESS QUICK REPLIES TO CREATE
/welcome - Welcome message + menu
/menu - Product/service list
/order - Order collection flow
/delivery - Delivery answer
/payment - Payment instruction
/human - Owner handoff

PRICE TO QUOTE CLIENT
Starter: ₦15k — FAQ + quick replies + basic setup
Standard: ₦35k — order collection + lead qualification + handoff
Urgent/Premium: ₦60k+ — same-day full setup + custom tone + product cleanup

CLOSE MESSAGE
If this looks useful, send me your final product list, FAQs, prices, and order process. I’ll set it up today.`;
}

function generate() {
  const data = {
    businessName: value('businessName', 'Your Business'),
    businessType: value('businessType', 'small business'),
    offers: value('offers', ''),
    faqs: value('faqs', ''),
    orderFields: value('orderFields', 'name, location, order, quantity, delivery time'),
    handoff: value('handoff', 'the owner')
  };
  $('output').textContent = buildFlow(data);
  localStorage.setItem('wa-sales-assistant-draft', JSON.stringify(data));
}

function loadData(data) {
  Object.entries(data).forEach(([key, val]) => {
    if ($(key)) $(key).value = val;
  });
  generate();
}

$('generate').addEventListener('click', generate);
$('loadSample').addEventListener('click', () => loadData(sample));
$('copyAll').addEventListener('click', async () => {
  const text = $('output').textContent;
  await navigator.clipboard.writeText(text);
  $('copyAll').textContent = 'Copied';
  setTimeout(() => $('copyAll').textContent = 'Copy all', 1200);
});

const saved = localStorage.getItem('wa-sales-assistant-draft');
if (saved) {
  try { loadData(JSON.parse(saved)); } catch { /* ignore bad localStorage */ }
}

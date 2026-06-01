const flows = {
  food: {
    title: 'Food Vendor Assistant',
    intro: 'Hi 👋 Welcome to Tasty Trays. I can help you check today’s menu, place an order, or confirm delivery.',
    benefits: [
      'Shows menu and prices without waiting for the owner',
      'Collects name, location, delivery time, and order quantity',
      'Handles delivery and payment questions before human handoff'
    ],
    replies: [
      { label: 'What is available today?', answer: 'Today we have jollof rice bowls ₦2,500, small chops trays from ₦8,000, grilled chicken ₦3,500, and zobo ₦800. What would you like?' },
      { label: 'I want to order small chops', answer: 'Great choice. Please send: tray size, quantity, delivery area, preferred time, and your name. I’ll calculate the total and reserve it.' },
      { label: 'How much is delivery?', answer: 'Delivery depends on location. Mainland starts from ₦1,500 and Island starts from ₦2,500. Send your area so we can confirm the exact fee.' },
      { label: 'Can I pay on delivery?', answer: 'Orders are confirmed after 70% payment. I can send account details now, then a team member will confirm your delivery slot.' }
    ]
  },
  fashion: {
    title: 'Thrift/Fashion Assistant',
    intro: 'Welcome to StyleRack 👗 I can help you find sizes, prices, delivery options, and payment steps.',
    benefits: ['Answers size, condition, and availability questions quickly', 'Collects item code, size, name, phone, and delivery details', 'Reduces repeated DMs from Instagram and Facebook shoppers'],
    replies: [
      { label: 'Do you have size 10 gowns?', answer: 'Yes. Available size 10 gowns include: floral midi ₦7,500, black bodycon ₦6,000, and office wrap dress ₦8,500. Want photos or item codes?' },
      { label: 'Is this item still available?', answer: 'Please send the item code or screenshot. I’ll check availability and hold it for 30 minutes while you make payment.' },
      { label: 'How do I order?', answer: 'Send item code, size, full name, phone number, and delivery address. We’ll confirm the total plus delivery and send payment details.' },
      { label: 'Can I return it?', answer: 'Thrift items are final sale after inspection, but we share clear photos/videos before payment. Exchanges are only available for wrong item delivery.' }
    ]
  },
  beauty: {
    title: 'Beauty/Service Assistant',
    intro: 'Hi beautiful ✨ Welcome to Glow Studio. I can help with prices, available slots, booking rules, and aftercare.',
    benefits: ['Shares service prices and booking requirements automatically', 'Collects preferred date, time, service, name, and deposit proof', 'Sets expectations for lateness, cancellation, and aftercare'],
    replies: [
      { label: 'How much for makeup?', answer: 'Soft glam is ₦18,000, bridal trial is ₦35,000, and full bridal starts from ₦120,000. What date do you need the service?' },
      { label: 'Are you available Saturday?', answer: 'Please send the Saturday date, preferred time, location, and service type. I’ll check open slots and confirm the booking deposit.' },
      { label: 'How do I book?', answer: 'To book, send your name, service, date, time, location, and pay a 50% deposit. Balance is paid on arrival or before service starts.' },
      { label: 'What should I do before appointment?', answer: 'Please arrive with a clean face, avoid heavy oils, and come 10 minutes early. Late arrival over 20 minutes may shorten your session.' }
    ]
  }
};

const $ = (id) => document.getElementById(id);
const chatWindow = $('chatWindow');
const quickReplies = $('quickReplies');
const flowTitle = $('flowTitle');
const flowBenefits = $('flowBenefits');
const tabs = document.querySelectorAll('.tab');
let activeFlow = 'food';

const sample = {
  businessName: 'Tasty Bowl Abuja',
  businessType: 'food vendor',
  offers: 'Party jollof pack - ₦2,500\nChicken rice bowl - ₦4,000\nOffice lunch bundle - ₦18,000 for 5 packs',
  faqs: 'Do you deliver? Yes, within Abuja. Delivery fee depends on location.\nCan I pay on delivery? No, transfer before dispatch.\nHow long does delivery take? Usually 45-90 minutes depending on distance.',
  orderFields: 'name, location, order, quantity, delivery time, payment proof',
  handoff: 'WhatsApp/call 08000000000 for final confirmation'
};

function bubble(text, type) {
  const node = document.createElement('p');
  node.className = `bubble ${type}`;
  node.textContent = text;
  return node;
}

function renderFlow(flowKey) {
  activeFlow = flowKey;
  const flow = flows[flowKey];
  flowTitle.textContent = flow.title;
  chatWindow.innerHTML = '';
  chatWindow.appendChild(bubble(flow.intro, 'bot'));
  quickReplies.innerHTML = '';
  flow.replies.forEach((reply) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = reply.label;
    button.addEventListener('click', () => addExchange(reply.label, reply.answer));
    quickReplies.appendChild(button);
  });
  flowBenefits.innerHTML = '';
  flow.benefits.forEach((benefit) => {
    const li = document.createElement('li');
    li.textContent = benefit;
    flowBenefits.appendChild(li);
  });
  tabs.forEach((tab) => {
    const isActive = tab.dataset.flow === flowKey;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
}

function addExchange(question, answer) {
  chatWindow.appendChild(bubble(question, 'user'));
  setTimeout(() => {
    chatWindow.appendChild(bubble(answer, 'bot'));
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 180);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function lines(text) {
  return String(text || '').split('\n').map((line) => line.trim()).filter(Boolean);
}

function value(id, fallback) {
  return ($(id).value || fallback).trim();
}

function buildFlow(data) {
  const offers = lines(data.offers);
  const faqs = lines(data.faqs);
  const orderFields = data.orderFields || 'name, location, order, quantity, delivery time';
  const handoff = data.handoff || 'the business owner';

  return `WHATSAPP SALES ASSISTANT DEMO FOR ${data.businessName.toUpperCase()}\n\nPOSITIONING MESSAGE TO CLIENT\nHi, I made a quick WhatsApp assistant demo for ${data.businessName}. It can welcome customers, answer common questions, collect order details, and hand serious buyers over to you.\n\nCUSTOMER WELCOME MESSAGE\nHi 👋 Welcome to ${data.businessName}. I can help you with prices, availability, delivery, and orders.\n\nWhat would you like to do?\n1. See products/services\n2. Ask a question\n3. Place an order\n4. Speak to someone\n\nPRODUCT / SERVICE MENU\n${offers.length ? offers.map((offer, i) => `${i + 1}. ${offer}`).join('\n') : 'Add product/service list here.'}\n\nFAQ REPLIES\n${faqs.length ? faqs.map((faq, i) => `${i + 1}. ${faq}`).join('\n') : 'Add FAQs here.'}\n\nORDER COLLECTION FLOW\nGreat. To process your order, please send:\n${orderFields.split(',').map((field) => `- ${field.trim()}`).join('\n')}\n\nAfter you send these details, I’ll confirm availability and total cost.\n\nQUALIFY SERIOUS BUYERS\nBefore I hand this over, quick check:\n- Are you ready to order today?\n- What is your budget/range?\n- What time do you need it?\n\nOWNER HANDOFF\nThanks. I’ve collected the details. ${handoff} will confirm your order shortly.\n\nOBJECTION HANDLERS\nCustomer: Is this a bot?\nReply: It’s an assistant for fast replies. A real person still confirms important details.\n\nCustomer: Can I talk to someone?\nReply: Yes. Send “human” and I’ll pass you to the owner.\n\nCustomer: Is there a discount?\nReply: Discounts depend on quantity/package. What quantity are you ordering?\n\nWHATSAPP BUSINESS QUICK REPLIES TO CREATE\n/welcome - Welcome message + menu\n/menu - Product/service list\n/order - Order collection flow\n/delivery - Delivery answer\n/payment - Payment instruction\n/human - Owner handoff\n\nPRICE TO QUOTE CLIENT\nStarter: ₦15k — FAQ + quick replies + basic setup\nStandard: ₦35k — order collection + lead qualification + handoff\nUrgent/Premium: ₦60k+ — same-day full setup + custom tone + product cleanup\n\nCLOSE MESSAGE\nIf this looks useful, send me your final product list, FAQs, prices, and order process. I’ll set it up today.`;
}

let activeEditorTab = 'all';

function getFilteredText(fullText, tab) {
  if (tab === 'all') return fullText;
  
  const sections = fullText.split('\n\n');
  if (tab === 'pitch') {
    const pitchParts = sections.filter(sec => 
      sec.includes('WHATSAPP SALES ASSISTANT DEMO') ||
      sec.includes('POSITIONING MESSAGE') ||
      sec.includes('PRICE TO QUOTE') ||
      sec.includes('CLOSE MESSAGE')
    );
    return pitchParts.join('\n\n');
  }
  
  if (tab === 'replies') {
    const replyParts = sections.filter(sec => 
      sec.includes('CUSTOMER WELCOME MESSAGE') ||
      sec.includes('PRODUCT / SERVICE MENU') ||
      sec.includes('FAQ REPLIES') ||
      sec.includes('ORDER COLLECTION FLOW') ||
      sec.includes('QUALIFY SERIOUS BUYERS') ||
      sec.includes('OWNER HANDOFF') ||
      sec.includes('OBJECTION HANDLERS') ||
      sec.includes('QUICK REPLIES TO CREATE')
    );
    return replyParts.join('\n\n');
  }
  
  return fullText;
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
  const fullText = buildFlow(data);
  $('output').textContent = getFilteredText(fullText, activeEditorTab);
  localStorage.setItem('wa-sales-assistant-draft', JSON.stringify(data));
}

function loadData(data) {
  Object.entries(data).forEach(([key, val]) => {
    if ($(key)) $(key).value = val;
  });
  generate();
}

tabs.forEach((tab) => tab.addEventListener('click', () => renderFlow(tab.dataset.flow)));
$('generate').addEventListener('click', generate);
$('loadSample').addEventListener('click', () => loadData(sample));
$('copyAll').addEventListener('click', async () => {
  const text = $('output').textContent;
  await navigator.clipboard.writeText(text);
  $('copyAll').textContent = 'Copied';
  setTimeout(() => $('copyAll').textContent = 'Copy all', 1200);
});

// Setup Editor mockup tabs
const editorTabs = document.querySelectorAll('.editor-tab');
editorTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    editorTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeEditorTab = tab.dataset.tab;
    generate();
  });
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    const text = source ? source.textContent.trim() : '';
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      button.classList.add('copied');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Select text';
    }
    setTimeout(() => {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 1600);
  });
});

// Keyboard shortcuts for elite builder user experience
// Alt+M -> Focus offers, Alt+F -> Focus FAQs, Alt+G -> Generate flow
window.addEventListener('keydown', (e) => {
  if (e.altKey) {
    if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      const offersInput = $('offers');
      if (offersInput) {
        offersInput.focus();
      }
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      const faqsInput = $('faqs');
      if (faqsInput) {
        faqsInput.focus();
      }
    } else if (e.key.toLowerCase() === 'g') {
      e.preventDefault();
      generate();
    }
  }
});

// Dynamic typing engine for hero phone simulator
let heroChatTimeout;
function startHeroChatSimulation() {
  const container = document.querySelector('.phone-card .mini-chat');
  if (!container) return;
  
  clearTimeout(heroChatTimeout);
  container.innerHTML = '';
  
  const script = [
    { sender: 'bot', text: 'Hi 👋 Welcome to Tasty Trays. What would you like to order today?' },
    { sender: 'user', text: 'Do you have small chops trays?' },
    { sender: 'bot', text: 'Yes! Small tray is ₦8,000 and serves 4-6 people. Should I reserve one for today?' },
    { sender: 'user', text: 'Yes, please reserve one!' },
    { sender: 'bot', text: 'Perfect! Send your name and delivery area to confirm.' }
  ];
  
  let i = 0;
  
  function next() {
    if (i >= script.length) {
      heroChatTimeout = setTimeout(startHeroChatSimulation, 8000);
      return;
    }
    
    const message = script[i];
    i++;
    
    if (message.sender === 'bot') {
      const typing = document.createElement('p');
      typing.className = 'bubble bot typing-indicator';
      typing.innerHTML = '<span class="dot-typing"></span><span class="dot-typing"></span><span class="dot-typing"></span>';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;
      
      heroChatTimeout = setTimeout(() => {
        typing.remove();
        container.appendChild(bubble(message.text, 'bot'));
        container.scrollTop = container.scrollHeight;
        heroChatTimeout = setTimeout(next, 2000);
      }, 1200);
    } else {
      heroChatTimeout = setTimeout(() => {
        container.appendChild(bubble(message.text, 'user'));
        container.scrollTop = container.scrollHeight;
        heroChatTimeout = setTimeout(next, 1500);
      }, 1000);
    }
  }
  
  next();
}

const saved = localStorage.getItem('wa-sales-assistant-draft');
if (saved) {
  try { loadData(JSON.parse(saved)); } catch { renderFlow(activeFlow); }
}
renderFlow(activeFlow);
startHeroChatSimulation();


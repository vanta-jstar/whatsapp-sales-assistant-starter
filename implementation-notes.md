# Implementation Notes

## V1 reality

This MVP is a demo and script generator. It does not need real AI to close the first clients.

The first sale is not “AI automation.” The first sale is:

“I made your WhatsApp reply faster and more professionally so you stop losing buyers.”

## Manual setup path

Use WhatsApp Business:

1. Install/open WhatsApp Business.
2. Go to Business Tools.
3. Set greeting message.
4. Set away message.
5. Add quick replies:
   - /welcome
   - /menu
   - /order
   - /delivery
   - /payment
   - /human
6. Test with someone from another phone.
7. Send client proof.

## Future automation path

When there is paid demand:

- Backend: Node/Express or FastAPI
- Storage: Google Sheets or Airtable first
- Messaging: WhatsApp Cloud API, Twilio, WATI, Termii, or 360dialog
- AI: small FAQ RAG prompt with strict handoff rules
- Safety: never confirm payment without owner/bank verification

## Safety rules

- Do not claim payment is confirmed unless the owner confirms.
- Do not promise delivery times beyond the owner’s actual capacity.
- Always allow “human” handoff.
- Do not store customer data anywhere sketchy.

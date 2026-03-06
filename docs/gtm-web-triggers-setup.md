# GTM Setup: Page View + SPA Events (Consent Mode v2)

This project already emits the following `dataLayer` events from frontend:

- `page_view`
- `scroll_depth`
- `form_submit`
- `whatsapp_click`
- `click_cta`
- `consent_update`

Use this document to configure GTM Web container without event duplication.

## 1) Trigger Priority

Use GTM trigger precedence in this order:

1. `Consent Initialization - All Pages` (default trigger in GTM)
2. `Initialization - All Pages` (only if needed for early technical tags)
3. Business events (custom event triggers listed below)

## 2) Custom Event Triggers

Create these triggers:

- `CE - page_view` -> Custom Event name: `page_view`
- `CE - scroll_depth` -> Custom Event name: `scroll_depth`
- `CE - form_submit` -> Custom Event name: `form_submit`
- `CE - whatsapp_click` -> Custom Event name: `whatsapp_click`
- `CE - click_cta` -> Custom Event name: `click_cta`

Optional filters (`Some Custom Events`):

- `page_path contains /servicios` for service-specific conversion tags.
- Keep `page_view` global (no filter).

## 3) Data Layer Variables

Create Data Layer Variables:

- `DLV - page_path` (`page_path`)
- `DLV - page_title` (`page_title`)
- `DLV - previous_path` (`previous_path`)
- `DLV - referrer` (`referrer`)
- `DLV - percent` (`percent`)
- `DLV - form_name` (`form_name`)
- `DLV - lead_type` (`lead_type`)
- `DLV - placement` (`placement`)
- `DLV - button_name` (`button_name`)
- `DLV - section` (`section`)

## 4) GA4 Tags

### 4.1 GA4 Configuration

- Tag name: `GA4 - Configuration`
- Trigger: `All Pages`
- Measurement ID: your GA4 stream
- Set field: `send_page_view = false`
- Consent checks: `analytics_storage`

### 4.2 GA4 Event Tags

Create one GA4 Event tag per custom event:

1. `GA4 - Event - page_view`
   - Trigger: `CE - page_view`
   - Event name: `page_view`
   - Params: `page_path`, `page_title`, `previous_path`, `referrer`

2. `GA4 - Event - scroll_depth`
   - Trigger: `CE - scroll_depth`
   - Event name: `scroll_depth`
   - Params: `percent`, `page_path`

3. `GA4 - Event - form_submit`
   - Trigger: `CE - form_submit`
   - Event name: `form_submit`
   - Params: `form_name`, `lead_type`, `page_path`

4. `GA4 - Event - whatsapp_click`
   - Trigger: `CE - whatsapp_click`
   - Event name: `whatsapp_click`
   - Params: `placement`, `page_path`

5. `GA4 - Event - click_cta`
   - Trigger: `CE - click_cta`
   - Event name: `click_cta`
   - Params: `button_name`, `section`, `page_path`

## 5) Meta Pixel / Clarity in GTM

If configured via GTM, reuse the same custom event triggers for consistency.

- Meta tags should respect ad-related consent.
- Clarity should respect analytics consent.

## 6) Validation Checklist (Before Publish)

1. GTM Preview:
   - Consent defaults fire first.
   - `page_view` fires once per SPA navigation.
2. No duplicate pageviews:
   - `GA4 - Configuration` has `send_page_view=false`.
3. Scroll:
   - `scroll_depth` appears at 25/50/75/90 once per route.
4. Conversions:
   - Contact form -> `form_submit`
   - WhatsApp floating button -> `whatsapp_click`
   - CTA buttons -> `click_cta`
5. Consent behavior:
   - With denied analytics consent, GA4 events are blocked.
   - After acceptance, events flow normally.

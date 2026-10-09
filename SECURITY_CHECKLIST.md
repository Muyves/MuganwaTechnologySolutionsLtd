# Enterprise Security Hardening & Testing Checklist

**System**: Muganwa Technology Solutions Ltd (MTS)  
**Security Officer**: MUKIZA Richard (Managing Director & Systems Architect)  
**Classification**: Enterprise Physical & Electronic Security Systems Platform

---

## 1. Web Application Hardening Checklist

### HTTP Security Headers
- [x] **Strict-Transport-Security (HSTS)**: `max-age=63072000; includeSubDomains; preload` configured in `next.config.js`.
- [x] **Content-Security-Policy (CSP)**: Restricts script execution to `'self'`, prevents unauthorized external scripts or cross-site inline injections.
- [x] **X-Frame-Options: DENY**: Prevents Clickjacking attacks by forbidding iframe embedding on third-party domains.
- [x] **X-Content-Type-Options: nosniff**: Mitigates MIME type confusion and malicious file downloads.
- [x] **Referrer-Policy: strict-origin-when-cross-origin**: Prevents URL leaking of internal parameters across external referrers.
- [x] **Permissions-Policy**: Explicitly disables unauthorized microphone, camera, and peripheral sensor access by default.

---

## 2. Authentication & Administrative Access Control

- [x] **Multi-Factor Authentication (2FA)**: Mandatory 6-digit Authenticator verification token implemented on `/admin/login` for **MUKIZA Richard**.
- [x] **Role-Based Access Control (RBAC)**: Segregated roles (`ADMIN`, `TECHNICIAN`, `CUSTOMER`) protecting administrative functions, stock modifications, and quote reviews.
- [x] **Brute-Force & Rate Limiting**: Logging of unauthorized or consecutive failed login attempts into the cryptographic audit log.
- [x] **Session Invalidation**: Immediate session clearance upon logout.

---

## 3. Input Sanitization & Injection Prevention

- [x] **SQL Injection (SQLi)**: Parametrized queries and object mapping through Prisma ORM and structured typed storage. Zero raw string concatenation in SQL queries.
- [x] **Cross-Site Scripting (XSS)**: React JSX auto-escaping of all user-supplied data in quote details, contact messages, and customer names.
- [x] **Cross-Site Request Forgery (CSRF)**: SameSite cookie flags and JSON POST body validation on all mutating API endpoints (`/api/*`).
- [x] **Safe File Uploads**: Client-side and server-side file type whitelisting (`image/jpeg`, `image/png`, `application/pdf`) and size capping (25MB) on quote requests.

---

## 4. Payment & Financial Data Integrity

- [x] **Zero Plain-Text Card Storage**: Raw credit card numbers and CVV codes are never stored in databases. Handled exclusively through tokenized PCI-DSS Level 1 payment processors.
- [x] **Mobile Money (MoMo) Safety**: Cryptographic push prompts requiring manual PIN authentication on the client's registered handset.
- [x] **Audited Invoices**: Immutable, timestamped invoice receipts generated with unique tracking numbers (`MTS-2026-XXXX`).

---

## 5. Security Audit Logging & Telemetry

- [x] **Cryptographic Audit Trail**: Immutable logging of administrative logins, product additions, stock count alterations, order status updates, and failed login attempts.
- [x] **IP Address & Actor Telemetry**: Logs record client IP, actor identity, action type, and status (`SUCCESS`, `WARNING`, `ALERT`).
- [x] **1-Click Encrypted Database Backup**: Super Admin export functionality enabling off-site disaster recovery backups.

---

## 6. Pre-Launch Testing & Verification Steps

Execute before public launch:

```bash
# 1. Automated code compilation & type check
npm run build

# 2. Verify security response headers
curl -I https://muganwatech.rw

# 3. Test rate limiting / spam prevention on forms
# Submit consecutive requests to /api/quotes to verify log generation

# 4. Verify admin 2FA challenge flow
# Navigate to /admin/login, verify credentials, enter 2FA token
```

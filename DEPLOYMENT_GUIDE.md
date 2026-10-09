# Deployment & Hosting Guide: Muganwa Technology Solutions Ltd

This guide details how to deploy the **Muganwa Technology Solutions Ltd** platform to production environments with custom domain configuration, automated SSL/TLS certificates, reverse proxy caching, and enterprise PostgreSQL database connectivity.

---

## 1. Production Architecture Overview

The system can be deployed in two primary production topologies:
- **Option A: Vercel / Cloudflare Edge (Recommended for high performance, automatic SSL & global CDN)**
- **Option B: Ubuntu Linux VPS (Dedicated server with Nginx, PM2, and Let's Encrypt SSL)**

---

## 2. Option A: Deployment on Vercel (Fastest & Zero Maintenance)

Next.js is natively optimized for Vercel, providing instant worldwide edge caching, DDoS mitigation, and automatic SSL renewal.

### Steps:
1. **Push Code to Git**:
   Push the project repository to GitHub, GitLab, or Bitbucket.
   ```bash
   git init
   git add .
   git commit -m "feat: initial Muganwa Technology Solutions platform"
   git branch -M main
   git remote add origin https://github.com/your-org/muganwa-tech-solutions.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New Project** and import the repository.
   - The Framework Preset will automatically detect **Next.js**.
   - Set Build Command: `npm run build`
   - Set Output Directory: `.next`

3. **Configure Environment Variables (Optional for External PostgreSQL)**:
   If connecting to an external PostgreSQL database (e.g. Supabase, Neon, AWS RDS):
   ```env
   DATABASE_URL="postgresql://postgres:YourSecurePassword@db.muganwatech.rw:5432/mts_security_db?schema=public"
   NEXT_PUBLIC_APP_URL="https://muganwatech.rw"
   ADMIN_EMAIL="richard.mukiza@muganwatech.rw"
   ```

4. **Click Deploy**:
   Vercel compiles the project, generates static pages, and provisions serverless API routes.

---

## 3. Option B: Self-Hosted Deployment on Ubuntu Linux VPS

For organizations requiring full on-premise or cloud VPS control (e.g. AWS EC2, DigitalOcean, Hetzner, or local data centers in Rwanda):

### Prerequisites on Ubuntu 22.04 / 24.04 LTS:
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS / 22 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx

# Install PM2 Process Manager globally
sudo npm install -g pm2
```

### Application Setup:
```bash
# Clone repository to /var/www
sudo mkdir -p /var/www/muganwa-tech
sudo chown -R $USER:$USER /var/www/muganwa-tech
cd /var/www/muganwa-tech
git clone https://github.com/your-org/muganwa-tech-solutions.git .

# Install dependencies and build production artifacts
npm install --production=false
npm run build

# Start application using PM2
pm2 start npm --name "muganwa-platform" -- start
pm2 startup
pm2 save
```

---

## 4. Domain & DNS Configuration

Configure the following DNS records at your domain registrar (e.g. RICTA (.rw registrar), Cloudflare, GoDaddy, or Namecheap):

| Type | Host | Value / Target | TTL | Description |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (apex) | `YOUR_SERVER_IP` (or `76.76.21.21` for Vercel) | 3600 | Points `muganwatech.rw` to application |
| **CNAME** | `www` | `muganwatech.rw` (or `cname.vercel-dns.com`) | 3600 | Canonical alias |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | 3600 | Email security / anti-spoofing |
| **CAA** | `@` | `0 issue "letsencrypt.org"` | 3600 | Restricts SSL certificate authorities |

---

## 5. Nginx Reverse Proxy Configuration & SSL (HTTPS)

Create `/etc/nginx/sites-available/muganwatech.rw`:

```nginx
server {
    server_name muganwatech.rw www.muganwatech.rw;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for heavy file uploads (site blueprints)
        client_max_body_size 50M;
        proxy_read_timeout 90;
    }

    # Cache static Next.js assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/muganwatech.rw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Issue Free Let's Encrypt SSL/TLS Certificate:
```bash
sudo certbot --nginx -d muganwatech.rw -d www.muganwatech.rw
```
Certbot will configure SSL renewal crons automatically.

---

## 6. PostgreSQL Database Migration (Prisma)

To migrate from the local JSON store to a production PostgreSQL database:
1. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://db_user:db_password@localhost:5432/muganwa_db?schema=public"
   ```
2. Generate Prisma client & apply migrations:
   ```bash
   npx prisma db push
   ```
3. Your database is now synchronized with all tables and relations!

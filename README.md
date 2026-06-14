## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/neon-forge-porfolio
cd neon-forge-portfolio
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## ☁️ Deployment

### Docker + Nginx (VPS)

Project includes production-ready Docker + Nginx config:

- `Dockerfile` (multi-stage build with Next.js standalone output)
- `docker-compose.yml` (runs app + Nginx reverse proxy)
- `nginx/conf.d/default.conf` (proxy traffic from port 80 to Next.js app)

Run on server:

```bash
cp .env.example .env
# update values in .env

docker compose up -d --build
```

Check status/logs:

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f nginx
```

Stop:

```bash
docker compose down
```

For SSL in production, put Cloudflare or Certbot in front of Nginx and add an HTTPS server block.

---

## 🎨 Customization

You can easily customize:

- Personal Information
- Projects
- Skills
- Experience
- Social Links
- Theme Colors
- SEO Metadata

All content can be modified directly from the source code.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you find this project useful:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🔀 Submit a pull request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ☕ Support

If you find this project helpful and would like to support me, consider buying me a coffee. Every contribution is greatly appreciated!

<a href="https://www.buymeacoffee.com/truongnh9x" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>

---

## 📬 Contact

Truong Nguyen - NGUYỄN HỮU TRƯỜNG

I'm always looking for interesting people to collaborate with and new ideas to explore. Feel free to reach out!
<br />

<p align="center">
  <a href="mailto:truongnh2711@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>

  <a href="https://github.com/huutruong2304">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>

  <a href="https://www.linkedin.com/in/truongnh9x/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>

  <a href="https://www.youtube.com/@Truongnh9x">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  </a>
</p>

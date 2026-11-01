/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // GSAP + StrictMode causa dupla execução que esconde texto
  images: { unoptimized: true },
  async rewrites() {
    // CRM interno da equipe: tiagobaterias.com.br/crm
    return [{ source: '/crm', destination: '/crm.html' }]
  },
  async headers() {
    return [
      { source: '/crm', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/crm.html', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ]
  },
}

module.exports = nextConfig

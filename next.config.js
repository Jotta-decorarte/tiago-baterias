/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // GSAP + StrictMode causa dupla execução que esconde texto
  images: { unoptimized: true },
}

module.exports = nextConfig

const nextConfig = {
  reactStrictMode: false, // ⬅️ ВАЖНО: отключили Strict Mode
  experimental: {
    turbo: { enabled: true },
  },
  sassOptions: {
    additionalData: `@use "@/app/styles/variables" as *;`,
  },
};

module.exports = nextConfig;

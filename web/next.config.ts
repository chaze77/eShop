const nextConfig = {
  experimental: {
    turbo: { enabled: false },
  },
  sassOptions: {
    additionalData: `@use "@/app/styles/variables" as *;`,
  },
};

module.exports = nextConfig;

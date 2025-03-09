import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public", // Where to generate service worker files
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate new service worker immediately
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);

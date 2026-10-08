import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Old service URLs → New B2B service URLs
      {
        source: "/services/Creative-Design",
        destination: "/services/web-app-development",
        permanent: true,
      },
      {
        source: "/services/Web-Development-Solutions",
        destination: "/services/web-app-development",
        permanent: true,
      },
      {
        source: "/services/App-Development-Solutions",
        destination: "/services/flutter-mobile-apps",
        permanent: true,
      },
      {
        source: "/services/Digital-Marketing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/Game-Development",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/Cloud-Computing-Services",
        destination: "/services/backend-api-cloud",
        permanent: true,
      },
      // Old company page
      {
        source: "/company",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/whychooseus",
        destination: "/#why-devsinn",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

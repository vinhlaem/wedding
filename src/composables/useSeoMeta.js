const DEFAULT_SITE_URL = "https://wedding-vinh-nguyet.vercel.app";
const DEFAULT_IMAGE = "/og.jpg";

const getSiteUrl = () => {
  if (import.meta.env.VITE_SITE_URL) return import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location.origin) return window.location.origin;
  return DEFAULT_SITE_URL;
};

const absoluteUrl = (url) => {
  if (!url) return `${getSiteUrl()}${DEFAULT_IMAGE}`;
  if (/^https?:\/\//i.test(url)) return url;
  return `${getSiteUrl()}${url.startsWith("/") ? url : `/${url}`}`;
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export function useSeoMeta({ title, description, url, image = DEFAULT_IMAGE, type = "website" }) {
  if (typeof document === "undefined") return;

  const pageUrl = url || (typeof window !== "undefined" ? window.location.href : getSiteUrl());
  const imageUrl = absoluteUrl(image);

  document.title = title;
  upsertLink("canonical", pageUrl);

  upsertMeta('meta[name="description"]', { name: "description", content: description });
  upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
  upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#b94a58" });

  upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Đám cưới Vinh & Nguyệt" });
  upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "vi_VN" });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: pageUrl });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
  upsertMeta('meta[property="og:image:secure_url"]', { property: "og:image:secure_url", content: imageUrl });
  upsertMeta('meta[property="og:image:type"]', { property: "og:image:type", content: "image/jpeg" });
  upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
  upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
  upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "Thiệp cưới Vinh & Nguyệt" });

  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
}
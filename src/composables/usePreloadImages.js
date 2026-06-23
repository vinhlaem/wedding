const upsertImagePreload = ({ href, type, fetchPriority = "high" }) => {
  if (typeof document === "undefined" || !href) return;

  const selector = `link[rel="preload"][as="image"][href="${href}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "preload");
    element.setAttribute("as", "image");
    element.setAttribute("href", href);
    document.head.appendChild(element);
  }

  if (type) element.setAttribute("type", type);
  if (fetchPriority) element.setAttribute("fetchpriority", fetchPriority);
};

export function usePreloadImages(images) {
  images.forEach((image) => {
    if (typeof image === "string") {
      upsertImagePreload({ href: image });
      return;
    }

    upsertImagePreload(image);
  });
}
import { useEffect } from "react";
import { SEO_LOCALE, SEO_SITE_NAME, buildSeoUrl } from "@/lib/seo";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
};

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e8aa83e6-4a08-4db1-bd41-0150c58a98ed?Expires=1771999347&GoogleAccessId=go-api-on-aws%40gpt-engineer-390607.iam.gserviceaccount.com&Signature=Nz%2FJm8ZuFMchOyDq4e4XH1akapwMscpFG3KUWfrKWub9n90Z9E0z5MjJdd4s6vWckLXIVYGNOMbnqMwNMr7a7r9yL6Tf8WH4IXQbC00S3DPO1qgZWpKozDtNCoag8HPWEywlty6ApRlJLX4AWFw%2Bf90XuYit%2Bl83QgPPKeVGtfcwzg2OQSoJAGoRhhi0xYAgMU7vLG%2B9PDkPFj0jVAvzmUH%2B3ifJrTl14ZUeTwYxJ%2FRu7MXleKITFhJJQ9lRwGZ58QX29ZfWM8o%2FDlompTXQO71jzxSdvgaKqBiR9l6OarpsaeUckvjuAoyckZG5tZzOXGvoHiqZkBeQRQQd8LNT8Q%3D%3D";

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const SeoHead = ({ title, description, path }: SeoHeadProps) => {
  useEffect(() => {
    const canonicalUrl = buildSeoUrl(path);

    document.documentElement.setAttribute("lang", "zh-CN");
    document.title = title;

    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', "name", "description", description);

    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:locale"]', "property", "og:locale", SEO_LOCALE);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SEO_SITE_NAME);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_OG_IMAGE);

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_OG_IMAGE);
  }, [description, path, title]);

  return null;
};

export default SeoHead;

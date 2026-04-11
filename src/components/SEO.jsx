import { useEffect } from 'react';

function SEO({ seo, branding }) {
  useEffect(() => {
    if (!seo) return;

    const title = seo.title || 'Angelo Waterwitch';
    const description = seo.description || '';
    const keywords = seo.keywords || '';
    const ogImage = seo.ogImage || '';
    const twitterHandle = seo.twitterHandle || '';

    document.title = title;

    setMeta('description', description);
    setMeta('keywords', keywords);

    setOG('og:title', title);
    setOG('og:description', description);
    setOG('og:type', 'website');
    setOG('og:image', ogImage);

    setOG('twitter:card', 'summary_large_image');
    setOG('twitter:title', title);
    setOG('twitter:description', description);
    setOG('twitter:image', ogImage);
    setOG('twitter:site', twitterHandle);

  }, [seo, branding]);

  return null;
}

function setMeta(name, content) {
  let el = document.querySelector('meta[name="' + name + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOG(property, content) {
  let el = document.querySelector('meta[property="' + property + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default SEO;
import {useEffect} from 'react';

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
};

export const usePageMetadata = (title: string, description: string, path?: string) => {
    useEffect(() => {
        document.title = `${title} | The Heathens Store`;
        upsertMeta('meta[name="description"]', {name: 'description', content: description});
        upsertMeta('meta[property="og:title"]', {property: 'og:title', content: title});
        upsertMeta('meta[property="og:description"]', {property: 'og:description', content: description});
        upsertMeta('meta[property="og:type"]', {property: 'og:type', content: 'website'});

        const canonicalUrl = new URL(path ?? window.location.pathname, window.location.origin).toString();
        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;
    }, [description, path, title]);
};

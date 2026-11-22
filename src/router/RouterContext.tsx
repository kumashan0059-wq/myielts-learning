import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const APP_ROUTES = {
  home: '/',
  ielts: '/ielts',
  mockTests: '/mock-tests',
  spokenEnglish: '/spoken-english',
  globalJourney: '/global-journey',
  studyAbroad: '/study-abroad',
  visaServices: '/visa-services',
  workPermit: '/work-permit',
  about: '/about',
  contact: '/contact',
} as const;

export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

function normalizePathname(rawPath: string): string {
  const clean = rawPath.split('?')[0].split('#')[0] || '/';
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean;
}

interface RouterContextValue {
  currentPath: string;
  search: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  currentPath: '/',
  search: '',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationState, setLocationState] = useState(() => ({
    pathname: normalizePathname(window.location.pathname),
    search: window.location.search,
  }));

  useEffect(() => {
    const handlePopState = () => {
      setLocationState({
        pathname: normalizePathname(window.location.pathname),
        search: window.location.search,
      });
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPathname = normalizePathname(url.pathname);
    const nextSearch = url.search;
    const nextFull = `${nextPathname}${nextSearch}${url.hash}`;

    if (
      nextPathname !== normalizePathname(window.location.pathname) ||
      nextSearch !== window.location.search
    ) {
      window.history.pushState({}, '', nextFull);
      setLocationState({
        pathname: nextPathname,
        search: nextSearch,
      });
    }

    if (url.hash) {
      const targetId = url.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <RouterContext.Provider
      value={{
        currentPath: locationState.pathname,
        search: locationState.search,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      rest.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export function usePageSeo(options: { title: string; description: string }) {
  useEffect(() => {
    document.title = options.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', options.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', options.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', options.description);
    }
  }, [options.title, options.description]);
}

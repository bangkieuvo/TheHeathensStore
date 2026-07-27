import { useEffect, useState } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof window.setTimeout>;

    const showButtonTemporarily = () => {
      setIsVisible(true);
      window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener('wheel', showButtonTemporarily, { passive: true });
    window.addEventListener('scroll', showButtonTemporarily, { passive: true });
    window.addEventListener('touchmove', showButtonTemporarily, { passive: true });
    window.addEventListener('keydown', showButtonTemporarily);

    return () => {
      window.removeEventListener('wheel', showButtonTemporarily);
      window.removeEventListener('scroll', showButtonTemporarily);
      window.removeEventListener('touchmove', showButtonTemporarily);
      window.removeEventListener('keydown', showButtonTemporarily);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  const scrollToTop = () => {
    const scrollTargets = [
      document.scrollingElement,
      document.documentElement,
      document.body,
      document.getElementById('root'),
      document.querySelector('.animsition'),
      document.querySelector('main'),
    ].filter((target): target is Element => target !== null);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    scrollTargets.forEach((target) => {
      target?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });

    window.setTimeout(() => {
      window.scrollTo(0, 0);
      scrollTargets.forEach((target) => {
        target.scrollTop = 0;
        target.scrollLeft = 0;
      });
    }, 350);
  };

  return (
    <button
      className="btn-back-to-top"
      id="myBtn"
      type="button"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'flex' : 'none' }}
      aria-label="Back to top"
    >
      <span className="symbol-btn-back-to-top">
        <i className="zmdi zmdi-chevron-up"></i>
      </span>
    </button>
  );
};

export default BackToTopButton;


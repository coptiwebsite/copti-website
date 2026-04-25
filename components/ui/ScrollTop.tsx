import { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scrollTop"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <i className="fa fa-arrow-up" />
    </button>
  );
}

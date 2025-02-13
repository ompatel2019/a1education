import React, { useRef, useEffect, useState } from 'react';

/**
 * AnimateOnScroll Component
 * Wraps children and adds an "in-view" class once the element enters the viewport.
 *
 * @param {object} props
 * @param {string} props.className - Additional CSS classes (e.g., "fade-up fade-in").
 * @param {React.ReactNode} props.children - The content to animate.
 * @returns {JSX.Element}
 */
const AnimateOnScroll = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const combinedClassName = `${className} ${inView ? 'in-view' : ''}`.trim();

  return (
    <div ref={ref} className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;

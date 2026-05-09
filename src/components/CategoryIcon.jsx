import DOMPurify from 'dompurify';

export default function CategoryIcon({ icon, className }) {
  const sanitized = DOMPurify.sanitize(icon, {
    USE_PROFILES: { svg: true, svgFilters: true }
  });

  return (
    <span
      className={`category-icon ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
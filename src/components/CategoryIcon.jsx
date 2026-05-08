export default function CategoryIcon({ icon }) {
  return (
    <span
      className="category-icon"
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}
import { useRef, useEffect } from 'react';
import './card.css';

function Card({ label, icon, text }) {
  const pRef = useRef(null);

  useEffect(() => {
    const p = pRef.current;
    if (!p) return;

    p.style.fontSize = '';
    
    const style = window.getComputedStyle(p);
    let size = parseFloat(style.fontSize);

    while (p.scrollHeight > p.clientHeight && size > 10) {
      size -= 0.5;
      p.style.fontSize = `${size}px`;
    }
  }, [text]);

  return (
    <article className="card">
      <section className="card-txt">
        <span className="card-label">{label}</span>
        <i>{icon}</i> 
        <p ref={pRef}>{text}</p>     
      </section>
    </article>
  );
}

export default Card;
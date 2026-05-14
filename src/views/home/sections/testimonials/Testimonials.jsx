import { useEffect, useState } from 'react';
import './testimonials.css';

// Renders star rating based on rating prop, filled stars for rating value and empty stars for the rest up to 5
function StarRating({ rating }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'star star--filled' : 'star'}>★</span>
      ))}
    </div>
  );
}

// Renders a single testimonial card with name, age, rating and testimonial text
// If img is provided renders it as avatar, otherwise shows initials
function TestimonialCard({ name, age, rating, testimonial, img }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <article className="testimonial-card">
      <p className="testimonial-quote">"{testimonial}"</p>
      <div className="testimonial-footer">
        {img ? (
          <img
            src={img}
            alt={name}
            className="testimonial-avatar testimonial-avatar--img"
          />
        ) : (
          <div className="testimonial-avatar" aria-hidden="true">{initials}</div>
        )}
        <div className="testimonial-meta">
          <span className="testimonial-name">{name}</span>
          <span className="testimonial-passed">{age} år</span>
        </div>
        <StarRating rating={rating} />
      </div>
    </article>
  );
}

// Renders testimonials section with 3 random testimonials from supabase
// Shows loading spinner while fetching and error message if fetch fails
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/testimonials?select=id,name,age,review,rating,testimonial,img`, {
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(data => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setTestimonials(shuffled.slice(0, 3));
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') {
    return (
      <section className="testimonials">
        <div className="testimonials-loading">
          <div className="testimonials-spinner"/>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="testimonials">
        <p className="testimonials-error">Kunde inte ladda omdömen just nu.</p>
      </section>
    );
  }

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          Vad säger <em>våra användare</em>?
        </h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map(t => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </div>
    </section>
  );
}

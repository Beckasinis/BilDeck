import { useRef, useEffect, useState } from 'react';
import './card.css';

function Card({ question, answer, icon }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const questionRef = useRef(null);
  const answerRef = useRef(null);

  useFitText(questionRef, question);
  useFitText(answerRef, answer);

  return (
    <article className="card">
      <div
        className={`card-content ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(f => !f)}
      >
        <section className="question-side">
          <span className="card-label">FRÅGA</span>
          <i>{icon}</i>
          <p ref={questionRef}>{question}</p>
        </section>

        <section className="answer-side">
          <span className="card-label">SVAR</span>
          <i>{icon}</i>
          <p ref={answerRef}>{answer}</p>
        </section>
      </div>
    </article>
  );
}

function useFitText(ref, text) {
  useEffect(() => {
    const p = ref.current;
    if (!p) return;

    p.style.fontSize = '';
    const style = window.getComputedStyle(p);
    let size = parseFloat(style.fontSize);

    while (p.scrollHeight > p.clientHeight && size > 10) {
      size -= 0.5;
      p.style.fontSize = `${size}px`;
    }
  }, [text]);
}

export default Card;
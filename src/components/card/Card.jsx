import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './card.css';
import CategoryIcon from '../CategoryIcon';
import DOMPurify from 'dompurify';

const Card = forwardRef(function Card({ question, answer, icon, colorLight, colorDark, onFlip, displayType }, ref) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Detect dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const color = prefersDark ? colorDark : colorLight;

  // Refs for text scaling - each ref targets the element useFitText will resize
  // svgQuestionRef targets the static label on SVG cards
  // questionRef targets the question text on regular cards
  // answerRef targets the answer text on all cards
  const svgQuestionRef = useRef(null);
  const questionRef = useRef(null);
  const answerRef = useRef(null);

  // useFitText is only applied to text elements, never to the SVG display div
  // SVG cards use a static label instead of dynamic question text
  useFitText(svgQuestionRef, 'Vad betyder denna skylt?');
  useFitText(questionRef, question);
  useFitText(answerRef, answer);

  // Exposes flip function to parent via ref
  useImperativeHandle(ref, () => ({
    flip() {
      setIsFlipped(f => !f);
    }
  }));

  // Notifies parent when card is flipped, useful for restoring flip state on re-mount
  function handleFlip() {
    setIsFlipped(f => !f);
    onFlip?.();
  }

  return (
    <article className="card">
      <div
        className={`card-content ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <section className="question-side" style={{ backgroundColor: color }}>
          <span className="card-label">FRÅGA</span>
          
          {/* TODO: refactor to switch when more display_types are added */}
          {/* SVG cards render raw SVG markup from the question field.
              The static label gets its own ref for text scaling.
              CSS controls SVG sizing via .svg-display and .svg-display svg */}
          {displayType === 'svg' ? (
            <>
              <p ref={svgQuestionRef}>Vad betyder denna skylt?</p>
              <div
                className="svg-display"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question) }}
              />
            </>
          ) : (
            <>
            <CategoryIcon icon={icon} />
            <p ref={questionRef}>{question}</p>
            </>
          )}
        </section>

        <section className="answer-side" style={{ backgroundColor: color }}>
          <span className="card-label">SVAR</span>
          <div className="icon-row">
            <div className="icon-row-spacer" />
            <CategoryIcon icon={icon} />
            <button className="info-trigger" onClick={e => { e.stopPropagation(); onInfo?.(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 97" fill="currentColor" stroke="none">
                <g transform="translate(0,97) scale(0.1,-0.1)">
                  <path d="M376 954 c-241 -58 -403 -299 -366 -542 30 -194 189 -363 378 -403 118 -24 272 6 369 73 138 94 213 235 213 397 -1 145 -40 241 -140 342 -125 127 -285 174 -454 133z m287 -112 c157 -78 248 -251 220 -419 -30 -175 -155 -301 -330 -332 -172 -32 -348 62 -426 227 -29 62 -32 75 -32 167 0 87 4 107 27 157 31 67 105 149 166 185 71 42 119 53 218 50 79 -2 100 -7 157 -35z"/>
                  <path d="M447 752 c-23 -25 -21 -58 3 -82 27 -27 56 -25 85 5 30 29 31 49 5 75 -25 25 -72 26 -93 2z"/>
                  <path d="M430 410 l0 -200 60 0 60 0 0 200 0 200 -60 0 -60 0 0 -200z"/>
                </g>
              </svg>
            </button>
          </div>
          <p ref={answerRef}>{answer}</p>
        </section>
      </div>
    </article>
  );
});

// Shrinks text to fit its container by reducing font size until no overflow occurs.
// Starts at 48px and steps down by 0.5px until content fits or hits the 10px floor.
// Re-runs whenever the text content changes.
function useFitText(ref, text) {
  useEffect(() => {
    const p = ref.current;
    if (!p) return;

    let size = 48;
    p.style.fontSize = `${size}px`;

    while (
      (p.scrollHeight > p.clientHeight || p.scrollWidth > p.clientWidth)
      && size > 10
    ) {
      size -= 0.5;
      p.style.fontSize = `${size}px`;
    }
  }, [text]);
}

export default Card;
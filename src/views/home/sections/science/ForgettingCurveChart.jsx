import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function ForgettingCurveChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const muted = '#888780';
    const gridCol = isDark ? 'rgba(230,234,240,0.07)' : 'rgba(26,30,36,0.07)';

    // Ebbinghaus exponential decay R = e^(-0.095 * sqrt(t))
    // Fitted to original data: ~33% retained at day 1, ~25% at day 6
    // Source: Ebbinghaus (1885), replicated by Murre & Dros (2015, PLOS ONE)
    function ebbinghaus(t) {
      return Math.round(100 * Math.exp(-0.095 * Math.pow(t, 0.5)));
    }

    const points = Array.from({ length: 481 }, (_, i) => i / 16);
    const forgetting = points.map(t => ({
      x: Math.round(t * 100) / 100,
      y: Math.max(0, ebbinghaus(t)),
    }));

    // Spaced repetition intervals: day 1, 3, 7, 14
    // Based on Cepeda et al. (2006) meta-analysis of 184 spacing studies
    const recallDays = [1, 3, 7, 14];
    const spaced = [];
    let base = 100, k = 0.095, lastRecall = 0;

    for (let i = 0; i <= 480; i++) {
      const t = i / 16;
      const tr = Math.round(t * 100) / 100;
      const isRecall = recallDays.some(d => Math.abs(t - d) < 0.07);
      if (isRecall && t > 0.1) {
        spaced.push({ x: tr, y: base });
        base = Math.min(100, base + (100 - base) * 0.9);
        lastRecall = t;
        k = k * 0.6;
      } else {
        const elapsed = t - lastRecall;
        spaced.push({
          x: tr,
          y: Math.max(20, Math.round(base * Math.exp(-k * Math.pow(elapsed, 0.5)))),
        });
      }
    }

    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Utan repetition',
            data: forgetting,
            borderColor: '#2278D4',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0,
            fill: false,
          },
          {
            label: 'Med spaced repetition',
            data: spaced,
            borderColor: '#ea832f',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            tension: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => 'Dag ' + items[0].parsed.x,
              label: ctx => ctx.dataset.label + ': ' + Math.round(ctx.parsed.y) + '%',
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 30,
            title: { display: true, text: 'Dagar', color: muted, font: { size: 10 } },
            ticks: { color: muted, stepSize: 10, font: { size: 10 } },
            grid: { color: gridCol },
            border: { display: false },
          },
          y: {
            min: 0,
            max: 100,
            title: { display: true, text: 'Minne (%)', color: muted, font: { size: 10 } },
            ticks: { color: muted, callback: v => v + '%', font: { size: 10 }, maxTicksLimit: 5 },
            grid: { color: gridCol },
            border: { display: false },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <figure className="chart-wrapper">
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-line legend-line--solid" />
          Utan repetition
        </span>
        <span className="legend-item">
          <span className="legend-line legend-line--dashed" />
          Med spaced repetition
        </span>
      </div>
      <div className="chart-canvas-wrapper">
        <canvas
          ref={canvasRef}
          role="img"
        >
          Utan repetition: exponentiellt fall mot 0%. Med spaced repetition hålls minnet högt.
        </canvas>
      </div>
      <figcaption className="chart-source">
        Ebbinghaus (1885), Murre &amp; Dros (2015, PLOS ONE), Cepeda et al. (2006).
      </figcaption>
    </figure>
  );
}

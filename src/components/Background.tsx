import { useEffect, useRef } from 'react';

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gap = 32;
      const rows = Math.ceil(canvas.height / gap);
      const cols = Math.ceil(canvas.width / gap);

      // Slightly darker stone color
      ctx.fillStyle = '#a8a29e'; // stone-400

      const thresholdX = canvas.width * 0.75;
      const thresholdY = canvas.height * 0.75;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          // Only draw in the bottom-right 25% area
          if (x < thresholdX || y < thresholdY) continue;

          // Smoother fade-in from the threshold
          const ratioX = (x - thresholdX) / (canvas.width * 0.25);
          const ratioY = (y - thresholdY) / (canvas.height * 0.25);
          
          // Higher base opacity so they are actually visible
          ctx.globalAlpha = 0.5 * Math.sqrt(ratioX * ratioY); 

          const wave1 = Math.sin(x * 0.01 + y * 0.01 + time) * 6;
          const wave2 = Math.sin(x * 0.03 - y * 0.02 + time * 2) * 2;
          
          const totalWave = wave1 + wave2;
          const size = 1.2 + (Math.sin(x * 0.02 + time) + 1) * 1;

          ctx.beginPath();
          ctx.arc(x + gap/2, y + gap/2 + totalWave, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 right-0 w-full h-full z-50 pointer-events-none"
    />
  );
};

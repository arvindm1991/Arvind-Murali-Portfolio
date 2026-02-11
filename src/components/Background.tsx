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
      time += 0.005; // Speed of the wave
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gap = 30; // Distance between dots
      const rows = Math.ceil(canvas.height / gap);
      const cols = Math.ceil(canvas.width / gap);

      ctx.fillStyle = '#d6d3d1'; // stone-300 color for faint dots

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          // Calculate wave offset based on x, y, and time
          // Using both x and y creates a diagonal wave effect
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 5; 
          
          // Only modify Y position slightly for the wave effect
          // Or we can modify opacity/size. Let's modify Y and opacity slightly.
          
          const size = (Math.sin(x * 0.02 + y * 0.02 + time) + 1.5) * 1.5; // Oscillate size between ~0.75 and 3.75

          ctx.beginPath();
          ctx.arc(x + gap/2, y + gap/2 + wave, size, 0, Math.PI * 2);
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
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
    />
  );
};

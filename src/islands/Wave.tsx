// 波浪效果
import { useEffect, useRef } from "https://esm.sh/preact@10.15.1/hooks";

export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wave = {
    amplitude: 50,
    frequency: 0.01,
    speed: 0.1,
  };
  let time = 0;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctxRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      requestAnimationFrame(animate);

      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += wave.speed;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 +
          Math.sin(x * wave.frequency + time) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
      ctx.fill();
      ctx.closePath();
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} id="waveCanvas"></canvas>;
}

import { useEffect, useRef } from "https://esm.sh/preact@10.15.1/hooks";

export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const waveLayers = [
    {
      // 振幅
      amplitude: 50,
      // 频率
      frequency: 0.01,
      // 速度
      speed: 0.1,
      // Y 轴偏移
      yOffset: 100,
      // 颜色
      color: "rgba(0, 255, 255, 0.3)",
    },
    {
      amplitude: 30,
      frequency: 0.02,
      speed: 0.15,
      yOffset: 120,
      color: "rgba(255, 0, 0, 0.3)",
    },
  ];
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

      time += 0.1;

      for (const wave of waveLayers) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - wave.yOffset);

        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height - wave.yOffset +
            Math.sin(x * wave.frequency + time) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = wave.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    animate();
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="waveCanvas" className="h-96 w-full">
      </canvas>
    </>
  );
}

/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-27 11:17:43
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-27 13:45:03
 * @Description:
 */
import { useEffect, useRef } from 'react';

const WavyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    class Wave {
      phase: number;
      offset: number;
      frequency: number;
      amplitude: number;

      constructor(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
      }

      update() {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      }
    }

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
      }
    }

    class Line {
      spring: number;
      friction: number;
      nodes: Node[];

      constructor(options: { spring?: number } = {}) {
        this.spring = (options.spring ?? 0) + 0.1 * Math.random() - 0.05;
        this.friction = config.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];

        for (let i = 0; i < config.size; i++) {
          const node = new Node();
          node.x = pos.x;
          node.y = pos.y;
          this.nodes.push(node);
        }
      }

      update() {
        let spring = this.spring;
        let node = this.nodes[0];

        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          node = this.nodes[i];

          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * config.dampening;
            node.vy += prev.vy * config.dampening;
          }

          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= config.tension;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        let x, y;
        let node = this.nodes[0];
        let prevX = node.x;
        let prevY = node.y;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.nodes.length - 2; i++) {
          node = this.nodes[i];
          const next = this.nodes[i + 1];
          x = 0.5 * (node.x + next.x);
          y = 0.5 * (node.y + next.y);
          ctx.quadraticCurveTo(node.x, node.y, x, y);
        }

        node = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(node.x, node.y, last.x, last.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    const config = {
      debug: true,
      friction: 0.5,
      trails: 80,
      size: 50,
      dampening: 0.025,
      tension: 0.99
    };

    let ctx: CanvasRenderingContext2D | null;
    let wave: Wave;


    let lines: Line[] = [];
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function handleMouseMove(e: MouseEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }

    function initLines() {
      lines = [];
      for (let i = 0; i < config.trails; i++) {
        lines.push(new Line({ spring: 0.45 + (i / config.trails) * 0.025 }));
      }
    }

    function render() {
      if (!ctx) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(wave.update())}, 100%, 50%, 0.025)`;
      ctx.lineWidth = 10;

      for (let i = 0; i < config.trails; i++) {
        lines[i].update();
        lines[i].draw(ctx);
      }

      requestAnimationFrame(render);
    }

    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    function init() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      ctx = canvas.getContext('2d');
      resizeCanvas();

      wave = new Wave({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285
      });

      initLines();
      render();
    }

    init();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', zIndex: '-10', pointerEvents: 'none' ,inset: '0' ,width: '100%', height: '100vh' }} />;
};

export default WavyCanvas;

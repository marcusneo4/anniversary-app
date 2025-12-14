declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  export interface GlobalOptions extends Options {
    resize?: boolean;
    useWorker?: boolean;
  }

  export default function confetti(options?: Options): Promise<null>;
  export function confetti(options?: Options): Promise<null>;
  
  export function reset(): void;
  export function create(
    canvas: HTMLCanvasElement,
    options?: GlobalOptions
  ): (options?: Options) => Promise<null>;
}

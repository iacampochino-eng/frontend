import React from "react";
import { CircleProgress } from "../ui/circle-progress";
import { motion } from "framer-motion";

export function AnimationCircleProgress({
  animationDuration,
}: {
  animationDuration: number;
}) {
  const [autoProgress, setAutoProgress] = React.useState(0);

  React.useEffect(() => {
    let start: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed / animationDuration) * 100;

      if (progress >= 100) {
        setAutoProgress(100);
        return; // finaliza animación
      } else {
        setAutoProgress(progress);
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [animationDuration]);

  return (
    <div className="flex flex-col items-center">
      <CircleProgress
        value={autoProgress}
        maxValue={100}
        size={100}
        animationDuration={animationDuration}
        disableAnimation={true}
      />
      {Math.round(autoProgress) >= 100 ? (
        <>
          <span className="mt-2 text-sm">{Math.round(autoProgress)}%</span>
          <motion.p
            className="text-white text-sm mt-4 font-medium tracking-wide"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Finalizando, ¡Ya casi estamos listos!
            <span className="animate-pulse">...</span>
          </motion.p>
        </>
      ) : (
        <>
          <span className="mt-2 text-sm">{Math.round(autoProgress)}%</span>
          <motion.p
            className="text-white text-sm mt-4 font-medium tracking-wide"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Procesando video
            <span className="animate-pulse">...</span>
          </motion.p>
        </>
      )}
    </div>
  );
}

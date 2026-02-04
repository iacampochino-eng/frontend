
import { motion } from "framer-motion";

export default function CowLoading() {
  // Generar puntos en círculo
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 20,
    delay: i * 0.1,
    size: Math.random() * 8 + 4, // Tamaños aleatorios entre 4 y 12px
  }));

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-40">
      <div className="relative">
        {/* Círculo de puntos giratorios */}
        <div className="relative w-80 h-80">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute bg-white rounded-full shadow-lg"
              style={{
                width: dot.size,
                height: dot.size,
                left: "50%",
                top: "50%",
                transformOrigin: `0 ${140}px`, // Radio del círculo
              }}
              initial={{
                rotate: dot.angle,
                opacity: 0.3,
              }}
              animate={{
                rotate: dot.angle + 360,
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: dot.delay,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: dot.delay,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>

        {/* Vaca animada en el centro */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.5,
          }}
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></motion.div>
        </motion.div>

        {/* Texto de loading con efecto de escritura */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* SVG de vaca personalizada */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cuerpo de la vaca */}
            <motion.ellipse
              cx="60"
              cy="70"
              rx="35"
              ry="25"
              fill="white"
              stroke="#333"
              strokeWidth="2"
              initial={{ scaleX: 0.8 }}
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Cabeza */}
            <motion.circle
              cx="60"
              cy="40"
              r="20"
              fill="white"
              stroke="#333"
              strokeWidth="2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Manchas */}
            <motion.ellipse
              cx="50"
              cy="65"
              rx="8"
              ry="6"
              fill="#333"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.ellipse
              cx="70"
              cy="75"
              rx="6"
              ry="8"
              fill="#333"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.ellipse
              cx="45"
              cy="35"
              rx="4"
              ry="3"
              fill="#333"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            {/* Ojos */}
            <motion.circle
              cx="55"
              cy="35"
              r="3"
              fill="#333"
              animate={{
                scale: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="65"
              cy="35"
              r="3"
              fill="#333"
              animate={{
                scale: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.1,
              }}
            />

            {/* Nariz */}
            <ellipse cx="60" cy="45" rx="4" ry="2" fill="#ff69b4" />

            {/* Cuernos */}
            <motion.path
              d="M52 25 L50 15 L54 15 Z"
              fill="#8B4513"
              animate={{
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "52px 25px" }}
            />
            <motion.path
              d="M68 25 L66 15 L70 15 Z"
              fill="#8B4513"
              animate={{
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "68px 25px" }}
            />

            {/* Patas */}
            <rect x="45" y="90" width="6" height="15" fill="#333" rx="3" />
            <rect x="55" y="90" width="6" height="15" fill="#333" rx="3" />
            <rect x="65" y="90" width="6" height="15" fill="#333" rx="3" />
            <rect x="75" y="90" width="6" height="15" fill="#333" rx="3" />

            {/* Cola */}
            <motion.path
              d="M95 70 Q100 65 98 75 Q96 80 100 78"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M95 70 Q100 65 98 75 Q96 80 100 78",
                  "M95 70 Q105 68 103 78 Q101 83 105 81",
                  "M95 70 Q100 65 98 75 Q96 80 100 78",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </svg>

          <motion.p
            className="text-white text-xl font-light tracking-widest"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            CARGANDO...
          </motion.p>
        </motion.div>

        {/* Efecto de resplandor central */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

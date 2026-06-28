import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  left: string;
  top: string;
  delay: string;
  size: number;
}

export default function SparkleBg() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      newSparkles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        size: Math.random() * 4 + 3,
      });
    }
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="sparkle-bg">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </div>
  );
}

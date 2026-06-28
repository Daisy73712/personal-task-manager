import { useState, useCallback } from 'react';

const confettiColors = [
  '#ec4899',
  '#a855f7',
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#f472b6',
  '#fb923c',
  '#8b5cf6',
];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
}

export function useConfetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const triggerConfetti = useCallback((originX?: number) => {
    const newPieces: ConfettiPiece[] = [];
    const startX = originX ?? window.innerWidth / 2;
    
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: Date.now() + i,
        left: startX + (Math.random() - 0.5) * 400,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        delay: Math.random() * 0.3,
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
      });
    }
    
    setPieces((prev) => [...prev, ...newPieces]);
    
    setTimeout(() => {
      setPieces((prev) => prev.filter((p) => !newPieces.find((np) => np.id === p.id)));
    }, 3500);
  }, []);

  const Confetti = () => (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </>
  );

  return { Confetti, triggerConfetti };
}

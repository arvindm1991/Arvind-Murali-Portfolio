import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stone {
  id: string;
  width: number;
  height: number;
  color: string;
  borderRadius: string;
  relX: number; // Horizontal offset from stack center
  y: number; // Vertical position (bottom of stone)
  rotate: number; // Rotation angle for tilting
}

const COLORS = [
  '#e7e5e4', // lightest
  '#d4cfc9', // warm light
  '#c2bdb6', // sandy
  '#b8b0a8', // warm mid
  '#a8a29e', // neutral mid
  '#948d87', // cool mid
  '#78716c', // dark
  '#6d6560', // warm dark
  '#5c5651', // darkest
];

interface Stack {
  x: number;
  stones: Stone[];
}

const generateStone = (isFoundation = false): Stone => {
  if (isFoundation) {
    const w = 85 + Math.random() * 15;
    const h = 22 + Math.random() * 8;
    const r1 = 40 + Math.random() * 30;
    const r2 = 40 + Math.random() * 30;
    const r3 = 40 + Math.random() * 30;
    const r4 = 40 + Math.random() * 30;

    return {
      id: Math.random().toString(36).substr(2, 9),
      width: w,
      height: h,
      color: '#57534e', // stone-600 (darker)
      borderRadius: `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`,
      relX: 0,
      y: 0,
      rotate: 0,
    };
  }

  const isFlat = Math.random() > 0.6;
  // Smaller and flatter ranges but not too flat
  const w = isFlat ? (40 + Math.random() * 40) : (35 + Math.random() * 25);
  const h = isFlat ? (16 + Math.random() * 6) : (20 + Math.random() * 15);
  
  // Generate organic blob shape - not too sharp
  const r1 = 40 + Math.random() * 30;
  const r2 = 40 + Math.random() * 30;
  const r3 = 40 + Math.random() * 30;
  const r4 = 40 + Math.random() * 30;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    width: w,
    height: h,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    borderRadius: `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`,
    relX: 0,
    y: 0,
    rotate: 0,
  };
};

export const StoneStacker = () => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [activeStone, setActiveStone] = useState<Stone | null>(generateStone(true));
  const [dragKey, setDragKey] = useState(0);
  const [draggedFromStack, setDraggedFromStack] = useState<{stackIdx: number, stone: Stone} | null>(null);

  // Check if screen is full of stacks
  const isBottomFull = stacks.length > 0 && 
    (stacks.length * 80) > (typeof window !== 'undefined' ? window.innerWidth * 0.9 : 1000);

  const handleDragEnd = (_event: any, info: any) => {
    const dropX = info.point.x;
    const dropY = info.point.y;
    
    // Staging zone detection (bottom-right area)
    const STAGING_WIDTH = 150;
    const STAGING_HEIGHT = 100;
    const isInStagingZone = dropX > window.innerWidth - STAGING_WIDTH && dropY > window.innerHeight - STAGING_HEIGHT;

    const currentStone = draggedFromStack ? draggedFromStack.stone : activeStone;

    if (!currentStone) {
      setDragKey(prev => prev + 1);
      setDraggedFromStack(null);
      return;
    }

    const resetDrag = () => {
      setDragKey(prev => prev + 1);
      setDraggedFromStack(null);
    };

    // Only allow dropping in the bottom half and NOT in the staging zone
    if (dropY < window.innerHeight * 0.4 || isInStagingZone) {
      resetDrag();
      return;
    }

    setStacks(prev => {
      let newStacks = [...prev];
      let targetStackIndex = -1;
      const PROXIMITY = 60;

      // Find if dropped near an existing stack
      for (let i = 0; i < newStacks.length; i++) {
        const dist = Math.abs(dropX - newStacks[i].x);
        if (dist < PROXIMITY) {
          targetStackIndex = i;
          break;
        }
      }

      // Elliptical height: given a stone treated as an ellipse,
      // returns the visual top-y at a specific x-position on that stone.
      const ellipseTopAt = (s: Stone, xPos: number): number => {
        const halfW = s.width / 2;
        const centerX = s.relX;
        const dx = xPos - centerX;
        // Outside the stone's width → no support
        if (Math.abs(dx) >= halfW) return s.y;
        // Ellipse formula: y = h * sqrt(1 - (dx/a)^2)
        const fraction = dx / halfW;
        const ellipseH = s.height * 0.95 * Math.sqrt(1 - fraction * fraction);
        return s.y + ellipseH;
      };

      const calculateSettledState = (stack: Stack, stone: Stone, relX: number) => {
        const stoneHalfW = stone.width / 2;

        // For each existing stone, find the height at the CENTER of the new stone.
        // This is the "preferred" settling point.
        let centerY = 0;
        let bestEdgeY = 0;
        let centerSupported = false;

        stack.stones.forEach(s => {
          if (s.id === stone.id) return;
          const sHalfW = s.width / 2;
          const sLeft = s.relX - sHalfW;
          const sRight = s.relX + sHalfW;

          // Check if center of new stone is within this stone's width
          if (relX >= sLeft && relX <= sRight) {
            const topAtCenter = ellipseTopAt(s, relX);
            if (topAtCenter > centerY) {
              centerY = topAtCenter;
              centerSupported = true;
            }
          }

          // Also check edges as fallback
          const leftPx = relX - stoneHalfW * 0.5;
          const rightPx = relX + stoneHalfW * 0.5;
          [leftPx, rightPx].forEach(px => {
            if (px >= sLeft && px <= sRight) {
              const topAtEdge = ellipseTopAt(s, px);
              if (topAtEdge > bestEdgeY) bestEdgeY = topAtEdge;
            }
          });
        });

        // Prefer center support; only use edge if center has no support
        const y = centerSupported ? centerY : bestEdgeY;

        // Tilting: only tilt if settled on edge, not center
        let rotate = 0;
        if (!centerSupported && bestEdgeY > 0) {
          // Figure out which edge is supporting
          const leftPx = relX - stoneHalfW * 0.5;
          const rightPx = relX + stoneHalfW * 0.5;
          let leftH = 0, rightH = 0;
          stack.stones.forEach(s => {
            if (s.id === stone.id) return;
            const sHalfW = s.width / 2;
            const sLeft = s.relX - sHalfW;
            const sRight = s.relX + sHalfW;
            if (leftPx >= sLeft && leftPx <= sRight) {
              const h = ellipseTopAt(s, leftPx);
              if (h > leftH) leftH = h;
            }
            if (rightPx >= sLeft && rightPx <= sRight) {
              const h = ellipseTopAt(s, rightPx);
              if (h > rightH) rightH = h;
            }
          });
          const diff = rightH - leftH;
          rotate = Math.max(-12, Math.min(12, diff * 0.8));
        }

        return { y, rotate };
      };

      const placeStoneInStack = (stackIdx: number, stone: Stone, x: number) => {
        const stack = { ...newStacks[stackIdx] };
        const relX = x - stack.x;
        const { y, rotate } = calculateSettledState(stack, stone, relX);
        const MAX_HEIGHT = window.innerHeight * 0.35;

        if (y + stone.height > MAX_HEIGHT) {
          // Overflow to next stack
          const nextStackIdx = stackIdx + 1;
          if (nextStackIdx < newStacks.length) {
            placeStoneInStack(nextStackIdx, stone, newStacks[nextStackIdx].x);
          } else {
            // Create new stack for overflow
            const newX = stack.x + 100;
            newStacks.push({ x: newX, stones: [] });
            placeStoneInStack(newStacks.length - 1, stone, newX);
          }
          return;
        }

        stack.stones = [...stack.stones, { ...stone, relX, y, rotate }];
        newStacks[stackIdx] = stack;
      };

      if (targetStackIndex !== -1) {
        placeStoneInStack(targetStackIndex, currentStone, dropX);
      } else {
        // No stack nearby, start new one
        newStacks.push({ x: dropX, stones: [{ ...currentStone, relX: 0, y: 0 }] });
      }

      // Final cleanup: Remove from source and generate new stone
      if (draggedFromStack) {
        newStacks = newStacks.map((s, i) => 
          i === draggedFromStack.stackIdx 
            ? { ...s, stones: s.stones.filter(st => st.id !== currentStone.id) }
            : s
        );
      } else {
        setActiveStone(isBottomFull ? null : generateStone(false));
      }

      return newStacks.filter(s => s.stones.length > 0);
    });

    setDragKey(prev => prev + 1);
    setDraggedFromStack(null);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Stacks Display */}
      {stacks.map((stack, sIdx) => (
        <div 
          key={sIdx} 
          className="absolute bottom-0"
          style={{ left: stack.x, transform: 'translateX(-50%)' }}
        >
          {stack.stones.map((stone) => {
            // A stone is draggable if no other stone is resting on it
            const isCovered = stack.stones.some(other => {
              if (other.id === stone.id) return false;
              if (other.y <= stone.y) return false;
              const sLeft = stone.relX - stone.width / 2;
              const sRight = stone.relX + stone.width / 2;
              const oLeft = other.relX - other.width / 2;
              const oRight = other.relX + other.width / 2;
              return sLeft < oRight && sRight > oLeft;
            });
            const isDraggable = !isCovered;

            return (
              <motion.div
                key={stone.id}
                drag={isDraggable}
                dragMomentum={false}
                onDragStart={() => isDraggable && setDraggedFromStack({ stackIdx: sIdx, stone })}
                onDragEnd={handleDragEnd}
                // No layoutId — prevents center-flash on new stone spawn
                initial={false}
                whileDrag={{ scale: 1.1, zIndex: 1000 }}
                animate={{ 
                  x: stone.relX - stone.width / 2, // Center stone on relX
                  y: -stone.y, 
                  scale: 1,
                  rotate: stone.rotate,
                  transition: {
                    type: "spring",
                    stiffness: 180, // Snappier drop
                    damping: 22
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: stone.width,
                  height: stone.height,
                  backgroundColor: stone.color,
                  borderRadius: stone.borderRadius,
                  zIndex: Math.round(stone.y),
                  cursor: isDraggable ? 'grab' : 'default',
                  pointerEvents: 'auto',
                }}
                className="shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.1)] border border-stone-700/15"
              />
            );
          })}
        </div>
      ))}

      {/* Active Stone (Staging) */}
      <AnimatePresence>
        {activeStone && !draggedFromStack && (
          <div className="absolute bottom-0 right-8 pointer-events-auto">
            <motion.div
              drag
              key={`${activeStone.id}-${dragKey}`}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.1, zIndex: 200 }}
              style={{
                width: activeStone.width,
                height: activeStone.height,
                backgroundColor: activeStone.color,
                borderRadius: activeStone.borderRadius,
                cursor: 'grab',
              }}
              className="shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.1)] border border-stone-700/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </div>
        )}
      </AnimatePresence>
      
      {isBottomFull && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-400 font-serif italic text-sm"
        >
          The path is complete.
        </motion.div>
      )}
    </div>
  );
};

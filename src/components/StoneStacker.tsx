import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stone {
  id: string;
  width: number;
  height: number;
  color: string;
  borderRadius: string;
  stumbleFromX?: number;
}

const COLORS = [
  '#a8a29e', // stone-400
  '#78716c', // stone-500
  '#57534e', // stone-600
  '#d6d3d1', // stone-300
  '#e7e5e4', // stone-200
];

interface Stack {
  x: number;
  stones: Stone[];
}

const generateStone = (): Stone => {
  const isFlat = Math.random() > 0.6;
  // Smaller and flatter ranges
  const w = isFlat ? (40 + Math.random() * 40) : (35 + Math.random() * 25);
  const h = isFlat ? (10 + Math.random() * 8) : (20 + Math.random() * 15);
  
  // Generate organic blob shape
  const r1 = 40 + Math.random() * 60;
  const r2 = 40 + Math.random() * 60;
  const r3 = 40 + Math.random() * 60;
  const r4 = 40 + Math.random() * 60;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    width: w,
    height: h,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    borderRadius: `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`,
  };
};

export const StoneStacker = () => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [activeStone, setActiveStone] = useState<Stone | null>(generateStone());
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

    // The stone we are currently dealing with
    const currentStone = draggedFromStack ? draggedFromStack.stone : activeStone;

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

      if (currentStone) {
        if (targetStackIndex !== -1) {
          const targetStack = { ...newStacks[targetStackIndex] };
          
          if (targetStack.stones.length < 6) {
            // Success! Add to target
            targetStack.stones = [...targetStack.stones, { ...currentStone, stumbleFromX: 0 }];
            newStacks[targetStackIndex] = targetStack;
            
            // Remove from source if it was from a stack
            if (draggedFromStack) {
              const sourceStack = { ...newStacks[draggedFromStack.stackIdx] };
              sourceStack.stones = sourceStack.stones.slice(0, -1);
              newStacks[draggedFromStack.stackIdx] = sourceStack;
            } else {
              setActiveStone(isBottomFull ? null : generateStone());
            }
          } else {
            // Target full, check immediate neighbors (+/- 80px)
            let foundAnyNeighbor = false;
            let availableNeighborIdx = -1;
            for (let i = 0; i < newStacks.length; i++) {
              if (i === targetStackIndex) continue;
              const distToTarget = Math.abs(newStacks[targetStackIndex].x - newStacks[i].x);
              if (distToTarget <= 80) {
                foundAnyNeighbor = true;
                if (newStacks[i].stones.length < 6) {
                  availableNeighborIdx = i;
                  break;
                }
              }
            }

            if (availableNeighborIdx !== -1) {
              // Stumble to non-full neighbor
              const neighbor = { ...newStacks[availableNeighborIdx] };
              const offsetX = neighbor.x - newStacks[targetStackIndex].x;
              neighbor.stones = [...neighbor.stones, { ...currentStone, stumbleFromX: -offsetX }];
              newStacks[availableNeighborIdx] = neighbor;
              
              if (draggedFromStack) {
                const sourceStack = { ...newStacks[draggedFromStack.stackIdx] };
                sourceStack.stones = sourceStack.stones.slice(0, -1);
                newStacks[draggedFromStack.stackIdx] = sourceStack;
              } else {
                setActiveStone(isBottomFull ? null : generateStone());
              }
            } else if (!foundAnyNeighbor) {
              // NO neighbor exists -> Start a new stack nearby
              const offset = (Math.random() > 0.5 ? 60 : -60);
              const newX = newStacks[targetStackIndex].x + offset;
              newStacks.push({ x: newX, stones: [{ ...currentStone, stumbleFromX: -offset }] });
              
              if (draggedFromStack) {
                const sourceStack = { ...newStacks[draggedFromStack.stackIdx] };
                sourceStack.stones = sourceStack.stones.slice(0, -1);
                newStacks[draggedFromStack.stackIdx] = sourceStack;
              } else {
                setActiveStone(isBottomFull ? null : generateStone());
              }
            } else {
              // Found neighbors but they were all full -> Snap back
              resetDrag();
              return prev;
            }
          }
        } else {
          // No stack nearby, start new one at drop location
          newStacks.push({ x: dropX, stones: [{ ...currentStone, stumbleFromX: 0 }] });
          
          if (draggedFromStack) {
            const sourceStack = { ...newStacks[draggedFromStack.stackIdx] };
            sourceStack.stones = sourceStack.stones.slice(0, -1);
            newStacks[draggedFromStack.stackIdx] = sourceStack;
          } else {
            setActiveStone(isBottomFull ? null : generateStone());
          }
        }
      }

      // Cleanup empty stacks
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
          className="absolute bottom-0 flex flex-col-reverse items-center"
          style={{ left: stack.x, transform: 'translateX(-50%)' }}
        >
          {stack.stones.map((stone, stIdx) => {
            const isTop = stIdx === stack.stones.length - 1;
            return (
              <motion.div
                key={stone.id}
                drag={isTop}
                dragMomentum={false}
                onDragStart={() => isTop && setDraggedFromStack({ stackIdx: sIdx, stone })}
                onDragEnd={handleDragEnd}
                initial={stone.stumbleFromX ? { 
                  x: stone.stumbleFromX, 
                  y: -150, 
                  rotate: stone.stumbleFromX > 0 ? -90 : 90 
                } : { scale: 0, y: 20 }}
                whileDrag={{ scale: 1.1, zIndex: 200 }}
                animate={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  rotate: 0,
                  transition: stone.stumbleFromX ? {
                    type: "spring",
                    stiffness: 40,
                    damping: 12,
                    mass: 1.5,
                    bounce: 0.3
                  } : { duration: 0.3 }
                }}
                style={{
                  width: stone.width,
                  height: stone.height,
                  backgroundColor: stone.color,
                  borderRadius: stone.borderRadius,
                  marginBottom: -stone.height * 0.3,
                  zIndex: stIdx,
                  cursor: isTop ? 'grab' : 'default',
                  pointerEvents: isTop ? 'auto' : 'none',
                }}
                className={`shadow-md border border-stone-800/10 ${isTop ? 'pointer-events-auto' : ''}`}
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
              className="shadow-md border border-stone-800/20"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
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

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
  id: string;
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

const stoneSurface = (color: string) => ({
  background: `linear-gradient(145deg, rgba(255,255,255,0.12), transparent 48%, rgba(0,0,0,0.05)), ${color}`,
  boxShadow:
    'inset 1px 1px 2px rgba(255,255,255,0.18), inset -1px -2px 3px rgba(0,0,0,0.08), 0 2px 4px rgba(87,83,78,0.10)',
});

export const StoneStacker = () => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [activeStone, setActiveStone] = useState<Stone | null>(generateStone(true));
  const [draggedFromStack, setDraggedFromStack] = useState<{stackId: string, stone: Stone} | null>(null);

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
      setDraggedFromStack(null);
      return;
    }

    const resetDrag = () => {
      setDraggedFromStack(null);
    };

    // Only allow dropping in the bottom half and NOT in the staging zone
    if (dropY < window.innerHeight * 0.4 || isInStagingZone) {
      resetDrag();
      return;
    }

    setStacks(prev => {
      let newStacks = prev
        .map((stack) =>
          draggedFromStack && stack.id === draggedFromStack.stackId
            ? { ...stack, stones: stack.stones.filter((st) => st.id !== currentStone.id) }
            : stack
        )
        .filter((stack) => stack.stones.length > 0);
      let targetStackIndex = -1;
      const PROXIMITY = Math.max(60, currentStone.width * 1.2);
      let closestStackDistance = Infinity;

      // Find if dropped near an existing stack
      for (let i = 0; i < newStacks.length; i++) {
        const dist = Math.abs(dropX - newStacks[i].x);
        if (dist < PROXIMITY && dist < closestStackDistance) {
          targetStackIndex = i;
          closestStackDistance = dist;
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

      const calculateSettledState = (stack: Stack, stone: Stone, initialRelX: number) => {
        const stoneHalfW = stone.width / 2;
        const sampleOffsets = [-0.82, -0.45, 0, 0.45, 0.82].map((factor) => factor * stoneHalfW);

        const contactAt = (xPos: number) => {
          let height = 0;

          stack.stones.forEach((s) => {
            if (s.id === stone.id) return;

            const sHalfW = s.width / 2;
            const sLeft = s.relX - sHalfW;
            const sRight = s.relX + sHalfW;

            if (xPos >= sLeft && xPos <= sRight) {
              height = Math.max(height, ellipseTopAt(s, xPos));
            }
          });

          return height;
        };

        const evaluate = (relX: number) => {
          const contacts = sampleOffsets
            .map((offset) => ({
              offset,
              height: contactAt(relX + offset),
            }))
            .filter((contact) => contact.height > 0);

          if (contacts.length === 0) {
            return { stable: true, relX, y: 0, rotate: 0, rollDirection: 0 };
          }

          const leftContacts = contacts.filter((contact) => contact.offset < -stoneHalfW * 0.12);
          const rightContacts = contacts.filter((contact) => contact.offset > stoneHalfW * 0.12);
          const centerContacts = contacts.filter((contact) => Math.abs(contact.offset) <= stoneHalfW * 0.12);
          const left = leftContacts.reduce<typeof contacts[number] | null>(
            (best, contact) => (!best || contact.height > best.height ? contact : best),
            null
          );
          const right = rightContacts.reduce<typeof contacts[number] | null>(
            (best, contact) => (!best || contact.height > best.height ? contact : best),
            null
          );
          const center = centerContacts.reduce<typeof contacts[number] | null>(
            (best, contact) => (!best || contact.height > best.height ? contact : best),
            null
          );

          if (left && right) {
            const slope = (right.height - left.height) / Math.max(1, right.offset - left.offset);
            return {
              stable: true,
              support: 'two-sided',
              relX,
              y: Math.max(left.height, right.height),
              rotate: Math.max(-14, Math.min(14, slope * 50)),
              rollDirection: 0,
            };
          }

          if (center) {
            return {
              stable: true,
              support: 'center',
              relX,
              y: center.height,
              rotate: 0,
              rollDirection: 0,
            };
          }

          const onlyContact = contacts.reduce((best, contact) =>
            contact.height > best.height ? contact : best
          );
          const rollDirection = onlyContact.offset < 0 ? 1 : -1;

          return {
            stable: false,
            support: 'one-sided',
            relX,
            y: onlyContact.height,
            rotate: rollDirection * 9,
            rollDirection,
          };
        };

        let relX = initialRelX;
        let state = evaluate(relX);
        const releaseHeight = state.y;
        const step = Math.max(2, stone.width * 0.07);
        const maxRoll = stone.width * 1.25;

        for (let i = 0; i < 36 && !state.stable; i++) {
          const nextRelX = relX + state.rollDirection * step;

          if (Math.abs(nextRelX - initialRelX) > maxRoll) {
            break;
          }

          const nextState = evaluate(nextRelX);

          // If it rolled off the supporting edge, let it settle on the ground nearby.
          if (nextState.y === 0) {
            state = { ...nextState, stable: true, rotate: 0 };
            break;
          }

          if (nextState.stable && nextState.y <= releaseHeight + 2) {
            relX = nextRelX;
            state = nextState;
            break;
          }

          if (!nextState.stable && nextState.y <= state.y + 2) {
            relX = nextRelX;
            state = nextState;
          } else {
            break;
          }
        }

        if (!state.stable) {
          const leftProbe = evaluate(state.relX - step);
          const rightProbe = evaluate(state.relX + step);
          const lowerProbe =
            leftProbe.y <= rightProbe.y ? { ...leftProbe, relX: state.relX - step } : { ...rightProbe, relX: state.relX + step };

          if (lowerProbe.y < state.y) {
            state = lowerProbe.stable ? lowerProbe : { ...lowerProbe, stable: true, rotate: 0 };
          } else {
            state = { stable: true, support: 'ground', relX: state.relX + state.rollDirection * step, y: 0, rotate: 0, rollDirection: 0 };
          }
        }

        return { relX: state.relX, y: state.y, rotate: state.rotate };
      };

      const placeStoneInStack = (targetStackIdOrIdx: string | number, stone: Stone, x: number) => {
        const stack = { ...newStacks.find(s => s.id === (typeof targetStackIdOrIdx === 'string' ? targetStackIdOrIdx : newStacks[targetStackIdOrIdx].id))! };
        const relX = x - stack.x;
        const supportReach = stone.width * 1.4 + 64;
        const supportStack = {
          ...stack,
          stones: newStacks.flatMap((nearbyStack) => {
            const stackOffset = nearbyStack.x - stack.x;
            const closeToDrop = Math.abs(x - nearbyStack.x) <= supportReach;
            const closeToStack = Math.abs(stackOffset) <= supportReach + stone.width;

            if (!closeToDrop && !closeToStack) return [];

            return nearbyStack.stones.map((nearbyStone) => ({
              ...nearbyStone,
              relX: nearbyStone.relX + stackOffset,
            }));
          }),
        };
        const settled = calculateSettledState(supportStack, stone, relX);
        const { y, rotate } = settled;
        const MAX_HEIGHT = window.innerHeight * 0.35;

        if (y + stone.height > MAX_HEIGHT) {
          // Overflow to next stack
          const nextStackIdx = typeof targetStackIdOrIdx === 'number' 
            ? targetStackIdOrIdx + 1 
            : newStacks.findIndex(s => s.id === targetStackIdOrIdx) + 1;

          if (nextStackIdx < newStacks.length) {
            placeStoneInStack(nextStackIdx, stone, newStacks[nextStackIdx].x);
          } else {
            // Create new stack for overflow
            const newX = stack.x + 100;
            newStacks.push({ 
              id: Math.random().toString(36).substr(2, 9),
              x: newX, 
              stones: [] 
            });
            placeStoneInStack(newStacks.length - 1, stone, newX);
          }
          return;
        }

        stack.stones = [...stack.stones, { ...stone, relX: settled.relX, y, rotate }];
        const currentStackIdx = typeof targetStackIdOrIdx === 'number'
          ? targetStackIdOrIdx
          : newStacks.findIndex(s => s.id === targetStackIdOrIdx);
        newStacks[currentStackIdx] = stack;
      };

      if (targetStackIndex !== -1) {
        placeStoneInStack(targetStackIndex, currentStone, dropX);
      } else {
        // No stack nearby, start new one
        newStacks.push({ 
          id: Math.random().toString(36).substr(2, 9),
          x: dropX, 
          stones: [{ ...currentStone, relX: 0, y: 0 }] 
        });
      }

      if (!draggedFromStack) {
        setActiveStone(isBottomFull ? null : generateStone(false));
      }

      return newStacks.filter(s => s.stones.length > 0);
    });

    setDraggedFromStack(null);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Stacks Display */}
      {stacks.map((stack) => (
        <div 
          key={stack.id} 
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
                onDragStart={() => isDraggable && setDraggedFromStack({ stackId: stack.id, stone })}
                onDragEnd={handleDragEnd}
                // No layoutId - prevents center-flash on new stone spawn
                initial={false}
                whileDrag={{ scale: 1.1, zIndex: 1000, cursor: 'grabbing' }}
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
                  ...stoneSurface(stone.color),
                  borderRadius: stone.borderRadius,
                  zIndex: Math.round(stone.y),
                  cursor: isDraggable ? 'grab' : 'default',
                  pointerEvents: 'auto',
                  touchAction: 'none',
                }}
                className="select-none active:cursor-grabbing"
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
              key={activeStone.id}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.1, zIndex: 300, cursor: 'grabbing' }}
              style={{
                width: activeStone.width,
                height: activeStone.height,
                ...stoneSurface(activeStone.color),
                borderRadius: activeStone.borderRadius,
                cursor: 'grab',
                touchAction: 'none',
              }}
              className="select-none active:cursor-grabbing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            />
          </div>
        )}
      </AnimatePresence>


    </div>
  );
};

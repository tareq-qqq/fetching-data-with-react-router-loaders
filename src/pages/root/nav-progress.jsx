import { useEffect, useState } from "react";
import cn from "../../utils/cn";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

function NavProgress({ className, isIndeterminate }) {
  const ref = useRef(null);
  const oldRef = useRef(null);
  const remainingTime = useRef(1.5);

  useAnimationFrame(() => {
    let position;
    if (isIndeterminate) {
      if (ref.current) {
        position =
          ref.current?.getBoundingClientRect().x /
          document.documentElement.clientWidth;

        remainingTime.current = 1.5 - ((position - -0.5) / (1 - -0.5)) * 1.5;
      }
    }
  });

  console.log(remainingTime.current);

  return (
    <div
      className={cn(
        "relative h-[1.75px] w-full overflow-hidden bg-gray-200",
        className,
      )}
    >
      <AnimatePresence>
        {isIndeterminate && (
          <motion.div
            ref={ref}
            className={"absolute h-full w-full origin-left bg-primary "}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: [0.65, 0.815, 0.735, 0.395],
            }}
            initial={{
              translateX: "-50%",
              scaleX: 0.2,
            }}
            animate={{
              translateX: "100%",
              scaleX: 1,
            }}
            exit={{
              translateX: "100%",
              scaleX: 1,
              transition: {
                repeat: 0,
                // ease: [0.65, 0.815, 0.735, 0.395],
                ease: "easeOut",
                duration: 1,
              },
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default NavProgress;

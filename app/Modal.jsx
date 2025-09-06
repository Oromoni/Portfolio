"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const Modal = ({ modal, projects }) => {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const moveHandler = (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <>
      {/* Main Modal */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[230px] w-[350px] rounded-2xl fixed top-0 left-0 bg-white overflow-hidden pointer-events-none flex items-center justify-center z-[9999]"
      >
        <div
          style={{ top: index * -100 + "%" }}
          className="h-[100%] w-[100%] absolute transition-[top] duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, i) => (
            <div
              key={`modal_${i}`}
              className="flex items-center justify-center h-full w-full"
              style={{ backgroundColor: project.color }}
            >
              <Image
                src={project.src}
                width={300}
                height={200}
                alt={project.title}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        ref={cursor}
        className="w-[80px] h-[80px] rounded-full bg-white/65 text-black/80 fixed top-0 left-0 z-[9999] flex items-center justify-center text-sm font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      />
      <motion.div
        ref={cursorLabel}
        className="w-[80px] h-[80px] rounded-full bg-black/210 text-black fixed top-0 left-0 z-[9999] flex items-center justify-center text-sm font-semibold pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
};

export default Modal;

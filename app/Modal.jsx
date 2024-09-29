import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
//import styles from './style.module.css';
import gsap from 'gsap';
// import Image1 from "../app/image/rest.png"
// import Image2 from "../app/image/locomotive.png"
// import Image3 from "../app/image/officestudio.png"
// import Image4 from "../app/image/silencio.png"

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

const projects = [{
        title: "Defi Bank",
        src: "/rest.png",
        color: "#000000"
    },
    {
        title: "NHS",
        src: "/../public/locomotive.png",
        color: "#8C8C8C"
    },
    {
        title: "Web3",
        src: "/../public/officestudio.png",
        color: "#EFE8D3"
    },
    {
        title: "Rango",
        src: "/../public/silencio.png",
        color: "#706D63"
    }
]


const Modal=({modal, projects})=> {

  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX)
      yMoveContainer(pageY)
      xMoveCursor(pageX)
      yMoveCursor(pageY)
      xMoveCursorLabel(pageX)
      yMoveCursorLabel(pageY)
    })
  }, [])

  return (
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className="h-[300px] w-[350px] rounded-2xl absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center">
            <div style={{top: index * -100 + "%"}} className="h-[100%] w-[100%] absolute transition-[top 0.5s cubic-bezier(0.76, 0, 0.24, 1)]">
            { 
                projects.map( (project, index) => {
                
                return <div className="flex items-center justify-center h-full w-full" style={{backgroundColor: project.color}} key={`modal_${index}`}>
                    <Image 
                    src={project.src}
                    width={300}
                    height={0}
                    alt="image"
                    />
                </div>
                })
            }

            </div>
        </motion.div>
        <motion.div ref={cursor} className="w-[80px] h-[80px] rounded-[50%] bg-white/65 text-black/80 absolute z-10 flex items-center justify-center text-sm font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className="bg-transparent font-semibold w-[80px] h-[80px] rounded-[50%] bg-[#455CE9]  absolute z-10 text-black flex items-center justify-center text-sm  pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
  
    </>
  )
}

export default Modal
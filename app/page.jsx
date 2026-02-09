"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Project from "./Project";
import { SiSolidity } from "react-icons/si";
import { RiNextjsLine, RiTwitterXFill, RiDownloadLine } from "react-icons/ri";
import { FaPython, FaGithub, FaReact, FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Modal from "./Modal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import the ThreeScene component to avoid SSR issues
const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Resta",
    src: "/rest.png",
    color: "#000000",
    link: "https://resta-ldn.vercel.app/",
    stack: [<FaPython key="1" size={25} />, <FaReact key="2" size={25} />, <RiNextjsLine key="3" size={25} />],
  },
  {
    title: "YC Startup",
    src: "/startup.png",
    color: "#000000",
    link: "https://startupyc.vercel.app/",
    stack: [<RiNextjsLine key="1" size={25} />, <FaPython key="2" size={25} />, <FaPython key="3" size={25} />],
  },
  {
    title: "Lux Estate",
    src: "/dubai.png",
    color: "#000000",
    link: "https://realestate-y9z1.vercel.app/",
    stack: [<FaPython key="1" size={25} />, <RiNextjsLine key="2" size={25} />, <FaPython key="3" size={25} />],
  },
  {
    title: "Ecommerce",
    src: "/ecom.png",
    color: "#FFFFFF",
    link: "https://luxvi.vercel.app/",
    stack: [<FaPython key="1" size={25} />, <FaPython key="2" size={25} />, <RiNextjsLine key="3" size={25} />],
  },
];

export default function Home() {
  const [nav, setNav] = useState(false);
  const [click, setClick] = useState(false);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const nameRef = useRef(null);
  const sideRef = useRef(null);
  const leftRef = useRef(null);
  const email = "collins.eth.x@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success(`${email} Copied!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        style: { backgroundColor: "#030f08", color: "white" },
      });
    } catch (err) {
      toast.error("Failed to copy email!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
      });
    }
  };

  useGSAP(() => {}, {});

  useEffect(() => {
    if (leftRef.current) {
      const name1 = nameRef.current.children;
      const side1 = sideRef.current.children;
      const left1 = leftRef.current.children;
      gsap.to(name1, { y: 10, duration: 1, delay: 1, opacity: 1, stagger: 0.8 });
      gsap.to(side1, { duration: 1, delay: 1, opacity: 1, stagger: 0.8 });
      gsap.to(left1, { duration: 1, delay: 1, opacity: 1, stagger: 0.8 });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b scroll-smooth to-[#030f08] from-black h-screen text-white relative z-10 overflow-x-hidden no-scrollbar">
      <section className="min-h-screen relative">
        {/* Mobile Nav */}
        {nav && (
          <div className="h-screen w-full fixed top-0 left-0 z-50 bg-black flex flex-col items-center justify-center">
            <Link href="/" className="py-4 text-xl" onClick={() => setNav(false)}>Home</Link>
            <Link href="#project" className="py-4 text-xl" onClick={() => setNav(false)}>Project</Link>
            <Link href={"/"} className="py-4 text-xl" onClick={() => setNav(false)}> About </Link>
            <a href={"https://uk.linkedin.com/in/oromoni-collins-203b45a4?trk=public_post_feed-actor-name"} className="py-4 text-xl" onClick={() => setNav(false)}> Contact </a>
          </div>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <ThreeScene />
        </Suspense>

        {/* Top Nav */}
        <div className="absolute text-white font-bold w-full flex justify-between sm:justify-center top-2 px-3 sm:flex z-50">
          <div className="hidden sm:flex justify-between gap-14 py-2 text-white/90">
            <Link href="/" className="hover:text-white/50">Home</Link>
            <Link href="#project" className="hover:text-white/50">Projects</Link>
            <button href="/" className="hover:text-white/50" onClick={ copyToClipboard} >Contact</button>
            <Link href="/" className="hover:text-white/50">About</Link>
          </div>
          <Link href="/" className="sm:hidden">Saint</Link>
          <div className="sm:hidden z-50 transition-all">
            {!nav ? (
              <AiOutlineMenu color="white" size={25} onClick={() => setNav(true)} className="transition-all" />
            ) : (
              <IoMdClose color="white" size={25} onClick={() => setNav(false)} className="transition-all" />
            )}
          </div>
        </div>

        {/* Side Icons Left */}
        <div ref={sideRef} className="absolute hidden sm:flex flex-col top-64 left-1 gap-3">
          <RiNextjsLine size={25} className="opacity-0 text-white/30 hover:text-white hover:translate-x-3 hover:transition-all" />
          <SiSolidity size={25} className="text-white/30 opacity-0 hover:text-white hover:translate-x-3 hover:transition-all" />
          <FaPython size={25} className="text-white/30 opacity-0 hover:text-white hover:translate-x-3 hover:transition-all" />
          <FaReact size={25} className="text-white/30 opacity-0 hover:text-white hover:translate-x-3 hover:transition-all" />
        </div>

        {/* Side Icons Right */}
        <div ref={leftRef} className="absolute hidden sm:flex flex-col top-64 right-1 gap-3">
          <Link href="https://github.com/Oromoni?tab=repositories" target="_blank" className="text-white/30 opacity-0 hover:text-white hover:-translate-x-3 hover:transition-all"><FaGithub size={25} /></Link>
          <Link href="https://x.com/collins1062536" target="_blank" className="text-white/30 opacity-0 hover:text-white hover:-translate-x-3 hover:transition-all"><RiTwitterXFill size={25} /></Link>
          <Link href="https://uk.linkedin.com/in/oromoni-collins-203b45a4?trk=public_post_feed-actor-name" target="_blank" className="text-white/30 opacity-0 hover:text-white hover:-translate-x-3 hover:transition-all"><FaLinkedin size={25} /></Link>
          <button onClick={copyToClipboard} className="opacity-10 text-white/30 hover:text-white hover:-translate-x-3 hover:transition-all cursor-pointer pointer-events-auto">
            <CiMail size={25} />
          </button>
        </div>

        {/* Info Section */}
        <div ref={nameRef} className="bottom-[14%] absolute w-full mx-auto text-center text-white/80 flex flex-col items-center justify-center">
          <h4 className="text-xs tracking-widest translate-y-5 opacity-0 mt-1 text-white/40">
            SOFTWARE ENGINEER | BLOCKCHAIN DEVELOPER | AI AUTOMATION
          </h4>
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold translate-y-5 opacity-0 mt-2 tracking-widest">
            COLLINS OROMONI
          </h2>
          <h6 className="mt-0.5 md:mt-3 tracking-widest translate-y-5 opacity-0 text-[#584219] font-semibold text-xs md:text-base">
            CREATIVE DEVELOPER
          </h6>
          <a
            href="/bosscv.pdf"
            download
            onClick={() => toast.success("CV Downloaded!", { position: "top-right", autoClose: 3000, hideProgressBar: true, closeOnClick: true, draggable: true, pauseOnHover: true, style: { backgroundColor: "#030f08", color: "white" } })}
            className="mt-0.5 md:mt-3 tracking-widest translate-y-5 opacity-0 text-white/30 hover:text-white hover:translate-y-1 hover:transition-all"
          >
            <RiDownloadLine size={25} />
          </a>
        </div>

        {/* Projects Section */}
        <main className="text-white z-10 top-full absolute mt-3 w-full">
          <div className="flex h-screen items-center justify-center w-full">
            <div className="w-[80%] flex flex-col justify-center items-center" id="project">
              {projects.map((project, index) => (
                <Project title={project.title} index={index} img={project.src} setModal={setModal} key={index} link={project.link} stack={project.stack} />
              ))}
            </div>
            <Modal modal={modal} projects={projects} />
          </div>

          {/* Footer for mobile */}
          <div className={`flex sm:hidden justify-between px-3 transition-all ${nav ? "relative z-60" : "relative z-10"}`}>
            <div className="text-sm text-white/75">©Collins O</div>
            <div className="flex gap-2">
              <FaGithub size={25} className="text-white/30 hover:text-white" />
              <RiTwitterXFill size={25} className="text-white/30 hover:text-white" />
              <FaLinkedin size={25} className="text-white/30 hover:text-white" />
              <button onClick={copyToClipboard} className="text-white/30 hover:text-white cursor-pointer pointer-events-auto">
                <CiMail size={25} />
              </button>
            </div>
          </div>
        </main>
        <ToastContainer />
      </section>
    </div>
  );
}

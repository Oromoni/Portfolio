"use client"
import Link from "next/link";
import React, { useState } from "react";


const Project = ({index, title, setModal,link,stack}) => {
        

  return <Link href={link} target="_blank" className=" transition-all w-full flex items-center space-between border-t cursor-pointer pt-12 pr-10 pb-12 hover:opacity-[0.6] md:pl-6" onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}}>
        <div className="flex justify-between w-full">
        <h1 className="font-semibold">{title}</h1>

                <div className="flex gap-3">{stack}</div>
        </div>

</Link>;
};

export default Project;

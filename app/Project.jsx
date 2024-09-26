import Link from "next/link";
import React, { useState } from "react";


const Project = ({index, title, setModal,img}) => {
        

  return <Link href={"/"} className=" transition-all w-full flex items-center space-between border-t cursor-pointer pt-12 pr-10 pb-12 hover:opacity-[0.6] pl-6" onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}}>
        <div className="flex justify-between w-full">
        <h1 className="font-semibold">{title}</h1>

                <div>Stack</div>
        </div>

</Link>;
};

export default Project;

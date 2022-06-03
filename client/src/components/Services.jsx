import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { SiSpeedtest } from "react-icons/si";

const ServiceCard = ({color, title, icon, subtitle})=>(
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
    </div>
)


const Services = ()=>{
    return (
        <div className='flex w-full flex-col md:flex-row justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className="flex-1 flex flex-col justify-start items-start ">
                    <h1 className="text-white text-3xl sm:text-5xl py-2">
                        Services that we 
                        <br />
                        continue to improve
                    </h1>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServiceCard 
                        color="bg-[#2952E3]"
                        title="Security Guaranteed"
                        icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                        subtitle="We are providing all of our services with full gaurantee. we always maintain privacy and quality of our products."
                    />
                    <ServiceCard 
                        color="bg-[#8945F8]"
                        title="Best exchange rates"
                        icon={<BiSearchAlt fontSize={21} className="text-white" />}
                        subtitle="We are providing all of our services with full gaurantee. we always maintain privacy and quality of our products."
                    />
                    <ServiceCard 
                        color="bg-[#F84550]"
                        title="Fastest Transections"
                        icon={<SiSpeedtest fontSize={21} className="text-white" />}
                        subtitle="We are providing all of our services with full gaurantee. we always maintain privacy and quality of our products."
                    />
                </div>
            </div>
        </div>
    )
}

export default Services
"use client"

// icons
import { BiLink } from "react-icons/bi";
import { LuEqual } from "react-icons/lu";
import { RxCaretDown } from "react-icons/rx";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import { SiFrontendmentor } from "react-icons/si";
import { useState } from "react";
import { Input } from "../Inputs";
import { FormData } from "@/types/form";

const platforms = [
    {
        name: "Github",
        icon: <TbBrandGithubFilled />
    },
    {
        name: "Youtube",
        icon: <FaYoutube />
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedin />
    },
    {
        name: "Facebook",
        icon: <FaFacebook />
    },
    {
        name: "Frontend Mentor",
        icon: <SiFrontendmentor />
    }
]

const Link: ({id}: {id: number}) => JSX.Element = ({ id }) => {

    const [ platform, setPlatform ] = useState(0);
    const [ showPlatforms, setShowPlatforms ] = useState(false);
    const [ data, setData ] = useState<FormData>({
        platform: "",
        link: "",
    })

    return (
        <div className="bg-grey-20 rounded-lg p-4 space-y-4">
            <div className="justify-between flex text-grey">
                <div className="v-center gap-2">
                    <LuEqual />
                    <span className="font-semibold">
                        Link #{id}
                    </span>
                </div>
                <button className="text-grey font-medium">
                    Remove
                </button>
            </div>

            <div className="space-y-4">
                <div className="text-grey">
                    <label htmlFor="platform" className="text-sm">
                        Platform
                    </label>

                    <div className="relative">
                        <div>
                            <button type="button" className="group w-full bg-white gap-x-1.5 rounded-md v-center justify-between py-2 px-4 text-grey border border-grey-50 hover:border-primary hover:shadow-input" aria-expanded="true" onClick={() => setShowPlatforms(!showPlatforms)}>
                            <span className="v-center gap-4">
                                <span className="text-xl">
                                    {platforms[platform].icon}
                                </span>
                                <span className="font-medium">
                                    {platforms[platform].name}
                                </span>
                            </span>
                            <RxCaretDown className={`text-2xl group-hover:text-primary transition-item ${showPlatforms && "rotate-180"}`} />
                            </button>
                        </div>

                        <div className={`${showPlatforms ? "opacity-1" : "hidden opacity-0"} transition-all duration-200 ease-in absolute w-full z-50 mt-2 origin-top-right rounded-md bg-white shadow-md`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                            <div className="py-1 px-4" role="none">
                            {
                                platforms.map((each, index) => (
                                    <div key={each.name} className={`group bg-white cursor-pointer py-3 ${platform === index ? "text-primary" : "text-grey"} ${index !== platforms.length - 1 ? "border-b" : "border-0"} border-grey-50`} aria-expanded="true" onClick={() => {setPlatform(index); setShowPlatforms(false)}}>
                                        <div className="v-center gap-4">
                                            <span className="group-hover:text-primary transition-item">
                                                <span className="text-xl">
                                                    {each.icon}
                                                </span>
                                            </span>
                                            <span className="font-medium group-hover:text-primary transition-item">
                                                {each.name}
                                            </span>
                                        </div>
                                        </div>
                                ))
                            }
                            </div>
                        </div>
                        </div>
                        
                </div>
                <Input name="link" icon={<BiLink />} label="Link" placeholder="e.g. https://platform.com/username" setValue={setData} value={data} />
            </div>
        </div>
    )
}

export default Link;
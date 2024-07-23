"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";

// icons
import { BiLink } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const tabs = [
    {
        name: "Links",
        link: "/",
        icon: <BiLink />,
    },
    {
        name: "Profile Details",
        link: "/profile-details",
        icon: <FaRegUserCircle />,
    },
]

export default function Navbar() {

    const pathname = usePathname();

    return (
        <nav className="rounded-xl bg-white md:m-6 mb-4 py-4 px-6">
            <div className="flex justify-between items-center">
                <Logo />

                <div className="flex gap-4">
                    {
                        tabs.map((tab) => {

                            const { name, link, icon } = tab
                            const slash_index = pathname.lastIndexOf("/");
                            const path = pathname.slice(slash_index);
                            const isActive = path === link;

                            return (
                                <Link key={name} href={link}>
                                    <div className={`transition-item v-center rounded-lg gap-2 md:px-[27px] md:py-[11px] px-6 py-3 ${isActive ? "bg-primary-20 text-primary" : "bg-transparent text-grey hover:text-primary"}`}>
                                        {icon}
                                        <span className="font-semibold hidden md:block">
                                            {name}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

                <Link href="/preview">
                    <button className="secondary_btn md:px-[27px] md:py-[11px] px-4 py-3">
                        <span className="font-semibold hidden md:block">
                            Preview
                        </span>
                        <span className="md:hidden">
                            <AiOutlineEye />
                        </span>
                    </button>
                </Link>
            </div>
        </nav>
    )
}
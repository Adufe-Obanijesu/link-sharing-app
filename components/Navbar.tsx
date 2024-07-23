"use client"

import Link from "next/link";
import Logo from "./Logo";

// icons
import { BiLink } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

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
        <nav className="rounded-xl bg-white m-6 py-4 px-6">
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
                                    <div className={`transition-item v-center rounded-lg gap-2 px-[27px] py-[11px] ${isActive ? "bg-primary-20 text-primary" : "bg-transparent text-grey hover:text-primary"}`}>
                                        {icon}
                                        <span className="font-semibold">
                                            {name}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

                <Link href="/preview">
                    <button className="border border-primary rounded-lg text-primary hover:bg-primary-20 px-[27px] py-[11px]">
                        <span className="font-semibold">
                            Preview
                        </span>
                    </button>
                </Link>
            </div>
        </nav>
    )
}
import PreviewNavbar from "@/components/PreviewNavbar";

// icons
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function Preview() {
    return (
        <section className="md:px-4">
            <div className="hidden md:block absolute top-0 left-0 h-[300px] bg-primary w-full rounded-b-[32px] z-0"></div>
            
            <div className="md:space-y-24">
                <PreviewNavbar />
                <div className="md:flex justify-center z-10 relative">
                    <div className="bg-white xl:w-1/4 lg:w-1/3 md:w-3/5 rounded-xl p-8 md:shadow-md">
                    <div className="w-full px-3">
                <div className="h-center w-full">
                    <div className="flex flex-col w-full items-center gap-2">
                        <div className="h-32 w-32 bg-lightgrey rounded-full"></div>
                        <div className="h-5 w-2/3 mt-2 bg-lightgrey rounded-lg"></div>
                        <div className="h-3 w-1/4 bg-lightgrey rounded-lg"></div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-5 px-6">
                    <div className="w-full h-10 rounded-lg px-4 v-center justify-between bg-black text-white">
                        <div className="v-center gap-2">
                            <TbBrandGithubFilled className="text-xl" />
                            <span>
                                Github
                            </span>
                        </div>

                        <FaArrowRight className="2xl" />
                    </div>
                    <div className="w-full h-10 rounded-lg px-4 v-center justify-between bg-danger text-white">
                        <div className="v-center gap-2">
                            <FaYoutube className="text-xl" />
                            <span>
                                Youtube
                            </span>
                        </div>

                        <FaArrowRight className="2xl" />
                    </div>
                    <div className="w-full h-10 rounded-lg px-4 v-center justify-between bg-blue-500 text-white">
                        <div className="v-center gap-2">
                            <FaLinkedin className="text-xl" />
                            <span>
                                LinkedIn
                            </span>
                        </div>

                        <FaArrowRight className="2xl" />
                    </div>
                    <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                    <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
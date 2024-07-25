import { Platform } from "@/types/utils";
import { ReactNode } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiFrontendmentor } from "react-icons/si";
import { TbBrandGithubFilled } from "react-icons/tb";

export const platform_icons: Record<Platform, ReactNode> = {
  Github: <TbBrandGithubFilled />,
  Youtube: <FaYoutube />,
  LinkedIn: <FaLinkedin />,
  Facebook: <FaFacebook />,
  "Frontend Mentor": <SiFrontendmentor />,
};

export const platforms: Platform[] = [
  "Github",
  "Youtube",
  "LinkedIn",
  "Facebook",
  "Frontend Mentor",
];

export const platform_color = {
  Github: "bg-black",
  Youtube: "bg-red-500",
  LinkedIn: "bg-blue-500",
  Facebook: "bg-blue-600",
  "Frontend Mentor": "bg-cyan-500",
};

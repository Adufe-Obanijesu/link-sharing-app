import Image from "next/image";

export default function Logo() {
    return (
        <Image src="/logo.png" height={1000} width={1000} alt="logo" className="h-10 w-auto" />
    )
}
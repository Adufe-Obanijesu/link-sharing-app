import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <Image src="/logo.png" height={1000} width={1000} alt="logo" className="h-10 w-auto" />
        </Link>
    )
}
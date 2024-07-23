import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="shrink-0">
            <div className="v-center gap-2">
                <Image src="/logo-l.png" height={1000} width={1000} alt="logo" className="h-10 w-auto" />
                <Image src="/logo-r.png" height={1000} width={1000} alt="logo" className="h-6 w-auto hidden md:block" />
            </div>
        </Link>
    )
}
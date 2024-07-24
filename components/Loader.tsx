export default function Loader({ large }: { large?: boolean }) {
    return (
        <span className={`${large ? "w-20 h-20" : "w-5 h-5"} inline-flex bg-transparent ${large ? "border-4" : "border-2"} border-t-transparent ${large ? "border-primary/25" : "border-white"} rounded-full animate-spin`}></span>
    )
}
import Button from "./Button";

export default function PreviewNavbar() {
    return (
        <nav className="v-center justify-between p-4 rounded-lg md:mt-4 bg-white relative z-50">
            <button className="secondary_btn py-2 px-6">
                Back to Editor
            </button>

            <button className="bg-primary hover:bg-primary-50 disabled:cursor-not-allowed py-2 px-6 text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25">
                Share Link
            </button>
        </nav>
    )
}
export default function NoLink() {
    return (
        <div className="md:p-12 py-10 px-6 bg-grey-20 space-y-10 rounded-lg">

          <div className="h-center">
          <object
          type="image/svg+xml"
          data="/svgs/illustration.svg"
          title="illustration"
          className={`md:w-auto md:h-40 w-full h-auto`}
          >
          Your browser does not support SVG
          </object>
          </div>

          <div className="space-y-6">
            <h3 className="text-center">
              Let&apos;s get you started
            </h3>

            <p className="text-center">
            Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
            </p>
          </div>
        </div>
    )
}
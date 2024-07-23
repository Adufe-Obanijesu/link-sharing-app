import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="col-span-3 md:p-10 p-6 rounded-lg bg-white space-y-8">
      <div className="space-y-2">
        <h3>
          Customize your links
        </h3>
        <p>
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
      </div>

      <div className="space-y-4">
        <button className="secondary_btn w-full py-2 font-medium">
          + Add new link
        </button>

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

        <div className="space-y-6 pt-4">
          <hr className="border-grey-50 mt-2" />

          <div className="flex justify-end">
            <Button text="Save" disabled={true} auto />
          </div>
        </div>
      </div>
    </div>
  );
}

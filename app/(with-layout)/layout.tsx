import Navbar from "@/components/Navbar";
import PhoneMockup from "@/components/PhoneMockup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pb-8">
        <Navbar />
        <main className="md:px-6 px-4">
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 hidden lg:flex justify-center bg-white p-10 rounded-lg">
              <PhoneMockup />
            </div>

            <div className="lg:col-span-3 md:py-10 md:px-10 px-6 rounded-lg bg-white space-y-8">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

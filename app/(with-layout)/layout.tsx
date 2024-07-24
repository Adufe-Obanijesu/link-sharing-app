import Wrapper from "@/components/Wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pb-8">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}

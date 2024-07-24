import Wrapper from "@/components/Wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

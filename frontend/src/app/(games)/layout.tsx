import AppLayout from "@/components/AppLayout/GamesLayout";

export default function HomeGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}

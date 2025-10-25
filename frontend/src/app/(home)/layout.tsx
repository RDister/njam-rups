import HomeLayout from "@/components/HomeLayout/HomeLayout";

export default function HomeGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeLayout>{children}</HomeLayout>;
}

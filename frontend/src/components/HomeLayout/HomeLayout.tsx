import { memo, ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div>{children}</div>;
};

export default memo(HomeLayout);

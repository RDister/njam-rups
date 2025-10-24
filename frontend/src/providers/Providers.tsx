"use client";

import { AppProgressProvider } from "@bprogress/next";
import { ReactNode } from "react";
import { getQueryClient } from "@/utils/getQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProgressProvider
        height="3px"
        color="#8143c7"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </AppProgressProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;

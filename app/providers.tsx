"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useState } from "react";
import { SimpleThemeProvider } from "@/components/theme/SimpleThemeProvider";
import { ThemeVariantProvider } from "@/components/theme/ThemeVariantProvider";
import "@/lib/i18n/config";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SimpleThemeProvider defaultTheme="system">
          <ThemeVariantProvider>
            {children}
            <Toaster richColors position="top-right" />
          </ThemeVariantProvider>
        </SimpleThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

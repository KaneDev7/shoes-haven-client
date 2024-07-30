"use client"
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import FilterTextProvider from "@/context/FilterTextContext";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <FilterTextProvider>
              {children}
            </FilterTextProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

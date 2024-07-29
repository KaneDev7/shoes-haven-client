"use client"
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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
            {children}
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

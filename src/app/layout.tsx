import { Toaster } from 'react-hot-toast';
import { ToastContainer} from "react-toastify";
import GlobalDrawer from '@/shared/drawer-views/container';
import GlobalModal from '@/shared/modal-views/container';
import { ThemeProvider } from '@/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import StoreProvider from "./StoreProvider"
import cn from '@/utils/class-names';
import '@/app/globals.css';



export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={(inter.variable, lexendDeca.variable, 'font-inter')}
      >

        <StoreProvider>
          <ThemeProvider>
            {children}
            <Toaster />
            <ToastContainer />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

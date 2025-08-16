import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Footer from '@/layouts/hydrogen/footer/footer';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col">
      <div className="flex-grow flex">
        <div className="hidden xl:block w-[270px] 2xl:w-72">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-grow flex flex-col custom-scrollbar bg-lightgray-100 dark:bg-greenPrimary-400 px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9  overflow-y-auto max-h-screen">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

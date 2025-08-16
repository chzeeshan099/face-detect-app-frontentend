import Link from 'next/link';
import Image from 'next/image';
// import { Title, Button } from 'rizzui';
import { siteConfig } from '@/config/site.config';
import NotFoundImg from '@public/not-found.png';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (<div className="flex min-h-screen flex-col bg-[#F8FAFC]">
    <div className="sticky top-0 z-40 flex justify-center py-5 backdrop-blur-lg lg:backdrop-blur-none xl:py-10">
      <Link href={routes?.moneyMutt?.dashboard}>
        WEBSITE LOGO
      </Link>
    </div>

    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Image
          src={NotFoundImg}
          alt="not found"
          className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
        />
        <Link href={routes?.moneyMutt?.dashboard}>
        </Link>
      </div>
    </div>
    {/* <SocialItems /> */}
  </div>
  );
}

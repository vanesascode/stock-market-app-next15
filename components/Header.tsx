import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container flex justify-between items-center px-6 py-4 text-gray-500">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            alt="Logo"
            width={200}
            height={32}
            className="h-9 w-auto cursor-pointer"
          />
        </Link>
        {/* <nav className="hidden sm:block">
          <NavItems />
        </nav> */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;

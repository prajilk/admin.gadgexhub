"use client";

import { usePathname } from "next/navigation";

const NavHeading = () => {
  const pathname = usePathname();
  const path = pathname.split("/").at(-1);

  return (
    <h1 className="ms-14 text-xl font-medium capitalize lg:ms-0">{path}</h1>
  );
};

export default NavHeading;

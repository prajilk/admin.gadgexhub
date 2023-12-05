import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const SubMenu = ({
  data,
  isOpen,
}: {
  data: { name: string; icon: LucideIcon; menus: string[] };
  isOpen: boolean;
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <Popover
        placement="right"
        showArrow={true}
        classNames={{
          base: "before:bg-white before:dark:bg-zinc-800 before:z-10 before:shadow-none",
        }}
      >
        <PopoverTrigger className="focus:text-black focus:dark:text-white">
          <button
            className={`flex cursor-default items-center justify-start rounded-md bg-transparent p-3 font-medium outline-none duration-300 md:cursor-pointer ${
              pathname.includes(data.name) && "text-primary"
            }`}
            onClick={() => isOpen && setSubMenuOpen(!subMenuOpen)}
          >
            <data.icon size={23} className="min-w-max" />
            <p className="ml-5 flex-1 text-left capitalize">{data.name}</p>
            <ChevronDown
              className={`${
                subMenuOpen && "rotate-180"
              } flex-shrink-0 duration-200`}
              size={15}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent hidden={isOpen} className="bg-white dark:bg-zinc-800">
          <ul className="min-w-[200px] space-y-1 py-1">
            {data.menus.map((menu, i) => (
              <li
                className="cursor-pointer rounded-md py-1 ps-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                key={i}
              >
                {menu}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col overflow-hidden pl-14 text-sm font-normal"
      >
        {data.menus?.map((menu) => (
          <li key={menu}>
            <Link
              href="/"
              className="flex cursor-default items-center gap-7 rounded-md !bg-transparent p-2 font-medium capitalize text-zinc-500 duration-300 hover:text-primary dark:text-zinc-400 md:cursor-pointer"
            >
              {menu}
            </Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;

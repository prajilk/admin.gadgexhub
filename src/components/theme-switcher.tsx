"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <Button
          isIconOnly
          variant="light"
          size="sm"
          radius="full"
          onClick={() => setTheme("light")}
        >
          <Sun className="text-zinc-400" />
        </Button>
      ) : (
        <Button
          isIconOnly
          variant="light"
          size="sm"
          radius="full"
          onClick={() => setTheme("dark")}
          className="hover:!bg-zinc-200"
        >
          <Moon className="text-zinc-500" />
        </Button>
      )}
    </div>
  );
}

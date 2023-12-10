import { authOptions } from "@/lib/auth";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User as NextUIUser,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Settings, LogOut } from "lucide-react";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";

const User = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Popover
      showArrow
      placement="bottom"
      classNames={{
        base: "before:z-10 before:shadow-none",
      }}
    >
      <PopoverTrigger className="rounded-full bg-zinc-100 py-1 ps-1 dark:bg-zinc-800 sm:pe-4 md:py-1 md:ps-1">
        <NextUIUser
          as="button"
          name={session?.user.name}
          description={session?.user.role}
          className="gap-1 transition-transform sm:gap-2"
          classNames={{
            description:
              "text-success font-medium text-[0.5rem] md:text-xs hidden sm:block",
            name: "text-xs lg:text-sm hidden sm:block",
          }}
          avatarProps={{
            name: "",
            className: "w-8 h-8 md:w-10 md:h-10",
            showFallback: true,
            classNames: { fallback: "w-full h-full" },
            fallback: <Image src="/avatar.jpg" alt="avatar" radius="full" />,
            src: session?.user.image || "",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserCard session={session} />
      </PopoverContent>
    </Popover>
  );
};

export default User;

const UserCard = ({ session }: { session: Session | null }) => {
  return (
    <Card
      shadow="none"
      className="border-non min-w-[250px] max-w-[300px] bg-transparent"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            showFallback
            classNames={{
              fallback: "w-full h-full",
            }}
            fallback={<Image src="/avatar.jpg" alt="avatar" radius="full" />}
            size="md"
            src={session?.user.image || ""}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none">
              {session?.user.name}
            </h4>
            <h5 className="text-xs font-medium tracking-tight text-success">
              {session?.user.role}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="pl-px text-small dark:text-default-500">
          Welcome back {session?.user.name}
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="flex-col gap-3">
        <Button
          as={Link}
          href="/dashboard/settings"
          startContent={<Settings size={15} />}
          size="sm"
          variant="flat"
          className="w-full justify-start"
        >
          Settings
        </Button>
        <Button
          as={Link}
          href="/signout"
          startContent={<LogOut size={15} />}
          size="sm"
          variant="flat"
          color="danger"
          className="w-full justify-start"
        >
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

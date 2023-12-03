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
} from "@nextui-org/react";
import { Settings, LogOut } from "lucide-react";

const User = () => {
  return (
    <Popover
      showArrow
      placement="bottom"
      classNames={{
        content: "bg-white dark:bg-dark",
        base: "before:bg-white before:dark:bg-dark",
      }}
    >
      <PopoverTrigger className="rounded-full bg-zinc-200 py-1 ps-1 dark:bg-zinc-800 sm:pe-4 md:py-1 md:ps-1">
        <NextUIUser
          as="button"
          name="Prajil K"
          description="Super Admin"
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
            src: "https://i.pravatar.cc/150?u=a04258114e29026702",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserCard />
      </PopoverContent>
    </Popover>
  );
};

export default User;

const UserCard = () => {
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
            size="md"
            className="ring-zinc-300 dark:ring-default"
            src="https://i.pravatar.cc/150?u=a04258114e29026702"
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none dark:text-default-600">
              Prajil K
            </h4>
            <h5 className="text-xs font-medium tracking-tight text-success">
              Super Admin
            </h5>
          </div>
        </div>
        <Button color="primary" radius="full" size="sm">
          Profile
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="pl-px text-small dark:text-default-500">
          Welcome back Prajil K
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="flex-col gap-3">
        <Button
          startContent={<Settings size={15} />}
          size="sm"
          variant="flat"
          className="w-full justify-start bg-zinc-200 text-dark dark:bg-zinc-800 dark:text-zinc-200"
        >
          Settings
        </Button>
        <Button
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

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Button } from "@nextui-org/react";
import {
  AlertOctagon,
  Ban,
  Bell,
  Boxes,
  Package2,
  Trash2,
  User,
} from "lucide-react";

type NotificationProps = {
  key: string;
  value: string;
  date?: string;
};

const data = [
  {
    key: "OOS",
    value: "OnePlus Buds Z2",
    date: "12/11/2023",
  },
  {
    key: "OP",
    value: "John Doe",
    date: "03/12/2023 05:05 pm",
  },
  {
    key: "OP",
    value: "John Doe",
    date: "03/12/2023 05:01 pm",
  },
  {
    key: "NUR",
    value: "john.doe@example.com",
    date: "03/12/2023",
  },
  {
    key: "EGU",
    value: "7",
  },
];

const Notification = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Badge content="5" size="lg" color="primary">
          <Bell className="text-zinc-500 dark:text-zinc-400" />
        </Badge>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0 dark:bg-dark">
        <SheetHeader className="p-5">
          <SheetTitle className="flex items-center gap-4">
            <Bell /> Notifications
          </SheetTitle>
        </SheetHeader>
        <div className="scrollbar-thin flex-1 overflow-y-scroll px-5">
          {data.map((item, i) => (
            <NotificationCard value={item} key={i} />
          ))}
        </div>
        <SheetFooter className="border-t p-3">
          <Button size="sm" variant="light" color="danger">
            Clear all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Notification;

function NotificationCard({ value }: { value: NotificationProps }) {
  const data = formatData(value);

  return (
    <>
      <div className="my-3 flex items-center gap-3">
        <span
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: `rgb(${data.color} / 0.2)`,
            color: `rgb(${data.color})`,
          }}
        >
          <data.icon />
        </span>
        <div className="space-y-0.5">
          <h1 className="text-sm font-semibold">{data.title}</h1>
          <p className="text-xs text-zinc-400">{data.description}</p>
        </div>
        <Trash2 className="ms-auto flex-shrink-0 text-danger" size={15} />
      </div>
      <hr />
    </>
  );
}

function formatData(data: NotificationProps) {
  if (data.key === "EGU") {
    return {
      title: "Expired Guest Users",
      description: `${data.value} expired guest users are to be removed.`,
      color: "6 182 212",
      icon: AlertOctagon,
    };
  } else if (data.key === "OP") {
    return {
      title: "Order Placed",
      description: `New Order placed by ${data.value} at ${data.date}`,
      color: "99 102 241",
      icon: Package2,
    };
  } else if (data.key === "NUR") {
    return {
      title: "New User Registration",
      description: `New user registered with email: ${data.value} at ${data.date}`,
      color: "34 197 94",
      icon: User,
    };
  } else if (data.key === "OOS") {
    return {
      title: "Out Of Stock",
      description: `Product ${data.value} have been out of stock since ${data.date}.`,
      color: "239 68 68",
      icon: Boxes,
    };
  } else {
    return {
      title: "Unknown",
      description: `Unknown`,
      color: "217 70 239",
      icon: Ban,
    };
  }
}

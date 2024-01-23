import { Button, Card, CardBody, User } from "@nextui-org/react";
import { Mail, Phone, User2 } from "lucide-react";
import Link from "next/link";

type CustomerDetailsProps = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
};

const CustomerDetails = ({ data }: { data: CustomerDetailsProps }) => {
  return (
    <Card className="rounded-sm shadow-sm">
      <CardBody className="p-0">
        <div className="flex items-center justify-between p-3">
          <h1>Customer details</h1>
          <Button
            as={Link}
            href={`/dashboard/customers/${data.id}`}
            size="sm"
            color="primary"
            variant="light"
          >
            View Profile
          </Button>
        </div>
        <hr />
        <div className="p-3">
          <User
            avatarProps={{
              size: "lg",
              showFallback: true,
              fallback: <User2 />,
              radius: "sm",
              src: data.image
                ? process.env.NEXT_PUBLIC_IMAGE_URL + data.image
                : "",
            }}
            description="Customer"
            name={data.name}
          />
          <ul className="my-2 space-y-3">
            <li className="flex items-center gap-2">
              <Mail className="text-zinc-400" size={15} />
              <span className="text-sm">{data.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-zinc-400" size={15} />
              <span className="text-sm">{data.phone || "NULL"}</span>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomerDetails;

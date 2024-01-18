import { Address } from "@/lib/types/types";
import { Card, CardBody } from "@nextui-org/react";
import { MapPin } from "lucide-react";

const AddressDetails = ({ data }: { data: Address }) => {
  return (
    <Card className="mt-5 rounded-sm shadow-sm">
      <CardBody className="p-0">
        <div className="flex items-center gap-3 p-3">
          <MapPin className="text-zinc-400" size={20} />
          <h1>Shipping Address</h1>
        </div>
        <hr />
        <div className="p-3">
          <ul className="my-2 space-y-1 text-sm">
            <li>{data.name}</li>
            <li>{data.address}</li>
            <li>{data.locality}</li>
            <li>
              {data.district} - {data.pincode}
            </li>
            <li>{data.state}</li>
            <li>{data.phone}</li>
            <li>{data.alt_phone}</li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddressDetails;

import { Avatar, Button } from "@nextui-org/react";
import DefaultSheet from "../sheets/default-sheet";
import EditCustomerForm from "../forms/edit-customer";
import { CustomerProfileProps } from "@/lib/types/types";

const CustomerProfile = ({
  customerData,
}: {
  customerData: CustomerProfileProps;
}) => {
  return (
    <>
      <h1 className="mb-3 text-xl font-medium text-zinc-400">
        Customer Profile
      </h1>
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2">
        <div className="flex rounded-xl bg-white p-5 shadow-md dark:bg-dark">
          <Avatar
            radius="full"
            className="flex-shrink-0 text-large md:h-20 md:w-20"
            showFallback
            classNames={{
              fallback: "w-full h-full",
            }}
            name=""
            src={customerData?.image || ""}
          />
          <div className="ms-3 space-y-1.5">
            <h1 className="text-lg font-semibold">{customerData.name}</h1>
            <p className="text-xs text-zinc-400">
              Email:{" "}
              <span className="font-medium text-black dark:text-white">
                {customerData.email}
              </span>
            </p>
            <p className="text-xs text-zinc-400">
              Phone:{" "}
              <span className="font-medium text-success">
                {customerData.phone}
              </span>
            </p>
            <p className="text-xs text-zinc-400">
              Gender:{" "}
              <span className="font-medium text-success">
                {customerData.gender}
              </span>
            </p>
          </div>
          <DefaultSheet
            title="Edit Customer"
            trigger={
              <Button variant="flat" size="sm" className="ms-auto">
                Edit
              </Button>
            }
            classNames={{
              content: "min-w-[40%]",
            }}
          >
            <div className="px-5">
              <EditCustomerForm customer={customerData} />
            </div>
          </DefaultSheet>
        </div>
        <div className="space-y-1.5 rounded-xl bg-white p-5 shadow-md dark:bg-dark">
          <h1 className="text-lg font-semibold">Account details</h1>
          <p className="text-xs text-zinc-400">
            Created At:{" "}
            <span className="font-medium text-black dark:text-white">
              {customerData.createdAt}
            </span>
          </p>
          <p className="text-xs text-zinc-400">
            Updated At :{" "}
            <span className="font-medium text-black dark:text-white">
              {customerData.updatedAt}
            </span>
          </p>
          <p className="text-xs text-zinc-400">
            Last Login:{" "}
            <span className="font-medium text-black dark:text-white">
              {customerData.lastLogin}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;

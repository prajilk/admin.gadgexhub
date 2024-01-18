"use client";

import { useUpdateOrderStatus } from "@/api-hooks/orders/update-status";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const UpdateOrderStatus = ({
  oid,
  status,
  setStatus,
}: {
  oid: string;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  function onSuccess() {
    onClose();
    setStatus(status === "pending" ? "ongoing" : "delivered");
  }

  const mutation = useUpdateOrderStatus(onSuccess);

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        color="primary"
        isDisabled={status === "delivered"}
      >
        Update status
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Status
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-zinc-500">
                  Are you want to update the order status from{" "}
                  <b className="font-medium text-[#46D483]">
                    {status === "pending"
                      ? "Order Placed"
                      : "Packed & Shipping"}
                  </b>{" "}
                  to{" "}
                  <b className="font-medium text-[#46D483]">
                    {status === "pending" ? "Packed & Shipping" : "Delivered"}
                  </b>{" "}
                  ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={mutation.isPending}
                  onClick={() =>
                    mutation.mutate({
                      id: oid,
                      status: status === "pending" ? "ongoing" : "delivered",
                    })
                  }
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateOrderStatus;

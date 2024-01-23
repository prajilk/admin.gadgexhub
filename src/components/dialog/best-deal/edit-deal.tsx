import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import EditDealForm from "@/components/forms/best-deal/edit-deal-form";
import { Pencil } from "lucide-react";
import { BestDeal } from "@prisma/client";

export default function EditDeal({
  data,
  setDealData,
}: {
  data: BestDeal;
  setDealData: Dispatch<SetStateAction<BestDeal | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Pencil size={19} />}
        size="sm"
        color="primary"
        variant="light"
        radius="full"
        isIconOnly
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Deal
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <EditDealForm
                  deal={data}
                  onClose={onClose}
                  setDealData={setDealData}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

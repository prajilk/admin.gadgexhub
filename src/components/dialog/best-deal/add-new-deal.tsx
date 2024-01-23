import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { BestDeal } from "@prisma/client";
import NewDealForm from "@/components/forms/best-deal/new-deal-form";

export default function AddNewDeal({
  setDealData,
}: {
  setDealData: Dispatch<SetStateAction<BestDeal | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        radius="full"
        isIconOnly
        color="primary"
        variant="flat"
      >
        <Plus />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Deal
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <NewDealForm onClose={onClose} setDealData={setDealData} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

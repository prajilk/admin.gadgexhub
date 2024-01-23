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
import { HeroBanner } from "@prisma/client";
import NewBannerForm from "@/components/forms/hero-banner/new-banner-form";

export default function AddBanner({
  setBannerData,
}: {
  setBannerData: Dispatch<SetStateAction<HeroBanner[] | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        size="sm"
        endContent={<Plus size={20} />}
        onPress={onOpen}
      >
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Banner
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <NewBannerForm
                  onClose={onClose}
                  setBannerData={setBannerData}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

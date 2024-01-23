"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { HeroBanner } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { Pencil } from "lucide-react";
import EditBannerForm from "@/components/forms/hero-banner/edit-banner-form";

export default function EditHeroBanner({
  banner,
  setBannerData,
}: {
  banner: HeroBanner;
  setBannerData: Dispatch<SetStateAction<HeroBanner[] | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        radius="full"
        onPress={onOpen}
      >
        <Pencil className="text-zinc-500" size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new banner
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <EditBannerForm
                  banner={banner}
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

"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import NewOfferForm from "@/components/forms/marquee-offers/new-offer-form";
import { MarqueeOffers } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export default function CreateOffers({
  setOffersData,
}: {
  setOffersData: Dispatch<SetStateAction<MarqueeOffers[] | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Plus size={15} />}
        size="sm"
        color="primary"
      >
        Add Offer
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new offer
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <NewOfferForm onClose={onClose} setOffersData={setOffersData} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

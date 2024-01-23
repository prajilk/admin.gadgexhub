"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MarqueeOffers } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import EditOfferForm from "@/components/forms/marquee-offers/edit-offer-form";
import { Pencil } from "lucide-react";

export default function EditMarqueeOffer({
  offer,
  setOffersData,
}: {
  offer: MarqueeOffers;
  setOffersData: Dispatch<SetStateAction<MarqueeOffers[] | null>>;
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
                Add new offer
              </ModalHeader>
              <ModalBody className="scrollbar-thin mb-5 max-h-[400px] overflow-y-scroll">
                <EditOfferForm
                  offer={offer}
                  onClose={onClose}
                  setOffersData={setOffersData}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

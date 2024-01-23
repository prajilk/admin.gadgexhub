import { useDeleteDeal } from "@/api-hooks/best-deals/delete-deal";
import { useDeleteOffer } from "@/api-hooks/marquee-offers/delete-offer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { MarqueeOffers } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const DeleteMarqueeOffer = ({
  id,
  setOffersData,
}: {
  id: number;
  setOffersData: Dispatch<SetStateAction<MarqueeOffers[] | null>>;
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Offer deleted successfully.");
    onClose();
    setOffersData((prev) =>
      prev ? prev.filter((offer) => offer.id !== id) : null,
    );
  };

  // Delete OFFER function
  const delete_mutation = useDeleteOffer(onSuccess);

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        size="sm"
        variant="light"
        radius="full"
      >
        <Trash2 className="text-danger" size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Offer?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this offer from database.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => delete_mutation.mutate(id)}
                  isLoading={delete_mutation.isPending}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteMarqueeOffer;

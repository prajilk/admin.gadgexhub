import { useDeleteBanner } from "@/api-hooks/hero-banners/delete-banner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { HeroBanner } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const DeleteHeroBanner = ({
  id,
  setBannerData,
  publicId,
}: {
  id: number;
  setBannerData: Dispatch<SetStateAction<HeroBanner[] | null>>;
  publicId: string;
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Banner deleted successfully.");
    onClose();
    setBannerData((prev) =>
      prev ? prev.filter((banner) => banner.id !== id) : null,
    );
  };

  // Delete BANNER function
  const delete_mutation = useDeleteBanner(onSuccess);

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
                Delete Banner?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this banner from database.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => delete_mutation.mutate({ id, publicId })}
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

export default DeleteHeroBanner;

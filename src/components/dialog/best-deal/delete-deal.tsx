import { useDeleteDeal } from "@/api-hooks/best-deals/delete-deal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { BestDeal } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const DeleteDeal = ({
  id,
  setDealData,
}: {
  id: number;
  setDealData: Dispatch<SetStateAction<BestDeal | null>>;
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Deal deleted successfully.");
    onClose();
    setDealData(null);
  };

  // Delete DEAL function
  const delete_mutation = useDeleteDeal(onSuccess);

  return (
    <>
      <Button
        startContent={<Trash2 size={19} />}
        onPress={onOpen}
        size="sm"
        isIconOnly
        variant="light"
        radius="full"
        color="danger"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Deal?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this deal from database.
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

export default DeleteDeal;

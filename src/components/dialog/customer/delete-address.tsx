import { useDeleteAddress } from "@/api-hooks/addresses/delete-address";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
  ModalFooter,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteAddress = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Address deleted successfully.");
    onClose();
  };

  // Delete address function
  const delete_mutation = useDeleteAddress(onSuccess);

  return (
    <>
      <Tooltip color="danger" content="Delete Address" showArrow>
        <Button
          onPress={onOpen}
          variant="light"
          radius="full"
          size="sm"
          color="danger"
          isIconOnly
        >
          <Trash2 size={20} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Address?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this address from database.
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

export default DeleteAddress;

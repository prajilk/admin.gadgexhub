import { useDeleteCustomer } from "@/api-hooks/customers/delete-customer";
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

const DeleteCustomer = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Customer deleted successfully.");
    onClose();
  };

  // Delete address function
  const delete_mutation = useDeleteCustomer(onSuccess);

  return (
    <>
      <Tooltip color="danger" content="Delete customer" showArrow>
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
                Delete Customer?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this customer from database.
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

export default DeleteCustomer;

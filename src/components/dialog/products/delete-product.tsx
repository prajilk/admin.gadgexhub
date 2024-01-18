import { useDeleteProduct } from "@/api-hooks/products/delete-product";
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

const DeleteProduct = ({
  id,
  children,
}: {
  id: string;
  children?: (onOpen: () => void) => React.ReactNode;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSuccess = () => {
    toast.success("Product deleted successfully.");
    onClose();
  };

  // Delete PRODUCT function
  const delete_mutation = useDeleteProduct(onSuccess);

  return (
    <>
      {children ? (
        children(onOpen)
      ) : (
        <Tooltip color="danger" content="Delete Product" showArrow>
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
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Product?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm dark:text-zinc-400">
                  This action remove this product from database.
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

export default DeleteProduct;

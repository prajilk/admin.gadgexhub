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
import CreateCategoryForm from "@/components/forms/create-category";

const CreateCategory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        size="sm"
        startContent={<Plus size={15} />}
      >
        Create New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new category
              </ModalHeader>
              <ModalBody className="mb-5">
                <CreateCategoryForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCategory;

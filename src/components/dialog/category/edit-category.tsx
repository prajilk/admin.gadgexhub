"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { Category } from "@/lib/types/types";
import EditCategoryForm from "@/components/forms/edit-category";

const EditCategory = ({ category }: { category: Category }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Edit category" showArrow>
        <Button
          onPress={onOpen}
          variant="light"
          radius="full"
          size="sm"
          isIconOnly
          className="text-default-400 active:opacity-50"
        >
          <Pencil size={20} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Category
              </ModalHeader>
              <ModalBody className="mb-5">
                <EditCategoryForm category={category} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCategory;

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
import EditAdminForm from "../../forms/edit-admin-form";
import { Pencil } from "lucide-react";
import { AdminProps } from "@/lib/types/types";

const EditAdmin = ({ admin }: { admin: AdminProps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Edit admin" showArrow>
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
                Edit Admin
              </ModalHeader>
              <ModalBody className="mb-5">
                <EditAdminForm onClose={onClose} admin={admin} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditAdmin;

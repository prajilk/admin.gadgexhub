import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodAdminSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AdminProps, EditAdminResProps } from "@/lib/types/types";
import { useUpdateAdmin } from "@/api-hooks/admins/edit-admin";

const EditAdminForm = ({
  onClose,
  admin,
}: {
  onClose: () => void;
  admin: AdminProps;
}) => {
  const form = useForm<z.infer<typeof ZodAdminSchema>>({
    resolver: zodResolver(ZodAdminSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role === "SUPERADMIN" ? "GUEST" : admin.role,
    },
  });

  const onSuccess = (data: EditAdminResProps) => {
    toast.success("Admin details updated successfully.");
    form.reset({
      name: data.admin?.name,
      email: data.admin?.email,
      password: "",
      role: data.admin?.role === "SUPERADMIN" ? "GUEST" : data.admin?.role,
    });
    onClose();
  };

  const mutation = useUpdateAdmin(onSuccess);

  async function handleUpdateAdmin(data: z.infer<typeof ZodAdminSchema>) {
    mutation.mutate({ id: admin.id, values: data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateAdmin)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input placeholder="Name" {...field} radius="sm" size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input placeholder="Email" {...field} radius="sm" size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  radius="sm"
                  size="sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  placeholder="Select a role"
                  aria-label="role"
                  labelPlacement="outside"
                  size="lg"
                  defaultSelectedKeys={[field.value]}
                  disabledKeys={["empty"]}
                  onChange={field.onChange}
                  radius="sm"
                  classNames={{
                    value: "text-sm",
                  }}
                >
                  {["ADMIN", "GUEST"].map((role) => (
                    <SelectItem
                      key={role}
                      value={role}
                      className="select-item-style"
                    >
                      {role}
                    </SelectItem>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            color="danger"
            type="button"
            variant="light"
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={mutation.isPending}
            isDisabled={!form.formState.isDirty}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditAdminForm;

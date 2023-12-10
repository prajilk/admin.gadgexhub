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
import { ZodAdminSchemaWithPassword } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateAdmin } from "@/api-hooks/admins/create-admin";

const CreateAdminForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof ZodAdminSchemaWithPassword>>({
    resolver: zodResolver(ZodAdminSchemaWithPassword),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "GUEST",
    },
  });

  const onSuccess = () => {
    toast.success("New admin created successfully.");
    onClose();
  };

  const mutation = useCreateAdmin(onSuccess);

  async function handleCreateAdmin(
    data: z.infer<typeof ZodAdminSchemaWithPassword>,
  ) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateAdmin)}>
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
                  autoComplete="no"
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
          <Button color="primary" type="submit" isLoading={mutation.isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateAdminForm;

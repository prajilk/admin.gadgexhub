import { Button, Input } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ZodCategorySchema } from "@/lib/zod-schemas/schema";
import { useCreateCategory } from "@/api-hooks/categories/create-category";

const CreateCategoryForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof ZodCategorySchema>>({
    resolver: zodResolver(ZodCategorySchema),
    defaultValues: {
      category: "",
      parentId: "",
    },
  });

  const onSuccess = () => {
    toast.success("New Category created successfully.");
    onClose();
  };

  const mutation = useCreateCategory(onSuccess);

  async function handleCreateAdmin(data: z.infer<typeof ZodCategorySchema>) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateAdmin)}>
        <div className="mb-1 flex gap-1">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Name" {...field} radius="sm" size="sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem className="max-w-[120px]">
                <FormControl>
                  <Input
                    placeholder="Parent ID"
                    type="number"
                    {...field}
                    radius="sm"
                    size="sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;

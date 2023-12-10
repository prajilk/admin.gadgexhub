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
import { ZodProfileSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUpdateProfile } from "@/api-hooks/edit-profile";
import { AdminProfileResProps } from "@/lib/types/types";

const EditProfileForm = ({ onClose }: { onClose: () => void }) => {
  const { data: session, update } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof ZodProfileSchema>>({
    resolver: zodResolver(ZodProfileSchema),
    defaultValues: {
      name: session?.user.name,
    },
  });

  async function updateSession(updatedData: z.infer<typeof ZodProfileSchema>) {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: updatedData.name,
      },
    });
  }

  const onSuccess = (data: AdminProfileResProps) => {
    toast.success(
      "Profile updated successfully. Refresh the page to see changes!",
    );
    updateSession({
      name: data.name || "",
    });
    form.reset({
      name: data.name,
    });
    onClose();
    router.refresh();
  };

  const mutation = useUpdateProfile(onSuccess);

  async function handleUpdateProfile(data: z.infer<typeof ZodProfileSchema>) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateProfile)} id="edit-profile">
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
            form="edit-profile"
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

export default EditProfileForm;

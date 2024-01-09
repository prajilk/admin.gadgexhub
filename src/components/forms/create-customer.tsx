import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodCustomerSchemaWithPassword } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCustomer } from "@/api-hooks/customers/create-customer";

const CreateCustomerForm = () => {
  const form = useForm<z.infer<typeof ZodCustomerSchemaWithPassword>>({
    resolver: zodResolver(ZodCustomerSchemaWithPassword),
  });

  const mutation = useCreateCustomer();

  async function handleCreateCustomer(
    data: z.infer<typeof ZodCustomerSchemaWithPassword>,
  ) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateCustomer)}>
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
          name="phone"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input placeholder="Phone" {...field} radius="sm" size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  label="Select gender"
                  orientation="horizontal"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex items-center justify-end gap-4">
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

export default CreateCustomerForm;

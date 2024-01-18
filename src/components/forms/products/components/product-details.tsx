import { useCategoryEndChild } from "@/api-hooks/categories/get-end-child";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ProductFormProps } from "@/lib/types/types";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

const ProductDetails = ({ form }: ProductFormProps) => {
  function generateSlug() {
    const name = form.getValues("title");
    if (name) {
      const slug = name.replaceAll(" ", "-").toLowerCase();
      form.setValue("slug", slug);
    }
  }

  const { data: categories } = useCategoryEndChild();
  return (
    <div className="flex-1 p-5 pe-3">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                isRequired
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                variant="faded"
                radius="sm"
                classNames={{
                  label: "font-medium z-0",
                  inputWrapper:
                    "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem className="mt-3">
            <FormControl style={{ margin: "0" }}>
              <div className="flex items-end gap-2">
                <Input
                  {...field}
                  isRequired
                  label="Slug"
                  labelPlacement="outside"
                  placeholder="Slug"
                  variant="faded"
                  radius="sm"
                  classNames={{
                    label: "font-medium z-0",
                    inputWrapper:
                      "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                  }}
                />
                <Button type="button" onClick={generateSlug}>
                  Generate
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem className="mt-9">
            <FormControl>
              <Input
                {...field}
                label="Short Description"
                labelPlacement="outside"
                placeholder="Short Description (optional)"
                variant="faded"
                radius="sm"
                classNames={{
                  label: "font-medium z-0",
                  inputWrapper:
                    "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="mt-3">
            <FormControl>
              <Textarea
                placeholder="Description"
                label="Description"
                labelPlacement="outside"
                radius="sm"
                variant="faded"
                classNames={{
                  label: "text-sm font-medium z-0",
                  inputWrapper:
                    "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  label="Category Id"
                  labelPlacement="outside"
                  onChange={field.onChange}
                  selectedKeys={categories ? [field.value || ""] : ""}
                  radius="sm"
                  isRequired
                  variant="bordered"
                  classNames={{
                    label: "text-sm font-medium z-0",
                    trigger:
                      "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50 mt-1 h-unit-10",
                  }}
                >
                  {categories ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key={1} value={"empty"}>
                      No items to select!
                    </SelectItem>
                  )}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="mt-1">
              <FormControl>
                <Input
                  {...field}
                  isRequired
                  label="Stock"
                  labelPlacement="outside"
                  placeholder="Stock"
                  variant="faded"
                  radius="sm"
                  classNames={{
                    label: "font-medium z-0",
                    inputWrapper:
                      "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["basePrice", "offerPrice"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    label={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    labelPlacement="outside"
                    placeholder={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    variant="faded"
                    radius="sm"
                    classNames={{
                      label: "font-medium capitalize z-0",
                      input: "placeholder:capitalize",
                      inputWrapper:
                        "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;

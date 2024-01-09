import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ProductFormProps } from "@/lib/types/types";
import { Button, Input } from "@nextui-org/react";
import { Ban, Plus } from "lucide-react";
import { useState } from "react";
import AddColorSection from "./add-color-section";
import { useGlobalContext } from "@/context/store";

const ProductOptions = ({ form }: ProductFormProps) => {
  const { colorVariants, setColorVariants } = useGlobalContext();
  const [disable, setDisable] = useState(false);

  function addColorSection() {
    setColorVariants((prevVariant) => [
      ...prevVariant,
      { color: "", thumbnail: "", others: [] },
    ]);
  }
  return (
    <div className="flex-1 p-5 ps-3">
      <div className="mb-3 flex w-full items-center justify-between">
        <p className="font-medium">Color</p>
        <Button
          isIconOnly
          type="button"
          onClick={addColorSection}
          isDisabled={disable}
          className="bg-[rgba(0,111,238,0.15)] text-[#006FEE]"
        >
          {disable ? <Ban /> : <Plus />}
        </Button>
      </div>
      <hr />
      <div>
        {colorVariants.map((variant, i) => (
          <AddColorSection
            form={form}
            index={i}
            variant={variant}
            setDisable={setDisable}
            key={i}
          />
        ))}
      </div>
      <hr />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["variantName", "variantValues"] as const).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    label={item.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    labelPlacement="outside"
                    placeholder={`${item.replace(
                      /([a-z])([A-Z])/g,
                      "$1 $2",
                    )} (optional)`}
                    variant="faded"
                    radius="sm"
                    classNames={{
                      label: "font-medium capitalize z-0",
                      inputWrapper:
                        "border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                      input: "placeholder:capitalize",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                label="Keywords"
                labelPlacement="outside"
                placeholder="Keywords"
                variant="faded"
                radius="sm"
                classNames={{
                  label: "font-medium capitalize",
                  inputWrapper:
                    "mt-3 border border-slate-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                  input: "placeholder:capitalize",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductOptions;

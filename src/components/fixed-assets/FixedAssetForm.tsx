
    import React, { useState, useEffect } from 'react';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Button } from '@/components/ui/button';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
    import { FixedAsset, DepreciationMethod, FixedAssetsManager } from '@/modules/FixedAssets';
    import { Calendar, Loader2, FileQuestion } from 'lucide-react';
    import { format } from 'date-fns';
    import { Calendar as CalendarIcon } from "lucide-react"
    import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
    import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
    import { cn } from '@/lib/utils';
    import { useForm, Controller } from 'react-hook-form';
    import { zodResolver } from "@hookform/resolvers/zod"
    import * as z from "zod"
    import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
    import { toast } from 'sonner';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

    const formSchema = z.object({
      id: z.string().min(1, { message: "ID is required" }).max(20, { message: "ID must be less than 20 characters" }),
      name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
      acquisitionDate: z.date({
        required_error: "Acquisition date is required",
      }),
      startUseDate: z.date({
        required_error: "Start use date is required",
      }),
      acquisitionValue: z.number().min(0, { message: "Value must be non-negative" }),
      usefulLife: z.number().min(1, { message: "Useful life must be at least 1" }),
      depreciationMethod: z.nativeEnum(DepreciationMethod),
    }).refine(data => data.startUseDate >= data.acquisitionDate, {
      message: "Start Use Date must be after or equal to Acquisition Date",
      path: ["startUseDate"],
    });

    type FixedAssetFormValues = z.infer<typeof formSchema>;

    interface FixedAssetFormProps {
      asset?: FixedAsset;
      onSave: (asset: FixedAsset) => void;
      existingIds: string[];
      onCancel: () => void;
    }

    const FixedAssetForm: React.FC<FixedAssetFormProps> = ({ asset, onSave, existingIds, onCancel }) => {
      const form = useForm<FixedAssetFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: asset?.id || "",
          name: asset?.name || "",
          acquisitionDate: asset?.acquisitionDate,
          startUseDate: asset?.startUseDate,
          acquisitionValue: asset?.acquisitionValue || 0,
          usefulLife: asset?.usefulLife || 0,
          depreciationMethod: asset?.depreciationMethod || DepreciationMethod.StraightLine,
        },
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      useEffect(() => {
        if (asset) {
          form.reset(asset);
        }
      }, [asset, form]);

      async function onSubmit(data: FixedAssetFormValues) {
        setIsSubmitting(true);
        try {
          // Check for duplicate ID (only if it's a new asset or the ID has changed)
          if (!asset || asset.id !== data.id) {
            if (existingIds.includes(data.id)) {
              form.setError("id", { type: "manual", message: "Asset ID already exists." });
              return; // Stop the submission
            }
          }

          const fixedAssetsManager = new FixedAssetsManager();
          const newAsset: FixedAsset = {
            ...data,
            depreciationValue: fixedAssetsManager.calculateDepreciation(data.id, new Date()) // Calculate on save
          };

          onSave(newAsset);
          toast.success("Asset saved successfully!");
          form.reset();

        } catch (error: any) {
          console.error("Error saving asset:", error);
          toast.error(`Error saving asset: ${error.message || 'Unknown error'}`);
        } finally {
          setIsSubmitting(false);
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset ID (e.g., FA001)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset name (e.g., Office Chair)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acquisitionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Acquisition Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={
                                  cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )
                                }
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Date the asset was acquired.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <PopoverContent className="w-auto p-0" align="start">
                          <DatePickerWithRange
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

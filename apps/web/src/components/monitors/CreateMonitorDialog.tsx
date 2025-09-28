import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlSchema } from "@repo/schema";
import type { CreateUrlSchema } from "@repo/schema/types";
import { useCreateWebsite } from "@/lib/mutations/website/create-website";
import { showToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface CreateMonitorDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
}

export function CreateMonitorDialog({
   isOpen,
   onOpenChange,
}: CreateMonitorDialogProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
   } = useForm<CreateUrlSchema>({
      resolver: zodResolver(UrlSchema),
      defaultValues: { name: "", url: "", checkInterval: 1, contactEmail: "" },
   });

   const url = watch("url");

   useEffect(() => {
      console.log(url);

      return () => {};
   }, [url]);

   const { mutate: createWebsite, isPending } = useCreateWebsite();
   const queryClient = useQueryClient();

   const onSubmit = (data: CreateUrlSchema) => {
      console.log("Creating monitor:", data);
      createWebsite(data, {
         onSuccess: response => {
            console.log("Website created successfully:", response);
            showToast.success("Website created successfully");
            queryClient.invalidateQueries({ queryKey: ["get-user-websites"] });
            reset();
            onOpenChange(false);
         },
         onError: () => {
            showToast.error("Failed to create website");
         },
      });
   };

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
               <Plus className="h-4 w-4 mr-2" />
               Create Monitor
            </Button>
         </DialogTrigger>
         <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
            <DialogHeader>
               <DialogTitle className="text-white">
                  Create New Monitor
               </DialogTitle>
               <DialogDescription className="text-slate-400">
                  Add a new website or service to monitor for uptime and
                  performance.
               </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div>
                  <Label htmlFor="name" className="text-slate-300">
                     Monitor Name
                  </Label>
                  <Input
                     id="name"
                     {...register("name")}
                     placeholder="My Website"
                     className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {errors.name && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.name.message}
                     </p>
                  )}
               </div>

               <div>
                  <Label htmlFor="url" className="text-slate-300">
                     Website URL
                  </Label>
                  <Input
                     id="url"
                     type="text"
                     {...register("url")}
                     placeholder="https://example.com"
                     className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {errors.url && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.url.message}
                     </p>
                  )}
               </div>

               <div>
                  <Label htmlFor="checkInterval" className="text-slate-300">
                     Check Interval (minutes)
                  </Label>
                  <Input
                     id="checkInterval"
                     type="number"
                     min="1"
                     max="1440"
                     {...register("checkInterval", { valueAsNumber: true })}
                     placeholder="1"
                     className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {errors.checkInterval && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.checkInterval.message}
                     </p>
                  )}
               </div>

               <div>
                  <Label htmlFor="contactEmail" className="text-slate-300">
                     Contact Email
                  </Label>
                  <Input
                     id="contactEmail"
                     type="email"
                     {...register("contactEmail")}
                     placeholder="your@email.com"
                     className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {errors.contactEmail && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.contactEmail.message}
                     </p>
                  )}
               </div>

               <div className="flex justify-end gap-3 pt-4">
                  <Button
                     type="button"
                     variant="ghost"
                     onClick={() => onOpenChange(false)}
                     className="text-slate-400 hover:text-white"
                  >
                     Cancel
                  </Button>
                  <Button
                     disabled={isPending}
                     type="submit"
                     className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                     {isPending ? "Creating..." : "Create Monitor"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}

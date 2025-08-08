"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SubmitResult = () => {
  const router = useRouter();

  //Create Form Schema
  const formSchema = z.object({
    budget: z.coerce.number().gte(1, "Must be more than $0"),
  });

  //Define my form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/prediction/${values.budget}`);
    console.log(values.budget);
  }

  return (
    <Form {...form}>
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-md mx-auto px-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                  Enter Budget Below:
                                </h1>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Input Budget..." {...field} type="number" />
                            </FormControl>
                            <FormDescription>This is for budget prediction!</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <Button className="bg-gradient-to-r from-rose-100 to-teal-100"
                          style={{ color: "black" }}
                          type="submit">
                          Predict!
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </Form>
  );
};

export default SubmitResult;

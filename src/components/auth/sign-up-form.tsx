"use client"
import {
    useEffect,
  useRef,
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PasswordInput
} from "@/components/ui/password-input"
import { FormUploadBox, UserType } from "./sign-up-steps"
import { on } from "node:stream"
import Link from "next/link"

const formSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(1),
  file_upload: z
    .instanceof(FileList)
    .optional()
    .refine(
        (files) => {
        if (!files || files.length === 0) return true
        return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024) // 5MB limit
        },
        {
        message: "File size should not exceed 5MB",
        },
    ),
});

export default function SignUpForm({ userType, files, onFilesChanged }: { userType: UserType, files: File[] | null, onFilesChanged: any }) {
    const isCitizen = userType === "citizen";

    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    useEffect(() => {
        if (isCitizen) {
          form.setValue("file_upload", undefined);
        }
      }, [isCitizen, form]);

    function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            if (!values.file_upload && !isCitizen) {
                toast.error(
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        You must upload a form!!!!!!!!
                    </pre>
                );
                return;
            }
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    function btnSubmitForm() {
      form.handleSubmit(onSubmit)()
    }

    return (
      <div className="flex flex-col gap-2">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-3xl w-full mx-auto">
              
              <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                      <Input                 
                      type=""
                      {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                      <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              {!isCitizen && <Link href="/expert_form.pdf" target="_blank" className="text-blue-500">Download Form</Link>}
              {!isCitizen &&  <FormField
                      control={form.control}
                      name="file_upload"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Upload your file</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              className="cursor-pointer"
                              onChange={(e) => onChange(e.target.files)}
                              {...fieldProps}
                            />
                          </FormControl>
                          <FormDescription>Accepted file formats: PDF, JPG, PNG (max 5MB)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />}
          </form>
          </Form>
          <div className="grid grid-cols-4 gap-2">
            <Button className="col-span-2" onClick={btnSubmitForm}>Submit</Button>
            <Button variant="outline" className="">G</Button>
            <Button variant="outline" className="">?</Button>
          </div>
      </div>
    )
}
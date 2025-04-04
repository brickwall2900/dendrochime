"use client";

// Interactable at the Left
// Information at the Right :pp

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "@/components/ui/file-upload"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Paperclip } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SignUpForm from "./sign-up-form";
import Link from "next/link";

function SignUpUserTypeStep({ userTypeChanged }: { userTypeChanged: any }) {
    function onValueChanged(value: string) {
        userTypeChanged(value);
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-md">Who are you?</h1>
            <Select onValueChange={onValueChanged} defaultValue="citizen">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="User??" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="institution">Institution</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export function FormUploadBox({ files, onFilesChanged }: { files: File[] | null, onFilesChanged: any }) { 
    const dropZoneConfig = {
      maxFiles: 1,
      maxSize: 1024 * 1024 * 5,
      multiple: false,
    };

    return (
        <div>
            <p className="text-gray-600 text-sm max-w-full">Attached must be the form here bla bla blahS (4 MB)</p>
            <FileUploader
                    value={files}
                    onValueChange={onFilesChanged}
                    dropzoneOptions={dropZoneConfig}
                    className="relative max-w-full space-y-2 flex flex-col">
                <FileInput className="border border-dashed w-full border-gray-500">
                    <Button variant="outline" className="w-max">Upload a file here!!</Button>
                </FileInput>
                <FileUploaderContent className="h-max">
                {files &&
                    files.length > 0 &&
                        files.map((file, i) => (
                            <FileUploaderItem key={i} index={i} className="max-w-full whitespace-pre-wrap mb-4">
                                <Paperclip className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                            </FileUploaderItem>
                        ))}
                </FileUploaderContent>
            </FileUploader>
        </div>
    );
}

// TODO: replace by JSON??
const description = new Map();
description.set("citizen", "Welcome! You are a citizen. You can join discussions, share ideas, and make an impact.");
description.set("expert", "Welcome! You are an expert. You can teach, guide, inspire, and lead the way!");
description.set("institution", "Welcome! You are an institution. You can share your programs, govern activities, and build networks.");

export type UserType = "citizen" | "expert" | "institution";

export default function SignUpSomething() {
    const [ userType, setUserType ] = useState("citizen" as UserType);
    const [ files, setFiles ] = useState<File[] | null>(null);

    return (
        <article className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full">
            {/* Left side - Sign up form */}
            <section className="p-2 flex flex-col gap-4 justify-between">
                <SignUpUserTypeStep userTypeChanged={setUserType} />
                <SignUpForm userType={userType} files={files} onFilesChanged={setFiles} />
            </section>

            {/* Right side - Explanatory text */}
            <section className="p-2 border-l border-gray-200 flex flex-col place-items-center px-12">
                <p className="text-center text-xl my-auto">{description.get(userType)}</p>
                <Link href="/login" className="underline underline-offset-4 text-sm">
                    Other Sign-In Methods
                </Link>
            </section>
        </article>
      )
}
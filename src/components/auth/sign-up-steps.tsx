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

function SignUpUserTypeStep({ userTypeChanged }: { userTypeChanged: any }) {
    function onValueChanged(value: string) {
        toast.info(<pre>
            You have chosen... {value}
        </pre>);
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

function CitizenSignForm() {
    return (
        <div>
            
        </div>
    );
}

export type UserType = "citizen" | "expert" | "institution";

export default function SignUpSomething() {
    const [ userType, setUserType ] = useState("citizen" as UserType);
    const [ files, setFiles ] = useState<File[] | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full">
            {/* Left side - Sign up form */}
            <div className="p-2 flex flex-col gap-4 justify-between">
                <SignUpUserTypeStep userTypeChanged={setUserType} />
                <SignUpForm userType={userType} files={files} onFilesChanged={setFiles} />
            </div>

            {/* Right side - Explanatory text */}
            <div className="p-2 border-l border-gray-200">
                <p className="text-center">something like this, here it tells the user whatever</p>
            </div>
        </div>
      )
}
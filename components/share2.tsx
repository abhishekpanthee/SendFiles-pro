"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, Link as LinkIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Head from "next/head";

const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 100GB

export default function SharePage2() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shareLink, setShareLink] = useState("");
  const [maskedLink, setMaskedLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
  
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 100GB limit");
      return;
    }
  
    setSelectedFile(file);
    setUploading(true);
    setProgress(0);
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      // Make a request to your backend for file upload
      const uploadResponse = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });
      const uploadResult = await uploadResponse.json();
  
      if (uploadResult.success) {
        setMaskedLink(uploadResult.masked_link || `https://fileshare.us.kg/d/${uploadResult.file_id}`);
        setUploading(false);
        toast.success("File uploaded successfully!");
    } else {
        setUploading(false);
        toast.error("File upload failed: " + (uploadResult.message || "Unknown error."));
    }
    } catch (error) {
      setUploading(false);
      toast.error("An error occurred during file upload.");
    }
  };
  
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/*": [],
      "image/*": [],
      "video/*": [],
      "audio/*": [],
      "text/*": [],
    },
  });

  const copyLink = () => {
    navigator.clipboard.writeText(maskedLink);
    toast.success("Link copied to clipboard!");
  };


  return (
    <>
      <Head>
        <title>Share Files - FileShare Pro</title>
        <meta
          name="description"
          content="Securely share files with end-to-end encryption. Drag and drop your files to get started."
        />
      </Head>

      <div className="container max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Share Files</h1>
          <p className="text-muted-foreground">Drag and drop a file to start sharing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            role="button"
            aria-label="Drop zone for file upload"
            tabIndex={0}
          >
            <input {...getInputProps()} aria-label="File input" />
            <Upload className="mx-auto h-12 w-12 mb-4 text-muted-foreground" aria-hidden="true" />
            <p className="text-base sm:text-lg mb-2">
              {isDragActive ? "Drop the file here" : "Drag & drop a file here, or click to select"}
            </p>
            <p className="text-sm text-muted-foreground">Maximum file size: 100GB</p>
          </div>
        </motion.div>

        
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Progress
              value={progress}
              className="h-2"
              aria-label="Upload progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <p className="text-center mt-2 text-sm text-muted-foreground">
              Uploading... {progress}%
            </p>
          </motion.div>
        )}

        {maskedLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-lg border bg-card"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <LinkIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input
                type="text"
                value={maskedLink}
                readOnly
                className="flex-1 bg-transparent border-none focus:outline-none text-sm sm:text-base"
                aria-label="Masked link"
              />
              <Button size="sm" onClick={copyLink} className="w-full sm:w-auto">
                <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                Copy Link
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
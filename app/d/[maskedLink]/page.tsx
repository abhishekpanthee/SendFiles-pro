"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Download, Home, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/footer";

interface FileDetails {
  name: string;
  size: number;
  type: string;
  id: string;
}

interface FileData {
  maskedLink: string;
  originalLink: string;
  fileDetails: FileDetails;
}

export default function DownloadPage() {
  const params = useParams();
  const maskedLink = params.maskedLink as string;

  const [originalLink, setOriginalLink] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullMaskedLink = `https://sendfilespro.us.kg/d/${maskedLink}`;
  

    fetch("https://raw.githubusercontent.com/codecrumbs404/databse/main/file.json")
      .then((response) => response.json())
      .then((data: FileData[]) => {
        const fileData = data.find(
          (item) =>
            item.maskedLink.replace(/\/$/, "") === fullMaskedLink.replace(/\/$/, "")
        );

        if (fileData) {
          setOriginalLink(fileData.originalLink);
          setFileDetails(fileData.fileDetails);

          // Generate thumbnail URL
          const thumbnailApiUrl = `https://api.pixeldrain.com/api/file/${fileData.fileDetails.id}/thumbnail?width=128&height=128`;
          fetch(thumbnailApiUrl)
            .then((response) => {
              if (response.ok) {
                setThumbnailUrl(thumbnailApiUrl);
              } else {
                setThumbnailUrl(null);
              }
            })
            .catch((error) => console.error("Error fetching thumbnail:", error));
        } else {
          setError("File not found");
        }

        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch file data");
        setLoading(false);
      });
  }, [maskedLink]);

  const handleDownload = () => {
    if (originalLink) {
      window.location.href = originalLink;
    }
  };

  if (loading) {
    return (
      <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <RotateCw className="h-12 w-12 text-blue-500" />
          </motion.div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
      <Footer />
      </>   );
  }

  if (error) {
    return (
      <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bold text-3xl sm:text-4xl text-gray-900">Error</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
      <Footer />  
      </>
    );
  }

  return (
    <>
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div
        className="text-center space-y-4 p-6 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-3xl sm:text-4xl text-gray-900">
          Download Your File
        </h1>

        {fileDetails && (
          <motion.div
            className="text-left space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold">File Name:</span> {fileDetails.name}
            </p>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold">File Size:</span>{" "}
              {(fileDetails.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold">File Type:</span> {fileDetails.type}
            </p>
          </motion.div>
        )}

        {originalLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download File
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/blog">
            <Button variant="outline" size="lg" className="mt-4">
              Read Blog <FileText className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}

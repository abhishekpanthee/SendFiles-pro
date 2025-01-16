"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import { useRef } from "react";
import SharePage from "@/components/share";
import SharePage2 from "@/components/share2";
import { Footer } from "@/components/footer";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const uploadRef = useRef<() => void>(() => {});

  return (
    <>
      <Head>
        <title>FileShare Pro - Secure File Sharing Platform</title>
        <meta
          name="description"
          content="Transfer files securely with end-to-end encryption. No registration required."
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container mx-auto max-w-7xl flex flex-col items-center gap-4 text-center px-6 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Share2 className="h-12 w-12 sm:h-16 sm:w-16 mb-4" aria-hidden="true" />
              </motion.div>
              <motion.h1
                className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Share files securely and instantly
              </motion.h1>
              <SharePage2 />
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                  onClick={() => {
                    if (uploadRef.current) {
                      uploadRef.current();
                    }
                  }}
                >
                  Start Sharing <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Link href="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                    Read Blog <FileText className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </motion.div>
              
            </div>
          </section>

          {/* Features Section */}
          <section
            ref={ref}
            className="bg-slate-50 dark:bg-slate-900/50 py-8 md:py-12 lg:py-24 px-6 lg:px-16"
          >
            <motion.div
              className="mx-auto max-w-7xl text-center space-y-4"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need for secure and efficient file sharing
              </p>
            </motion.div>
            <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="overflow-hidden rounded-lg border bg-background p-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    {feature.icon}
                    <div className="mt-4 space-y-2">
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

const features = [
  {
    title: "End-to-End Encryption",
    description: "Your files are encrypted before transmission and can only be decrypted by the recipient.",
    icon: <Share2 className="h-10 w-10" aria-hidden="true" />,
  },
  {
    title: "No Registration",
    description: "Start sharing files instantly without creating an account.",
    icon: <FileText className="h-10 w-10" aria-hidden="true" />,
  },
  {
    title: "Cross-Platform",
    description: "Share files between any devices and operating systems.",
    icon: <Share2 className="h-10 w-10" aria-hidden="true" />,
  },
];

"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/components/image/image-upload";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { useState } from "react";
import React from "react";

const ImageUpload = ({
  updateImages,
}: {
  updateImages: (url: string) => void;
}) => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  return (
    <div>
      <MultiFileDropzone
        dropzoneOptions={{ maxFiles: 5 }}
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  input: {
                    category: "fedi",
                    userId: "4454",
                    userRole: "admin",
                  },

                  file: addedFileState.file,
                  options: { temporary: true },

                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    // if (progress === 100) {
                    //   // wait 1 second to set it to complete
                    //   // so that the user can see the progress bar at 100%
                    //   await new Promise((resolve) => setTimeout(resolve, 1000));
                    //   updateFileProgress(addedFileState.key, "COMPLETE");
                    // }
                  },
                });
                updateImages(res.url);
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      />
    </div>
  );
};

export default ImageUpload;

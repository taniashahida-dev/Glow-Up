"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  Button,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  FieldError,
} from "@heroui/react";
import { Scissors } from "lucide-react";
import { Service } from "@/app/types/service";
import { updateService } from "@/lib/api/service";

interface EditServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

export default function EditServiceModal({
  isOpen,
  onOpenChange,
  service,
}: EditServiceModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("Facial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (service?.category) {
      setSelectedCategory(service.category);
    }
  
    setSelectedFile(null);
    setErrorMsg(null);
  }, [service, isOpen]);

  if (!service) return null;

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    let uploadedImageUrl = service.image; 

    if (selectedFile) {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      if (!IMGBB_API_KEY) {
        setErrorMsg("Image upload is not configured.");
        setLoading(false);
        return;
      }

      try {
        const imgBbFormData = new FormData();
        imgBbFormData.append("image", selectedFile);

        const imgBbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          { method: "POST", body: imgBbFormData }
        );

        if (!imgBbResponse.ok) throw new Error("Image upload failed.");
        const imgBbData = await imgBbResponse.json();
        if (imgBbData.success) {
          uploadedImageUrl = imgBbData.data.url;
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Image upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      const updates = {
        title: formData.get("title") as string,
     
        category: selectedCategory as Service["category"],
        shortDescription: formData.get("shortDescription") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        duration: parseInt(formData.get("duration") as string),
        rating: parseFloat(formData.get("rating") as string) || 5.0,
        image: uploadedImageUrl,
      };

      const response = await updateService(service._id!, updates);

      if (response.success) {
        onOpenChange(false); 
        router.refresh(); 
      } else {
        setErrorMsg("Failed to update the service.");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Service</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-500 rounded-lg text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Title */}
                <TextField isRequired name="title" defaultValue={service.title}>
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Title
                  </Label>
                  <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Category
                  </Label>
                  <Select
                    className="mt-1"
                    value={selectedCategory}
                    onChange={(key) => setSelectedCategory(key as string)}
                  >
                    <Select.Trigger className="border border-slate-200 rounded-salon h-11 bg-white focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink">
                      <Select.Value className="text-sm text-slate-800" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="rounded-salon border border-slate-100 shadow-xl bg-white">
                      <ListBox className="p-1">
                        {["Facial", "Hair", "Nails", "Makeup", "Wellness"].map((cat) => (
                          <ListBox.Item
                            key={cat}
                            id={cat}
                            textValue={cat}
                            className="rounded-md px-3 py-2 text-sm text-slate-700 data-[hover=true]:bg-pink-50 data-[hover=true]:text-salon-pink cursor-pointer transition-colors"
                          >
                            {cat}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Short Description */}
                <TextField isRequired name="shortDescription" defaultValue={service.shortDescription}>
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Short Description
                  </Label>
                  <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* Full Description */}
                <TextField isRequired name="description" defaultValue={service.description}>
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Description
                  </Label>
                  <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Price */}
                  <TextField isRequired name="price" type="number" defaultValue={service.price?.toString()}>
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Price ($)
                    </Label>
                    <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                    <FieldError className="text-xs text-red-500 mt-1" />
                  </TextField>

                  {/* Duration */}
                  <TextField isRequired name="duration" type="number" defaultValue={service.duration?.toString()}>
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Duration (Mins)
                    </Label>
                    <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                    <FieldError className="text-xs text-red-500 mt-1" />
                  </TextField>

                  {/* Rating */}
                  <TextField name="rating" type="number" defaultValue={service.rating?.toString() || "5.0"}>
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Rating
                    </Label>
                    <Input className="mt-1 border border-slate-200 rounded-salon focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink" />
                  </TextField>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-1">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Image (Leave empty to keep existing)
                  </Label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
                    onDragLeave={() => setIsDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragActive(false);
                      if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
                    }}
                    className={`mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-salon p-6 relative ${
                      isDragActive ? "border-salon-pink bg-pink-50/20" : "border-slate-200 bg-white"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => { if (e.target.files?.[0]) handleFileChange(e.target.files[0]); }}
                    />
                    <div className="flex flex-col items-center text-center space-y-1">
                      <Scissors size={20} className="rotate-90 text-slate-400" />
                      <p className="text-xs text-slate-500">
                        {selectedFile ? (
                          <span className="text-salon-pink font-semibold">Selected: {selectedFile.name}</span>
                        ) : (
                          <>Drag & drop or <span className="text-salon-pink font-semibold">browse</span> to change</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="flex gap-3 justify-end mt-4">
                  <Button slot="close" variant="tertiary" size="sm" type="button" className="border border-slate-200">
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-pink px-6" size="sm" isDisabled={loading}>
                    {loading ? "Updating..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { Scissors } from "lucide-react";

import { CreateServiceInput } from "@/app/types/service";
import { createService } from "@/lib/api/service";

export default function AddServiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("Facial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    if (!selectedFile) {
      setErrorMsg("Please select a service image.");
      setLoading(false);
      return;
    }

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
    if (!IMGBB_API_KEY) {
      setErrorMsg(
        "Image upload is not configured. Please contact the developer.",
      );
      setLoading(false);
      return;
    }

    try {
      const imgBbFormData = new FormData();
      imgBbFormData.append("image", selectedFile);

      const imgBbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imgBbFormData,
        },
      );

      if (!imgBbResponse.ok) {
        throw new Error(
          `Image upload failed (status ${imgBbResponse.status}).`,
        );
      }

      const imgBbData = await imgBbResponse.json();
      if (!imgBbData.success) {
        throw new Error("Failed to upload image to Image DB.");
      }

      const uploadedImageUrl: string = imgBbData.data.url;

      const rawPrice = formData.get("price") as string;
      const rawDuration = formData.get("duration") as string;
      const rawRating = formData.get("rating") as string;

      const serviceData: CreateServiceInput = {
        title: (formData.get("title") as string)?.trim(),
        category: selectedCategory as CreateServiceInput["category"],
        shortDescription: (formData.get("shortDescription") as string)?.trim(),
        description: (formData.get("description") as string)?.trim(),
        price: parseFloat(rawPrice),
        duration: parseInt(rawDuration),
        rating: parseFloat(rawRating) || 5.0,
        image: uploadedImageUrl,
      };

      const response = await createService(serviceData);

      if (response && (response.success || response.result?.insertedId)) {
        setSelectedFile(null);
        formEl.reset();

        router.push("/admin/manage-services");
        router.refresh();
      } else {
        const backendError =
          (response as unknown as { message?: string })?.message ||
          "Failed to create the service on server.";
        setErrorMsg(backendError);
      }
    } catch (err) {
      console.error("Error during service creation:", err);
      setErrorMsg(
        err instanceof Error
          ? `Error: ${err.message}. Please check if you are logged in as Admin.`
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="flex flex-col gap-5 bg-white p-8 rounded-salon border border-slate-100 shadow-xs"
      onSubmit={onSubmit}
    >
      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-500 rounded-lg text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Title */}
      <TextField isRequired name="title">
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Service Title
        </Label>
        <Input
          placeholder="e.g., Premium Facial Glow"
          className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
        />
        <FieldError className="text-xs text-red-500 mt-1" />
      </TextField>

      {/* HeroUI v3 Select */}
      <div className="flex flex-col gap-1">
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Category
        </Label>
        <Select
          className="mt-1"
          placeholder="Select category"
          value={selectedCategory}
          onChange={(key) => setSelectedCategory(key as string)}
        >
          <Select.Trigger className="border border-slate-200 rounded-salon h-11 bg-white hover:bg-slate-50/50 transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink">
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
      <TextField isRequired name="shortDescription">
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Short Description
        </Label>
        <Input
          placeholder="Brief hook line for cards..."
          className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
        />
        <FieldError className="text-xs text-red-500 mt-1" />
      </TextField>

      {/* Full Description */}
      <TextField isRequired name="description">
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Full Description
        </Label>
        <Input
          placeholder="Detailed explanation of the salon session..."
          className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
        />
        <FieldError className="text-xs text-red-500 mt-1" />
      </TextField>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Price */}
        <TextField
          isRequired
          name="price"
          type="number"
          validate={(value) =>
            isNaN(parseFloat(value)) || parseFloat(value) <= 0
              ? "Price must be greater than 0"
              : null
          }
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Price ($)
          </Label>
          <Input
            placeholder="50.00"
            className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Duration */}
        <TextField
          isRequired
          name="duration"
          type="number"
          validate={(value) =>
            isNaN(parseInt(value)) || parseInt(value) <= 0
              ? "Duration must be valid minutes"
              : null
          }
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Duration (Mins)
          </Label>
          <Input
            placeholder="45"
            className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Rating */}
        <TextField name="rating" type="number" defaultValue="5.0">
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Initial Rating
          </Label>
          <Input
            placeholder="5.0"
            className="mt-1 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
          />
          <Description className="text-[10px] text-slate-400">
            Defaults to 5.0 if left blank
          </Description>
        </TextField>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Service Image
        </Label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragActive(false);
            if (e.dataTransfer.files?.[0])
              handleFileChange(e.dataTransfer.files[0]);
          }}
          className={`mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-salon p-8 transition-all relative ${
            isDragActive
              ? "border-salon-pink bg-pink-50/20"
              : "border-slate-200 bg-white"
          }`}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
            }}
          />

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="text-slate-400">
              <Scissors size={24} className="rotate-90 stroke-[1.5]" />
            </div>

            <p className="text-sm text-slate-500">
              {selectedFile ? (
                <span className="text-salon-pink font-semibold">
                  Selected: {selectedFile.name}
                </span>
              ) : (
                <>
                  Drag & drop or{" "}
                  <span className="text-salon-pink font-semibold">browse</span>
                </>
              )}
            </p>

            <p className="text-xs text-slate-400 font-medium">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button type="submit" className="btn-pink px-8" isDisabled={loading}>
          {loading ? "Uploading & Saving..." : "Publish Service"}
        </Button>
        <Button
          type="reset"
          variant="secondary"
          className="rounded-salon text-xs font-semibold px-4 py-2 border border-slate-200"
          onClick={() => setSelectedFile(null)}
        >
          Reset Form
        </Button>
      </div>
    </Form>
  );
}

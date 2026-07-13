"use client";

import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, Pencil, Trash2, Star } from "lucide-react";
import { Input, Button, AlertDialog } from "@heroui/react";
import { Service } from "@/app/types/service";
import { deleteService } from "@/lib/api/service";
import EditServiceModal from "@/components/dashboard/EditServiceModal";

interface ServicesTableProps {
  initialServices: Service[];
}

export default function ServicesTable({ initialServices }: ServicesTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeDeleteService, setActiveDeleteService] =
    useState<Service | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeEditService, setActiveEditService] = useState<Service | null>(
    null,
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const openDeleteModal = (service: Service) => {
    setActiveDeleteService(service);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setActiveEditService(service);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!activeDeleteService || !activeDeleteService._id) return;

    const id = activeDeleteService._id;
    setDeletingId(id);
    setIsDeleteModalOpen(false);

    try {
      const response = await deleteService(id);
      if (response.acknowledged) {
        router.refresh();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the service. Please try again.");
    } finally {
      setDeletingId(null);
      setActiveDeleteService(null);
    }
  };

  return (
    <div className="bg-white rounded-salon border border-slate-100 shadow-sm overflow-hidden">
      {/* Search and Meta Stats Bar */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-white">
        <div className="w-full sm:max-w-xs relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10"
          />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-9 border border-slate-200 rounded-salon transition-all focus-within:border-salon-pink focus-within:ring-1 focus-within:ring-salon-pink"
          />
        </div>

        <div className="text-sm font-semibold text-slate-500 whitespace-nowrap">
          {initialServices.length}{" "}
          {initialServices.length === 1 ? "service" : "services"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-6">
                Service
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center pr-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {initialServices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-12 text-center text-sm text-slate-400 font-medium"
                >
                  No services found.
                </td>
              </tr>
            ) : (
              initialServices.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  {/* Service Title & Image */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                        <Image
                          src={service.image || "/placeholder-service.jpg"}
                          alt={service.title}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="max-w-55">
                        <div className="font-bold text-sm text-slate-900 line-clamp-1">
                          {service.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-salon-pink">
                      {service.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-black text-sm text-salon-pink">
                    ${service.price}
                  </td>

                  {/* Duration */}
                  <td className="p-4 text-sm text-slate-500 font-medium">
                    {service.duration} min
                  </td>

                  {/* Rating */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                      <Star
                        size={14}
                        className="fill-amber-400 stroke-amber-400"
                      />
                      {service.rating?.toFixed(1) || "5.0"}
                    </div>
                  </td>

                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        className="text-amber-500 hover:bg-amber-50 rounded-full"
                        onPress={() => openEditModal(service)}
                        aria-label="Edit Service"
                      >
                        <Pencil size={15} strokeWidth={2.5} />
                      </Button>

                      <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 rounded-full"
                        isDisabled={deletingId === service._id}
                        onPress={() => openDeleteModal(service)}
                        aria-label="Delete Service"
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditServiceModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        service={activeEditService}
      />

      <AlertDialog
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete service permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>{activeDeleteService?.title}</strong> and all of its
                  associated data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onPress={() => setActiveDeleteService(null)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onPress={handleConfirmDelete}>
                  Delete Service
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}

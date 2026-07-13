import AddServiceForm from "./AddServiceForm";

export default function AddServicePage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Block */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-950">
            Create New Service Line
          </h1>
          <p className="text-slate-500 text-sm">
            Fill out the details below to deploy a brand new active package into
            the salon marketplace.
          </p>
        </div>

        {/* Client Form Component */}
        <AddServiceForm />
      </div>
    </div>
  );
}

import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { MediaPicker } from "@/app/components/MediaPicker";
import { NewMemoryForm } from "@/app/components/NewMemoryForm";

export default function newMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">

      <Link href='/' className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100">
        <ChevronLeft className="w-4 h-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />

    </div>
  )
}
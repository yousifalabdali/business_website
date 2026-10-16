import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { requireAdmin } from "@/lib/admin";
import type { Testimonial } from "@/lib/types";

export default async function EditTestimonial({ params }: PageProps<"/admin/testimonials/[id]">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const t = data as Testimonial;

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">تعديل رأي: {t.name}</h1>
      <TestimonialForm item={t} />
    </>
  );
}

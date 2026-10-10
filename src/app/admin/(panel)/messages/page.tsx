import { ConfirmButton } from "@/components/admin/confirm-button";
import { requireAdmin } from "@/lib/admin";
import type { Message } from "@/lib/types";
import { deleteMessage, markMessage } from "../../actions";

const fmt = new Intl.DateTimeFormat("ar", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" });

export default async function AdminMessages() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  const messages = (data as Message[]) ?? [];

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">الرسائل</h1>
      {messages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">لا توجد رسائل.</p>
      ) : (
        <ul className="grid gap-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl border p-5 ${m.read ? "border-border" : "border-accent/50 bg-accent/5"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {!m.read && <span className="ml-2 inline-block size-2 rounded-full bg-accent" />}
                    {m.name}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm text-muted hover:underline" dir="ltr">
                    {m.email}
                  </a>
                </div>
                <time className="text-xs text-muted">{fmt.format(new Date(m.created_at))}</time>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed">{m.body}</p>
              <div className="mt-4 flex gap-2">
                <a href={`mailto:${m.email}`} className="btn-ghost px-3 py-1 text-xs">رد</a>
                <form action={markMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={String(!m.read)} />
                  <button className="btn-ghost px-3 py-1 text-xs">{m.read ? "غير مقروءة" : "تمت القراءة"}</button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmButton message="حذف الرسالة؟" className="rounded-full px-3 py-1 text-xs text-red-600 hover:bg-red-600/10">
                    حذف
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

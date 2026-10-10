"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  name: string;
  multiple?: boolean;
  defaultValue?: string[];
  label?: string;
};

// Uploads straight from the browser to Supabase Storage, then submits URLs via hidden inputs.
export function ImageUpload({ name, multiple, defaultValue = [], label }: Props) {
  const [urls, setUrls] = useState<string[]>(defaultValue.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "31536000", contentType: file.type });
      if (error) {
        setError(error.message);
        continue;
      }
      uploaded.push(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    }
    if (uploaded.length) setUrls((prev) => (multiple ? [...prev, ...uploaded] : [uploaded[0]]));
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function move(i: number, dir: -1 | 1) {
    setUrls((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div>
      {label && <span className="label">{label}</span>}
      {urls.map((u) => (
        <input key={u} type="hidden" name={name} value={u} />
      ))}
      <div className={`grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:max-w-xs"}`}>
        {urls.map((u, i) => (
          <div key={u} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-subtle">
            <Image src={u} alt="" fill sizes="240px" className="object-cover" />
            <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
              {multiple ? (
                <span className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} className="rounded-lg bg-black/70 px-2 py-1 text-xs text-white">→</button>
                  <button type="button" onClick={() => move(i, 1)} className="rounded-lg bg-black/70 px-2 py-1 text-xs text-white">←</button>
                </span>
              ) : <span />}
              <button
                type="button"
                onClick={() => setUrls((p) => p.filter((x) => x !== u))}
                className="rounded-lg bg-red-600 px-2 py-1 text-xs text-white"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
        {(multiple || urls.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-border text-sm text-muted transition hover:border-fg/40 hover:text-fg"
          >
            {busy ? "جارِ الرفع…" : "+ رفع صورة"}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={(e) => onFiles(e.target.files)}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

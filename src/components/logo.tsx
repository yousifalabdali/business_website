import Image from "next/image";

// Transparent logo with a lighter variant for dark mode, so no background chip is needed.
export function LogoMark({ className = "h-8", preload }: { className?: string; preload?: boolean }) {
  const common = { width: 774, height: 413, preload, className: `${className} w-auto` };
  return (
    <span className="inline-flex items-center">
      <Image src="/brand/mark-light.png" alt="" {...common} className={`${common.className} dark:hidden`} />
      <Image src="/brand/mark-dark.png" alt="" {...common} className={`${common.className} hidden dark:block`} />
    </span>
  );
}

// Full logo (symbol + "web plus") used in the site header; it already carries the name.
export function Brand({ className = "h-11" }: { name?: string; className?: string }) {
  const common = { width: 600, height: 439, preload: true, className: `${className} w-auto` };
  return (
    <span className="inline-flex items-center">
      <Image src="/brand/full-light.png" alt="Web Plus" {...common} className={`${common.className} dark:hidden`} />
      <Image src="/brand/full-dark.png" alt="Web Plus" {...common} className={`${common.className} hidden dark:block`} />
    </span>
  );
}

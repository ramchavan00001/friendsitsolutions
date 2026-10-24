"use client";
import { Paperclip, X } from "lucide-react";
import { useId } from "react";

/** Accessible multi-file picker with client-side size/type checks. */
export function FileInput({
  label,
  files,
  onChange,
  accept,
  maxFiles,
  maxMb,
  error,
  required,
}: {
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  accept: string;
  maxFiles: number;
  maxMb: number;
  error?: string | null;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}{required && <span className="text-destructive" aria-hidden="true"> *</span>}
      </label>
      <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-input p-4 text-sm text-muted-foreground hover:bg-secondary">
        <Paperclip className="h-5 w-5" aria-hidden="true" />
        <span>Click to choose {maxFiles > 1 ? `up to ${maxFiles} files` : "a file"} (max {maxMb} MB each)</span>
      </label>
      <input
        id={id}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={maxFiles > 1}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? []);
          onChange([...files, ...picked].slice(0, maxFiles));
          e.target.value = "";
        }}
      />
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-md bg-secondary px-3 py-1.5 text-sm">
              <span className="truncate">{f.name} <span className="text-muted-foreground">({(f.size / 1024 / 1024).toFixed(1)} MB)</span></span>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => onChange(files.filter((_, j) => j !== i))} className="ml-2 rounded p-1 hover:bg-background">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p id={`${id}-err`} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function checkFiles(files: File[], maxMb: number, types: string[]) {
  for (const f of files) {
    if (f.size > maxMb * 1024 * 1024) return `${f.name} is larger than ${maxMb} MB.`;
    if (types.length && !types.includes(f.type)) return `${f.name} is not an allowed file type.`;
  }
  return null;
}

"use client";

import { useState, type FormEvent } from "react";
import { formStores } from "@/data/stores";
import type { EnquiryField, EnquiryFormConfig } from "@/data/forms";

const fieldClass =
  "w-full rounded-lg border border-black/20 bg-white p-3 text-base placeholder:text-sm placeholder:text-gray-500/80";

type EnquiryFormProps = {
  config: EnquiryFormConfig;
  idPrefix?: string;
};

export function EnquiryForm({ config, idPrefix = "enquiry" }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const missing = config.fields.some((field) => field.required && !String(data.get(field.name) ?? "").trim());
    if (missing) {
      setError("Please complete the required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-center text-base font-medium">Thank you. Our team will write back shortly.</p>;
  }

  return (
    <form className="mx-auto flex w-full max-w-xl flex-col gap-4" onSubmit={onSubmit} noValidate>
      {config.sectionTitle ? <h2 className="text-center text-2xl font-bold">{config.sectionTitle}</h2> : null}
      {config.fields.map((field) => (
        <FormField key={field.name} field={field} id={`${idPrefix}-${field.name}`} />
      ))}
      {error ? <p className="text-sm text-fig">{error}</p> : null}
      <button type="submit" className="btn primary-btn mx-auto w-max px-8 py-3 text-sm font-semibold">
        {config.submitLabel}
      </button>
    </form>
  );
}

function FormField({ field, id }: { field: EnquiryField; id: string }) {
  if (field.kind === "store" || field.kind === "select") {
    const options = field.kind === "store" ? formStores : field.options;
    return (
      <label className="block space-y-1" htmlFor={id}>
        <span className="sr-only">{field.placeholder}</span>
        <select id={id} name={field.name} required={field.required} defaultValue="" className={fieldClass}>
          <option value="" disabled>
            {field.placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const type = field.kind === "tel" ? "tel" : field.kind;
  const input = (
    <input
      id={id}
      name={field.name}
      type={type}
      inputMode={field.kind === "tel" || field.kind === "number" ? "numeric" : undefined}
      autoComplete={field.kind === "email" ? "email" : field.kind === "tel" ? "tel" : field.name === "name" ? "name" : undefined}
      placeholder={field.placeholder}
      required={field.required}
      className={field.prefix ? `${fieldClass} pl-16` : fieldClass}
    />
  );

  return (
    <label className="relative block space-y-1" htmlFor={id}>
      <span className="sr-only">{field.placeholder}</span>
      {field.prefix ? (
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
          {field.prefix}
        </span>
      ) : null}
      {input}
    </label>
  );
}

"use client";

import { useState } from "react";

const cities = ["New Delhi", "Hyderabad", "Bengaluru", "Other Cities"] as const;
const occasions = ["Weddings", "Festive", "Congratulations", "Corporate Gifting", "Other"] as const;
const diets = ["Gluten-Free", "Keto", "Vegan", "Sugar Free", "No Preference"] as const;
const budgets = ["Under ₹2000", "Under ₹5000", "Under ₹10,000", "Above ₹10,000"] as const;

const pillClass =
  "flex min-w-62 cursor-pointer items-center justify-center rounded-[50px] border border-[#39393B]/20 px-6 py-3 text-sm font-semibold has-[:checked]:border-fig has-[:checked]:bg-[#A13940]/10";

export function BulkGiftingForm() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [occasion, setOccasion] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [diet, setDiet] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function canNext() {
    if (step === 1) return Boolean(city);
    if (step === 2) return Boolean(occasion);
    if (step === 3) return quantity >= 1;
    if (step === 4) return Boolean(diet);
    if (step === 5) return Boolean(budget);
    if (step === 6) return Boolean(date);
    return Boolean(email.trim());
  }

  function onNext() {
    if (!canNext()) {
      setError("Please complete this step.");
      return;
    }
    setError("");
    if (step === 7) {
      setSubmitted(true);
      return;
    }
    setStep((current) => current + 1);
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
      noValidate
    >
      <div className="flex items-center justify-center gap-2" aria-label="Enquiry steps">
        {Array.from({ length: 7 }, (_, index) => {
          const number = index + 1;
          return (
            <span
              key={number}
              className={`size-2.5 rounded-full transition-colors duration-300 ${number <= step ? "bg-[#A13940]" : "bg-[#39393B]/20"}`}
              aria-current={number === step ? "step" : undefined}
            />
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-6">
        {submitted ? (
          <p className="text-center text-base font-medium">We&apos;ll reach out with tailor-made ideas in 24 hours</p>
        ) : (
          <>
            {step === 1 ? (
              <fieldset>
                <legend className="mb-6 text-center text-xl font-semibold">
                  <h3 className="text-xl font-semibold">Which City Are You From?</h3>
                </legend>
                <div className="flex flex-col items-center gap-3">
                  {cities.map((option) => (
                    <label key={option} className={pillClass}>
                      <input type="radio" name="city" className="sr-only" checked={city === option} onChange={() => setCity(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset>
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">What&apos;s The Occasion?</h3>
                </legend>
                <div className="flex flex-col items-center gap-3">
                  {occasions.map((option) => (
                    <label key={option} className={pillClass}>
                      <input type="radio" name="occasion" className="sr-only" checked={occasion === option} onChange={() => setOccasion(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 3 ? (
              <fieldset>
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">How many gifts are you looking to send out?</h3>
                </legend>
                <div className="flex items-center justify-center gap-4">
                  <button type="button" className="rounded-full border border-[#39393B]/20 px-4 py-2 disabled:opacity-40" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                    −
                  </button>
                  <label>
                    <span className="sr-only">Quantity</span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                      className="w-16 rounded-md border border-[#39393B]/15 p-2 text-center"
                    />
                  </label>
                  <button type="button" className="rounded-full border border-[#39393B]/20 px-4 py-2" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </fieldset>
            ) : null}

            {step === 4 ? (
              <fieldset>
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">Would you like us to tailor for any dietary choices?</h3>
                </legend>
                <div className="flex flex-col items-center gap-3">
                  {diets.map((option) => (
                    <label key={option} className={pillClass}>
                      <input type="radio" name="diet" className="sr-only" checked={diet === option} onChange={() => setDiet(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 5 ? (
              <fieldset>
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">Where does your splendour sit?</h3>
                </legend>
                <div className="flex flex-col items-center gap-3">
                  {budgets.map((option) => (
                    <label key={option} className={pillClass}>
                      <input type="radio" name="budget" className="sr-only" checked={budget === option} onChange={() => setBudget(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 6 ? (
              <fieldset>
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">When is the big day?</h3>
                </legend>
                <label className="mx-auto flex max-w-xs flex-col items-center gap-2">
                  <span className="sr-only">Select Date</span>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="w-full rounded-[50px] border border-[#39393B]/20 px-6 py-3 text-center text-sm font-semibold"
                  />
                </label>
              </fieldset>
            ) : null}

            {step === 7 ? (
              <fieldset className="space-y-4">
                <legend className="mb-6 text-center">
                  <h3 className="text-xl font-semibold">Tell us your story</h3>
                </legend>
                <label className="block text-sm font-semibold">
                  Email
                  <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-[#39393B]/15 p-3 font-medium" />
                </label>
              </fieldset>
            ) : null}

            {error ? (
              <p role="alert" className="mt-4 text-center text-sm text-error">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-center gap-3">
              {step > 1 ? (
                <button type="button" className="btn border border-fig px-8 py-3 text-sm font-medium text-fig" onClick={() => setStep((current) => current - 1)}>
                  Previous
                </button>
              ) : null}
              <button type="submit" disabled={!canNext()} className="btn primary-btn px-8 py-3 text-sm font-medium disabled:opacity-40">
                {step === 7 ? "Submit" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

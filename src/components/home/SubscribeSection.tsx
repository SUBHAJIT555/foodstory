"use client";

import type { FormEvent } from "react";

export function SubscribeSection() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="bg-footer text-white">
      <div className="mx-auto max-h-83.5 px-[2.4rem] lg:max-h-91 lg:max-w-7xl">
        <div className="flex flex-col pt-12 text-white lg:flex-row lg:justify-between lg:py-24">
          <div className="mb-9 flex flex-col items-center justify-between text-center lg:items-start lg:text-left">
            <h2 className="font-serif mb-2 max-w-86.5 text-center text-[2.5rem] leading-10 font-semibold text-white lg:max-w-137.5 lg:text-left lg:text-[4rem] lg:leading-16">
              Subscribe for More Tasty Tales
            </h2>
          </div>
          <div className="mb-20 flex items-center px-3 lg:mb-0 lg:min-w-md lg:justify-end">
            <form className="relative w-full" onSubmit={onSubmit}>
              <label htmlFor="subscribe-email" className="sr-only">
                Email
              </label>
              <input
                id="subscribe-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Share your Email ID"
                className="w-full rounded-3xl bg-black/40 py-3 pl-3 text-white backdrop-blur-sm placeholder-white focus-visible:outline-hidden max-md:pr-30 max-sm:pr-0 md:pl-6"
              />
              <button
                type="submit"
                className="absolute top-0 -right-1 rounded-3xl bg-fig px-4 py-3 text-[16px] font-bold text-white md:right-0 md:px-11"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

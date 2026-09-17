"use client";

import { FramedMedia } from "@/components/home/FramedMedia";
import { useOverlay } from "@/components/layout/OverlayContext";
import { mediaFor } from "@/data/media";

export function LoginPromptSection() {
  const onOverlay = useOverlay();

  return (
    <section className="login-homepage-container mx-auto flex w-full min-w-0 max-w-7xl flex-col justify-center gap-8 bg-page p-4 lg:p-11">
      <div className="relative aspect-[6/5] w-full overflow-hidden rounded-lg md:aspect-auto md:h-[461px]">
        <FramedMedia
          alt="Login Foodstory Section"
          src={mediaFor("Login Foodstory Section")}
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="rounded-lg object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-y-6 md:gap-y-8 lg:w-3/4 lg:self-center">
        <h2 className="editorial-title">No Two Stories are the Same</h2>
        <p className="px-3 text-center text-base font-medium lg:text-xl">
          Login for a delightfully personalised experience!
        </p>
        <button
          type="button"
          title="Login"
          className="btn primary-btn w-1/2 py-2 text-base font-semibold md:py-[0.9rem]"
          onClick={() => onOverlay("login")}
        >
          <span className="flex items-center justify-center gap-2">Login</span>
        </button>
      </div>
    </section>
  );
}

import { IconChevronRight } from "@/components/icons";

type CarouselNavigationProps = {
  prevId: string;
  nextId: string;
  className?: string;
  hideWhenDisabled?: boolean;
};

export function CarouselNavigation({
  prevId,
  nextId,
  className = "top-1/2",
  hideWhenDisabled = false,
}: CarouselNavigationProps) {
  const disabledClass = hideWhenDisabled ? "disabled:invisible disabled:pointer-events-none" : "disabled:opacity-40";
  const buttonClass = `carousel-arrow absolute z-2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/80 text-fig shadow-sm lg:flex ${disabledClass} ${className}`;

  return (
    <>
      <button id={prevId} type="button" aria-label="Previous" className={`${buttonClass} left-0`}>
        <IconChevronRight className="h-5 w-5 rotate-180 fill-none stroke-fig stroke-[1.5]" />
      </button>
      <button id={nextId} type="button" aria-label="Next" className={`${buttonClass} right-0`}>
        <IconChevronRight className="h-5 w-5 fill-none stroke-fig stroke-[1.5]" />
      </button>
    </>
  );
}

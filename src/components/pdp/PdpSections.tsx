type PdpSectionsProps = {
  howToEnjoy?: string;
  weLoveThisIn?: string;
  ingredients?: string;
  idealFor?: string[];
  info: Array<{ label: string; value: string }>;
};

export function PdpSections({ howToEnjoy, weLoveThisIn, ingredients, idealFor, info }: PdpSectionsProps) {
  return (
    <>
      {howToEnjoy ? (
        <div aria-label="how-to-enjoy">
          <h2 className="font-serif px-0 text-2xl font-semibold">How to Enjoy</h2>
          <p className="mt-2 px-0 text-base">{howToEnjoy}</p>
        </div>
      ) : null}
      {weLoveThisIn ? (
        <div aria-label="wlt-title-desc">
          <h2 className="font-serif px-0 text-2xl font-semibold">We Love This in</h2>
          <p className="mt-2 px-0 text-base">{weLoveThisIn}</p>
        </div>
      ) : null}
      {ingredients ? (
        <div aria-label="ingredients">
          <h2 className="font-serif px-0 text-2xl font-semibold">Ingredients</h2>
          <p className="mt-2 px-0 text-base">{ingredients}</p>
        </div>
      ) : null}
      {idealFor?.length ? (
        <div aria-label="ideal-for" className="space-y-4">
          <h2 className="px-0 text-lg font-semibold">Ideal For</h2>
          <div className="flex flex-wrap items-center gap-3">
            {idealFor.map((item) => (
              <span key={item} className="bg-gray-200/50 px-3 py-2 text-center text-xs font-bold">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {info.length ? (
        <div aria-label="good-to-know">
          <h2 className="px-0 text-lg font-semibold">More Product Information</h2>
          {info.map((row) => (
            <p key={row.label} className="mt-2 px-0 text-base">
              {row.label}: {row.value}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
}

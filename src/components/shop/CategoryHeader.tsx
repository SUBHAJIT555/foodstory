type CategoryHeaderProps = {
  title: string;
  compact?: boolean;
};

export function CategoryHeader({ title, compact = false }: CategoryHeaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "gap-y-0" : "gap-y-4"}`}>
      <h1 className="px-3 text-[1.625rem] leading-[1.5] font-bold text-ink lg:text-[2.1875rem] lg:leading-[52.5px]">{title}</h1>
    </div>
  );
}

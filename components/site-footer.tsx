import { getTranslations } from "next-intl/server";

import { HandwrittenAside } from "@/components/decorations";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 px-8 pb-14 sm:px-14">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between text-sm text-[color:var(--mute)]">
        <div>{t("built", { year })}</div>
        <HandwrittenAside>{t("seeYou")}</HandwrittenAside>
      </div>
    </footer>
  );
}

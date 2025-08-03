import { getTranslations } from "next-intl/server";

export async function NishioCalendarHeader() {
  const t = await getTranslations("Calendar");
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900">
          {t("title")}
        </h1>
        <div className="text-lg text-gray-500 font-light tracking-widest">
          {t("subtitle")}
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed">{t("description")}</p>
        <div className="text-gray-600 leading-relaxed mt-2">
          <p> {t("description2")} </p>
          <a
            href="https://twitter.com/240y_k"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1 font-medium"
          >
            @西尾夕香 (おゆちゃん)
          </a>
          {t("description3")}
          <span className="font-medium text-primary">{t("day32")}</span>
          {t("description4")}
        </div>
        <p className="text-sm text-gray-500 mt-4">{t("description5")}</p>
      </div>
    </div>
  );
}

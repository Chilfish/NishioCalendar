import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from URL
  const locale = "zh";

  return {
    locale,
    messages: (await import(`../locale/${locale}.json`)).default,
  };
});

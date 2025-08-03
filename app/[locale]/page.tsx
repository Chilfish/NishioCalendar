import { NishioCalendar } from "@/components/nishio-calendar";
import { NishioCalendarHeader } from "@/components/nishio-calendar-header";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto p-6 sm:w-[72vw]">
        <NishioCalendarHeader />
        <NishioCalendar />
        <footer className="mt-12 text-center text-gray-500">
          Created by
          <a
            href="https://space.bilibili.com/259486090/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1 font-medium"
          >
            @Chilfish
          </a>,
          made with ❤️ of oyu-chan
        </footer>
      </main>
    </div>
  );
}

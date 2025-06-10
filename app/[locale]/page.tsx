import { NishioCalendar } from "@/components/nishio-calendar";
import { NishioCalendarHeader } from "@/components/nishio-calendar-header";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto p-6 sm:w-[72vw]">
        <NishioCalendarHeader />
        <NishioCalendar />
      </main>
    </div>
  );
}

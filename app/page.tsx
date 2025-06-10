import { NishioCalendar } from "@/components/nishio-calendar"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <main className="container mx-auto p-6 pb-4">
          <NishioCalendar />
        </main>
      </div>
    </ThemeProvider>
  )
}

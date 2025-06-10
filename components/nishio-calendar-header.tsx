"use client"

export function NishioCalendarHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900">西尾文明暦</h1>
        <div className="text-lg text-gray-500 font-light">Nishio Calendar</div>
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 leading-relaxed">
          每月的第一天，都变成上个月的第{" "}
          <span className="font-medium text-primary">32日</span>
          （或根据上个月天数而定），由
          <a
            href="https://twitter.com/240y_k"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1 font-medium"
          >
            @西尾夕香
          </a>
          开创的特殊历法。在这个独特的时间体系中，每个月的第一天都被赋予了特殊的意义。
        </p>
      </div>
    </div>
  )
}
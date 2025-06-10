"use client"

export function NishioCalendarHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900">西尾文明暦</h1>
        <div className="text-lg text-gray-500 font-light tracking-widest">NISHIO CIVILIZATION</div>
      </div>
      <div className="max-w-xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          不觉得普通的日期，已经很无聊了吗？
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          在「西尾文明」，时间遵循着一种更天才、更自由的节奏。由我们的文明开拓者、DJ及时间概念Remixer——
          <a
            href="https://twitter.com/240y_k"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1 font-medium"
          >
            西尾夕香 (おゆちゃん)
          </a>
          的奇妙宣言下，每个月的第一天，不再是平平无奇的“1号”，而是充满了可能性与庆祝意味的
          <span className="font-medium text-primary">「上个月的32日」</span>！
        </p>
        <p className="text-sm text-gray-500 mt-4">
          这是时间的BUG？不，这是我们和おゆちゃん之间，心照不宣的仪式感。
        </p>
      </div>
    </div>
  )
}
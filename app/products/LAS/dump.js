{/* Tables Section */}
<section className="max-w-[85%] mx-auto px-6 py-10 flex flex-col items-center">
  <h3 className="text-4xl font-bold mb-10 text-gray-900 tracking-tight text-center">
    Detailed LAS Cost Summary
  </h3>

  <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-2xl p-6 flex flex-col gap-6">
    
    {/* --- Category Buttons (Restored Original Style) --- */}
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {categoryButtons.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setActiveTableCategory(cat.key)}
          className={`px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 shadow-md ${
            activeTableCategory === cat.key
              ? "bg-[#FF5732] scale-105 shadow-lg"
              : "bg-teal-600 hover:bg-[#FF5732]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>

    {/* --- Table Section --- */}
    <div className="flex-1 overflow-x-auto">
      <table className="w-full border-collapse text-[15px] text-gray-900 rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-white/70 backdrop-blur-sm border-b border-gray-300">
          <tr>
            {/* Fixed Columns */}
            <th className="px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6]">
              Institution
            </th>
            <th className="px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6]">
              1st Year
            </th>
            <th className="px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] relative after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]">
              2nd Year
            </th>

            {/* Dynamic Columns */}
            {rightTableColumns[activeTableCategory].map((col) => (
              <th
                key={col.key}
                className="px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 bg-white/60"
              >
                {col.label}
              </th>
            ))}

            {/* WhatsApp CTA Column */}
            <th className="px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 bg-white/60">
              Contact
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedCostData.map((row, index) => (
            <tr
              key={row.id}
              className={`transition-all duration-300 ${
                index % 2 === 0 ? "bg-white/50" : "bg-white/30"
              } hover:bg-[#fff7f0]/80 hover:shadow-[0_4px_12px_rgba(255,115,0,0.15)]`}
            >
              {/* Fixed Columns */}
              <td className="px-5 py-4 border border-gray-300 font-semibold text-gray-900 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] shadow-[0_2px_4px_rgba(0,0,0,0.06)] relative z-[2]">
                {row.name || "-"}
              </td>
              <td className="px-5 py-4 border border-gray-300 text-teal-700 font-medium text-center bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] shadow-[0_2px_4px_rgba(0,0,0,0.05)] relative z-[2]">
                {row.cost1stYear || "-"}
              </td>
              <td
                className="px-5 py-4 border border-gray-300 text-indigo-700 font-medium text-center
                bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] shadow-[0_2px_4px_rgba(0,0,0,0.05)] relative z-[2]
                after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]"
              >
                {row.cost2ndYear || "-"}
              </td>

              {/* Dynamic Columns */}
              {rightTableColumns[activeTableCategory].map((col) => (
                <td
                  key={col.key}
                  className="px-5 py-4 border border-gray-300 text-gray-900 whitespace-pre-wrap"
                >
                  {col.key === "defaultCharges" && row[col.key]
                    ? row[col.key]
                        .replace(/:\s*/g, ": ")
                        .replace(/Default Charges:/g, "\nDefault Charges:")
                        .replace(/Penal Charges\s*:/g, "\nPenal Charges:")
                        .split("\n")
                        .map((line, idx) => (
                          <div key={idx}>{line.trim()}</div>
                        ))
                    : col.key === "otherExpenses" && row[col.key]
                    ? Object.entries(row[col.key]).map(([key, value], idx) => (
                        <div key={idx}>
                          {key}: {value}
                        </div>
                      ))
                    : row[col.key] || "-"}
                </td>
              ))}

              {/* WhatsApp CTA */}
              <td className="px-5 py-4 border border-gray-300 text-center">
                <a
                  href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about ${encodeURIComponent(
                    row.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-green-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2.004C6.504 2.004 2 6.508 2 12.046c0 1.96.508 3.872 1.472 5.552L2 22l4.56-1.472A9.944 9.944 0 0 0 12.04 22c5.54 0 10.044-4.504 10.044-9.954 0-5.54-4.504-10.042-10.044-10.042zM12.04 20.1c-1.64 0-3.24-.43-4.64-1.25l-.33-.19-2.7.87.88-2.63-.21-.34A8.01 8.01 0 0 1 4.1 12.04c0-4.374 3.566-7.93 7.94-7.93 4.374 0 7.93 3.556 7.93 7.93s-3.556 7.93-7.93 7.93zm4.47-5.93c-.244-.122-1.44-.714-1.664-.8-.224-.084-.388-.122-.552.122-.164.244-.63.8-.772.964-.14.164-.284.184-.528.062-.244-.122-1.03-.378-1.962-1.2-.726-.646-1.216-1.444-1.36-1.688-.14-.244-.015-.376.106-.498.108-.106.244-.274.366-.412.12-.136.16-.244.24-.406.082-.164.04-.308-.02-.43-.06-.122-.552-1.33-.756-1.816-.2-.48-.4-.414-.552-.422l-.47-.008c-.16 0-.42.062-.64.308s-.84.822-.84 2.004c0 1.182.86 2.322.98 2.486.12.164 1.7 2.594 4.14 3.63.578.25 1.03.4 1.384.514.582.186 1.11.16 1.53.098.466-.07 1.44-.586 1.64-1.152.2-.57.2-1.058.14-1.16-.06-.1-.22-.162-.464-.284z" />
                  </svg>
                  Enquire
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {(!sortedCostData || sortedCostData.length === 0) && (
        <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
          No data available.
        </div>
      )}
    </div>
  </div>
</section>

import { useState, useEffect } from "react";

const LANGUAGES = [
  { code: "ar",  label: "Arabic",                flag: "🇸🇦" },
  { code: "bn",  label: "Bengali",               flag: "🇧🇩" },
  { code: "zh",  label: "Chinese",               flag: "🇨🇳" },
  { code: "cs",  label: "Czech",                 flag: "🇨🇿" },
  { code: "nl",  label: "Dutch",                 flag: "🇳🇱" },
  { code: "fa",  label: "Farsi (Persian)",       flag: "🇮🇷" },
  { code: "fi",  label: "Finnish",               flag: "🇫🇮" },
  { code: "fr",  label: "French",                flag: "🇫🇷" },
  { code: "de",  label: "German",                flag: "🇩🇪" },
  { code: "he",  label: "Hebrew",                flag: "🇮🇱" },
  { code: "hi",  label: "Hindi",                 flag: "🇮🇳" },
  { code: "id",  label: "Indonesian",            flag: "🇮🇩" },
  { code: "it",  label: "Italian",               flag: "🇮🇹" },
  { code: "ja",  label: "Japanese",              flag: "🇯🇵" },
  { code: "ko",  label: "Korean",                flag: "🇰🇷" },
  { code: "ms",  label: "Malay",                 flag: "🇲🇾" },
  { code: "pl",  label: "Polish",                flag: "🇵🇱" },
  { code: "pt",  label: "Portuguese",            flag: "🇧🇷" },
  { code: "ro",  label: "Romanian",              flag: "🇷🇴" },
  { code: "ru",  label: "Russian",               flag: "🇷🇺" },
  { code: "es",  label: "Spanish",               flag: "🇪🇸" },
  { code: "th",  label: "Thai",                  flag: "🇹🇭" },
  { code: "tr",  label: "Turkish",               flag: "🇹🇷" },
];


export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("fr");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, []);

  useEffect(() => {
    setCharCount(inputText.length);
  }, [inputText]);

const handleTranslate = async () => {
  if (!inputText.trim()) { setError("Please enter some text to translate."); return; }
  setLoading(true); setError(""); setTranslated("");

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`
    );
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    if (data.responseStatus === 200) {
      setTranslated(data.responseData.translatedText);
    } else {
      throw new Error("No translation returned.");
    }
  } catch (err) {
    setError(err.message || "Translation failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleClear = () => {
    setInputText("");
    setTranslated("");
    setError("");
  };

  const handleCopy = async () => {
    if (!translated) return;
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedLang = LANGUAGES.find((l) => l.code === targetLang);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdf6ec 0%, #fceee0 50%, #f5e6d3 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #c9853a 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #8b4513 0%, transparent 70%)" }}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-2xl transition-all duration-700 ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: "#b8763a" }}
          >
            Lingua
          </p>
          <h1
            className="text-5xl font-bold leading-none mb-2"
            style={{ color: "#2c1a0e", letterSpacing: "-0.02em" }}
          >
            Translate
          </h1>
          <div className="w-16 h-px mx-auto mt-3" style={{ background: "#c9853a" }} />
        </div>

        {/* Main Panel */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "#fffaf4",
            border: "1px solid rgba(180,120,60,0.15)",
            boxShadow:
              "0 24px 64px rgba(100,50,10,0.12), 0 4px 16px rgba(100,50,10,0.08)",
          }}
        >
          {/* Input Section */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#c9853a" }}
                />
                <span
                  className="text-xs tracking-widest uppercase font-bold"
                  style={{ color: "#b8763a", fontFamily: "monospace" }}
                >
                  English
                </span>
              </div>
              <span
                className="text-xs tabular-nums"
                style={{
                  color: charCount > 4500 ? "#e05c2f" : "#c4a882",
                  fontFamily: "monospace",
                }}
              >
                {charCount} / 5000
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, 5000))}
              placeholder="Enter text to translate…"
              rows={5}
              className="w-full resize-none bg-transparent outline-none text-base leading-relaxed placeholder:opacity-40"
              style={{
                color: "#2c1a0e",
                fontFamily: "'Georgia', serif",
                fontSize: "1.05rem",
                caretColor: "#c9853a",
              }}
            />
          </div>

          {/* Toolbar row */}
          <div
            className="px-6 py-3 flex items-center gap-4"
            style={{
              borderTop: "1px solid rgba(180,120,60,0.12)",
              borderBottom: "1px solid rgba(180,120,60,0.12)",
              background: "rgba(201,133,58,0.04)",
            }}
          >
            {/* Arrow icon */}
            <div className="flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="#c9853a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Language Dropdown */}
            <div className="relative flex-1">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full appearance-none bg-transparent outline-none text-sm font-bold cursor-pointer pr-6"
                style={{ color: "#2c1a0e", fontFamily: "'Georgia', serif" }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 5L7 9L11 5"
                  stroke="#c9853a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {inputText && (
                <button
                  onClick={handleClear}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{
                    color: "#b8763a",
                    border: "1px solid rgba(180,120,60,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,133,58,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleTranslate}
                disabled={loading || !inputText.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "#2c1a0e",
                  color: "#fdf6ec",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.02em",
                  boxShadow: "0 2px 12px rgba(44,26,14,0.25)",
                }}
                onMouseEnter={(e) => {
                  if (!loading && inputText.trim())
                    e.currentTarget.style.background = "#c9853a";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = "#2c1a0e";
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="rgba(253,246,236,0.3)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
                        stroke="#fdf6ec"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Translating
                  </>
                ) : (
                  <>
                    Translate
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="p-6 pt-4 min-h-[8rem]">
            {error ? (
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-2xl text-sm"
                style={{
                  background: "rgba(224,92,47,0.08)",
                  border: "1px solid rgba(224,92,47,0.2)",
                  color: "#c0401a",
                }}
              >
                <svg
                  className="flex-shrink-0 mt-0.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M8 5V8.5M8 10.5V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {error}
              </div>
            ) : translated ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#8bc4a0" }}
                    />
                    <span
                      className="text-xs tracking-widest uppercase font-bold"
                      style={{ color: "#5a9a72", fontFamily: "monospace" }}
                    >
                      {selectedLang?.flag} {selectedLang?.label}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-xs flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-150"
                    style={{
                      color: copied ? "#5a9a72" : "#8a9a8a",
                      border: "1px solid rgba(90,154,114,0.2)",
                      background: copied ? "rgba(90,154,114,0.08)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!copied) {
                        e.currentTarget.style.background = "rgba(90,154,114,0.07)";
                        e.currentTarget.style.color = "#5a9a72";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!copied) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#8a9a8a";
                      }
                    }}
                  >
                    {copied ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6.5L4.5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <rect
                            x="4"
                            y="4"
                            width="6"
                            height="7"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.1"
                          />
                          <path
                            d="M4 3.5V3A1 1 0 0 1 5 2H9.5A1 1 0 0 1 10.5 3V8.5"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "#2c1a0e",
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.05rem",
                  }}
                >
                  {translated}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-20">
                <p
                  className="text-sm text-center"
                  style={{ color: "#c4a882", fontStyle: "italic" }}
                >
                  {loading ? "Finding the words…" : "Translation will appear here"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-6 tracking-widest uppercase"
          style={{ color: "#c4a882" }}
        >
          Powered by saurabh sharma to Qskill internship · 20 Languages
        </p>
      </div>
    </div>
  );
}

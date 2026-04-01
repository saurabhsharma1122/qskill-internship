import { useState, useEffect, useCallback } from "react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function StringGenerator()  {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const generateString = useCallback(() => {
    const pool = Object.entries(options)
      .filter(([, enabled]) => enabled)
      .map(([key]) => CHAR_SETS[key])
      .join("");

    if (!pool) {
      setResult("SELECT AT LEAST ONE OPTION");
      setStrength(0);
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const generated = Array.from(array, (n) => pool[n % pool.length]).join("");
    setResult(generated);

    // Trigger glitch animation
    setGlitch(true);
    setTimeout(() => setGlitch(false), 400);

    // Calculate strength score
    const activeCount = Object.values(options).filter(Boolean).length;
    const score = Math.min(
      100,
      Math.round(
        (length / 64) * 50 + (activeCount / 4) * 50
      )
    );
    setStrength(score);
  }, [length, options]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const handleCopy = useCallback(async () => {
    if (!result || result === "SELECT AT LEAST ONE OPTION") return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const toggleOption = useCallback((key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const strengthLabel =
    strength >= 80 ? "STRONG" : strength >= 50 ? "MODERATE" : "WEAK";
  const strengthColor =
    strength >= 80
      ? "bg-emerald-400"
      : strength >= 50
      ? "bg-amber-400"
      : "bg-red-500";
  const strengthTextColor =
    strength >= 80
      ? "text-emerald-400"
      : strength >= 50
      ? "text-amber-400"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-mono">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#a1a1aa 1px, transparent 1px), linear-gradient(90deg, #a1a1aa 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-zinc-600 tracking-[0.3em] uppercase">
              util.v1
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 leading-none">
            STRING
            <br />
            <span className="text-zinc-500">GENERATOR</span>
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          {/* Output Area */}
          <div className="p-5 border-b border-zinc-800 bg-zinc-950/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-600 tracking-[0.25em] uppercase">
                Output
              </span>
              <span className={`text-[10px] tracking-[0.2em] ${strengthTextColor}`}>
                {strengthLabel}
              </span>
            </div>

            {/* Generated String */}
            <div
              className={`relative min-h-[3.5rem] flex items-center break-all text-sm leading-relaxed tracking-wide transition-all duration-150 ${
                glitch ? "text-emerald-300" : "text-zinc-200"
              }`}
              style={{
                textShadow: glitch
                  ? "0 0 12px rgba(52,211,153,0.6)"
                  : "none",
                fontFamily: "'Courier New', Courier, monospace",
                wordBreak: "break-all",
              }}
            >
              {result || "—"}
            </div>

            {/* Strength bar */}
            <div className="mt-3 h-px w-full bg-zinc-800 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ease-out ${strengthColor}`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="p-5 space-y-5">
            {/* Length Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase">
                  Length
                </label>
                <span className="text-sm text-zinc-100 tabular-nums w-7 text-right">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-1 appearance-none rounded-full bg-zinc-800 outline-none cursor-pointer"
                style={{
                  accentColor: "#34d399",
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-zinc-700">4</span>
                <span className="text-[9px] text-zinc-700">128</span>
              </div>
            </div>

            {/* Character Set Toggles */}
            <div>
              <span className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase block mb-3">
                Characters
              </span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(options).map(([key, enabled]) => (
                  <button
                    key={key}
                    onClick={() => toggleOption(key)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all duration-150 ${
                      enabled
                        ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                        : "bg-transparent border-zinc-800 text-zinc-600"
                    } hover:border-zinc-500`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
                        enabled
                          ? "bg-emerald-400 border-emerald-400"
                          : "border-zinc-700"
                      }`}
                    >
                      {enabled && (
                        <svg
                          className="w-2.5 h-2.5 text-zinc-900"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5.5L4 7.5L8 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-xs tracking-wide capitalize">
                      {key}
                    </span>
                    <span className="ml-auto text-[9px] text-zinc-700 tracking-wide font-normal">
                      {key === "uppercase"
                        ? "A–Z"
                        : key === "lowercase"
                        ? "a–z"
                        : key === "numbers"
                        ? "0–9"
                        : "!@#"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={generateString}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-900 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-150 active:scale-[0.97]"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.5 8A5.5 5.5 0 1 1 8 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 1L10.5 3.5L8 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Generate
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold tracking-[0.15em] uppercase transition-all duration-150 active:scale-[0.97] ${
                  copied
                    ? "bg-zinc-800 border-zinc-700 text-emerald-400"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {copied ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8.5L6 11.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <rect
                        x="5"
                        y="5"
                        width="8"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M5 4V3.5A1.5 1.5 0 0 1 6.5 2H12a1.5 1.5 0 0 1 1.5 1.5V11"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-zinc-700 mt-5 tracking-widest uppercase">
          Cryptographically Secure · Web Crypto API
        </p>
      </div>
    </div>
  );
}
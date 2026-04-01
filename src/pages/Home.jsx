import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 font-mono">
      <h1 className="text-4xl font-bold text-zinc-100">QSkill Projects</h1>
      <p className="text-zinc-500 text-sm tracking-widest uppercase">Choose a project</p>
      <div className="flex gap-4">
        <Link to="/generator" className="px-6 py-3 bg-emerald-400 text-zinc-900 font-bold rounded-xl hover:bg-emerald-300 transition">
          String Generator
        </Link>
        <Link to="/translator" className="px-6 py-3 bg-zinc-800 text-zinc-100 font-bold rounded-xl hover:bg-zinc-700 transition border border-zinc-700">
          Translator
        </Link>
      </div>
    </div>
  )
}

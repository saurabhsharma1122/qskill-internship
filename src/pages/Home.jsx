import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-8 font-mono px-4">
      
      {/* About Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-zinc-100">Saurabh Sharma</h2>
        <p className="text-emerald-400 text-sm tracking-widest uppercase">AI Systems Engineer · Python · Full-Stack</p>
        <div className="flex flex-wrap justify-center gap-4 text-zinc-500 text-xs mt-2">
          <span>📍 Nagpur, India</span>
          <span>📧 saurabhsharma.in.developer@gmail.com</span>
          <span>📞 +91 9096471852</span>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://saurabhsharma1122.github.io/" target="_blank" className="text-emerald-400 text-xs hover:underline">🌐 Portfolio</a>
          <a href="https://github.com/saurabhsharma1122" target="_blank" className="text-emerald-400 text-xs hover:underline">💻 GitHub</a>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-zinc-800"></div>

      {/* Projects */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-100">QSkill Projects</h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Choose a project</p>
        <div className="flex gap-4 justify-center">
          <Link to="/#/generator" className="px-6 py-3 bg-emerald-400 text-zinc-900 font-bold rounded-xl hover:bg-emerald-300 transition">
            String Generator
          </Link>
          <Link to="/#/translator" className="px-6 py-3 bg-zinc-800 text-zinc-100 font-bold rounded-xl hover:bg-zinc-700 transition border border-zinc-700">
            Translator
          </Link>
        </div>
      </div>

    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#bfe9ff] to-white text-gray-800 flex items-center justify-center p-6">

      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-md w-[90%] max-w-md border border-white/50">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">
          Contact
        </h1>

        <div className="flex flex-col gap-4 text-sm">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/i_m___deepanshusolanki/"
            target="_blank"
            className="relative px-4 py-2 rounded-lg bg-pink-100 text-pink-600 overflow-hidden group transition"
          >
            <span className="relative z-10">Instagram</span>
            <span className="absolute inset-0 bg-pink-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

          {/* Phone */}
          <a
            href="tel:+919871409724"
            className="relative px-4 py-2 rounded-lg bg-green-100 text-green-600 overflow-hidden group transition"
          >
            <span className="relative z-10">Phone: +91 9871409724</span>
            <span className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

          {/* Discord */}
          <a
            href="https://example.com"
            target="_blank"
            className="relative px-4 py-2 rounded-lg bg-indigo-100 text-indigo-600 overflow-hidden group transition"
          >
            <span className="relative z-10">Discord</span>
            <span className="absolute inset-0 bg-indigo-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

          {/* Email */}
          <a
            href="mailto:solankideepanshu2006@gmail.com"
            className="relative px-4 py-2 rounded-lg bg-yellow-100 text-yellow-600 overflow-hidden group transition"
          >
            <span className="relative z-10">Email</span>
            <span className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/deepanshu-solanki-081346318/"
            target="_blank"
            className="relative px-4 py-2 rounded-lg bg-blue-100 text-blue-600 overflow-hidden group transition"
          >
            <span className="relative z-10">LinkedIn</span>
            <span className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DeepanshuSolanki09"
            target="_blank"
            className="relative px-4 py-2 rounded-lg bg-gray-100 text-gray-700 overflow-hidden group transition"
          >
            <span className="relative z-10">GitHub</span>
            <span className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </a>

        </div>
      </div>
    </div>
  );
}
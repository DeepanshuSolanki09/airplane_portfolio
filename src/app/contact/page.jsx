export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md border border-white/10">
        
        <h1 className="text-3xl font-bold mb-6 text-center">Contact</h1>

        <div className="flex flex-col gap-4 text-lg">
          
          <a
            href="https://www.instagram.com/i_m___deepanshusolanki/"
            target="_blank"
            className="hover:text-pink-400 transition"
          >
            Instagram
          </a>

          <a
            href="tel:+919871409724"
            className="hover:text-green-400 transition"
          >
            Phone: +91 9871409724
          </a>

          <a
            href="https://example.com"
            target="_blank"
            className="hover:text-indigo-400 transition"
          >
            Discord
          </a>

          <a
            href="mailto:solankideepanshu2006@gmail.com"
            className="hover:text-yellow-400 transition"
          >
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/deepanshu-solanki-081346318/"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/DeepanshuSolanki09"
            target="_blank"
            className="hover:text-gray-400 transition"
          >
            GitHub
          </a>

        </div>
      </div>
    </div>
  );
}
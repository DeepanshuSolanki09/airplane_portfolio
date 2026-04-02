"use client";
export default function ProjectsPage() {
  const projects = [
    {
      title: "3D Portfolio",
      desc: "An immersive 3D portfolio built with React Three Fiber and custom shaders.",
      tech: ["React", "R3F", "Three.js", "GLSL", "GSAP"],
      live: "https://airplane-portfolio.vercel.app/",
      code: "https://github.com/DeepanshuSolanki09/airplane_portfolio",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#bfe9ff] to-[#ffffff] text-gray-800 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl">

        <h1 className="text-6xl font-bold mb-10 text-center text-blue-950 z-50">
          Projects
        </h1>

        <div className="grid md:grid-cols-2 gap-6 z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/50 shadow-md transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-500">
                {project.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {project.desc}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full border border-blue-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 text-sm">
                
                <a
                  href={project.live}
                  target="_blank"
                  className="relative px-4 py-2 rounded-lg bg-green-100 text-green-600 overflow-hidden group transition"
                >
                  <span className="relative z-10">Live</span>
                  <span className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>

                <a
                  href={project.code}
                  target="_blank"
                  className="relative px-4 py-2 rounded-lg bg-purple-100 text-purple-600 overflow-hidden group transition"
                >
                  <span className="relative z-10">Code</span>
                  <span className="absolute inset-0 bg-purple-200 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
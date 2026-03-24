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
    {
      title: "Shader Playground",
      desc: "Real-time GLSL shader experiments with interactive controls.",
      tech: ["GLSL", "Three.js", "WebGL"],
      live: "https://your-live-link.com",
      code: "https://github.com/your-repo",
    },
    {
      title: "Fullstack App",
      desc: "A fullstack web application with authentication and API integration.",
      tech: ["Next.js", "Node.js", "Express", "MongoDB"],
      live: "https://your-live-link.com",
      code: "https://github.com/your-repo",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">

        <h1 className="text-4xl font-bold mb-10 text-center">Projects</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-400">
                {project.title}
              </h2>

              <p className="text-sm text-gray-300 mb-4">
                {project.desc}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-white/10 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 text-sm">
                <a
                  href={project.live}
                  target="_blank"
                  className="text-green-400 hover:underline"
                >
                  Live
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
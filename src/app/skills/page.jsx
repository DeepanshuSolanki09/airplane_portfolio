"use client";
export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#bfe9ff] to-white text-gray-800 flex items-center justify-center p-6">

      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-md w-full max-w-4xl border border-white/50">

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-950">
          Skills & Experience
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Languages */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">Languages</h2>
            <p className="text-gray-600">C++, JavaScript, GLSL</p>
          </div>

          {/* Frontend */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">Frontend</h2>
            <p className="text-gray-600">HTML, CSS, Tailwind CSS, GSAP, React, Next.js</p>
          </div>

          {/* Backend */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">Backend</h2>
            <p className="text-gray-600">Node.js, Express</p>
          </div>

          {/* Tools */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">Apps & Tools</h2>
            <p className="text-gray-600">Blender, Git, GitHub, Postman, Figma, and more...</p>
          </div>

          {/* 3D */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">3D Development</h2>
            <p className="text-gray-600">Three.js, React Three Fiber (R3F), Custom GLSL Shaders</p>
          </div>

          {/* CP */}
          <div className="p-5 rounded-xl bg-white/50 border border-white/40 shadow-sm md:col-span-2">
            <h2 className="text-lg font-semibold mb-2 text-blue-500">Competitive Programming</h2>

            <p className="text-gray-600 mb-1">Solved 350+ problems on LeetCode</p>
            <p className="text-gray-600 mb-1">Pupil on Codeforces</p>
            <p className="text-gray-600 mb-1">2★ on CodeChef</p>
            <p className="text-gray-600 mb-3">500 rating on AtCoder</p>

            {/* Profile Buttons */}
            <div className="flex flex-wrap gap-3 text-sm">

              <a
                href="https://leetcode.com/u/Deepanshu_Solanki/"
                target="_blank"
                className="relative px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-700 overflow-hidden group"
              >
                <span className="relative z-10">LeetCode</span>
                <span className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-100 transition"></span>
              </a>

              <a
                href="https://codeforces.com/profile/Strawberry__"
                target="_blank"
                className="relative px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 overflow-hidden group"
              >
                <span className="relative z-10">Codeforces</span>
                <span className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 transition"></span>
              </a>

              <a
                href="https://www.codechef.com/users/fave_jaguar_65"
                target="_blank"
                className="relative px-3 py-1.5 rounded-lg bg-green-100 text-green-600 overflow-hidden group"
              >
                <span className="relative z-10">CodeChef</span>
                <span className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-100 transition"></span>
              </a>

              <a
                href="https://atcoder.jp/users/Strawberry_"
                target="_blank"
                className="relative px-3 py-1.5 rounded-lg bg-red-100 text-red-600 overflow-hidden group"
              >
                <span className="relative z-10">AtCoder</span>
                <span className="absolute inset-0 bg-red-200 opacity-0 group-hover:opacity-100 transition"></span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
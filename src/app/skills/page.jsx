"use client";
export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-white/10">

        <h1 className="text-4xl font-bold mb-8 text-center">Skills & Experience</h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Languages */}
          <div className="card">
            <h2 className="title">Languages</h2>
            <p>C++, JavaScript, GLSL</p>
          </div>

          {/* Frontend */}
          <div className="card">
            <h2 className="title">Frontend</h2>
            <p>HTML, CSS, Tailwind CSS, GSAP, React, Next.js</p>
          </div>

          {/* Backend */}
          <div className="card">
            <h2 className="title">Backend</h2>
            <p>Node.js, Express</p>
          </div>

          {/* Tools */}
          <div className="card">
            <h2 className="title">Apps & Tools</h2>
            <p>Blender, Git, GitHub, Postman, Figma, and more...</p>
          </div>

          {/* 3D */}
          <div className="card">
            <h2 className="title">3D Development</h2>
            <p>Three.js, React Three Fiber (R3F), Custom GLSL Shaders</p>
          </div>

          {/* CP */}
          <div className="card md:col-span-2">
            <h2 className="title">Competitive Programming</h2>
            <p className="mb-2">
              Solved 350+ problems on LeetCode
            </p>
            <p className="mb-2">
              Pupil on Codeforces
            </p>
            <p className="mb-2">
              2★ on CodeChef
            </p>
            <p className="mb-2">
              500 rating on AtCoder
            </p>

            <div className="flex flex-col gap-1 mt-3 text-sm text-blue-400">
              <a href="https://leetcode.com/u/Deepanshu_Solanki/" target="_blank">LeetCode Profile</a>
              <a href="https://codeforces.com/profile/Strawberry__" target="_blank">Codeforces Profile</a>
              <a href="https://www.codechef.com/users/fave_jaguar_65" target="_blank">CodeChef Profile</a>
              <a href="https://atcoder.jp/users/Strawberry_" target="_blank">AtCoder Profile</a>
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind helper classes */}
      <style jsx>{`
        .card {
          padding: 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s;
        }
        .card:hover {
          background: rgba(255,255,255,0.1);
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #60a5fa;
        }
      `}</style>
    </div>
  );
}
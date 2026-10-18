import { CalendarDays, Award, Users, GraduationCap, School } from 'lucide-react';

const activities = ['Technical Events', 'Symposium', 'Workshops'];
const interests = ['Artificial Intelligence', 'Data Science', 'Python', 'Machine Learning'];

export default function AcademicSection() {
  return (
    <div id="academics" className="mt-12 sm:mt-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center">
          <School className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Academics</h3>
          <p className="text-sm text-slate-400">Explore my academic journey</p>
        </div>
      </div>

      <article className="bg-[#0e1b3d]/90 rounded-3xl border border-blue-400/25 overflow-hidden shadow-xl shadow-black/30">
        <div className="relative h-48 sm:h-64">
          <img
            src="/images/mamce.jpg"
            alt="Entrance gateway of M.A.M. College of Engineering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b3d] via-[#0e1b3d]/30 to-transparent" />
        </div>

        <div className="relative px-6 sm:px-10 pb-8 sm:pb-10 -mt-14 sm:-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="w-full max-w-[220px] bg-white rounded-2xl p-3 shadow-lg shadow-black/40 border border-blue-400/30 shrink-0">
              <img
                src="/images/mamce-logo.png"
                alt="MAM College of Engineering logo"
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight text-balance">
                M.A.M. College of Engineering
              </h4>
              <p className="text-blue-300 font-semibold mt-1">
                B.Tech, Artificial Intelligence and Data Science
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-3 bg-[#0a1128]/80 p-4 rounded-2xl border border-blue-500/20">
              <CalendarDays className="w-5 h-5 text-cyan-300 shrink-0" aria-hidden="true" />
              <div>
                <dt className="text-xs text-slate-400 uppercase tracking-wider">Duration</dt>
                <dd className="text-white font-semibold">{'Sep 2025 – 2029'}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0a1128]/80 p-4 rounded-2xl border border-blue-500/20">
              <Award className="w-5 h-5 text-amber-300 shrink-0" aria-hidden="true" />
              <div>
                <dt className="text-xs text-slate-400 uppercase tracking-wider">Grade</dt>
                <dd className="text-white font-semibold">9.0 / 10</dd>
              </div>
            </div>
          </dl>

          <div className="mt-6">
            <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Users className="w-4 h-4 text-blue-300" aria-hidden="true" />
              Activities and societies
            </h5>
            <ul className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <li
                  key={activity}
                  className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 text-sm border border-blue-400/30"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-slate-200 leading-relaxed">
            Currently pursuing B.Tech in Artificial Intelligence and Data Science, with a strong interest in
            Artificial Intelligence, Data Science, Python, and Machine Learning. Actively developing programming,
            problem-solving, communication, and technical skills through academic projects, workshops, symposiums,
            and practical learning.
          </p>

          <div className="mt-6 pt-6 border-t border-blue-900/80">
            <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-300" aria-hidden="true" />
              Areas of interest
            </h5>
            <ul className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="px-3 py-1 rounded-full bg-white/[0.06] text-slate-200 text-sm border border-white/10"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}

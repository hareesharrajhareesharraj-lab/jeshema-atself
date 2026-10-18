import { Database, Search, LineChart, Sigma, Rocket, CalendarDays } from 'lucide-react';

const tags = ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'];

const stats = [
  { label: 'Records', value: '782' },
  { label: 'Avg SST', value: '28.29°C' },
  { label: 'SST Range', value: '7.90°C' },
  { label: 'Std Dev', value: '1.39°C' }
];

const steps = [
  {
    icon: Database,
    title: 'The Dataset',
    body: 'The dataset contains 782 records and 9 variables, including buoy identification, geographic location, wind measurements, humidity, air temperature, and sea surface temperature (SST).'
  },
  {
    icon: Search,
    title: 'Loading & Inspection',
    body: 'Using Python and Pandas, the dataset was loaded and inspected for structure, data types, and missing values, with no missing values identified.'
  },
  {
    icon: LineChart,
    title: 'Visualization',
    body: 'Line charts were created to examine variations in air temperature and SST across the observations.'
  },
  {
    icon: Sigma,
    title: 'Statistical Analysis',
    body: 'Descriptive statistical analysis of SST showed an average temperature of 28.29°C, with values ranging from 22.44°C to 30.34°C, a standard deviation of 1.39°C, and an overall range of 7.90°C.'
  },
  {
    icon: Rocket,
    title: 'Future Work',
    body: 'Future work can extend this analysis by studying SST anomalies, relationships between climate variables, and predictive models for El Niño forecasting.'
  }
];

export default function BlogSection() {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-[#0EA5C6]/10 text-[#0EA5C6] border-[#0EA5C6]/25"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight text-balance">
          El Niño Climate Analysis Using Python
        </h3>
        <p className="flex items-center gap-2 text-xs text-[#64748B]">
          <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
          Project write-up by Jeshema Begam
        </p>
      </header>

      <figure className="bg-white rounded-2xl p-3 sm:p-4 border border-[#DCE7F2]">
        <img
          src="/elnino-air-temp.png"
          alt="Line chart of air temperature for the first 20 observations in the El Niño dataset"
          width={640}
          height={480}
          loading="lazy"
          className="w-full h-auto rounded-lg"
        />
        <figcaption className="text-xs text-slate-500 mt-2 text-center">
          Air temperature — first 20 observations
        </figcaption>
      </figure>

      <section className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-[#0EA5C6] uppercase tracking-wider">Overview</h4>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          This project presents a Python-based exploratory analysis of El Niño-related climate observations.
        </p>
      </section>

      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#DCE7F2]"
          >
            <div className="w-9 h-9 shrink-0 rounded-xl bg-[#0EA5C6]/10 text-[#0EA5C6] border border-[#0EA5C6]/25 flex items-center justify-center">
              <step.icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h5 className="font-bold text-[#0F172A] text-sm">
                <span className="text-[#14B8A6] mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {step.title}
              </h5>
              <p className="text-sm text-[#475569] leading-relaxed mt-1">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <dl className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#DCE7F2]">
            <dt className="text-[11px] text-[#0EA5C6] font-medium">{stat.label}</dt>
            <dd className="text-lg font-bold text-[#0F172A]">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-2 pt-5 border-t border-[#DCE7F2]">
        <h4 className="text-sm font-semibold text-[#0EA5C6] uppercase tracking-wider">Conclusion</h4>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          The findings demonstrate how Python-based visualization and statistical techniques can support the
          initial understanding of ocean-climate data and temperature variability associated with El Niño
          conditions.
        </p>
      </section>
    </article>
  );
}

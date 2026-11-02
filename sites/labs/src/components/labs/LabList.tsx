import Link from 'next/link';
import { Clock, Server, ShieldCheck } from 'lucide-react';
import { Lab } from '@/lib/lab/lab-utils';

interface LabListProps {
  labs: Lab[];
}

export default function LabList({ labs }: LabListProps) {
  return (
    <div className="space-y-6 font-cyber">
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">CTF Labs</h1>
          <p className="text-white/70 text-sm mt-1">Self-hosted labs for local training</p>
        </div>
        <div className="text-white/70 text-sm">{labs.length} labs</div>
      </div>

      <section className="border border-white/20 rounded-lg p-4 md:p-6 bg-black">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">Home Lab Ready</span>
          <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">Reusable Runner</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Deploy vulnerable machines without rebuilding the setup each time.</h2>
        <p className="text-white/80 text-sm leading-relaxed">
          Each lab is published with metadata, provider details, and setup notes so community members can pull one lab or the full collection, skip already installed labs, and launch with a consistent command.
        </p>
        <Link
          href="/setup/"
          className="inline-flex mt-4 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20 transition-colors duration-300"
        >
          Set up the Lab Manager
        </Link>
      </section>

      <div className="grid gap-4 md:gap-6">
        {labs.map((lab) => (
          <Link key={lab.id} href={`/${lab.slug}/`} className="block">
            <article className="bg-black border border-white/20 rounded-lg p-4 md:p-6 hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {lab.featured && (
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">Featured</span>
                  )}
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">{lab.category}</span>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">{lab.status}</span>
                </div>
                <span className="text-white/60 text-sm">{lab.date}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3">{lab.title}</h2>
              <p className="text-white/80 text-sm mb-4 line-clamp-3">{lab.excerpt}</p>

              <div className="grid gap-2 sm:grid-cols-3 mb-4">
                <div className="flex items-center gap-2 text-white/75 text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{lab.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 text-white/75 text-xs">
                  <Server className="h-4 w-4" />
                  <span>{lab.platform}</span>
                </div>
                <div className="flex items-center gap-2 text-white/75 text-xs">
                  <Clock className="h-4 w-4" />
                  <span>{lab.estimatedTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {lab.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

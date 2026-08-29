import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import SiteNav from '@/components/portfolio/SiteNav';
import SiteFooter from '@/components/portfolio/SiteFooter';

export default function InstagramFeed() {
  const [feed, setFeed] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await base44.functions.invoke('getInstagramFeed', {});
        if (!alive) return;
        setFeed(res.data);
        setStatus('ready');
      } catch (e) {
        if (alive) setStatus('error');
      }
    })();
    return () => {alive = false;};
  }, []);

  const items = feed?.items ?? [];

  return <main className="min-h-screen bg-[#0d0d0f] text-slate-200"><SiteNav />
    <header className="px-[6vw] pb-12 pt-32 md:pt-40">
      <p className="hud-label">Live / Instagram feed</p>
      <h1 className="mt-4 text-4xl font-light uppercase tracking-[.04em] md:text-6xl">Latest work.</h1>
      {feed?.username && <a href={`https://www.instagram.com/${feed.username}/`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] text-[#ff2d00] transition-opacity hover:opacity-60">@{feed.username}</a>}
    </header>

    <section className="px-[3vw] pb-32">
      {status === 'loading' &&
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square animate-pulse bg-white/5" />)}
        </div>
      }

      {status === 'error' &&
      <p className="font-mono text-sm text-slate-500">The feed couldn't be reached right now.</p>
      }

      {status === 'ready' && items.length === 0 &&
      <p className="font-mono text-sm text-slate-500">No posts yet.</p>
      }

      {status === 'ready' && items.length > 0 &&
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {items.map((m) =>
        <a key={m.id} href={m.permalink} target="_blank" rel="noreferrer" className="group relative block overflow-hidden bg-white/5">
              <Image src={m.image} alt={m.caption || 'Instagram post'} fittingType="fill" className="w-full transition-transform duration-500 group-hover:scale-105 aspect-square object-cover" />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {m.caption && <p className="line-clamp-3 text-[11px] leading-snug text-slate-200">{m.caption}</p>}
                <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#ff2d00]">View <ExternalLink className="h-3 w-3" /></span>
              </div>
            </a>
        )}
        </div>
      }
    </section>
    <SiteFooter />
  </main>;
}
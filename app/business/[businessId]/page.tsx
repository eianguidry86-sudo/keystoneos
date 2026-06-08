import Link from 'next/link';

interface PageProps {
  params: Promise<{
    businessId: string;
  }>;
}

export default async function BusinessDashboardPage({ params }: PageProps) {
  // Await the asynchronous params object
  const { businessId } = await params;
  
  const displayName = businessId === 'fundamentals' 
    ? 'FUNdamentals Basketball Academy' 
    : businessId === 'marketmap' 
    ? 'MarketMap Analytics' 
    : businessId.toUpperCase();

  const subModules = [
    { name: 'Backend Operations', path: 'backend', desc: 'Legal, accounting, and strategic planning tasks.' },
    { name: 'Product Development', path: 'product', desc: 'Software logs, sprint tracking, and iterations.' },
    { name: 'Resource Library', path: 'resources', desc: 'Ingested documentation, repositories, and notes.' },
    { name: 'Execution Timeline', path: 'timeline', desc: 'Parallel task scheduling and intersections.' },
    { name: 'AI Session Logs', path: 'sessions', desc: 'Continuity checkpoints and state summaries.' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 border-zinc-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-500">Workspace</span>
          <h1 className="text-4xl font-bold tracking-tight mt-1">{displayName}</h1>
        </div>
        <Link href="/business" className="text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 px-3 py-1.5 rounded bg-zinc-900">
          &larr; Switch Venture
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {subModules.map((mod) => (
          <Link key={mod.path} href={`/business/${businessId}/${mod.path}`} className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition flex flex-col justify-between h-40">
            <div>
              <h3 className="text-lg font-medium">{mod.name}</h3>
              <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{mod.desc}</p>
            </div>
            <span className="text-xs font-mono text-zinc-500 mt-4 block">/{mod.path}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
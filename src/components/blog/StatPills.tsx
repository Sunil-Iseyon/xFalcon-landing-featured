interface StatPillsProps {
  stats: string[];
}

export function StatPills({ stats }: StatPillsProps) {
  return (
    <div className="my-6 flex flex-wrap gap-3">
      {stats.map((stat) => (
        <span
          key={stat}
          className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{
            border: '1px solid var(--accent-glow)',
            color: 'var(--text)',
            background: 'transparent',
          }}
        >
          {stat}
        </span>
      ))}
    </div>
  );
}

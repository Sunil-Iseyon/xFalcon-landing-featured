import { notFound } from 'next/navigation';
import { decryptDemoToken } from '@/lib/demo-url';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function DemoGoPage({ params }: Props) {
  const { token } = await params;
  const path = decryptDemoToken(token);

  if (!path || !/^\/demos\/.+/.test(path)) {
    notFound();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0B1220',
      }}
    >
      <iframe
        src={path}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        allow="fullscreen; clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-pointer-lock"
        title="xFalcon Demo"
      />
    </div>
  );
}

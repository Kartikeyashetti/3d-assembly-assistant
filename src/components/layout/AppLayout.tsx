import type { ReactNode } from 'react';

interface AppLayoutProps {
  title: string;
  scene: ReactNode;
  bottomBar: ReactNode;
}

export function AppLayout({ title, scene, bottomBar }: AppLayoutProps) {
  return (
    <div className="app">
      <header className="app__header">
        <h1>{title}</h1>
      </header>

      <main className="app__scene">{scene}</main>

      {bottomBar}
    </div>
  );
}

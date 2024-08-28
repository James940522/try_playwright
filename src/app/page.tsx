import { PlayWrightRecorder } from '@/widget';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="w-full mx-auto max-w-[1280px]">
        <PlayWrightRecorder />
      </section>
    </main>
  );
}

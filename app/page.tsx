import Link from 'next/link';
import ScrollEffects from '@/components/ScrollEffects';
import TopicGraph from '@/components/TopicGraph';
import WasmDiagram from '@/components/WasmDiagram';
import TrainingDiagram from '@/components/TrainingDiagram';

const GITHUB = 'https://github.com/nolabs-ai/deepfabric';
const DOCS = 'https://docs.deepfabric.dev';

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = {
  domain: (
    <Icon>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v5.5M12 15v5.5M3.5 12H9M15 12h5.5" />
    </Icon>
  ),
  graph: (
    <Icon>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7c0 5-7 5-7 10M12 7v10M12 7c0 5 7 5 7 10" />
    </Icon>
  ),
  samples: (
    <Icon>
      <rect x="3.5" y="4" width="17" height="6" rx="2" />
      <rect x="3.5" y="14" width="17" height="6" rx="2" />
      <path d="M7 7h5M7 17h8" />
    </Icon>
  ),
  eval: (
    <Icon>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l3.5-4 3 2.5L19 7" />
      <circle cx="19" cy="7" r="1.2" fill="currentColor" />
    </Icon>
  ),
  tool: (
    <Icon>
      <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />
    </Icon>
  ),
  export: (
    <Icon>
      <path d="M12 15V4M8 8l4-4 4 4" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </Icon>
  ),
};

const steps = [
  { n: '01', icon: icons.domain, title: 'Domain input', body: 'Start from a topic of expertise.' },
  { n: '02', icon: icons.graph, title: 'Topic graph', body: 'Coverage without redundancy.' },
  { n: '03', icon: icons.samples, title: 'Training samples', body: 'Generated with real tool execution.' },
  { n: '04', icon: icons.eval, title: 'Evaluation', body: 'Prove the capabilities you trained.' },
];

const graphSteps = [
  { n: '01', title: 'DOMAIN', body: 'Name the field of expertise you want a model to master.' },
  { n: '02', title: 'TOPICS', body: 'The domain is split into its major areas of knowledge.' },
  { n: '03', title: 'SUBTOPICS', body: 'Each area expands into specific, non-overlapping subtopics.' },
  { n: '04', title: 'SAMPLES', body: 'Every subtopic yields training samples, with tools actually executed.' },
];

const sandboxSteps = [
  { n: '01', title: 'IMPORT', body: 'Pull tool schemas from your MCP server into the sandbox.' },
  { n: '02', title: 'MOCK', body: 'Load mock responses and seed files for the tools to work with.' },
  { n: '03', title: 'EXECUTE', body: 'Agent calls run as WebAssembly components, so they really execute.' },
  { n: '04', title: 'RECORD', body: 'Real results are logged into each training sample.' },
];

const features = [
  {
    icon: icons.graph,
    title: 'Diverse topic graphs',
    body: 'Unique topic graph generation covers your domain thoroughly while avoiding the repetitive samples that cause overfit.',
    span: 'md:col-span-2',
  },
  {
    icon: icons.tool,
    title: 'Real tool execution',
    body: 'Tools actually run, so samples are grounded in real outputs instead of simulated ones.',
    span: '',
  },
  {
    icon: icons.eval,
    title: 'Built-in evaluation',
    body: 'Evaluate on unseen tasks derived from your training splits.',
    span: '',
  },
  {
    icon: icons.export,
    title: 'Export anywhere',
    body: 'Send datasets straight to TRL, Unsloth or Axolotl and start fine-tuning.',
    span: 'md:col-span-2',
  },
];

const Arrow = () => (
  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Home() {
  return (
    <div className="font-sans overflow-x-clip">
      <ScrollEffects />
      {/* Hero */}
      <section id="top" data-snap data-label="Overview" className="snap-section relative px-4 pt-16 md:pt-24 pb-12">
        <div className="absolute inset-0 bg-aura pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 shadow-sm backdrop-blur">
            <span className="eyebrow !tracking-[0.18em]">Open source · Synthetic data</span>
          </div>

          <h1 className="animate-fade-in-delay-1 mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
            Build <span className="gradient-text">smaller, smarter</span> models that punch above their weight
          </h1>

          <p className="animate-fade-in-delay-2 mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-quality synthetic datasets with{' '}
            <span className="text-foreground font-medium">real tool execution</span>,{' '}
            <span className="text-foreground font-medium">diverse topic graphs</span>, and{' '}
            <span className="text-foreground font-medium">built-in evaluation</span>.
          </p>

          <div className="animate-fade-in-delay-3 mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={DOCS} className="btn-primary group" target="_blank" rel="noopener noreferrer">
              Get started
              <Arrow />
            </Link>
            <Link href={GITHUB} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Link>
          </div>
        </div>

        {/* Topic graph visual */}
        <div className="relative max-w-5xl mx-auto mt-14 md:mt-20 animate-fade-in-delay-4">
          <div className="card-surface p-3 md:p-6">
            <div className="flex items-center justify-between px-2 pb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-soft" />
                topic_graph.generate()
              </span>
              <span className="hidden sm:inline">example · domain: kubernetes</span>
            </div>
            <TopicGraph className="w-full h-auto" />

            <ol className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 border-t border-border pt-5 px-2">
              {graphSteps.map((g) => (
                <li key={g.n}>
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] text-primary mb-1.5">
                    {g.n} <span className="text-foreground">{g.title}</span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section id="pipeline" data-snap data-label="Pipeline" className="snap-section px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="eyebrow mb-4">Architecture</p>
            <h2 className="text-3xl md:text-4xl font-semibold">How the DeepFabric pipeline works</h2>
          </div>

          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* connector line behind cards (desktop) */}
            <div
              className="hidden md:block absolute left-[12%] right-[12%] top-[3.1rem] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-cyan/0"
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <li key={s.n} data-reveal={i + 1} className="card-surface card-hover relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan/15 text-primary flex items-center justify-center ring-1 ring-primary/15">
                    {s.icon}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/70">{s.n}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section id="why" data-snap data-label="Why" className="snap-section px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="max-w-2xl mb-10">
            <p className="eyebrow mb-4">Why DeepFabric</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Domain-anchored diversity <span className="gradient-text">without redundancy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} data-reveal={i + 1} className={`card-surface card-hover p-7 ${f.span}`}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" data-snap data-label="Compare" className="snap-section px-4 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div data-reveal="1" className="card-surface p-8 !bg-muted/40">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-destructive mb-4">Standard approach</p>
            <ul className="space-y-3 text-muted-foreground">
              {['Repetitive samples', 'Simulated tool outputs', 'No validation'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-destructive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">Models overfit and hallucinate.</p>
          </div>

          <div data-reveal="2" className="card-surface p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-primary/25 to-cyan/25 blur-3xl pointer-events-none" aria-hidden="true" />
            <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary mb-4">DeepFabric approach</p>
            <ul className="relative space-y-3 text-foreground">
              {['Diverse topic graphs', 'Real tool execution', 'Strict validation'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <p className="relative mt-6 text-sm text-muted-foreground">Models are grounded and efficient.</p>
          </div>
        </div>
      </section>

      {/* WebAssembly tool mocking */}
      <section id="tools" data-snap data-label="Tools" className="snap-section px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="max-w-2xl mb-10">
            <p className="eyebrow mb-4">Tool execution</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Real tool calls, mocked safely with <span className="gradient-text">WebAssembly</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Simulated tool outputs teach models to hallucinate. DeepFabric runs your tools in a Spin
              sandbox instead: each one is a WebAssembly component backed by mock data, so the agent
              gets genuine, deterministic results without touching a live API.
            </p>
          </div>

          <div data-reveal="1" className="card-surface p-3 md:p-6">
            <WasmDiagram className="w-full h-auto" />
            <ol className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 border-t border-border pt-5 px-2">
              {sandboxSteps.map((g) => (
                <li key={g.n}>
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] text-primary mb-1.5">
                    {g.n} <span className="text-foreground">{g.title}</span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="train" data-snap data-label="Train" className="snap-section px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="max-w-2xl mb-10">
            <p className="eyebrow mb-4">Training</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              <span className="gradient-text">Train</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Turn your dataset into a fine-tuned model with the frameworks you already use.
            </p>
          </div>

          <div data-reveal="1" className="card-surface p-3 md:p-6">
            <TrainingDiagram className="w-full h-auto" />
            <div className="mt-4 border-t border-border pt-5 px-2">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                The built-in <code className="font-mono text-sm text-primary">trl_sft</code> formatter turns
                generated samples into tool-calling conversations ready for TRL&apos;s SFTTrainer, or export
                to Unsloth and Axolotl. Then check the result with built-in evaluation on unseen tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="community" data-snap data-label="Open source" className="snap-section px-4 pb-10">
        <div data-reveal className="max-w-5xl mx-auto relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary via-violet to-cyan p-px">
          <div className="relative rounded-[27px] bg-background px-6 py-14 md:py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-aura pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 grid-lines opacity-70 pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">Open source and community driven</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Built in the open. Contribute, share datasets, and help make small models more capable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={GITHUB} className="btn-primary" target="_blank" rel="noopener noreferrer">
                  Star on GitHub
                </Link>
                <Link href={DOCS} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

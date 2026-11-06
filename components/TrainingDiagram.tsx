import { Arrow, Box, DiagramDefs, MONO } from './diagram';

/** SFT first, then GRPO, rewarding rollouts scored against the sandboxed tools. */
export default function TrainingDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 320"
      className={className}
      role="img"
      aria-label="Training pipeline: a dataset is formatted and used for supervised fine-tuning; the tuned model is then improved with GRPO, sampling rollouts, scoring them with a reward and updating the policy"
    >
      <DiagramDefs />
      <rect width="1000" height="320" fill="url(#dg-dots)" shapeRendering="crispEdges" />

      {/* SFT lane */}
      <text x="20" y="28" fontFamily={MONO} fontSize="11" letterSpacing="2" fill="#4f46e5">01 · SFT</text>
      <text x="96" y="28" fontFamily={MONO} fontSize="11" fill="#1e1b4b" fillOpacity="0.55">learn the format</text>
      <Box x={20} y={40} w={170} h={70} title="Dataset" sub=".jsonl samples" icon={{ cols: 3, rows: 3, seed: 2 }} />
      <Box x={250} y={40} w={170} h={70} title="trl_sft" sub="formatter" />
      <Box x={480} y={40} w={170} h={70} title="SFTTrainer" sub="TRL · Unsloth · Axolotl" />
      <Box x={710} y={40} w={170} h={70} title="Tuned model" sub="knows tool format" strong />
      <Arrow d="M190 75H250" end={[250, 75]} />
      <Arrow d="M420 75H480" end={[480, 75]} delay={1} />
      <Arrow d="M650 75H710" end={[710, 75]} delay={2} />

      {/* Hand-off */}
      <Arrow d="M880 75H940V235H880" end={[880, 235]} delay={1.5} />
      <text x="932" y="160" fontFamily={MONO} fontSize="10" textAnchor="end" fill="#4f46e5" fillOpacity="0.8">SFT checkpoint</text>

      {/* GRPO lane */}
      <text x="20" y="188" fontFamily={MONO} fontSize="11" letterSpacing="2" fill="#4f46e5">02 · GRPO</text>
      <text x="108" y="188" fontFamily={MONO} fontSize="11" fill="#1e1b4b" fillOpacity="0.55">learn what works</text>
      <Box x={20} y={200} w={170} h={70} title="Prompts" sub="held-out tasks" />
      <Box x={250} y={200} w={170} h={70} title="Rollouts" sub="a group of attempts" icon={{ cols: 3, rows: 2, seed: 7 }} />
      <Box x={480} y={200} w={170} h={70} title="Reward" sub="checked in sandbox" icon={{ cols: 3, rows: 3, seed: 11 }} />
      <Box x={710} y={200} w={170} h={70} title="Policy update" sub="reinforce what scored" strong />
      <Arrow d="M190 235H250" end={[250, 235]} delay={0.5} />
      <Arrow d="M420 235H480" end={[480, 235]} delay={1.5} />
      <Arrow d="M650 235H710" end={[710, 235]} delay={2.5} />

      {/* Loop */}
      <Arrow d="M795 270V300H335V270" end={[335, 270]} delay={2} />
      <text x="565" y="293" fontFamily={MONO} fontSize="10" textAnchor="middle" fill="#4f46e5" fillOpacity="0.8">repeat</text>
    </svg>
  );
}

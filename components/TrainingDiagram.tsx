import { Arrow, Box, DiagramDefs } from './diagram';

/** Dataset -> formatter -> trainer -> tuned model. */
export default function TrainingDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 110"
      className={className}
      role="img"
      aria-label="Training pipeline: a dataset is formatted with trl_sft, used by a trainer for supervised fine-tuning, producing a tuned model"
    >
      <DiagramDefs />
      <rect width="1000" height="110" fill="url(#dg-dots)" shapeRendering="crispEdges" />
      <Box x={20} y={20} w={170} h={70} title="Dataset" sub=".jsonl samples" icon={{ cols: 3, rows: 3, seed: 2 }} />
      <Box x={250} y={20} w={170} h={70} title="trl_sft" sub="formatter" />
      <Box x={480} y={20} w={170} h={70} title="SFTTrainer" sub="TRL · Unsloth · Axolotl" />
      <Box x={710} y={20} w={170} h={70} title="Tuned model" sub="knows tool format" strong />
      <Arrow d="M190 55H250" end={[250, 55]} />
      <Arrow d="M420 55H480" end={[480, 55]} delay={1} />
      <Arrow d="M650 55H710" end={[710, 55]} delay={2} />
    </svg>
  );
}

import { Arrow, Bitmap, Box, DiagramDefs, MONO } from './diagram';

/** How tool calls are executed against mocked tools inside a WebAssembly (Spin) sandbox. */
export default function WasmDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 300"
      className={className}
      role="img"
      aria-label="An LLM agent sends tool calls into a WebAssembly sandbox of mocked tools seeded with mock data; the results are returned to the agent and recorded in the training sample"
    >
      <DiagramDefs />
      <rect width="1000" height="300" fill="url(#dg-dots)" shapeRendering="crispEdges" />

      {/* Agent */}
      <Box x={20} y={95} w={170} h={70} title="LLM agent" sub="plans + calls tools" icon={{ cols: 3, rows: 3, seed: 3 }} />

      {/* Sandbox */}
      <rect x="290" y="30" width="430" height="240" fill="#4f46e5" fillOpacity="0.03" stroke="url(#dg-grad)" strokeOpacity="0.8" strokeDasharray="5 4" shapeRendering="crispEdges" />
      <text x="306" y="52" fontFamily={MONO} fontSize="10" letterSpacing="2" fill="#4f46e5" fillOpacity="0.85">
        WEBASSEMBLY SANDBOX · SPIN
      </text>

      <Box x={310} y={72} w={200} h={50} title="read_file" sub="wasm component" />
      <Box x={310} y={132} w={200} h={50} title="write_file" sub="wasm component" />
      <Box x={310} y={192} w={200} h={50} title="your_tool" sub="from your MCP schema" strong />

      {/* Mock data feeding the components */}
      <g fill="none" stroke="url(#dg-grad)" strokeOpacity="0.5" shapeRendering="crispEdges">
        <path d="M540 157H525M525 97V217M525 97H510M525 157H510M525 217H510" />
      </g>
      <rect x="540" y="100" width="164" height="114" fill="#fff" stroke="url(#dg-grad)" strokeOpacity="0.6" shapeRendering="crispEdges" />
      <Bitmap x={622} y={146} cols={8} rows={4} cell={10} gap={3} seed={9} />
      <text x="622" y="204" fontFamily={MONO} fontSize="10" textAnchor="middle" fill="#1e1b4b" fillOpacity="0.6">
        mock data + seeded files
      </text>

      {/* Flows */}
      <Arrow d="M190 118H290" end={[290, 118]} label="tool call" lx={240} ly={108} />
      <Arrow d="M290 148H190" end={[190, 148]} delay={1.2} label="result" lx={240} ly={170} />
      <Arrow d="M720 130H790" end={[790, 130]} delay={2.4} label="logged" lx={755} ly={120} />

      {/* Training sample */}
      <Box x={790} y={95} w={190} h={70} title="Training sample" sub="real tool results" icon={{ cols: 3, rows: 3, seed: 5 }} />
    </svg>
  );
}

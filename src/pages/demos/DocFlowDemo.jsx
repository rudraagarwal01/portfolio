import { FileText, ScanText, BrainCircuit, GitBranch } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Upload document", icon: FileText },
  { label: "OCR extraction", icon: ScanText },
  { label: "Bedrock classification", icon: BrainCircuit },
  { label: "Route to queue", icon: GitBranch },
];

const mockPayload = {
  invoice_id: "INV-2024-08471",
  vendor: "Apex Industrial Supply Co.",
  amount: "$14,302.50",
  confidence: 0.97,
  route_to: "accounts_payable_queue",
};

function renderOutput() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
        Classified Payload
      </p>
      <pre className="font-mono text-xs text-green-400 leading-relaxed whitespace-pre">
        {JSON.stringify(mockPayload, null, 2)}
      </pre>
    </div>
  );
}

export default function DocFlowDemo() {
  return (
    <ProjectDemo
      title="DocFlow"
      tagline="Simulated AWS Textract + Bedrock classification pipeline"
      steps={steps}
      renderOutput={renderOutput}
    />
  );
}

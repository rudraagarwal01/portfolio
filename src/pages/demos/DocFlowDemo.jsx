import { motion } from "framer-motion";
import { FileText, ScanText, BrainCircuit, GitBranch } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";

const steps = [
  { label: "Upload document", icon: FileText },
  { label: "OCR extraction", icon: ScanText },
  { label: "Bedrock classification", icon: BrainCircuit },
  { label: "Route to queue", icon: GitBranch },
];

const docFields = [
  { label: "Invoice #", value: "INV-2024-08471", highlight: true },
  { label: "Date", value: "Mar 15, 2024", highlight: false },
  { label: "Bill From", value: "Apex Industrial Supply Co.", highlight: true },
  { label: "Bill To", value: "Meridian Corp.", highlight: false },
  { label: "PO Number", value: "PO-9183", highlight: false },
  { label: "Total Due", value: "$14,302.50", highlight: true },
];

const lineItems = [
  { desc: 'Steel Pipe 2" × 20ft (×24)', total: "$7,488.00" },
  { desc: "Industrial Valve Set (×6)", total: "$5,343.00" },
  { desc: "Shipping & Handling", total: "$1,471.50" },
];

const extracted = [
  { key: "invoice_id", value: "INV-2024-08471", isStr: true },
  { key: "vendor", value: "Apex Industrial Supply Co.", isStr: true },
  { key: "amount", value: "$14,302.50", isStr: true },
  { key: "confidence", value: 0.97, isStr: false },
  { key: "route_to", value: "accounts_payable_queue", isStr: true },
];

function DocOutput() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">

        {/* Left: Invoice document mockup */}
        <div className="relative bg-zinc-900 border border-white/10 rounded-xl p-4 overflow-hidden">
          {/* OCR scan line sweeps downward then fades */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-10"
            initial={{ top: 0, opacity: 0.9 }}
            animate={{ top: "95%", opacity: 0 }}
            transition={{ duration: 1.1, ease: "linear" }}
          />

          <div className="mb-3 pb-2 border-b border-white/10">
            <p className="font-bold text-zinc-100 text-sm tracking-widest font-mono">INVOICE</p>
            <p className="text-[10px] text-zinc-500 font-mono">Apex Industrial Supply Co.</p>
          </div>

          <div className="space-y-1.5">
            {docFields.map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`flex justify-between text-[10px] rounded px-1.5 py-0.5 ${
                  highlight ? "bg-blue-500/15 border border-blue-500/20" : ""
                }`}
              >
                <span className="text-zinc-500 font-mono">{label}</span>
                <span
                  className={`font-mono font-semibold ${
                    highlight ? "text-blue-300" : "text-zinc-400"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/10">
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">
              Line Items
            </p>
            {lineItems.map((item) => (
              <div
                key={item.desc}
                className="flex justify-between text-[9px] text-zinc-500 font-mono py-0.5"
              >
                <span>{item.desc}</span>
                <span>{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Extracted JSON fields */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 flex flex-col">
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
            Extracted Fields
          </p>
          <div className="space-y-1.5 flex-1">
            {extracted.map(({ key, value, isStr }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.18, duration: 0.3 }}
                className="font-mono text-xs leading-relaxed"
              >
                <span className="text-blue-400">"{key}"</span>
                <span className="text-zinc-500">: </span>
                <span className={isStr ? "text-green-400" : "text-amber-400"}>
                  {isStr ? `"${value}"` : value}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + extracted.length * 0.18 + 0.1, duration: 0.4 }}
            className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between"
          >
            <span className="font-mono text-[10px] text-zinc-500">OCR confidence</span>
            <span className="font-mono text-[10px] font-bold text-cyan-400">97%</span>
          </motion.div>
        </div>
      </div>

      {/* Route badge */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + extracted.length * 0.18 + 0.5, duration: 0.4 }}
        className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-xl py-3"
      >
        <GitBranch size={13} className="text-blue-400" />
        <span className="font-mono text-xs text-blue-400 font-semibold">
          Routed →{" "}
          <span className="text-cyan-400">accounts_payable_queue</span>
        </span>
      </motion.div>
    </div>
  );
}

function renderOutput() {
  return <DocOutput />;
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

import { motion } from "framer-motion";
import { FileText, Smile, CheckCircle, Shield, Wand2 } from "lucide-react";
import ProjectDemo from "../../components/ProjectDemo";
import { DEMO_DESCRIPTIONS } from "../../lib/projectDemoConfigs";

const steps = [
  { label: "Parse note", icon: FileText },
  { label: "Tone analysis", icon: Smile },
  { label: "Grammar check", icon: CheckCircle },
  { label: "Compliance scan", icon: Shield },
  { label: "Draft generation", icon: Wand2 },
];

const scores = [
  { label: "Tone", value: 91 },
  { label: "Grammar", value: 96 },
  { label: "Compliance", value: 88 },
  { label: "Overall", value: 92 },
];

const draft = `Subject: Follow-Up on Project Proposal: Q3 Partnership

Hi Sarah,

Thank you for taking the time to connect last week. I wanted to follow up on our discussion regarding the Q3 partnership opportunity.

Based on our conversation, I've outlined a preliminary scope that aligns with both teams' objectives. I'd love to schedule a 30-minute call to walk through the details and address any questions you may have.

Would Thursday at 2:00 PM EST work for you?

Best regards,
Rudra`;

function renderOutput() {
  return (
    <div className="space-y-4">
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-4">
          Quality Scores
        </p>
        <div className="space-y-3">
          {scores.map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-zinc-400">{label}</span>
                <span className="text-blue-400">{value}/100</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5">
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
          Generated Draft
        </p>
        <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {draft}
        </pre>
      </div>
    </div>
  );
}

export default function AIEchoMailDemo() {
  return (
    <ProjectDemo
      title="AI EchoMail"
      tagline="GPT-4 powered email generation with multi-agent moderation, 60% faster drafting"
      steps={steps}
      description={DEMO_DESCRIPTIONS.aiEchoMail}
      renderOutput={renderOutput}
    />
  );
}

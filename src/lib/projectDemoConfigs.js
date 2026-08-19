export const DEMO_DESCRIPTIONS = {
  urbanEnergy: {
    problem:
      "Building operators have no fast way to detect when energy consumption spikes unexpectedly; anomalies go unnoticed for minutes, running up costs and missing SLAs.",
    approach:
      "Telemetry from each building streams into Redis Streams, where a consumer computes a rolling slot baseline and compares every reading against it. When a reading crosses the threshold, the system flags it and routes the alert to the facilities queue, end-to-end in under 200ms.",
    stack: ["Docker", "Redis Streams", "PostgreSQL"],
    outcome: "<200ms from spike to flagged alert.",
  },
  docflow: {
    problem:
      "Enterprise teams manually sort, read, and route documents; invoices land in the wrong queue, and there's no audit trail for how a document was classified.",
    approach:
      "DocFlow simulates the AWS Textract + Bedrock pipeline: it OCR-extracts structured fields from uploaded documents, runs a classifier that assigns a document type and confidence score, then routes each document to the correct queue automatically.",
    stack: ["AWS Textract", "Bedrock", "pytest"],
    outcome: "Auto-classification at 97% OCR confidence, no manual sorting.",
  },
  aiEchoMail: {
    problem:
      "Drafting professional emails from scratch is slow, and a single LLM call is inconsistent — sometimes the tone lands, sometimes it doesn't, with no visibility into why.",
    approach:
      "A three-stage agentic loop (draft, critique, revise) scores every email across tone, grammar, length, and compliance. The scoring and RAG retrieval are both surfaced in the UI rather than hidden behind the result, a moderation gate runs before generation, and finished drafts push directly into Gmail Drafts via OAuth.",
    stack: ["React", "FastAPI", "Claude API", "FAISS", "PostgreSQL", "Gmail OAuth"],
    outcome: "90+ backend tests · 5-page shell · Gmail OAuth (test-account scope)",
  },
  mealMatch: {
    problem:
      "Restaurants discard surplus food daily while nearby shelters and community centers go underserved; the coordination gap is that neither side can find the other in real time.",
    approach:
      "Restaurants post surplus listings with portion count and pickup window. The FastAPI backend uses Postgres row-level locking (SELECT FOR UPDATE) to ensure exactly one claim wins when multiple recipients request the same listing simultaneously—verified in a load test with 100 concurrent claimers. Recipients browse available listings through a swipeable card interface built with Framer Motion.",
    stack: ["FastAPI", "PostgreSQL", "React", "Framer Motion"],
    outcome: "Zero duplicate claims across 100 concurrent claimers in load test.",
  },
  authguard: {
    problem:
      "Phishing sites that slightly misspell legitimate domains (like paypa1.com) bypass standard blocklists and slip past users who aren't scrutinizing every URL.",
    approach:
      "The Chrome extension runs every visited URL through an entropy check, a typosquatting scan, and a form security audit. Flagged domains are posted to a FastAPI backend that scores risk, persists reports in PostgreSQL, and surfaces them in a React admin dashboard for review.",
    stack: ["FastAPI", "PostgreSQL", "React", "Chrome API"],
    outcome: "100+ domains in the seeded risk store.",
  },
  fitnessGenius: {
    problem:
      "Most fitness apps show raw daily numbers but don't surface weekly trends across all metrics at once; users navigate four separate screens to get a picture they could see in one.",
    approach:
      "Fitness Genius connects to Apple HealthKit, aggregates a week of biometric data, and renders each metric against a personalized goal in a single snapshot view: steps, calories, heart rate, and sleep, all in one place.",
    stack: ["Swift", "HealthKit", "Xcode"],
    outcome: "Adopted by 2,000+ users on the App Store.",
  },
};

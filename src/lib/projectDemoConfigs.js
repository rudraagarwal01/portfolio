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
      "Writing professional emails from scratch is slow, and getting tone, grammar, and compliance right at the same time is hard to do quickly.",
    approach:
      "AI EchoMail takes a short note or bullet list, routes it through parallel GPT-4 agents for tone analysis, grammar checking, and compliance scanning, then assembles a polished draft. Each agent scores its dimension independently so you can see exactly why the draft came out the way it did.",
    stack: ["FastAPI", "Python", "OpenAI"],
    outcome: "~60% reduction in drafting time.",
  },
  mealMatch: {
    problem:
      "Restaurants discard surplus food daily while nearby shelters and community centers go underserved; the coordination gap is that neither side can find the other in real time.",
    approach:
      "Restaurants post surplus listings with portion count and pickup window. MealMatch runs a proximity-weighted matching algorithm to find the closest eligible claimant and confirms a reservation in seconds, backed by interactive maps and a live listing feed.",
    stack: ["React", "SQLite", "Leaflet"],
    outcome: "Active across 1,000+ food listings.",
  },
  authguard: {
    problem:
      "Phishing sites that slightly misspell legitimate domains (like paypa1.com) bypass standard blocklists and slip past users who aren't scrutinizing every URL.",
    approach:
      "AuthGuard runs every visited URL through an entropy check, a typosquatting scan against known brand names, and a form security audit, all in the browser with no server round-trip. If any signal crosses threshold, the page is blocked and the user sees exactly why.",
    stack: ["JavaScript", "HTML", "Chrome API"],
    outcome: "95% detection accuracy on phishing and typosquatting patterns.",
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

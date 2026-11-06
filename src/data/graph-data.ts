export type NodeGroup = "me" | "org" | "project" | "tech" | "achievement";

export interface GraphNode {
  id: string;
  name: string;
  group: NodeGroup;
  category: string;
  size: number;
  color?: string;
  description: string;
  highlight?: string;
  url?: string;
  // D3 force simulation properties
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label: string;
}

export const GRAPH_CATEGORIES: { id: NodeGroup | "all"; label: string; color: string }[] = [
  { id: "all", label: "All Entities", color: "#64748B" },
  { id: "project", label: "Projects", color: "#10B981" },
  { id: "tech", label: "AI & Tech Stack", color: "#3B82F6" },
  { id: "org", label: "Institutions", color: "#F59E0B" },
  { id: "achievement", label: "Research & Awards", color: "#A855F7" },
];

export const GRAPH_DATA: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    // Center Anchor
    {
      id: "me",
      name: "Revalda Putawara",
      group: "me",
      category: "Profile",
      size: 26,
      color: "#06B6D4",
      description: "AI Engineer & Data Scientist specializing in Multi-Agent AI systems, LLM architectures, RAG pipelines, and applied Machine Learning.",
      highlight: "MSc Data Science (Distinction) • University of Bristol & ITB",
      url: "https://putawararevalda.github.io",
    },

    // Organizations & Institutions
    {
      id: "telkom",
      name: "PT. Telkom Indonesia",
      group: "org",
      category: "Enterprise",
      size: 19,
      color: "#EF4444",
      description: "Indonesia's largest telecommunications enterprise. Led AI Chapter Taskforce & engineered multi-agent LLM systems in MINDS talent pool.",
      highlight: "AI Engineer (MINDS) & Head of AI Taskforce",
      url: "https://www.telkom.co.id",
    },
    {
      id: "bumn",
      name: "Ministry of SOE",
      group: "org",
      category: "Government",
      size: 16,
      color: "#F59E0B",
      description: "Indonesian Ministry of State-Owned Enterprises. Automated financial consolidation for 108 SOEs and maintained macroeconomic pipelines.",
      highlight: "Data Analyst (Mar 2021 - Nov 2022)",
      url: "https://www.bumn.go.id",
    },
    {
      id: "bristol",
      name: "University of Bristol",
      group: "org",
      category: "Academia",
      size: 18,
      color: "#E11D48",
      description: "Russell Group research university in the UK. Completed MSc in Data Science with Distinction (3.74/4.00) and Bayesian NN SEU dissertation.",
      highlight: "MSc in Data Science — Distinction",
      url: "https://www.bristol.ac.uk",
    },
    {
      id: "itb",
      name: "Institut Teknologi Bandung",
      group: "org",
      category: "Academia",
      size: 16,
      color: "#2563EB",
      description: "Top engineering institute in Indonesia. Bachelor's in Industrial Engineering with production systems scheduling heuristic thesis.",
      highlight: "BSc Industrial Engineering",
      url: "https://www.itb.ac.id",
    },

    // Major Projects
    {
      id: "govai",
      name: "Regional Planning AI",
      group: "project",
      category: "Multi-Agent System",
      size: 16,
      color: "#10B981",
      description: "Multi-agent LLM assistant for provincial regional planning data with LangGraph orchestration, entity-aware SQL generation, and ChromaDB vector search.",
      highlight: "LangGraph • FastAPI • ChromaDB • PostgreSQL",
    },
    {
      id: "danantara",
      name: "National Asset Platform",
      group: "project",
      category: "Data Platform",
      size: 16,
      color: "#10B981",
      description: "Modern data platform and automated ELT pipelines for a national sovereign asset management institution connecting PostgreSQL, MongoDB, and Power BI.",
      highlight: "dbt • Apache Airflow • PostgreSQL • MongoDB • Power BI",
    },
    {
      id: "mbg-sentiment",
      name: "Policy Sentiment NLP",
      group: "project",
      category: "NLP & Research",
      size: 14,
      color: "#10B981",
      description: "Sentiment analysis pipeline evaluating public perception toward Indonesia's Free Nutritious Meal (MBG) program. Peer-reviewed research at IEEE DSAA 2025.",
      highlight: "PyTorch • Hugging Face • Topic Modeling",
    },
    {
      id: "bnn-study",
      name: "Bayesian NN SEU Study",
      group: "project",
      category: "Research",
      size: 14,
      color: "#10B981",
      description: "MSc dissertation investigating Bayesian Neural Network robustness against cosmic ray Single Event Upsets (SEUs) with weight & bias perturbations.",
      highlight: "PyTorch • Bayesian DL • MCMC",
    },
    {
      id: "enterprise-genai",
      name: "Enterprise GenAI Suite",
      group: "project",
      category: "Generative AI",
      size: 14,
      color: "#10B981",
      description: "Enterprise AI adoption solutions across PT Telkom Indonesia: OCR pipelines, meeting speech-to-text, Indonesian TTS training, and Azure OpenAI chatbots.",
      highlight: "Azure OpenAI • Speech-to-Text • TTS • OCR",
    },
    {
      id: "soe-etl",
      name: "108 SOE Macro ETL",
      group: "project",
      category: "Automation",
      size: 13,
      color: "#10B981",
      description: "Automated statement consolidation across 108 State-Owned Enterprises reducing processing time by 300% with automated Python ETL workflows.",
      highlight: "Python • Power BI • Macroeconomic ETL",
    },

    // AI & Tech Stack
    {
      id: "langgraph",
      name: "LangGraph",
      group: "tech",
      category: "Agentic AI",
      size: 13,
      color: "#3B82F6",
      description: "Framework for building stateful, multi-actor LLM applications and agentic decision graphs.",
    },
    {
      id: "fastapi",
      name: "FastAPI",
      group: "tech",
      category: "Backend API",
      size: 11,
      color: "#3B82F6",
      description: "High-performance Python web framework powering asynchronous AI service APIs.",
    },
    {
      id: "pytorch",
      name: "PyTorch",
      group: "tech",
      category: "Deep Learning",
      size: 13,
      color: "#3B82F6",
      description: "Primary deep learning framework used for Bayesian neural networks, NLP, and computer vision models.",
    },
    {
      id: "azure-openai",
      name: "Azure OpenAI",
      group: "tech",
      category: "Cloud GenAI",
      size: 12,
      color: "#3B82F6",
      description: "Enterprise foundation models (GPT-4) deployment, prompt engineering, and RAG architectures.",
    },
    {
      id: "chromadb",
      name: "ChromaDB",
      group: "tech",
      category: "Vector Store",
      size: 11,
      color: "#3B82F6",
      description: "Vector database for semantic query routing, schema retrieval, and RAG context grounding.",
    },
    {
      id: "dbt",
      name: "dbt",
      group: "tech",
      category: "Data Engineering",
      size: 12,
      color: "#3B82F6",
      description: "Data build tool for reliable, modular ELT transformations in modern data warehouses.",
    },
    {
      id: "airflow",
      name: "Apache Airflow",
      group: "tech",
      category: "Orchestration",
      size: 12,
      color: "#3B82F6",
      description: "Programmatic workflow orchestration for distributed scheduled data pipelines.",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      group: "tech",
      category: "Database",
      size: 12,
      color: "#3B82F6",
      description: "Relational database used for enterprise analytics, OLAP storage, and transactional services.",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      group: "tech",
      category: "Database",
      size: 10,
      color: "#3B82F6",
      description: "Document database storing semi-structured metadata and operational application state.",
    },
    {
      id: "powerbi",
      name: "Power BI",
      group: "tech",
      category: "Analytics",
      size: 11,
      color: "#3B82F6",
      description: "Enterprise BI dashboards with custom ODBC connector integration and executive reporting.",
    },
    {
      id: "docker",
      name: "Docker",
      group: "tech",
      category: "DevOps",
      size: 11,
      color: "#3B82F6",
      description: "Containerization tool for reproducible model packaging and production microservice deployment.",
    },

    // Research Publications & Competitions
    {
      id: "dsaa-2025",
      name: "IEEE DSAA 2025",
      group: "achievement",
      category: "Conference Paper",
      size: 12,
      color: "#A855F7",
      description: "Published paper: 'Every Tweet Counts? Sentiment Analysis of Public Response toward Indonesia's Free Nutritious Meal Program', Birmingham, UK.",
    },
    {
      id: "icdabi-2021",
      name: "IEEE ICDABI 2021",
      group: "achievement",
      category: "Conference Paper",
      size: 11,
      color: "#A855F7",
      description: "Published paper: 'Predicting Customer Churn: A Comparison of Eight Machine Learning Techniques', Sakheer, Bahrain.",
    },
    {
      id: "datathon-2025",
      name: "Bristol Datathon (2nd)",
      group: "achievement",
      category: "Competition Award",
      size: 12,
      color: "#A855F7",
      description: "2nd Place Winner (Advance Category) — University of Bristol Data Science Society Datathon (F1: 0.90 with PCA dimensionality reduction).",
    },
    {
      id: "telkomathon-dl",
      name: "TelkomAthon DL (1st)",
      group: "achievement",
      category: "Competition Award",
      size: 12,
      color: "#A855F7",
      description: "1st Place Winner & Best Learner — TelkomAthon Batch #3 Deep Learning Competition (95.25% CNN accuracy, Telegram Bot API).",
    },
    {
      id: "telkomathon-ds",
      name: "TelkomAthon DS (1st)",
      group: "achievement",
      category: "Competition Award",
      size: 12,
      color: "#A855F7",
      description: "1st Place Winner & Best Learner — TelkomAthon Batch #3 Data Science Competition (IndiHome payment delay prediction model, Streamlit).",
    },
    {
      id: "caie-cert",
      name: "CAIE Certification",
      group: "achievement",
      category: "Certification",
      size: 11,
      color: "#A855F7",
      description: "Certified Artificial Intelligence Engineer (CAIE) issued by the United States Artificial Intelligence Institute (USAII).",
    },
    {
      id: "ibm-cert",
      name: "IBM RAG & Agentic AI",
      group: "achievement",
      category: "Certification",
      size: 11,
      color: "#A855F7",
      description: "Professional Certificate in RAG architectures and Agentic AI systems by IBM via Coursera.",
    },
  ],

  links: [
    // Core profile connections
    { source: "me", target: "telkom", label: "AI ENGINEER" },
    { source: "me", target: "bumn", label: "DATA ANALYST" },
    { source: "me", target: "bristol", label: "MSc DATA SCIENCE" },
    { source: "me", target: "itb", label: "BSc IND. ENG." },

    // Institutional work to projects
    { source: "telkom", target: "govai", label: "EXTENDED" },
    { source: "telkom", target: "danantara", label: "ARCHITECTED" },
    { source: "telkom", target: "enterprise-genai", label: "DELIVERED" },
    { source: "bumn", target: "soe-etl", label: "AUTOMATED" },
    { source: "bristol", target: "bnn-study", label: "DISSERTATION" },

    // Projects to Technologies
    { source: "govai", target: "langgraph", label: "ORCHESTRATED_BY" },
    { source: "govai", target: "fastapi", label: "BACKEND_API" },
    { source: "govai", target: "chromadb", label: "VECTOR_SEARCH" },
    { source: "govai", target: "postgresql", label: "SQL_TARGET" },
    { source: "govai", target: "docker", label: "CONTAINERIZED" },

    { source: "danantara", target: "dbt", label: "DATA_TRANSFORM" },
    { source: "danantara", target: "airflow", label: "PIPELINE_SCHEDULING" },
    { source: "danantara", target: "postgresql", label: "DATA_STORE" },
    { source: "danantara", target: "mongodb", label: "DOCUMENTS" },
    { source: "danantara", target: "powerbi", label: "EXECUTIVE_BI" },

    { source: "mbg-sentiment", target: "pytorch", label: "MODEL_TRAINING" },
    { source: "bnn-study", target: "pytorch", label: "BAYESIAN_INFERENCE" },
    { source: "enterprise-genai", target: "azure-openai", label: "LLM_SERVICE" },
    { source: "enterprise-genai", target: "fastapi", label: "REST_API" },

    // Achievements & Publications
    { source: "mbg-sentiment", target: "dsaa-2025", label: "PUBLISHED_IN" },
    { source: "telkom", target: "icdabi-2021", label: "CASE_STUDY_PAPER" },
    { source: "bristol", target: "datathon-2025", label: "ORGANIZED_BY" },
    { source: "telkom", target: "telkomathon-dl", label: "ORGANIZED_BY" },
    { source: "telkom", target: "telkomathon-ds", label: "ORGANIZED_BY" },
    { source: "me", target: "datathon-2025", label: "WON_2ND_PLACE" },
    { source: "me", target: "telkomathon-dl", label: "WON_1ST_PLACE" },
    { source: "me", target: "telkomathon-ds", label: "WON_1ST_PLACE" },
    { source: "me", target: "caie-cert", label: "EARNED" },
    { source: "me", target: "ibm-cert", label: "COMPLETED" },
  ],
};

import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Revalda Putawara",
  initials: "RP",
  url: "https://putawararevalda.github.io",
  location: "Jakarta, Indonesia",
  locationLink: "https://www.google.com/maps/place/Jakarta,+Indonesia",
  description:
    "AI Engineer & Data Scientist specializing in Agentic AI architectures, LLM systems, RAG pipelines, and applied Machine Learning.",
  summary:
    "AI Engineer and Data Scientist with an MSc in Data Science (Distinction) from the University of Bristol and a strong foundation in Industrial Engineering from Institut Teknologi Bandung.\n\nSpecialized in building production LLM applications, multi-agent AI architectures (LangGraph, CrewAI), entity-aware SQL generation pipelines, and end-to-end data platforms. Proven track record leading AI initiatives, deploying computer vision and speech models, and engineering reliable data pipelines across telecommunications, state-owned enterprises, and national public-sector institutions.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Python", icon: Python },
    { name: "PyTorch" },
    { name: "LangGraph" },
    { name: "LangChain" },
    { name: "FastAPI" },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "MongoDB" },
    { name: "Azure OpenAI" },
    { name: "dbt" },
    { name: "Apache Airflow" },
    { name: "Power BI" },
    { name: "TensorFlow" },
    { name: "scikit-learn" },
    { name: "ChromaDB" },
    { name: "Git" },
    { name: "TypeScript", icon: Typescript },
    { name: "C++", icon: Csharp },
    { name: "R" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "putawararevalda@gmail.com",
    tel: "+6281321304733",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/putawararevalda",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/revalda-putawara/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:putawararevalda@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "PT. Telkom Indonesia",
      href: "https://www.telkom.co.id",
      badges: ["MINDS Talent Pool"],
      location: "Jakarta, Indonesia",
      title: "AI Engineer, MINDS (Data Analytics Talent Pool)",
      logoUrl: "/telkom.png",
      start: "Dec 2025",
      end: "Present",
      description:
        "Data Analyst and Data Engineer for a national asset management institution (Indonesia): built Power BI dashboards with custom ODBC connectors, connected Power BI workspaces to PostgreSQL and MongoDB, and built data pipelines using dbt and Airflow, setting up the data foundation for the project's next implementation phase. AI Engineer for a provincial regional planning agency (Indonesia): extended an existing multi-agent LLM assistant (LangGraph-orchestrated, FastAPI backend) by tailoring its entity-aware SQL generation pipeline for structured, domain-specific query handling.",
    },
    {
      company: "PT. Telkom Indonesia",
      href: "https://www.telkom.co.id",
      badges: ["AI Taskforce Head"],
      location: "Jakarta, Indonesia",
      title: "Data Scientist / AI Engineer",
      logoUrl: "/telkom.png",
      start: "Nov 2022",
      end: "Aug 2024",
      description:
        "Implemented AI to accelerate AI adoption across PT Telkom Indonesia, delivering production use cases across Optical Character Recognition (OCR), meeting transcription with speech-to-text, text-to-speech (TTS) model training, deepfake detection, and LLM-based chatbot applications built on Azure OpenAI Service and Azure ML. Organized and led a team of Data Scientists as Head of the AI Taskforce in the Data Science Chapter, providing AI consultancy, technical sharing sessions, and training recommendations across the organization.",
    },
    {
      company: "Ministry of State-Owned Enterprise Indonesia",
      href: "https://www.bumn.go.id",
      badges: [],
      location: "Jakarta, Indonesia",
      title: "Data Analyst",
      logoUrl: "/bumn.png",
      start: "Mar 2021",
      end: "Nov 2022",
      description:
        "Created Python automation scripts to consolidate financial reports across 108 State-Owned Enterprises, reducing operational processing time by 300%. Automated the process of gathering and cleaning macroeconomic data from disparate sources, maintaining automated Python ETL pipelines. Partnered with external consultants and internal units to translate requirements into compliant Power BI dashboards adhering to audit regulations.",
    },
  ],

  education: [
    {
      school: "University of Bristol",
      href: "https://www.bristol.ac.uk",
      degree: "MSc in Data Science — Distinction (3.74/4.00)",
      logoUrl: "/bristol.png",
      start: "Sep 2024",
      end: "Sep 2025",
    },
    {
      school: "Institut Teknologi Bandung (ITB)",
      href: "https://www.itb.ac.id",
      degree: "Bachelor's in Industrial Engineering (3.12/4.00)",
      logoUrl: "/itb.png",
      start: "Jul 2013",
      end: "Oct 2017",
    },
  ],

  certifications: [
    {
      title: "Certified Artificial Intelligence Engineer (CAIE)",
      issuer: "United States Artificial Intelligence Institute",
      dates: "Jul 2024 - Jul 2027",
      href: "https://www.usaii.org",
      logoUrl: "/usaii.svg",
    },
    {
      title: "IBM RAG and Agentic AI (Professional Certificate)",
      issuer: "IBM via Coursera (10-course Specialization)",
      dates: "May 2026",
      href: "https://www.coursera.org",
      logoUrl: "/coursera.svg",
    },
  ],

  publications: [
    {
      title: "Every Tweet Counts? Sentiment Analysis of Public Response toward Indonesia's Free Nutritious Meal Program",
      conference: "The 12th IEEE International Conference on Data Science and Advanced Analytics (DSAA), Birmingham, UK",
      year: "2025",
      authors: "R. Putawara, Z. Wildani, N. M. Ulmi, A. Mutia, Merysa, R. A. Yusuf",
      href: "https://putawararevalda.github.io/",
    },
    {
      title: "Predicting Customer Churn: A Comparison of Eight Machine Learning Techniques: A Case Study in an Indonesian Telecommunication Company",
      conference: "2021 International Conference on Data Analytics for Business and Industry (ICDABI), Sakheer, Bahrain",
      year: "2021",
      authors: "M. M. Ulkhaq, A. T. Wibowo, M. R. Tribosnia, R. Putawara, A. B. Firdauz",
      href: "https://putawararevalda.github.io/",
    },
    {
      title: "Flexible Job Shop Scheduling Considering Ready Time and Due Date",
      conference: "SNTI and SATELIT 2017 Proceeding, Malang, Indonesia",
      year: "2017",
      authors: "R. Putawara, W. Aribowo, A. Ma'ruf",
      href: "https://putawararevalda.github.io/",
    },
  ],

  projects: [
    {
      title: "Regional Planning Multi-Agent AI Assistant",
      href: "https://github.com/putawararevalda",
      dates: "Dec 2025 - Present",
      active: true,
      description:
        "Multi-agent AI assistant for a provincial regional planning agency analyzing socioeconomic data (welfare, education, population demographics, and regional budget allocations). Built with LangGraph orchestration, FastAPI backend, entity-aware deterministic SQL generation, ChromaDB vector retrieval, and causal-aware policy recommendations.",
      technologies: [
        "LangGraph",
        "FastAPI",
        "OpenAI GPT-4o",
        "ChromaDB",
        "PostgreSQL",
        "Vanna AI",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/putawararevalda",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "National Sovereign Asset Management Data Platform",
      href: "https://github.com/putawararevalda",
      dates: "Dec 2025 - Present",
      active: true,
      description:
        "Data foundation and modern analytics platform for a national sovereign wealth and asset management institution. Built robust automated ELT pipelines with dbt and Apache Airflow, engineered custom ODBC connectors, and integrated PostgreSQL & MongoDB with enterprise Power BI workspaces.",
      technologies: [
        "dbt",
        "Apache Airflow",
        "PostgreSQL",
        "MongoDB",
        "Power BI",
        "Python",
        "ODBC",
      ],
      links: [
        {
          type: "Website",
          href: "https://putawararevalda.github.io/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Public Policy Sentiment Analysis (DSAA 2025)",
      href: "https://putawararevalda.github.io/",
      dates: "2024 - 2025",
      active: true,
      description:
        "Natural language processing and sentiment analysis pipeline evaluating public perception toward Indonesia's national Free Nutritious Meal (MBG) program. Peer-reviewed research presented and published at IEEE DSAA 2025 in Birmingham, UK.",
      technologies: [
        "Python",
        "PyTorch",
        "NLP",
        "Topic Modeling",
        "scikit-learn",
        "Hugging Face",
      ],
      links: [
        {
          type: "Website",
          href: "https://putawararevalda.github.io/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Bayesian Neural Network SEU Robustness Study",
      href: "https://putawararevalda.github.io/",
      dates: "Sep 2024 - Sep 2025",
      active: true,
      description:
        "Master's dissertation research evaluating the robustness of Bayesian Neural Network architecture design choices against weight and bias perturbations induced by Single Event Upsets (SEUs), advancing AI reliability under cosmic ray disruptions.",
      technologies: [
        "PyTorch",
        "Bayesian Neural Networks",
        "MCMC / VI",
        "Python",
        "NumPy",
      ],
      links: [
        {
          type: "Website",
          href: "https://putawararevalda.github.io/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Enterprise Generative AI Suite",
      href: "https://telkom.co.id",
      dates: "Nov 2022 - Aug 2024",
      active: true,
      description:
        "Engineered production AI solutions across PT Telkom Indonesia, including OCR pipelines, meeting speech-to-text transcription, custom Indonesian text-to-speech (TTS) models, deepfake detection, and enterprise LLM chatbots on Azure OpenAI Service.",
      technologies: [
        "Azure OpenAI",
        "Azure ML",
        "FastAPI",
        "Speech-to-Text",
        "TTS",
        "OCR",
        "Python",
      ],
      links: [
        {
          type: "Website",
          href: "https://telkom.co.id",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "SOE Financial Consolidation & Macro ETL",
      href: "https://www.bumn.go.id",
      dates: "Mar 2021 - Nov 2022",
      active: true,
      description:
        "Automated financial report consolidation pipelines across 108 Indonesian State-Owned Enterprises, slashing manual processing time by 300%. Maintained automated macroeconomic ingestion pipelines and audit-compliant executive Power BI dashboards.",
      technologies: [
        "Python",
        "ETL Pipelines",
        "Power BI",
        "Data Quality",
        "Automation",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.bumn.go.id",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],

  hackathons: [
    {
      title: "University of Bristol Data Science Society Datathon",
      dates: "2025",
      location: "Bristol, United Kingdom",
      description:
        "Predicted injury severity in traffic accidents (a multi-label classification problem) achieving an F1 score of 0.90 using PCA dimensionality reduction, and presented key features in reducing injury severity.",
      image: "/bdss.png",
      win: "2nd Place Winner (Advance Category)",
      links: [],
    },
    {
      title: "TelkomAthon Batch #3 — Deep Learning Competition",
      dates: "2023",
      location: "Jakarta, Indonesia",
      description:
        "Trained a Convolutional Neural Network (CNN) model achieving 95.25% accuracy. Served the model through a backend REST API and integrated with a Telegram bot for real-time inference. Awarded individually as 'Best Learner'.",
      image: "/telkomathon.png",
      win: "1st Place Winner & Best Learner",
      links: [],
    },
    {
      title: "TelkomAthon Batch #3 — Data Science Competition",
      dates: "2021",
      location: "Jakarta, Indonesia",
      description:
        "Built a machine learning model predicting customer payment delays for IndiHome services, served via an interactive Streamlit application. Awarded individually as 'Best Learner'.",
      image: "/telkomathon.png",
      win: "1st Place Winner & Best Learner",
      links: [],
    },
  ],
} as const;

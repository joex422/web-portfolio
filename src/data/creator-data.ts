import { profile, selfDirected } from "@/data/resume";

export const creatorAssets = {
  portrait: "/creator/zaw-avatar-head.png",
  portraitBlink: "/creator/zaw-avatar-blink.png",
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  object:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
};

export const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export const services = [
  {
    name: "Platform Engineering",
    description:
      "Production Kubernetes and OpenShift platforms, from node lifecycle and storage to RBAC, network policy, and reliable Day-2 operations.",
  },
  {
    name: "Site Reliability",
    description:
      "Incident response, root-cause analysis, and actionable observability with Prometheus, Grafana, ELK, OpenSearch, and Zabbix.",
  },
  {
    name: "Automation & GitOps",
    description:
      "Repeatable infrastructure with Terraform and Ansible. Git-driven delivery with ArgoCD, Jenkins, and automated container pipelines.",
  },
  {
    name: "Security & Hardening",
    description:
      "CIS and IM8-aligned controls, vulnerability remediation, policy-as-code, and secure access with Vault, CyberArk, and Entra ID.",
  },
  {
    name: "Software & Data Systems",
    description:
      "Real-time IoT dashboards and data pipelines, highly available MariaDB clusters, and web and mobile applications built around real operational needs.",
  },
];

const projectAsset = (filename: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${filename}.png`)}&w=1280&q=85`;

export const projects = [
  {
    name: "Homelab Platform",
    category: "Self-directed / Infrastructure",
    description:
      "A continuously operated Kubernetes estate. Real workloads, real upgrades, real failure scenarios.",
    tags: ["Kubernetes", "Cilium", "MetalLB", "Prometheus"],
    href: profile.github.href,
    linkLabel: "Explore GitHub",
    details: [
      selfDirected.bullets[0],
      selfDirected.bullets[2],
      selfDirected.bullets[4],
    ],
    images: [
      projectAsset("hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db"),
      projectAsset("hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8"),
      projectAsset("hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327"),
    ],
  },
  {
    name: "GitOps Delivery",
    category: "Self-directed / Automation",
    description:
      "From commit to cluster. Infrastructure and applications reconciled from Git, with security built into delivery.",
    tags: ["ArgoCD", "GitHub Actions", "Trivy", "GHCR"],
    href: profile.site.href,
    linkLabel: "Live Project",
    details: [
      selfDirected.bullets[1],
      selfDirected.bullets[3],
      selfDirected.bullets[5],
    ],
    images: [
      projectAsset("hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f"),
      projectAsset("hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1"),
      projectAsset("hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea"),
    ],
  },
  {
    name: "Connected Agriculture",
    category: "Urban Farming Partners / IoT",
    description:
      "An end-to-end sensor platform connecting real-time plant telemetry with dashboards, mobile apps, and analytics.",
    tags: ["Next.js", "MQTT", "Kafka", "Swift"],
    href: "#experience",
    linkLabel: "View Experience",
    details: [
      "Delivered real-time dashboards for soil moisture, temperature, and humidity with MERN and Next.js.",
      "Built MQTT and WebSocket ingestion into Confluent Kafka, with query-ready datasets for analysts.",
      "Created native iPadOS and Flutter companion apps, secured REST APIs with JWT, and automated delivery with Docker and GitHub Actions.",
    ],
    images: [
      projectAsset("hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f"),
      projectAsset("hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b"),
      projectAsset("hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee"),
    ],
  },
];

export const profile = {
  name: "Zaw Wana",
  role: "Platform / Site Reliability Engineer",
  focus: ["Kubernetes", "Linux", "Observability"],
  location: "Singapore",
  phone: "+65 9271 7760",
  email: "joe44824@gmail.com",
  whatsapp: { label: "WhatsApp", href: "https://wa.me/6592717760" },
  linkedin: { label: "linkedin.com/in/zaw-wana", href: "https://linkedin.com/in/zaw-wana" },
  github: { label: "github.com/joex422", href: "https://github.com/joex422" },
  site: { label: "joecool.work", href: "https://joecool.work" },
  resumeHref: "/Zaw_Wana_Resume.pdf",
  summary:
    "Certified Kubernetes Administrator running production container platforms and Linux fleets in enterprise and public-sector environments. Day-2 operations across the full cluster lifecycle: node lifecycle and etcd health, RBAC and SCC policy, network policies, routes and HAProxy ingress, resource quotas, and persistent storage. First-responder experience tracing failures from node to pod to service, with root-cause analysis fed back into runbooks, and ELK/Prometheus observability to catch failures before users do. Also owns the Linux OS layer beneath the platform — patching cycles, kernel and resource tuning, hardening, and storage — plus highly available data tiers and secrets through Vault and CyberArk. Currently supporting a government AI infrastructure programme under IM8-aligned security controls. Computing Science honours graduate, Singapore Institute of Technology.",
};

// Hero terminal: the professional summary, split into chunks that each type
// out, hold, then retract before the next one types in.
export const terminalLines: { command: string; output: string }[] = [
  {
    command: "whoami",
    output:
      "Certified Kubernetes Administrator running production container platforms and Linux fleets in enterprise and public-sector environments.",
  },
  {
    command: "kubectl get cluster-ops",
    output:
      "Day-2 operations across the full cluster lifecycle: node lifecycle and etcd health, RBAC and SCC policy, network policies, routes and HAProxy ingress, resource quotas, and persistent storage.",
  },
  {
    command: "journalctl -u incident-response",
    output:
      "First responder tracing failures from node to pod to service, with root-cause analysis fed back into runbooks, and ELK/Prometheus observability to catch failures before users do.",
  },
  {
    command: "uname -a && vault status",
    output:
      "Owns the Linux OS layer beneath the platform — patching cycles, kernel and resource tuning, hardening, and storage — plus highly available data tiers and secrets through Vault and CyberArk.",
  },
  {
    command: "cat current_role.txt",
    output:
      "Currently supporting a government AI infrastructure programme under IM8-aligned security controls. Computing Science honours graduate, Singapore Institute of Technology.",
  },
];

export const techStack: { label: string; logo: string }[] = [
  { label: "Kubernetes", logo: "kubernetes" },
  { label: "OpenShift", logo: "openshift" },
  { label: "Docker", logo: "docker" },
  { label: "Helm", logo: "helm" },
  { label: "Terraform", logo: "terraform" },
  { label: "Ansible", logo: "ansible" },
  { label: "Jenkins", logo: "jenkins" },
  { label: "GitLab", logo: "gitlab" },
  { label: "ArgoCD", logo: "argo" },
  { label: "Git", logo: "git" },
  { label: "Python", logo: "python" },
  { label: "Bash", logo: "bash" },
  { label: "Java", logo: "java" },
  { label: "Prometheus", logo: "prometheus" },
  { label: "Grafana", logo: "grafana" },
  { label: "Elasticsearch", logo: "elasticsearch" },
  { label: "Kibana", logo: "kibana" },
  { label: "Logstash", logo: "logstash" },
  { label: "OpenSearch", logo: "opensearch" },
  { label: "Zabbix", logo: "zabbix" },
  { label: "MariaDB", logo: "mariadb" },
  { label: "MySQL", logo: "mysql" },
  { label: "MongoDB", logo: "mongodb" },
  { label: "Redis", logo: "redis" },
  { label: "HashiCorp Vault", logo: "vault" },
  { label: "AWS", logo: "aws" },
  { label: "Azure", logo: "microsoft-azure" },
  { label: "RHEL", logo: "redhat" },
  { label: "CentOS", logo: "centos" },
  { label: "Rocky Linux", logo: "rocky-linux" },
  { label: "Ubuntu", logo: "ubuntu" },
  { label: "Windows Server", logo: "microsoft-windows" },
];

export const skillCategories: { name: string; items: string[] }[] = [
  {
    name: "Kubernetes & Containers",
    items: [
      "Kubernetes (CKA)",
      "node lifecycle",
      "etcd health",
      "RBAC",
      "network policies",
      "resource quotas",
      "PV/PVC & storage classes",
      "OpenShift (OCP 4.x)",
      "Routes",
      "SCCs",
      "HAProxy ingress",
      "private registry & image mirroring",
      "K3s",
      "Helm",
      "Docker",
    ],
  },
  {
    name: "Reliability & Observability",
    items: [
      "Incident response",
      "root-cause analysis",
      "runbooks",
      "ELK / Elasticsearch / Logstash / Kibana",
      "OpenSearch",
      "Prometheus",
      "Grafana",
      "Zabbix",
      "log aggregation",
      "alerting",
      "capacity & performance monitoring",
    ],
  },
  {
    name: "High Availability",
    items: [
      "MariaDB Galera (multi-master HA)",
      "HAProxy proxy tier",
      "backup & recovery",
      "JVM/Java tuning (heap, Metaspace, GC flags)",
      "container memory budgeting",
    ],
  },
  {
    name: "Linux Platform",
    items: [
      "RHEL / CentOS / Rocky",
      "Ubuntu administration",
      "OS patching & kernel upgrades",
      "reboot sequencing",
      "dnf/yum",
      "systemd",
      "SELinux",
      "firewalld",
      "auditd",
      "ulimits/cgroups",
      "NFS & iSCSI/SMB storage mounts",
      "LVM",
      "Windows Server",
    ],
  },
  {
    name: "Automation & IaC",
    items: ["Terraform", "Ansible", "Jenkins", "GitLab CI", "ArgoCD / GitOps", "Git", "Python", "Bash", "operational runbooks"],
  },
  {
    name: "Security & Hardening",
    items: [
      "CIS benchmark hardening",
      "IM8-aligned controls",
      "CVE triage",
      "SSH cipher/MAC hardening",
      "HashiCorp Vault",
      "CyberArk PAM",
      "LDAP",
      "Azure AD (Entra ID) IAM & RBAC",
      "secrets management",
      "IPSec VPN",
      "DevSecOps",
    ],
  },
  {
    name: "Data & Cloud",
    items: [
      "MySQL",
      "MongoDB",
      "Redis",
      "AWS (EC2, S3, IAM, CloudWatch, VPC)",
      "Azure (Entra ID, RBAC, Policy)",
      "hybrid & on-prem integration",
      "Proxmox virtualisation",
    ],
  },
];

export const experience: {
  role: string;
  company: string;
  logo?: string;
  dates: string;
  context?: string;
  tags?: string[];
  bullets: string[];
}[] = [
  {
    role: "DevSecOps / Platform Engineer",
    company: "NCS",
    logo: "/companies/ncs.png",
    dates: "Nov 2025 — Present",
    context: "Video intelligence and enterprise AI infrastructure — on-prem, government security baseline.",
    tags: [
      "OpenShift",
      "MariaDB Galera",
      "HAProxy",
      "ELK",
      "Terraform",
      "Vault",
      "CyberArk",
      "Entra ID",
      "RHEL",
    ],
    bullets: [
      "Operate the OpenShift estate — namespaces, RBAC and SCC policy, network policies, quotas, Routes, HAProxy ingress, PV/PVC storage",
      "Built and run MariaDB Galera multi-master HA — survives node loss with no failover downtime, fronted by HAProxy for routing and health checks",
      "ELK monitoring across cluster, systemd, and MariaDB logs — dashboards and alerts that surface failures before users report them",
      "Own the Linux layer — patching, kernel and package management, resource limits, storage mounts, sequenced to keep production up",
      "Day-1 build and Day-2 ops on an enterprise AI platform, plus database ownership of schema, tuning, backup and recovery",
      "Provision infrastructure with Terraform — environments rebuilt from code, not reassembled by hand",
      "Harden to CIS and government IM8 baselines; remediate scan findings and produce the audit evidence",
      "Privileged access through CyberArk, service credentials in Vault — no long-lived secrets in configs or node images",
      "Identity governance across Entra ID and on-prem LDAP — user/group lifecycle, RBAC, Azure Policy — over a mixed Linux and Windows estate",
      "IPSec VPN tunnels so field devices reach internal systems without public exposure",
    ],
  },
  {
    role: "DevOps / Infrastructure Engineer",
    company: "Singtel",
    logo: "/companies/singtel.webp",
    dates: "Sep 2024 — Jul 2025",
    context: "Infrastructure and delivery behind Singtel's NaaS, 5G, and multi-access edge computing products.",
    tags: [
      "Kubernetes",
      "Helm",
      "ArgoCD",
      "Jenkins",
      "Zabbix",
      "Terraform",
      "Ansible",
      "Python",
      "OpenSearch",
    ],
    bullets: [
      "First responder across Linux servers and Kubernetes clusters — traced failures node to pod to service, with root-cause analysis feeding back into runbooks",
      "Administered Kubernetes clusters for edge workloads — node management, workload placement, resource limits, Helm-packaged deployments",
      "Full-stack Zabbix monitoring across infrastructure, network, and application metrics",
      "Jenkins CI/CD pipelines and ArgoCD rollouts — Git as source of truth, cluster drift reconciled automatically instead of patched in place",
      "Troubleshot and performance-tuned OpenSearch, MySQL, Redis, MongoDB, and container workloads",
      "Owned OS patching across the Linux fleet — systems current, vulnerabilities closed, no production downtime",
      "Terraform for provisioning; Ansible for daily Docker and virtualised operations",
      "Python automation for security (IoC IP filtering) and operations (system health checks)",
    ],
  },
];

export const selfDirected: { bullets: string[] } = {
  bullets: [
    "Two-tier homelab Kubernetes estate, continuously operated: a 3-node kubeadm cluster (Cilium CNI, MetalLB L2 load balancing, containerd) running production workloads, plus a K3s cluster for development — both run through real upgrade, certificate-rotation, and failure scenarios",
    "GitOps delivery with ArgoCD in an app-of-apps pattern — a root Application bootstraps every other workload from Git, with automated sync, pruning, and self-heal so cluster drift is reconciled rather than patched in place",
    "Hosts this portfolio and internal homelab services on the platform, with ingress and TLS termination, persistent storage classes, RBAC and namespace quotas, a private image registry, and a full Prometheus/Grafana + ELK observability stack — built to enterprise patterns",
    "HA data tier: MariaDB Galera cluster behind an evaluated proxy layer (HAProxy / MaxScale / ProxySQL), with backup, restore, and node-loss drills",
    "Platform roadmap in progress: Gateway API for HTTP routing in place of classic ingress, and Trivy image and manifest scanning wired into the delivery pipeline",
    "Bash-based CKA exam simulator running against a disposable k3d sandbox; AWS serverless projects for SAA preparation",
  ],
};

export const certifications: {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  certificateHref?: string;
}[] = [
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Aug 2026",
    id: "LF-ijwzjz1ojo",
    certificateHref: "/certificates/CKA_Zaw_Wana.pdf",
  },
];

export const education: { name: string; school: string; dates: string }[] = [
  {
    name: "BSc Computing Science (Honours)",
    school: "Singapore Institute of Technology",
    dates: "Aug 2022 — Apr 2025",
  },
  {
    name: "Diploma in Business Process with Systems Engineering",
    school: "Temasek Polytechnic",
    dates: "Apr 2017 — Feb 2020",
  },
];

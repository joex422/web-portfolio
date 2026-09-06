export const profile = {
  name: "Zaw Wana",
  role: "Platform / Site Reliability Engineer",
  focus: ["Kubernetes", "Linux", "Observability"],
  location: "Singapore",
  phone: "+65 9271 7760",
  email: "joe44824@gmail.com",
  linkedin: { label: "linkedin.com/in/zaw-wana", href: "https://linkedin.com/in/zaw-wana" },
  github: { label: "github.com/joe44824", href: "https://github.com/joe44824" },
  site: { label: "joecool.work", href: "https://joecool.work" },
  resumeHref: "/Zaw_Wana_Resume.pdf",
  summary:
    "Certified Kubernetes Administrator running production container platforms and Linux fleets in enterprise and public-sector environments. Day-2 operations across the full cluster lifecycle: node lifecycle and etcd health, RBAC and SCC policy, network policies, routes and HAProxy ingress, resource quotas, and persistent storage. First-responder experience tracing failures from node to pod to service, with root-cause analysis fed back into runbooks, and ELK/Prometheus observability to catch failures before users do. Also owns the Linux OS layer beneath the platform — patching cycles, kernel and resource tuning, hardening, and storage — plus highly available data tiers and secrets through Vault and CyberArk. Currently supporting a government AI infrastructure programme under IM8-aligned security controls. Computing Science honours graduate, Singapore Institute of Technology.",
};

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
  dates: string;
  context?: string;
  bullets: string[];
}[] = [
  {
    role: "DevSecOps / Platform Engineer",
    company: "NCS",
    dates: "Nov 2025 — Present",
    context: "Video intelligence and enterprise AI infrastructure platforms — on-prem estate, government security baseline.",
    bullets: [
      "Operate the OpenShift Container Platform estate the workloads run on — projects and namespaces, RBAC and SCC policy, network policies and resource quotas, Routes and HAProxy ingress, and persistent storage via PV/PVC and storage classes",
      "Built and operate MariaDB on a Galera cluster — synchronous multi-master replication so the database survives node loss without failover downtime or manual promotion; front-ended by a proxy tier (HAProxy) for connection routing and health checking",
      "Operate ELK-based monitoring across cluster, systemd service, and MariaDB logs — aggregated into dashboards and alerting so failures surface before users report them",
      "Own the Linux OS layer beneath the platform — patching cycles, kernel and package management, resource limits, and storage mounts — sequenced so production services stay up through the change window",
      "Day-1 build and Day-2 operations on an enterprise AI infrastructure platform, plus Database Engineer ownership of schema design, tuning, and backup and recovery",
      "Provision platform infrastructure with Terraform so environments are described in code and rebuilt from it rather than reassembled by hand",
      "Apply and validate OS hardening against CIS-style benchmarks and government (IM8) security requirements; remediate vulnerability-scan findings and produce the supporting remediation evidence",
      "Manage privileged access with CyberArk and centralise service credentials in HashiCorp Vault, removing long-lived secrets from configuration files and node images",
      "Administer identity and access governance on Azure AD (Entra ID) — user/group lifecycle, RBAC role assignments, and Azure Policy enforcement — alongside on-prem LDAP",
      "Run LDAP-backed authentication and group authorisation across a mixed RHEL-family Linux and Windows Server estate",
      "Configure IPSec VPN tunnels so field mobile devices reach internal systems without exposing them publicly",
    ],
  },
  {
    role: "DevOps / Infrastructure Engineer",
    company: "Singtel",
    dates: "Sep 2024 — Jul 2025",
    context: "Infrastructure, delivery, and operations behind Singtel's NaaS, 5G, and multi-access edge computing (MEC) products.",
    bullets: [
      "Ran day-to-day operations across Linux servers and Kubernetes clusters as first responder — tracing failures from node to pod to service, with root-cause analysis feeding back into runbooks",
      "Administered Kubernetes clusters supporting edge workloads: node management, workload placement, resource limits, and standardised deployments packaged with Helm",
      "Implemented full-stack Zabbix monitoring across infrastructure, network, and application metrics",
      "Maintained and extended Jenkins CI/CD pipelines, and delivered application rollouts through ArgoCD — Git as source of truth, with cluster drift reconciled automatically instead of patched in place",
      "Troubleshot and performance-tuned OpenSearch, MySQL, Redis, MongoDB, and container workloads",
      "Owned OS patching and update cycles across the Linux server fleet — keeping systems current and vulnerabilities closed without taking production services down",
      "Automated infrastructure provisioning with Terraform and daily Docker/virtualised operations with Ansible",
      "Wrote Python automation for security (IoC IP filtering) and operations (system health checks)",
    ],
  },
  {
    role: "Software Engineer",
    company: "Urban Farming",
    dates: "Oct 2022 — Apr 2023",
    context: "IoT aggregation hub turning raw sensor metrics into crop-yield decisions. (Part-time, alongside degree)",
    bullets: [
      "Structured the backend as Spring Boot microservices — ingestion, processing, and API as separate deployable services rather than one process — with a React/Node aggregation layer over real-time IoT sensor metrics",
      "Gave the farming team one source of truth to optimise irrigation, lighting, and climate control",
    ],
  },
];

export const selfDirected: { bullets: string[] } = {
  bullets: [
    "Production-grade K3s platform (homelab, continuously operated): multi-node cluster run through real upgrade, certificate-rotation, and failure scenarios, with GitOps delivery, ingress and TLS termination, persistent storage classes, RBAC and namespace quotas, private image registry, and a full Prometheus/Grafana + ELK observability stack — built to enterprise patterns",
    "HA data tier: MariaDB Galera cluster behind an evaluated proxy layer (HAProxy / MaxScale / ProxySQL), with backup, restore, and node-loss drills",
    "Bash-based CKA exam simulator running against a disposable k3d sandbox; AWS serverless projects for SAA preparation",
  ],
};

export const certifications: { name: string; issuer: string; date: string; id?: string }[] = [
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Aug 2026",
    id: "LF-ijwzjz1ojo",
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

window.VALKYRIE_ROLES = [
  {
    "id": "01-product-management",
    "name": "Product Management",
    "agents": [
      {
        "id": "01-prd-architect",
        "name": "Prd Architect",
        "desc": "**Role:** Product Management",
        "sample": {
          "feature_brief": "Add SSO login with SAML 2.0 for enterprise workspaces"
        }
      },
      {
        "id": "02-roadmap-prioritizer",
        "name": "Roadmap Prioritizer",
        "desc": "**Role:** Product Management",
        "sample": {
          "initiatives": "Mobile Offline Sync (R:5000, I:3, C:0.8, E:4)"
        }
      },
      {
        "id": "03-user-story-splitter",
        "name": "User Story Splitter",
        "desc": "**Role:** Product Management",
        "sample": {
          "epic_text": "As an admin, manage billing seats and export invoices"
        }
      },
      {
        "id": "04-competitive-intel",
        "name": "Competitive Intel",
        "desc": "**Role:** Product Management",
        "sample": {
          "competitor_notes": "Competitor X launched usage-based metering and SOC2 Type II"
        }
      },
      {
        "id": "05-voice-of-customer",
        "name": "Voice Of Customer",
        "desc": "**Role:** Product Management",
        "sample": {
          "feedback_batch": "Export CSV times out on >50k rows; dark mode requested"
        }
      },
      {
        "id": "06-launch-readiness",
        "name": "Launch Readiness",
        "desc": "**Role:** Product Management",
        "sample": {
          "checklist_state": "Docs: ready, Security: pending pentest, Billing: ready"
        }
      },
      {
        "id": "07-pricing-modeler",
        "name": "Pricing Modeler",
        "desc": "**Role:** Product Management",
        "sample": {
          "tier_assumptions": "Pro: $29/seat, 100k tokens included, COGS $0.002/1k"
        }
      },
      {
        "id": "08-experiment-designer",
        "name": "Experiment Designer",
        "desc": "**Role:** Product Management",
        "sample": {
          "hypothesis": "Shortening onboarding from 5 steps to 2 lifts D1 activation"
        }
      },
      {
        "id": "09-release-notes-writer",
        "name": "Release Notes Writer",
        "desc": "**Role:** Product Management",
        "sample": {
          "pr_log": "feat: add Rust transpiler; fix: OAuth token refresh race"
        }
      },
      {
        "id": "10-stakeholder-brief",
        "name": "Stakeholder Brief",
        "desc": "**Role:** Product Management",
        "sample": {
          "weekly_updates": "Shipped v2.1 API; p99 latency down 38%; 2 blockers on SSO"
        }
      }
    ]
  },
  {
    "id": "02-software-engineering",
    "name": "Software Engineering",
    "agents": [
      {
        "id": "01-architecture-reviewer",
        "name": "Architecture Reviewer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "rfc_summary": "Event-driven billing worker consuming Kafka with Postgres outbox"
        }
      },
      {
        "id": "02-pr-code-reviewer",
        "name": "Pr Code Reviewer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "diff_snippet": "for item in items: db.query(item.id) # N+1 inside loop"
        }
      },
      {
        "id": "03-refactor-planner",
        "name": "Refactor Planner",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "module_metrics": "monolith_auth.py: 1850 LOC, 14 callers, 0% unit tests"
        }
      },
      {
        "id": "04-api-contract-designer",
        "name": "Api Contract Designer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "endpoint_spec": "POST /v2/agents/{id}/deploy returning crate bundle"
        }
      },
      {
        "id": "05-sql-query-optimizer",
        "name": "Sql Query Optimizer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "sql_query": "SELECT * FROM runs WHERE org_id = $1 ORDER BY created_at DESC"
        }
      },
      {
        "id": "06-dependency-auditor",
        "name": "Dependency Auditor",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "dependencies": "requests==2.32.0, pyyaml==6.0.2, gpl-lib==1.0"
        }
      },
      {
        "id": "07-migration-assistant",
        "name": "Migration Assistant",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "schema_change": "Rename users.full_name to display_name without downtime"
        }
      },
      {
        "id": "08-tech-debt-triager",
        "name": "Tech Debt Triager",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "debt_items": "Legacy YAML parser (high churn, 12 bugs/quarter)"
        }
      },
      {
        "id": "09-concurrency-debugger",
        "name": "Concurrency Debugger",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "async_trace": "Task A holds lock1->lock2 while Task B holds lock2->lock1"
        }
      },
      {
        "id": "10-rust-port-advisor",
        "name": "Rust Port Advisor",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "profile_stats": "json_validator.py: 68% CPU time, 42ms p99"
        }
      }
    ]
  },
  {
    "id": "03-devops-sre",
    "name": "Devops SRE",
    "agents": [
      {
        "id": "01-incident-commander",
        "name": "Incident Commander",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "alert_payload": "SEV-1: API 5xx rate 18% in us-east-1 after deploy #412"
        }
      },
      {
        "id": "02-postmortem-author",
        "name": "Postmortem Author",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "incident_log": "Redis OOM caused by unbounded session keys during promo spike"
        }
      },
      {
        "id": "03-terraform-reviewer",
        "name": "Terraform Reviewer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "tf_plan_diff": "+/- aws_rds_cluster.main (forces replacement), iam:*"
        }
      },
      {
        "id": "04-k8s-manifest-linter",
        "name": "K8S Manifest Linter",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "k8s_yaml": "kind: Deployment, replicas: 3, resources: {}, livenessProbe: null"
        }
      },
      {
        "id": "05-slo-burn-monitor",
        "name": "Slo Burn Monitor",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "sli_metrics": "SLO: 99.9%, 1h error rate: 1.2%, remaining budget: 18%"
        }
      },
      {
        "id": "06-ci-pipeline-optimizer",
        "name": "Ci Pipeline Optimizer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "ci_timings": "npm install: 4m, cargo build: 9m (no sccache), pytest: 1m"
        }
      },
      {
        "id": "07-capacity-planner",
        "name": "Capacity Planner",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "traffic_forecast": "Current: 4k QPS @ 62% CPU; Q4 forecast: 9.5k QPS"
        }
      },
      {
        "id": "08-runbook-generator",
        "name": "Runbook Generator",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "alert_rule": "HighPostgresConnections > 85% for 5m"
        }
      },
      {
        "id": "09-chaos-test-designer",
        "name": "Chaos Test Designer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "target_service": "Payment gateway failover to secondary region"
        }
      },
      {
        "id": "10-rollback-verifier",
        "name": "Rollback Verifier",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "canary_stats": "Canary p99: 420ms vs Baseline p99: 95ms"
        }
      }
    ]
  },
  {
    "id": "04-qa-test-automation",
    "name": "QA Test Automation",
    "agents": [
      {
        "id": "01-test-plan-architect",
        "name": "Test Plan Architect",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "spec_summary": "Passwordless magic link auth with 15-minute TTL"
        }
      },
      {
        "id": "02-edge-case-hunter",
        "name": "Edge Case Hunter",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "field_schema": "amount: decimal(>0), currency: ISO-4217, scheduled_at: ISO8601"
        }
      },
      {
        "id": "03-playwright-scripter",
        "name": "Playwright Scripter",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "user_flow": "Sign in -> Create Agent -> Toggle Theme -> Deploy Rust"
        }
      },
      {
        "id": "04-flaky-test-triager",
        "name": "Flaky Test Triager",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "failure_logs": "Timeout waiting for modal backdrop; failed 3/20 runs"
        }
      },
      {
        "id": "05-api-fuzz-generator",
        "name": "Api Fuzz Generator",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "endpoint_schema": "POST /api/agents/run { ir_yaml: string, prompt: string }"
        }
      },
      {
        "id": "06-coverage-gap-finder",
        "name": "Coverage Gap Finder",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "coverage_report": "llm_router.py line 88 branch else uncovered"
        }
      },
      {
        "id": "07-regression-selector",
        "name": "Regression Selector",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "changed_files": "studio-core/valkyrie/subscription_manager.py"
        }
      },
      {
        "id": "08-accessibility-auditor",
        "name": "Accessibility Auditor",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "html_snippet": "<div onclick='open()'>Deploy</div> without button/role"
        }
      },
      {
        "id": "09-load-test-modeler",
        "name": "Load Test Modeler",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "target_sla": "Target 1,200 RPS, p95 < 120ms, error rate < 0.1%"
        }
      },
      {
        "id": "10-bug-repro-distiller",
        "name": "Bug Repro Distiller",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "bug_thread": "App crashes when switching from dark mode while dialog open"
        }
      }
    ]
  },
  {
    "id": "05-data-engineering",
    "name": "Data Engineering",
    "agents": [
      {
        "id": "01-etl-pipeline-designer",
        "name": "Etl Pipeline Designer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "source_spec": "Hourly Stripe webhook events -> BigQuery raw_events"
        }
      },
      {
        "id": "02-dbt-model-generator",
        "name": "Dbt Model Generator",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "table_contract": "stg_orders(order_id, customer_id, total_cents, created_at)"
        }
      },
      {
        "id": "03-schema-drift-detector",
        "name": "Schema Drift Detector",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "schema_diff": "Removed column: user_tier; Added: plan_code (nullable)"
        }
      },
      {
        "id": "04-data-quality-guardian",
        "name": "Data Quality Guardian",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "dataset_profile": "fact_invoices: ~120k rows/day, 0% null invoice_id"
        }
      },
      {
        "id": "05-warehouse-cost-tuner",
        "name": "Warehouse Cost Tuner",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "query_telemetry": "Full table scan on 4TB events_log filtering by event_date"
        }
      },
      {
        "id": "06-lineage-documenter",
        "name": "Lineage Documenter",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "sql_graph": "mart_arr derives from dim_subs + fct_payments"
        }
      },
      {
        "id": "07-pii-redaction-planner",
        "name": "Pii Redaction Planner",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "columns_list": "email, ip_address, billing_zip, plan_id"
        }
      },
      {
        "id": "08-backfill-orchestrator",
        "name": "Backfill Orchestrator",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "backfill_window": "2024-01-01 to 2026-11-01, max 4 concurrent workers"
        }
      },
      {
        "id": "09-streaming-lag-analyst",
        "name": "Streaming Lag Analyst",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "consumer_metrics": "Partition 3 lag: 450k msgs; Partitions 0-2 lag: 120 msgs"
        }
      },
      {
        "id": "10-metric-layer-definer",
        "name": "Metric Layer Definer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "kpi_request": "Net Revenue Retention trailing 12 months by cohort"
        }
      }
    ]
  },
  {
    "id": "06-security-appsec",
    "name": "Security AppSec",
    "agents": [
      {
        "id": "01-threat-modeler",
        "name": "Threat Modeler",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "architecture_desc": "Desktop Electron UI -> Local FastAPI -> Gemini API"
        }
      },
      {
        "id": "02-sast-triage-analyst",
        "name": "Sast Triage Analyst",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "sast_finding": "CWE-78 in dev_script.py vs parameterized SQL in prod"
        }
      },
      {
        "id": "03-iam-least-privilege",
        "name": "Iam Least Privilege",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "iam_policy": "Action: s3:*, Resource: * for analytics-reader role"
        }
      },
      {
        "id": "04-secret-leak-scanner",
        "name": "Secret Leak Scanner",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "diff_text": "GEMINI_API_KEY=AIzaSyDummyExampleToken12345"
        }
      },
      {
        "id": "05-cve-impact-assessor",
        "name": "Cve Impact Assessor",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "cve_record": "CVE-2026-1042 in transitive XML parser (unused in app)"
        }
      },
      {
        "id": "06-soc2-evidence-collector",
        "name": "Soc2 Evidence Collector",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "control_id": "CC8.1 Change Management \u2014 require 100% tests before merge"
        }
      },
      {
        "id": "07-auth-flow-reviewer",
        "name": "Auth Flow Reviewer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "auth_spec": "OAuth2 Authorization Code flow without PKCE code_challenge"
        }
      },
      {
        "id": "08-container-hardener",
        "name": "Container Hardener",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "dockerfile_text": "FROM python:3.12\nRUN pip install fastapi\nCMD python app.py"
        }
      },
      {
        "id": "09-pentest-remediator",
        "name": "Pentest Remediator",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "finding_summary": "IDOR on GET /api/invoices/{id} missing org_id check"
        }
      },
      {
        "id": "10-security-advisory-writer",
        "name": "Security Advisory Writer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "advisory_input": "Patched path traversal in export endpoint in v1.4.2"
        }
      }
    ]
  },
  {
    "id": "07-technical-support",
    "name": "Technical Support",
    "agents": [
      {
        "id": "01-ticket-triager",
        "name": "Ticket Triager",
        "desc": "**Role:** Technical Support",
        "sample": {
          "ticket_text": "Enterprise prod down: SAML assertion signature mismatch"
        }
      },
      {
        "id": "02-log-bundle-analyzer",
        "name": "Log Bundle Analyzer",
        "desc": "**Role:** Technical Support",
        "sample": {
          "log_excerpt": "2026-11-18T10:12Z ERROR ConnectionResetError upstream 502"
        }
      },
      {
        "id": "03-escalation-packager",
        "name": "Escalation Packager",
        "desc": "**Role:** Technical Support",
        "sample": {
          "case_notes": "Customer v2.4.1 on Ubuntu 24.04; trace_id=tr_991a"
        }
      },
      {
        "id": "04-kb-article-drafter",
        "name": "Kb Article Drafter",
        "desc": "**Role:** Technical Support",
        "sample": {
          "resolution_notes": "Fixed Ollama CORS by setting OLLAMA_ORIGINS=http://localhost:5173"
        }
      },
      {
        "id": "05-sla-breach-predictor",
        "name": "Sla Breach Predictor",
        "desc": "**Role:** Technical Support",
        "sample": {
          "queue_snapshot": "Ticket #8821: Enterprise P1, unassigned for 22m (SLA: 30m)"
        }
      },
      {
        "id": "06-config-validator",
        "name": "Config Validator",
        "desc": "**Role:** Technical Support",
        "sample": {
          "yaml_snippet": "thinking_level: ultra # invalid enum"
        }
      },
      {
        "id": "07-api-error-explainer",
        "name": "Api Error Explainer",
        "desc": "**Role:** Technical Support",
        "sample": {
          "error_payload": "429 RESOURCE_EXHAUSTED on gemini-4-hydrogen free tier"
        }
      },
      {
        "id": "08-onboarding-concierge",
        "name": "Onboarding Concierge",
        "desc": "**Role:** Technical Support",
        "sample": {
          "customer_profile": "50-person eng org using GitHub, Okta, and Rust microservices"
        }
      },
      {
        "id": "09-churn-signal-spotter",
        "name": "Churn Signal Spotter",
        "desc": "**Role:** Technical Support",
        "sample": {
          "thread_history": "3rd escalation this month on rate-limit errors; renewal in 21d"
        }
      },
      {
        "id": "10-status-page-updater",
        "name": "Status Page Updater",
        "desc": "**Role:** Technical Support",
        "sample": {
          "incident_state": "Investigating elevated latency on US-West inference router"
        }
      }
    ]
  },
  {
    "id": "08-developer-relations-docs",
    "name": "Developer Relations Docs",
    "agents": [
      {
        "id": "01-quickstart-author",
        "name": "Quickstart Author",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "feature_name": "Deploying your first Rust agent from Valkyrie Studio"
        }
      },
      {
        "id": "02-api-reference-polisher",
        "name": "Api Reference Polisher",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "endpoint_def": "POST /api/agents/deploy-rust"
        }
      },
      {
        "id": "03-sdk-sample-generator",
        "name": "Sdk Sample Generator",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "operation": "Invoke gemini-4-hydrogen in low thinking mode"
        }
      },
      {
        "id": "04-changelog-curator",
        "name": "Changelog Curator",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "release_diff": "Moved from web-only UI to standalone Electron + Vite GUI"
        }
      },
      {
        "id": "05-community-qa-helper",
        "name": "Community Qa Helper",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "question_text": "How do I switch between OpenRouter free models and Ollama?"
        }
      },
      {
        "id": "06-tutorial-video-scripter",
        "name": "Tutorial Video Scripter",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "topic": "Metaheuristic pymoo agent tuning every 3 runs"
        }
      },
      {
        "id": "07-docs-freshness-checker",
        "name": "Docs Freshness Checker",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "docs_vs_code": "Docs say /run-agent; api_server.py exposes /api/agents/run"
        }
      },
      {
        "id": "08-cfp-abstract-writer",
        "name": "Cfp Abstract Writer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "talk_idea": "Zero-GIL AI Agents: Compiling Python Prototypes to Tokio Rust"
        }
      },
      {
        "id": "09-hackathon-kit-builder",
        "name": "Hackathon Kit Builder",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "theme": "Build an automated FinOps agent in 4 hours"
        }
      },
      {
        "id": "10-dev-survey-analyst",
        "name": "Dev Survey Analyst",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "survey_responses": "Top pain: setting up Rust toolchain; Top delight: 1-click deploy"
        }
      }
    ]
  },
  {
    "id": "09-growth-product-analytics",
    "name": "Growth Product Analytics",
    "agents": [
      {
        "id": "01-funnel-dropoff-analyst",
        "name": "Funnel Dropoff Analyst",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "funnel_counts": "Visited:1000 -> Installed:420 -> FirstRun:190 -> Deployed:95"
        }
      },
      {
        "id": "02-cohort-retention-modeler",
        "name": "Cohort Retention Modeler",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "cohort_data": "Oct cohort: D1 62%, D7 38%, D30 29%"
        }
      },
      {
        "id": "03-ab-test-interpreter",
        "name": "Ab Test Interpreter",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "ab_results": "Control: 12.1% (n=5000), Variant: 14.4% (n=5020), p=0.008"
        }
      },
      {
        "id": "04-activation-metric-finder",
        "name": "Activation Metric Finder",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "behavior_events": "Users who run >=3 sandbox tests in 48h retain 3.1x higher"
        }
      },
      {
        "id": "05-pricing-elasticity-analyst",
        "name": "Pricing Elasticity Analyst",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "upgrade_data": "Moving Custom Python to Pro vs keeping free up to 5 agents"
        }
      },
      {
        "id": "06-attribution-mapper",
        "name": "Attribution Mapper",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "channel_spend": "GitHub OSS: $0 CAC, 42% signups; Search Ads: $180 CAC"
        }
      },
      {
        "id": "07-seo-content-strategist",
        "name": "Seo Content Strategist",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "topic_cluster": "rust ai agent runtime, local llm ollama agent builder"
        }
      },
      {
        "id": "08-churn-cohort-explainer",
        "name": "Churn Cohort Explainer",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "churned_accounts": "72% of churned teams never deployed a Rust agent"
        }
      },
      {
        "id": "09-plg-loop-designer",
        "name": "Plg Loop Designer",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "product_surface": "Shareable agent.ir.yaml + demo.svg preview cards"
        }
      },
      {
        "id": "10-exec-kpi-narrator",
        "name": "Exec Kpi Narrator",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "kpi_table": "WAU +14% WoW, Free-to-Paid 4.8%, Median Time-to-First-Deploy 6m"
        }
      }
    ]
  },
  {
    "id": "10-finops-cloud-cost",
    "name": "FinOps Cloud Cost",
    "agents": [
      {
        "id": "01-cloud-bill-anomaly",
        "name": "Cloud Bill Anomaly",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "daily_spend": "NAT Gateway us-east-1 jumped from $42/day to $610/day"
        }
      },
      {
        "id": "02-k8s-rightsizing-advisor",
        "name": "K8S Rightsizing Advisor",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "pod_metrics": "worker-api requests 4 vCPU, p95 usage 0.45 vCPU"
        }
      },
      {
        "id": "03-idle-resource-reaper",
        "name": "Idle Resource Reaper",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "infra_inventory": "14 unattached gp3 volumes (2.8 TB), 3 idle ALBs"
        }
      },
      {
        "id": "04-ri-savings-planner",
        "name": "Ri Savings Planner",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "compute_baseline": "Steady 120 vCPU baseline; currently 100% On-Demand ($4.1k/mo)"
        }
      },
      {
        "id": "05-llm-token-optimizer",
        "name": "Llm Token Optimizer",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "llm_usage": "Using high-effort model ($15/1M) for JSON classification"
        }
      },
      {
        "id": "06-egress-cost-reducer",
        "name": "Egress Cost Reducer",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "network_flow": "18 TB/mo cross-AZ traffic between app and S3 without gateway endpoint"
        }
      },
      {
        "id": "07-storage-tiering-planner",
        "name": "Storage Tiering Planner",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "bucket_stats": "45 TB logs older than 90 days stored in S3 Standard"
        }
      },
      {
        "id": "08-unit-economics-tracker",
        "name": "Unit Economics Tracker",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "cogs_inputs": "Monthly infra $3,200, LLM $480, 1.6M runs, 400 tenants"
        }
      },
      {
        "id": "09-budget-alert-router",
        "name": "Budget Alert Router",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "budget_status": "Team Data-Eng at 88% of monthly budget on day 14"
        }
      },
      {
        "id": "10-finops-monthly-brief",
        "name": "Finops Monthly Brief",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "monthly_ledger": "Total $24.5k (-9% MoM), Savings realized $4.2k"
        }
      }
    ]
  },
  {
    "id": "11-management",
    "name": "Management",
    "agents": [
      {
        "id": "01-sprint-capacity-planner",
        "name": "Sprint Capacity Planner",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "team_roster": "6 engineers, 4 PTO days, 1 on-call, avg velocity 34 pts"
        }
      },
      {
        "id": "02-1on1-prep-assistant",
        "name": "1On1 Prep Assistant",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "engineer_context": "Led Rust workspace rollout; blocked on CI cache permissions"
        }
      },
      {
        "id": "03-okr-alignment-checker",
        "name": "Okr Alignment Checker",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "epics_vs_okrs": "Epic: Custom dark theme; OKR1: Cut p99 latency by 40%"
        }
      },
      {
        "id": "04-hiring-rubric-builder",
        "name": "Hiring Rubric Builder",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "role_level": "Senior Rust/Python Systems Engineer \u2014 Architecture Round"
        }
      },
      {
        "id": "05-perf-review-synthesizer",
        "name": "Perf Review Synthesizer",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "feedback_notes": "Strong systems design; can delegate code reviews earlier"
        }
      },
      {
        "id": "06-cross-team-dependency",
        "name": "Cross Team Dependency",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "squad_milestones": "UI team needs /ws/traces from Core by Nov 20"
        }
      },
      {
        "id": "07-meeting-action-extractor",
        "name": "Meeting Action Extractor",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "meeting_notes": "Alice to ship Cargo workspace by Fri; Bob to verify 100% cov"
        }
      },
      {
        "id": "08-tech-strategy-summarizer",
        "name": "Tech Strategy Summarizer",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "rfc_outline": "Adopt Universal Agent IR + Rust transpiler across all 120 agents"
        }
      },
      {
        "id": "09-team-health-pulse",
        "name": "Team Health Pulse",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "dora_snapshot": "Deploy freq: daily, Lead time: 3h, CFR: 2%, MTTR: 18m"
        }
      },
      {
        "id": "10-quarterly-roadmap-brief",
        "name": "Quarterly Roadmap Brief",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "qbr_inputs": "Q4: 9/10 milestones on track; Rust CLI 1 week behind"
        }
      }
    ]
  },
  {
    "id": "12-cxos",
    "name": "CXOs",
    "agents": [
      {
        "id": "01-board-deck-synthesizer",
        "name": "Board Deck Synthesizer",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "quarter_metrics": "ARR $4.8M (+22% QoQ), NRR 118%, Runway 28 months"
        }
      },
      {
        "id": "02-ma-diligence-reviewer",
        "name": "Ma Diligence Reviewer",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "diligence_docs": "Top customer 28% ARR; 1 GPLv3 dependency in core worker"
        }
      },
      {
        "id": "03-annual-operating-plan",
        "name": "Annual Operating Plan",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "aop_drivers": "Base: +12 hires, 78% gross margin, $9.5M ending ARR"
        }
      },
      {
        "id": "04-crisis-comms-strategist",
        "name": "Crisis Comms Strategist",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "crisis_brief": "Third-party auth outage affecting 12% of EU logins"
        }
      },
      {
        "id": "05-ai-transformation-advisor",
        "name": "Ai Transformation Advisor",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "workflow_catalog": "L1 support triage (1,200 tickets/wk) vs legal contract redlines"
        }
      },
      {
        "id": "06-investor-update-writer",
        "name": "Investor Update Writer",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "monthly_highlights": "Launched Valkyrie 120-agent studio; seeking 2 enterprise intros"
        }
      },
      {
        "id": "07-enterprise-deal-desk",
        "name": "Enterprise Deal Desk",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "deal_terms": "$250k/yr 3-yr deal requesting 99.99% SLA and 25% discount"
        }
      },
      {
        "id": "08-regulatory-horizon-watch",
        "name": "Regulatory Horizon Watch",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "policy_scope": "Autonomous agent audit trails & human-in-the-loop logging"
        }
      },
      {
        "id": "09-org-design-modeler",
        "name": "Org Design Modeler",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "org_chart": "42 engineers, 4 managers, 1 platform team, 5 product pods"
        }
      },
      {
        "id": "10-ceo-weekly-brief",
        "name": "Ceo Weekly Brief",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "exec_inputs": "Pipeline $1.4M, Uptime 99.98%, 2 senior offers accepted"
        }
      }
    ]
  }
];

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
      },
      {
        "id": "11-persona-builder",
        "name": "Persona Builder",
        "desc": "**Role:** Product Management",
        "sample": {
          "research_notes": "12 interviews: admins spend Mondays on access requests; 9 of 12 use spreadsheets to track licences"
        }
      },
      {
        "id": "12-jtbd-mapper",
        "name": "Jtbd Mapper",
        "desc": "**Role:** Product Management",
        "sample": {
          "interview_notes": "Switched from spreadsheets after the audit failed; needs proof of access reviews in under an hour"
        }
      },
      {
        "id": "13-kano-classifier",
        "name": "Kano Classifier",
        "desc": "**Role:** Product Management",
        "sample": {
          "survey_results": "SSO: 72% would be happy with it, 55% unhappy without it; dark mode: 40% happy, 6% unhappy without"
        }
      },
      {
        "id": "14-north-star-designer",
        "name": "North Star Designer",
        "desc": "**Role:** Product Management",
        "sample": {
          "product_goals": "Goal: help teams ship reviewed releases faster; users create pull requests, reviewers approve"
        }
      },
      {
        "id": "15-opportunity-tree-builder",
        "name": "Opportunity Tree Builder",
        "desc": "**Role:** Product Management",
        "sample": {
          "desired_outcome": "Outcome: raise week-4 retention from 31% to 40%; customers say setup is long and reports are hard to share"
        }
      },
      {
        "id": "16-beta-program-manager",
        "name": "Beta Program Manager",
        "desc": "**Role:** Product Management",
        "sample": {
          "beta_plan_brief": "Beta of the new reporting module for 40 accounts over 6 weeks; need a go or no-go by the end"
        }
      },
      {
        "id": "17-sunset-planner",
        "name": "Sunset Planner",
        "desc": "**Role:** Product Management",
        "sample": {
          "feature_usage": "Legacy CSV exporter: 3% of accounts, 180 weekly runs, replaced by the scheduled-reports API"
        }
      },
      {
        "id": "18-pmf-survey-analyst",
        "name": "Pmf Survey Analyst",
        "desc": "**Role:** Product Management",
        "sample": {
          "survey_counts": "150 responses: 54 very disappointed, 63 somewhat, 33 not disappointed; strongest in agencies"
        }
      },
      {
        "id": "19-build-buy-evaluator",
        "name": "Build Buy Evaluator",
        "desc": "**Role:** Product Management",
        "sample": {
          "capability_request": "Need in-app e-signature within 2 quarters; vendor quotes 45k per year, in-house estimate 5 engineer-months"
        }
      },
      {
        "id": "20-product-ops-cadence-planner",
        "name": "Product Ops Cadence Planner",
        "desc": "**Role:** Product Management",
        "sample": {
          "team_rituals": "6 squads, weekly product reviews run long, roadmap changes surprise sales, metrics reviewed ad hoc"
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
      },
      {
        "id": "11-error-handling-auditor",
        "name": "Error Handling Auditor",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "code_excerpt": "try: charge(card) except Exception: pass  # then marks the order paid"
        }
      },
      {
        "id": "12-api-sunset-planner",
        "name": "Api Sunset Planner",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "api_usage": "v1 receives 2.1M calls a day from 140 clients; top 5 clients are 70% of traffic; v2 is stable"
        }
      },
      {
        "id": "13-feature-flag-cleaner",
        "name": "Feature Flag Cleaner",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "flag_inventory": "214 flags, 88 older than 6 months, 31 at 100% rollout for over 90 days, owners missing on 40"
        }
      },
      {
        "id": "14-module-boundary-checker",
        "name": "Module Boundary Checker",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "dependency_graph": "billing imports orders; orders imports billing; reports reads the orders table directly"
        }
      },
      {
        "id": "15-logging-quality-reviewer",
        "name": "Logging Quality Reviewer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "log_samples": "logger.info(\"user \" + email + \" paid \" + card_number); logger.debug(\"here\")"
        }
      },
      {
        "id": "16-cache-strategy-advisor",
        "name": "Cache Strategy Advisor",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "access_pattern": "Product pages: 800 reads/s, 2 writes/s, 95% of reads hit 5% of products, stale up to 60s is fine"
        }
      },
      {
        "id": "17-type-safety-planner",
        "name": "Type Safety Planner",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "codebase_stats": "TypeScript 180k lines, strict off, 1,900 uses of any, 22% of bugs last quarter were undefined errors"
        }
      },
      {
        "id": "18-idempotency-reviewer",
        "name": "Idempotency Reviewer",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "endpoint_spec": "POST /payments creates a charge; mobile app retries on timeout; webhook consumer processes events"
        }
      },
      {
        "id": "19-code-owner-mapper",
        "name": "Code Owner Mapper",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "commit_history": "payments/ last 12 months: 3 authors left, 1 remaining (62% of commits); search/ has no commits in 9 months"
        }
      },
      {
        "id": "20-codebase-onboarding-guide",
        "name": "Codebase Onboarding Guide",
        "desc": "**Role:** Software Engineering",
        "sample": {
          "repo_overview": "Monorepo with 3 services and a web app; setup takes a day; tests flaky on the first run"
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
      },
      {
        "id": "11-oncall-load-analyzer",
        "name": "Oncall Load Analyzer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "pager_stats": "Last 4 weeks: 212 pages, 61 outside working hours, 9 engineers in rotation, top service 74 pages"
        }
      },
      {
        "id": "12-alert-noise-reducer",
        "name": "Alert Noise Reducer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "alert_history": "CPUHigh fired 310 times, 4 led to action; DiskSlow 95 times, 60 actioned; QueueLag 40 times, 38 actioned"
        }
      },
      {
        "id": "13-dr-plan-reviewer",
        "name": "Dr Plan Reviewer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "dr_plan": "Primary region us-east-1, nightly backups to the same region, restore never tested, RTO 4h, RPO 1h"
        }
      },
      {
        "id": "14-helm-chart-reviewer",
        "name": "Helm Chart Reviewer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "helm_values": "replicaCount: 1; image.tag: latest; resources: {}; ingress.enabled: true; no podDisruptionBudget"
        }
      },
      {
        "id": "15-secret-rotation-planner",
        "name": "Secret Rotation Planner",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "secret_inventory": "86 secrets: 23 older than 1 year, 9 shared by several services, 14 database passwords, no owner on 11"
        }
      },
      {
        "id": "16-blast-radius-mapper",
        "name": "Blast Radius Mapper",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "service_map": "auth-service is called by 14 services; 6 have no cache or fallback; it runs in one region"
        }
      },
      {
        "id": "17-deploy-freeze-advisor",
        "name": "Deploy Freeze Advisor",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "change_calendar": "Black Friday week, 31 changes queued, error budget 38% left, two incidents last week"
        }
      },
      {
        "id": "18-log-retention-tuner",
        "name": "Log Retention Tuner",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "log_volumes": "Audit logs 2 TB/month kept 7 years, app logs 40 TB/month kept 90 days, debug 25 TB/month kept 30 days"
        }
      },
      {
        "id": "19-dns-change-verifier",
        "name": "Dns Change Verifier",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "dns_change": "Move api.example.com from the old load balancer to the new one; current TTL 3600; mail records unchanged"
        }
      },
      {
        "id": "20-error-budget-policy-writer",
        "name": "Error Budget Policy Writer",
        "desc": "**Role:** DevOps & SRE",
        "sample": {
          "slo_context": "Checkout API SLO 99.9% over 30 days; product wants weekly releases; last month used 80% of budget"
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
      },
      {
        "id": "11-contract-test-designer",
        "name": "Contract Test Designer",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "api_contract": "Orders service consumes GET /customers/{id} (fields id, email, tier) from Customers; 3 other consumers"
        }
      },
      {
        "id": "12-test-data-synthesizer",
        "name": "Test Data Synthesizer",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "schema_rules": "users(id, email unique, country, plan), orders(user_id FK, amount > 0); production has 2M users, 9M orders"
        }
      },
      {
        "id": "13-mutation-test-reviewer",
        "name": "Mutation Test Reviewer",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "mutation_report": "pricing.py: 240 mutants, 168 killed, 72 survived; survivors mostly in boundary checks and rounding"
        }
      },
      {
        "id": "14-visual-regression-triager",
        "name": "Visual Regression Triager",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "screenshot_diffs": "48 diffs on checkout: 30 are 1px font anti-aliasing, 12 show the new button colour, 6 show a missing icon"
        }
      },
      {
        "id": "15-device-matrix-planner",
        "name": "Device Matrix Planner",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "usage_analytics": "iOS 62% (17, 16), Android 38% (14, 13, 12); top 5 devices cover 41%; 4 devices in the lab"
        }
      },
      {
        "id": "16-test-pyramid-auditor",
        "name": "Test Pyramid Auditor",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "test_counts": "Unit 1,800 (3 min), integration 240 (14 min), end-to-end 160 (52 min, 9% flaky)"
        }
      },
      {
        "id": "17-exploratory-charter-writer",
        "name": "Exploratory Charter Writer",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "feature_summary": "New bulk-import feature: CSV up to 50k rows, duplicate detection, email report on completion"
        }
      },
      {
        "id": "18-qa-release-checklist-builder",
        "name": "Qa Release Checklist Builder",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "release_scope": "Release 4.12: new payment provider, 14 tickets, database migration, mobile app update on the same day"
        }
      },
      {
        "id": "19-l10n-test-planner",
        "name": "L10N Test Planner",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "locale_list": "Launching in German, Japanese, Arabic and Brazilian Portuguese; currency, dates and addresses vary"
        }
      },
      {
        "id": "20-security-test-case-writer",
        "name": "Security Test Case Writer",
        "desc": "**Role:** QA & Test Automation",
        "sample": {
          "feature_flow": "Password reset by email link; link valid 1 hour; any user can request unlimited resets"
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
      },
      {
        "id": "11-cdc-pipeline-designer",
        "name": "Cdc Pipeline Designer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "source_tables": "Postgres orders (4M rows, 300 updates/s peak), customers, payments; target warehouse within 5 minutes"
        }
      },
      {
        "id": "12-data-contract-author",
        "name": "Data Contract Author",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "dataset_spec": "orders_daily: one row per order, order_id unique, amount in cents, refreshed by 06:00 UTC, owner Payments"
        }
      },
      {
        "id": "13-partition-strategy-advisor",
        "name": "Partition Strategy Advisor",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "table_profile": "events: 6 TB, 2.1B rows, 90% of queries filter on the last 7 days and customer_id"
        }
      },
      {
        "id": "14-dedup-strategy-designer",
        "name": "Dedup Strategy Designer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "duplicate_report": "Events table: 3.4% duplicate event_ids from client retries; customers: 11% near-duplicate names and emails"
        }
      },
      {
        "id": "15-scd-modeler",
        "name": "Scd Modeler",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "dimension_changes": "Customer tier changes ~8% of customers a month; reports need revenue by the tier at the time of sale"
        }
      },
      {
        "id": "16-dag-migration-planner",
        "name": "Dag Migration Planner",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "legacy_jobs": "420 cron jobs on 6 servers, 60 with hidden dependencies, nightly batch window 5 hours, moving to Airflow"
        }
      },
      {
        "id": "17-feature-store-reviewer",
        "name": "Feature Store Reviewer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "feature_specs": "user_30d_spend computed in SQL for training, recomputed in the service for serving; refreshed nightly"
        }
      },
      {
        "id": "18-data-retention-planner",
        "name": "Data Retention Planner",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "dataset_catalog": "Clickstream 80 TB/yr kept forever, invoices 7 yrs required, support chats with personal data kept forever"
        }
      },
      {
        "id": "19-sql-style-reviewer",
        "name": "Sql Style Reviewer",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "sql_excerpt": "SELECT * FROM orders o, customers c WHERE o.cid = c.id AND created > '2025-01-01' ORDER BY 1"
        }
      },
      {
        "id": "20-catalog-documenter",
        "name": "Catalog Documenter",
        "desc": "**Role:** Data Engineering",
        "sample": {
          "table_metadata": "fct_subscriptions: one row per subscription per month, columns mrr, plan_id, started_at, churned_at"
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
      },
      {
        "id": "11-api-security-reviewer",
        "name": "Api Security Reviewer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "api_spec": "GET /invoices/{id} returns any invoice for any logged-in user; list endpoint has no pagination limit"
        }
      },
      {
        "id": "12-supply-chain-assessor",
        "name": "Supply Chain Assessor",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "dependency_notes": "1,240 transitive packages, 36 maintained by one person, builds pull unpinned actions, images unsigned"
        }
      },
      {
        "id": "13-forensics-guide",
        "name": "Forensics Guide",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "incident_summary": "Suspected credential theft on 3 production hosts, first alert 02:10 UTC, logs kept 14 days"
        }
      },
      {
        "id": "14-data-classification-advisor",
        "name": "Data Classification Advisor",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "data_inventory": "Customer DB with emails and payment tokens; analytics warehouse with pseudonymous IDs; public marketing site"
        }
      },
      {
        "id": "15-vendor-security-reviewer",
        "name": "Vendor Security Reviewer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "vendor_answers": "Vendor stores customer emails, SOC 2 Type I only, no pen test in 2 years, subprocessors listed, 99.5% SLA"
        }
      },
      {
        "id": "16-phishing-report-triager",
        "name": "Phishing Report Triager",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "reported_email": "Subject Urgent payroll update; link to payr0ll-portal.example; sent to 240 staff; 12 clicked, 3 entered passwords"
        }
      },
      {
        "id": "17-cloud-posture-reviewer",
        "name": "Cloud Posture Reviewer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "cloud_config": "3 public storage buckets, 14 security groups open to 0.0.0.0/0, CloudTrail off in 2 regions, root has no MFA"
        }
      },
      {
        "id": "18-security-training-planner",
        "name": "Security Training Planner",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "team_profile": "420 staff: 90 engineers, 40 support with customer data access, 20 finance; phishing click rate 11%"
        }
      },
      {
        "id": "19-crypto-usage-reviewer",
        "name": "Crypto Usage Reviewer",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "code_snippet": "hash = md5(password); key = 'hardcoded-secret'; token = random.randint(100000, 999999); AES in ECB mode"
        }
      },
      {
        "id": "20-bug-bounty-triager",
        "name": "Bug Bounty Triager",
        "desc": "**Role:** Security & AppSec",
        "sample": {
          "bounty_report": "Researcher reports stored XSS in the profile bio field on app.example.com, proof of concept attached"
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
      },
      {
        "id": "11-refund-policy-checker",
        "name": "Refund Policy Checker",
        "desc": "**Role:** Technical Support",
        "sample": {
          "refund_request": "Annual plan bought 41 days ago, 3 logins, customer says the integration never worked; asks for full refund"
        }
      },
      {
        "id": "12-support-reply-drafter",
        "name": "Support Reply Drafter",
        "desc": "**Role:** Technical Support",
        "sample": {
          "ticket_thread": "Customer: webhooks stopped arriving since Tuesday, production orders are stuck. Second message, no reply for 6 hours"
        }
      },
      {
        "id": "13-duplicate-ticket-merger",
        "name": "Duplicate Ticket Merger",
        "desc": "**Role:** Technical Support",
        "sample": {
          "ticket_list": "9 tickets about login loops on iOS 17.4 since the 2.8 release; 4 from the same company; 2 mention the same error code"
        }
      },
      {
        "id": "14-outage-comms-writer",
        "name": "Outage Comms Writer",
        "desc": "**Role:** Technical Support",
        "sample": {
          "outage_facts": "Payments API errors for 22% of requests since 14:05 UTC; cause under investigation; card checkout affected"
        }
      },
      {
        "id": "15-macro-curator",
        "name": "Macro Curator",
        "desc": "**Role:** Technical Support",
        "sample": {
          "macro_usage": "312 macros; 40 used 80% of the time; 120 not used in a year; CSAT 3 points lower when macro 'Reset steps' is used"
        }
      },
      {
        "id": "16-csat-feedback-analyst",
        "name": "Csat Feedback Analyst",
        "desc": "**Role:** Technical Support",
        "sample": {
          "csat_comments": "Responses 620, score 4.1; low scores cite slow replies and repeated questions; praise for clear steps"
        }
      },
      {
        "id": "17-known-issue-matcher",
        "name": "Known Issue Matcher",
        "desc": "**Role:** Technical Support",
        "sample": {
          "symptom_report": "Export to PDF hangs at 95% for reports over 5,000 rows on Safari; started after the 3.2 release"
        }
      },
      {
        "id": "18-enterprise-response-planner",
        "name": "Enterprise Response Planner",
        "desc": "**Role:** Technical Support",
        "sample": {
          "account_issue": "Acme (ARR 480k, renewal in 60 days): 3 severity-2 tickets in 2 weeks; exec sponsor emailed the CEO"
        }
      },
      {
        "id": "19-support-capacity-planner",
        "name": "Support Capacity Planner",
        "desc": "**Role:** Technical Support",
        "sample": {
          "ticket_volume": "2,400 tickets a week, 14 min average handling, 30% shrinkage, volume growing 6% a month"
        }
      },
      {
        "id": "20-bug-report-qualifier",
        "name": "Bug Report Qualifier",
        "desc": "**Role:** Technical Support",
        "sample": {
          "customer_report": "Invoice PDF shows wrong tax for Canadian customers since March; two accounts affected; screenshot attached"
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
      },
      {
        "id": "11-migration-guide-writer",
        "name": "Migration Guide Writer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "breaking_changes": "v3 renames client.send() to client.request(), drops Python 3.8, and changes retries to opt-in"
        }
      },
      {
        "id": "12-error-reference-writer",
        "name": "Error Reference Writer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "error_catalog": "E1042 rate_limit_exceeded: 429 when more than 600 requests per minute; E2001 invalid_signature: webhook hash mismatch"
        }
      },
      {
        "id": "13-api-example-tester",
        "name": "Api Example Tester",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "code_examples": "140 examples in 6 languages, 31 reported broken last quarter, SDK v4 released with renamed methods"
        }
      },
      {
        "id": "14-docs-ia-reviewer",
        "name": "Docs Ia Reviewer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "site_map": "410 pages, 9 top-level sections, 3 pages named Overview, quickstart is 4 clicks from the home page"
        }
      },
      {
        "id": "15-devrel-metrics-reporter",
        "name": "Devrel Metrics Reporter",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "community_stats": "Docs visits 180k, new API keys 2.1k, 38% reach first call, Discord 6.4k members, 14 talks given"
        }
      },
      {
        "id": "16-tech-blog-outliner",
        "name": "Tech Blog Outliner",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "topic_brief": "How we cut p99 latency 40% by moving session lookups from Postgres to a read-through cache"
        }
      },
      {
        "id": "17-webinar-planner",
        "name": "Webinar Planner",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "webinar_brief": "Live build of a webhook-driven workflow, 45 minutes, target 400 registrants, 2 speakers, recording afterwards"
        }
      },
      {
        "id": "18-sample-app-reviewer",
        "name": "Sample App Reviewer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "sample_readme": "README: clone, npm install, add .env with API key, npm start; hard-coded test key in config.js; no tests"
        }
      },
      {
        "id": "19-contributing-guide-writer",
        "name": "Contributing Guide Writer",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "project_facts": "Rust CLI, 40 contributors, tests run with cargo test, PRs reviewed by 3 maintainers, weekly triage"
        }
      },
      {
        "id": "20-developer-journey-mapper",
        "name": "Developer Journey Mapper",
        "desc": "**Role:** Developer Relations & Docs",
        "sample": {
          "journey_notes": "Finds us via search, 4 doc pages to first call, key approval takes a day, production needs a security review"
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
      },
      {
        "id": "11-lifecycle-email-planner",
        "name": "Lifecycle Email Planner",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "lifecycle_goals": "Goal: lift week-1 activation; 38% finish setup; users who invite a teammate retain 2x; trial lasts 14 days"
        }
      },
      {
        "id": "12-ltv-cac-modeler",
        "name": "Ltv Cac Modeler",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "unit_inputs": "ARPA 120 per month, gross margin 78%, monthly churn 2.5%, CAC 1,400 blended, 9 months payback goal"
        }
      },
      {
        "id": "13-experiment-backlog-ranker",
        "name": "Experiment Backlog Ranker",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "experiment_ideas": "Ideas: shorter signup form, annual plan banner, onboarding checklist, referral prompt; 40k visitors a week"
        }
      },
      {
        "id": "14-referral-program-designer",
        "name": "Referral Program Designer",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "referral_brief": "B2B SaaS, 5k active accounts, wants teams to refer peers; CAC 1,200; considering a 100 credit on both sides"
        }
      },
      {
        "id": "15-onboarding-funnel-auditor",
        "name": "Onboarding Funnel Auditor",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "onboarding_steps": "Signup, verify email, create workspace, invite team, connect data, first report; 61% drop at connect data"
        }
      },
      {
        "id": "16-segment-discovery-analyst",
        "name": "Segment Discovery Analyst",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "usage_summary": "4 clusters by usage: heavy API users, dashboard-only viewers, occasional exporters, trial tourists"
        }
      },
      {
        "id": "17-pricing-page-reviewer",
        "name": "Pricing Page Reviewer",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "page_copy": "3 plans (Starter 19, Team 59, Business 199), usage limits hidden behind a tooltip, no annual toggle, no FAQ"
        }
      },
      {
        "id": "18-pipeline-forecaster",
        "name": "Pipeline Forecaster",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "pipeline_snapshot": "Q4 pipeline: 80 deals, 24 in proposal, 9 in negotiation; average deal 38k; 3 deals older than 120 days"
        }
      },
      {
        "id": "19-event-taxonomy-auditor",
        "name": "Event Taxonomy Auditor",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "event_list": "signup, Sign_Up, user_signed_up, click_btn, ButtonClicked, plan_upgraded, upgrade; 340 events, 60 unused"
        }
      },
      {
        "id": "20-win-loss-analyst",
        "name": "Win Loss Analyst",
        "desc": "**Role:** Growth & Product Analytics",
        "sample": {
          "deal_notes": "Lost 14 of 30 mid-market deals; reasons: price vs incumbent 6, missing SSO 5, slow security review 3"
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
      },
      {
        "id": "11-commitment-coverage-checker",
        "name": "Commitment Coverage Checker",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "usage_summary": "Compute 410k a month on demand; commitments cover 52%, utilization 97%; baseline steady 70% of spend"
        }
      },
      {
        "id": "12-spot-instance-advisor",
        "name": "Spot Instance Advisor",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "workload_profile": "Batch ETL 120 vCPU nightly, CI runners 60 vCPU, stateless API 200 vCPU; interruptions tolerated for batch and CI"
        }
      },
      {
        "id": "13-cross-az-traffic-analyst",
        "name": "Cross Az Traffic Analyst",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "traffic_matrix": "Service mesh sends 62% of traffic across zones; Kafka replication 140 TB/month; one analytics job crosses regions"
        }
      },
      {
        "id": "14-tagging-policy-auditor",
        "name": "Tagging Policy Auditor",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "resource_tags": "12,400 resources: 71% have owner, 58% have cost-center, 9 spellings of environment, 3.1k untagged by spend"
        }
      },
      {
        "id": "15-chargeback-allocator",
        "name": "Chargeback Allocator",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "shared_costs": "Shared Kubernetes 84k, networking 31k, observability 52k, support 19k a month; 6 product teams"
        }
      },
      {
        "id": "16-database-cost-tuner",
        "name": "Database Cost Tuner",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "db_usage": "3 production clusters at 18% CPU, provisioned IOPS 4x used, 9 dev databases running 24/7, backups kept 90 days"
        }
      },
      {
        "id": "17-observability-cost-reducer",
        "name": "Observability Cost Reducer",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "telemetry_volumes": "Logs 38 TB/month, 2.4M active metric series (40% unused), traces sampled at 100%, vendor bill 96k a month"
        }
      },
      {
        "id": "18-forecast-variance-explainer",
        "name": "Forecast Variance Explainer",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "actual_vs_forecast": "Forecast 1.20M, actual 1.38M (+15%); traffic +9%, new region launch, one-off 40k migration; reservation discount lower than planned"
        }
      },
      {
        "id": "19-saas-license-optimizer",
        "name": "Saas License Optimizer",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "license_usage": "CRM 480 seats, 61% active in 90 days; design tool 120 seats, 38 never opened; renewal in 70 days"
        }
      },
      {
        "id": "20-gpu-utilization-analyst",
        "name": "Gpu Utilization Analyst",
        "desc": "**Role:** FinOps & Cloud Cost",
        "sample": {
          "gpu_metrics": "64 GPUs, average utilization 31%, jobs queue for 3 hours at peak, 22% of GPU-hours are idle between jobs"
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
      },
      {
        "id": "11-delegation-coach",
        "name": "Delegation Coach",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "task_list": "My tasks: weekly metrics report, vendor negotiation, hiring screens, incident reviews, roadmap draft"
        }
      },
      {
        "id": "12-promotion-packet-builder",
        "name": "Promotion Packet Builder",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "impact_notes": "Led billing migration (zero downtime, 3 teams), mentored 2 engineers, cut invoice errors 70%, wrote the pricing RFC"
        }
      },
      {
        "id": "13-conflict-mediation-guide",
        "name": "Conflict Mediation Guide",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "conflict_summary": "Two senior engineers disagree on ownership of the auth service; reviews have turned sharp; 3 teammates raised concerns"
        }
      },
      {
        "id": "14-retro-facilitator",
        "name": "Retro Facilitator",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "retro_notes": "Sprint 42: 3 incidents, review wait 2 days, good pairing, unclear priorities; last retro's 4 actions: 1 done"
        }
      },
      {
        "id": "15-headcount-justifier",
        "name": "Headcount Justifier",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "workload_data": "On-call load 1.8x target, 3 roadmap items slipped a quarter, team of 8, requesting 2 engineers"
        }
      },
      {
        "id": "16-first-90-days-planner",
        "name": "First 90 Days Planner",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "role_context": "New engineering manager for a 9-person platform team, two open incidents, roadmap behind, one low-morale report"
        }
      },
      {
        "id": "17-tradeoff-advisor",
        "name": "Tradeoff Advisor",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "competing_asks": "Sales wants a custom export for a 300k deal; support wants fixes for 40 tickets; platform wants a 3-week upgrade"
        }
      },
      {
        "id": "18-skip-level-prep-assistant",
        "name": "Skip Level Prep Assistant",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "team_signals": "Team of 14 under 2 managers; engagement dip in the survey; reports mention unclear priorities and slow decisions"
        }
      },
      {
        "id": "19-blameless-review-facilitator",
        "name": "Blameless Review Facilitator",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "incident_timeline": "Checkout down 47 minutes after a config push at 14:05; rollback delayed by missing runbook; alert fired 9 minutes late"
        }
      },
      {
        "id": "20-feedback-writer",
        "name": "Feedback Writer",
        "desc": "**Role:** Engineering & Product Management",
        "sample": {
          "observed_behavior": "In Tuesday's design review you interrupted two juniors; they stopped presenting; the design missed two edge cases"
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
      },
      {
        "id": "11-cash-runway-analyst",
        "name": "Cash Runway Analyst",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "cash_position": "Cash 14.2M, net burn 780k a month, 9% monthly growth in revenue, 2 enterprise deals pending, hiring plan adds 600k"
        }
      },
      {
        "id": "12-fundraising-narrative-builder",
        "name": "Fundraising Narrative Builder",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "company_facts": "B2B workflow SaaS, 4.1M ARR growing 160% a year, 118% net retention, raising 20M Series B, 24 months of runway wanted"
        }
      },
      {
        "id": "13-board-risk-register-keeper",
        "name": "Board Risk Register Keeper",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "risk_list": "Top risks: key customer concentration, regulatory change in EU, cloud outage, loss of CTO, pricing pressure"
        }
      },
      {
        "id": "14-executive-pricing-strategist",
        "name": "Executive Pricing Strategist",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "pricing_context": "Considering a 12% price rise on the Team plan; competitors flat; 4% monthly churn risk if the rise lands badly"
        }
      },
      {
        "id": "15-partnership-evaluator",
        "name": "Partnership Evaluator",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "partnership_terms": "Channel partner offers access to 800 mid-market accounts for 25% revenue share; exclusivity 2 years; co-marketing"
        }
      },
      {
        "id": "16-exec-search-planner",
        "name": "Exec Search Planner",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "role_need": "Need a VP Sales for a 6M to 25M ARR journey; enterprise motion new; current head of sales leaving in 3 months"
        }
      },
      {
        "id": "17-earnings-call-prep-coach",
        "name": "Earnings Call Prep Coach",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "quarter_results": "Revenue +22% (guide +25%), gross margin down 1.8 points, guidance cut for next quarter, one-time charge"
        }
      },
      {
        "id": "18-cyber-risk-briefer",
        "name": "Cyber Risk Briefer",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "security_summary": "3 critical findings open, MFA on 91% of staff, last restore test 14 months ago, ransomware drill planned"
        }
      },
      {
        "id": "19-esg-metrics-reporter",
        "name": "Esg Metrics Reporter",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "esg_inputs": "Cloud 1,900 MWh, offices 420 MWh, travel 310 tCO2e; 58% renewable power; target net zero by 2040"
        }
      },
      {
        "id": "20-strategic-bet-reviewer",
        "name": "Strategic Bet Reviewer",
        "desc": "**Role:** C-Suite & Executives (CxOs)",
        "sample": {
          "bet_proposal": "Enter the healthcare vertical: 4M investment over 18 months, new compliance burden, 3 design partners signed"
        }
      }
    ]
  }
];

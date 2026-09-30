#!/usr/bin/env bash
# Generates an Allure report, optionally merging with gh-pages history.
# Replaces simple-elf/allure-report-action (Docker build on every run was flaky).
#
# Env: ALLURE_RESULTS, ALLURE_REPORT (default allure-report)
#      GH_PAGES + ALLURE_HISTORY + KEEP_REPORTS (optional: history mode)
#      RUN_NUM, RUN_ID, REPO (owner/name), SERVER_URL
set -euo pipefail

ALLURE_RESULTS=${ALLURE_RESULTS:-allure-results}
ALLURE_REPORT=${ALLURE_REPORT:-allure-report}
SITE_URL="https://${REPO%%/*}.github.io/${REPO##*/}"

cat > "$ALLURE_RESULTS/executor.json" <<JSON
{"name":"GitHub Actions","type":"github","reportName":"Allure Report with history",
"url":"$SITE_URL","reportUrl":"$SITE_URL/$RUN_NUM",
"buildUrl":"${SERVER_URL}/${REPO}/actions/runs/${RUN_ID}",
"buildName":"GitHub Actions Run #${RUN_ID}","buildOrder":"${RUN_NUM}"}
JSON

if [[ -n "${GH_PAGES:-}" ]]; then
  mkdir -p "$GH_PAGES" "$ALLURE_HISTORY"
  cp -r "$GH_PAGES"/. "$ALLURE_HISTORY"
  # Drop old reports, keeping the newest KEEP_REPORTS (plus index/last-history/CNAME).
  count=$(ls "$ALLURE_HISTORY" | wc -l)
  if (( count > KEEP_REPORTS + 1 )); then
    (
      cd "$ALLURE_HISTORY"
      rm -rf index.html last-history
      ls | sort -n | grep -v CNAME | head -n -$((KEEP_REPORTS - 1)) | xargs -r rm -rf
    )
  fi
  if [[ -d "$GH_PAGES/last-history" ]]; then
    cp -r "$GH_PAGES/last-history/." "$ALLURE_RESULTS/history" 2>/dev/null || {
      mkdir -p "$ALLURE_RESULTS/history" && cp -r "$GH_PAGES/last-history/." "$ALLURE_RESULTS/history"
    }
  fi
fi

npx allure generate --clean "$ALLURE_RESULTS" -o "$ALLURE_REPORT"

if [[ -n "${GH_PAGES:-}" ]]; then
  mkdir -p "$ALLURE_HISTORY/$RUN_NUM"
  cp -r "$ALLURE_REPORT"/. "$ALLURE_HISTORY/$RUN_NUM"
  mkdir -p "$ALLURE_HISTORY/last-history"
  cp -r "$ALLURE_REPORT/history"/. "$ALLURE_HISTORY/last-history"
  cat > "$ALLURE_HISTORY/index.html" <<HTML
<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; URL=$SITE_URL/$RUN_NUM/index.html">
<meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">
HTML
fi

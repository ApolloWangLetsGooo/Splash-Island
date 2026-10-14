#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  Node.js is not installed. Get it free from https://nodejs.org (LTS)"
  echo "  Node.js 还没安装，请先到 https://nodejs.org 下载安装 LTS 版本。"
  echo ""
  open https://nodejs.org
  read -p "Press Enter to close"
  exit 1
fi
(sleep 1.5; open http://localhost:8080) &
node server.js

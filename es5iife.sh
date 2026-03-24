#!/bin/bash
set -euo pipefail

# 标准 build 已内置 index.global.es5.js 产物，这里保留兼容入口。
pnpm build

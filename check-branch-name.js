import { execSync } from "child_process"

const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()

if (!/^(feature|bugfix|hotfix|release|docs|ci|refactor)\//.test(branchName)) {
  console.error(
    `❌ Неверное название ветки: ${branchName}. Должно начинаться с "feature/", "bugfix/", "hotfix/","release/", "docs/", "ci/"`
  )
  // eslint-disable-next-line no-undef
  process.exit(1)
}

console.log(`✅ Верное название ветки: ${branchName}`)

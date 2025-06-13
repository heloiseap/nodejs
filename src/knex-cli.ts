import { execSync } from 'node:child_process'

try {
  execSync('npx knex migrate:latest', { stdio: 'inherit' })
} catch (err) {
  console.error('Erro ao executar as migrations:', err)
  process.exit(1)
}

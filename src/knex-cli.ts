import { execSync } from 'node:child_process'

execSync('knex migrate:latest', { stdio: 'inherit' })
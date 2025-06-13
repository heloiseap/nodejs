import { knex as setupKnex } from 'knex'
import config from '../knexfile'

// Crie uma instância do knex com sua config
const db = setupKnex(config)

async function runMigrations() {
  try {
    console.log('🔃 Executando migrations...')
    await db.migrate.latest()
    console.log('✅ Migrations executadas com sucesso')
  } catch (error) {
    console.error('❌ Erro ao executar as migrations:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runMigrations()

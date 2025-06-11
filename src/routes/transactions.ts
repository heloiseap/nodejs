import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

//plugin
export async function transactionsRoutes(app: FastifyInstance) {
    
    //preHandler global pras rotas dentro do arquivo
    app.addHook('preHandler', async (request, reply) => {
        console.log(`[${request.method}] ${request.url}`)
    })

    app.get('/summary', {
        preHandler: [checkSessionIdExists]
    }, async (request, reply) => {

        const summary = await knex('transactions').sum('amount', { as: 'amount' }).first()
        return { summary }
    })

    app.get('/', {
        preHandler: [checkSessionIdExists]
    }, async (request, reply) => {

        const { sessionId } = request.cookies

        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select()
        return { transactions }
    })

    app.get('/:id', {
        preHandler: [checkSessionIdExists]
    }, async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getTransactionParamsSchema.parse(request.params)
        const transaction = await knex('transactions').where({
            // 'id', id
        }).first()

        return { transaction }
    })


    app.post('/', {
        // preHandler: [checkSessionIdExists]
    }, async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])

        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 //7 dias
            })
        }

        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * (-1),
                session_id: sessionId
            })


        return reply.status(201).send()
    })


    // app.get('/hello', async () => {
    //     const transaction = await knex('transactions')
    //         // .where(`amount`, 100)
    //         .select(`*`)

    //     // const transaction = await knex('transactions').insert({
    //     //   id: crypto.randomUUID(),
    //     //   title: 'Transação de teste',
    //     //   amount: 1000,
    //     // }).returning('*')

    //     return transaction
    //     // const tables = await knex('sqlite_schema').select('*')
    //     // return tables
    // })
}
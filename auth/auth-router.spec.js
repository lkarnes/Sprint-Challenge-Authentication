const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

describe('auth-router', ()=> {
    test('should be testing the env', ()=> {
        expect(process.env.DB_ENV).toBe('testing');
    })
    describe('post /register', ()=>{
        it('should create a user', async () =>{
            let user = {username: 'testing', password: 'testrun'}
            const res = await request(server).post('/api/auth/register').send(user)
            expect(res.body).toEqual({message: "You have been added to the database!"})
        })
        it('should return 201', async () => {
            const res = await request(server).post('/api/auth/register').send({username: 'testing2', password: 'testrun2'})
            expect(res.status).toEqual(201)
        })
    })

    describe('post /login', ()=> {
        it('should return 200', async () => {
            await request(server).post('/api/auth/register').send({username: 'testing3', password: 'testrun3'})
            const res = await request(server).post('/api/auth/login').send({username: 'testing3', password: 'testrun3'})
            expect(res.status).toEqual(200)
        })
        it('should return 401 on bad credentials', async ()=> {
            const res = await request(server).post('/api/auth/login').send({username: 'testing3', password: 'testrun3'})
            expect(res.status).toEqual(401)
        })
    })
    beforeEach(async ()=> {
        await db('users').truncate();
    })
})
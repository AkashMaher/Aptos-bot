const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const keepAlive = require("./server.js");
require('dotenv').config({ path: '.env' })
const http = require('https');
const token = process.env['token']
const api = process.env['api']
const express = require('express');
const keepAlive =  require('./server');




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        let url = api
        setTimeout(async function () {
            http.get(url, (res) => {
            let meta = [];
            res.on('data', (chunk) => { meta += chunk; });
            res.on('end', () => {
            try {
            let metadata = JSON.parse(meta)
                // let Data = await response.body
                let DATA = JSON.parse(meta)
                if (!DATA.data) {
                    console.log('data loading')
                } else {
                    let Price = DATA.data.coin.price
                    let finalPrice = parseFloat(Price).toFixed(2);
                    console.log(finalPrice)
                    let Marketcap = DATA.data.coin.marketCap
                    let market = parseInt(Marketcap)
                    let Cha = DATA.data.coin.change
                    let Change = parseFloat(Cha)
                    let Arrow = " "
                    if (Math.sign(Change) === 1) Arrow = "⬈"
                    else if (Math.sign(Change) === 0) Arrow = "⬈"
                    else Arrow = "⬊"

                    client.user.setActivity(`${finalPrice}$ ${Arrow} ${Change}%`, { type: 'PLAYING' })

                    //client.guilds.cache.get("809463051455037441").channels.cache.find(x => x.id === "1013867081483169924").setName(`SOL: ${finalPrice}$ ${Arrow} ${Change}%`)
                }
            } catch (e){}
            })
            })
        }, 10000);
    }, 20000);
})


keepAlive()
client.login(token);
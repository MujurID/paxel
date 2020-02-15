const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const cheerio = require('cheerio');

const random = length =>
    new Promise((resolve, reject) => {
    var text = "";
    var possible =
        "abcdefghijklmnopqrstuvwxyz1234567890";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
});

const functionGenName = () => new Promise((resolve, reject) => {
	fetch('https://fakenametool.net/random-name-generator/random/id_ID/indonesia/1', {
		method: 'GET'
	})
	.then(res => res.text())
	.then(result => {
		const $ = cheerio.load(result);
		const resText = $('div[class=col-lg-10] span').text();
		resolve(resText);
	})
	.catch(err => {
		reject(err)
	})
});

const regist = (phone) => new Promise((resolve, reject) => {
	fetch (`https://api.paxel.co/apg/api/v1/me/phone-token?on=register`, {
		method : 'POST',
		headers : {
			'User-Agent': 'okhttp/3.12.1',
			'x-player': 'd4fbcf02-4569-4d31-933b-e43c7b780e26',
			'Connection': 'Keep-Alive',
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({"phone":phone,"referral_code":""})
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		resolve(err)
	})
});

const verif = (otp, phone) => new Promise((resolve, reject) => {
	fetch (`https://api.paxel.co/apg/api/v1/me/phone-token/validate`, {
		method : 'POST',
		headers : {
			'User-Agent': 'okhttp/3.12.1',
			'x-player': 'd4fbcf02-4569-4d31-933b-e43c7b780e26',
			'Connection': 'Keep-Alive',
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({"phone":phone,"token":otp})
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		resolve(err)
	})
});

const check_uname = (rand) => new Promise((resolve, reject) => {
	fetch (`https://api.paxel.co/apg/api/v1/check-username`, {
		method : 'POST',
		headers : {
			'User-Agent': 'okhttp/3.12.1',
			'x-player': 'd4fbcf02-4569-4d31-933b-e43c7b780e26',
			'Connection': 'Keep-Alive',
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({"username":rand})
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		resolve(err)
	})
});

const last = (otp, rand, phone, name, last_nam, reff) => new Promise((resolve, reject) => {
	fetch (`https://api.paxel.co/apg/api/v1/register`, {
		method : 'POST',
		headers : {
			'User-Agent': 'okhttp/3.12.1',
			'device-id': '02:00:00:00:00:00',
			'device-type': 'Custom Phone_1',
			'x-player': 'd4fbcf02-4569-4d31-933b-e43c7b780e26',
			'Connection': 'Keep-Alive',
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({"social_media_id":"","social_media_type":"","first_name":name,"last_name":last_nam,"refer_by":reff,"phone":phone,"token":otp,"username":rand,"password":"Mtegare10","email":"","referrer_source":"","campaign":""})
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		resolve(err)
	})
});

(async () => {
	console.log('Bot Paxel by @Ditscode')
	console.log('')
	while(true){
		const rand = await random(8);
		const reff = await readlineSync.question('[+] Reff? ')
		const phone = await readlineSync.question('[+] Phone? ');
		const reg = await regist(phone);
		if(reg.code === 200) {
			const otp = await readlineSync.question('[+] Otp? ');
			const ver = await verif(otp, phone);
			const cek = await check_uname(rand);
			if (cek.code_message === `success`) {
				const name = await functionGenName();
				const ref = await last(otp, rand, phone, name.split(' ')[0], name.split(' ')[1], reff);
				console.log(`[=] Success Register, Follow IG: @ditscode \n`)
			} else {
				console.log(cek.code_message)
			}
		} else {
			console.log(reg.code_message)
		}
	}
})();
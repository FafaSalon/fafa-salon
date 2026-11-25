import './price-enquiry-test.mjs';
import assert from 'node:assert/strict';
import {createBookingSender} from './src/booking-submit.js';
let calls=0;const sender=createBookingSender({makeId:()=> 'qa-language-identity-1234',fetcher:async(_,o)=>{calls++;return {ok:true,json:async()=>({ok:true,id:JSON.parse(o.body).submissionId})}}});
const raw={branch:'Setapak',members:[{name:'QA',services:['Combo']}],language:'en'};await sender.send(raw);assert((await sender.send({...raw,language:'ms'})).already);assert.equal(calls,1);console.log('PASS language changes cannot duplicate the saved booking.');

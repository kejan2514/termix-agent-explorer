import {test} from 'node:test';
import assert from 'node:assert/strict';
import {searchDemo} from './data.mjs';
test('Turkish search, combined category filtering and empty results',()=>{
  assert.equal(searchDemo({query:'GÜVENLİK',category:'development'}).length,1);
  assert.equal(searchDemo({query:'GÜVENLİK',category:'creative'}).length,0);
  assert.equal(searchDemo({query:'not-a-service'}).length,0);
});
test('numeric price order and reputation order do not mutate fixtures',()=>{
  assert.equal(searchDemo({sort:'price_asc'})[0].basePrice,'15');
  assert.equal(searchDemo({sort:'reputation_desc'})[0].seller.reputationScore,97);
  assert.equal(searchDemo()[0].id,'demo-audit');
});

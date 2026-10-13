const $=id=>document.getElementById(id);
const dialog=$('detail');
let controller;
let requestNumber=0;
const node=(tag,text,className)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;};
async function json(url,signal){const response=await fetch(url,{signal});const data=await response.json();if(!response.ok)throw new Error(data.error||'İstek başarısız.');return data;}
function card(item){
  const el=node('article',undefined,'card');const top=node('div',undefined,'card-top');
  top.append(node('span',item.icon||'✳','icon'),node('span',item.seller?.displayName||'Ajan'));
  el.append(top,node('h2',item.title),node('p',item.description));
  const tags=node('div',undefined,'tags');for(const tag of (item.tags||[]).slice(0,4))tags.append(node('span',tag));el.append(tags);
  const bottom=node('div',undefined,'card-bottom');const price=node('span',item.priceLabel||`${item.basePrice} ${item.currency}`,'price');
  const button=node('button','Detayları gör ↗');button.type='button';button.addEventListener('click',()=>openDetail(item.id));bottom.append(price,button);el.append(bottom);return el;
}
async function load(){
  controller?.abort();controller=new AbortController();const number=++requestNumber;
  $('status').textContent='Hizmetler aranıyor…';$('grid').replaceChildren();$('count').textContent='';
  const params=new URLSearchParams({query:$('query').value,category:$('category').value,sort:$('sort').value});
  try{const data=await json('/api/listings?'+params,controller.signal);if(number!==requestNumber)return;
    $('mode').textContent=data.mode==='demo'?'Örnek veri modu · Hizmetler, fiyatlar ve ajan isimleri kurgusaldır.':'Canlı veri modu · Hizmetler TermiX SDK üzerinden alınıyor.';
    $('count').textContent=`${data.items.length} hizmet gösteriliyor`;
    $('status').textContent=data.items.length?'':'Sonuç bulunamadı. Farklı bir kelime veya kategori dene.';
    $('grid').replaceChildren(...data.items.map(card));
  }catch(error){if(error.name!=='AbortError'&&number===requestNumber)$('status').textContent=error.message;}
}
async function openDetail(id){
  $('detail-title').textContent='Yükleniyor…';$('detail-description').textContent='';$('detail-meta').textContent='';$('detail-note').textContent='';$('marketplace').hidden=true;dialog.showModal();
  try{const {item,mode}=await json('/api/listings/'+encodeURIComponent(id));if(!dialog.open)return;
    $('detail-title').textContent=item.title;$('detail-description').textContent=item.description;
    $('detail-meta').textContent=`${item.seller?.displayName||'Ajan'} · İtibar: ${item.seller?.reputationScore??'Belirtilmemiş'} · Fiyat: ${item.priceLabel||`${item.basePrice} ${item.currency}`} · Teslim: ${item.deliveryDays===undefined?'Belirtilmemiş':item.deliveryDays+' gün'}`;
    $('detail-note').textContent=mode==='demo'?'Bu, kurgusal bir hizmet örneğidir. Demo sipariş veya ödeme oluşturmaz.':'Güncel koşulları ve hizmet kapsamını Agent.family üzerinde inceleyebilirsin.';
    $('marketplace').hidden=mode==='demo';$('marketplace').href='https://agent.family/listing?id='+encodeURIComponent(item.id);
  }catch(error){$('detail-title').textContent='Hizmet yüklenemedi';$('detail-description').textContent=error.message;}
}
$('close').addEventListener('click',()=>dialog.close());
$('search-form').addEventListener('submit',event=>{event.preventDefault();load();});
$('category').addEventListener('change',load);$('sort').addEventListener('change',load);
async function init(){try{const {items}=await json('/api/categories');for(const item of items){const option=node('option',item.label);option.value=item.slug;$('category').append(option);}}catch{$('status').textContent='Kategoriler yüklenemedi.';}await load();}
init();

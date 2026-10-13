export const listings = [
  {id:'demo-audit',title:'Akıllı sözleşme güvenlik incelemesi',category:'development',description:'Solidity sözleşmenizi inceleyen, riskleri sınıflandıran ve düzeltme önerileri sunan örnek hizmet.',tags:['Solidity','Güvenlik'],basePrice:'75',currency:'USDT',deliveryDays:2,seller:{displayName:'Sentinel',reputationScore:97},icon:'◈'},
  {id:'demo-video',title:'Fikrinden ürün tanıtım videosuna',category:'creative',description:'Ürün briefinden senaryo, storyboard ve kısa tanıtım videosu hazırlayan örnek hizmet.',tags:['Video','İçerik'],basePrice:'35',currency:'USDT',deliveryDays:1,seller:{displayName:'Frame Studio',reputationScore:94},icon:'▷'},
  {id:'demo-research',title:'Kaynaklarıyla pazar araştırması',category:'research',description:'Rakipleri ve pazar sinyallerini inceleyen, kaynak bağlantılarıyla bir araştırma raporu hazırlayan örnek hizmet.',tags:['Araştırma','Analiz'],basePrice:'20',currency:'USDT',deliveryDays:1,seller:{displayName:'Scout',reputationScore:92},icon:'◎'},
  {id:'demo-copy',title:'Ürünün için lansman içerikleri',category:'creative',description:'Hedef kitlenize uygun sosyal medya metinleri ve ürün açıklamaları hazırlayan örnek hizmet.',tags:['Metin','Pazarlama'],basePrice:'15',currency:'USDT',deliveryDays:1,seller:{displayName:'Wordsmith',reputationScore:90},icon:'✳'},
  {id:'demo-data',title:'Dağınık veriden anlaşılır rapora',category:'research',description:'Tabloları inceleyen, eğilimleri özetleyen ve kullanılabilir bir analiz raporu hazırlayan örnek hizmet.',tags:['Veri','Rapor'],basePrice:'40',currency:'USDT',deliveryDays:3,seller:{displayName:'Atlas',reputationScore:96},icon:'▥'},
  {id:'demo-api',title:'API entegrasyon planı',category:'development',description:'Uygulamanızın entegrasyon ihtiyaçlarını değerlendirerek teknik uygulama planı hazırlayan örnek hizmet.',tags:['API','Yazılım'],basePrice:'50',currency:'USDT',deliveryDays:2,seller:{displayName:'Bridge',reputationScore:93},icon:'⌘'}
];
export function searchDemo({query='',category='',sort='relevance'}={}) {
  const term=query.toLocaleLowerCase('tr');
  const result=listings.filter(x=>(!category||x.category===category)&&[x.title,x.description,...x.tags].join(' ').toLocaleLowerCase('tr').includes(term));
  if(sort==='price_asc') result.sort((a,b)=>Number(a.basePrice)-Number(b.basePrice));
  if(sort==='reputation_desc') result.sort((a,b)=>b.seller.reputationScore-a.seller.reputationScore);
  return result;
}

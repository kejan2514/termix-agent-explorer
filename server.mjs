import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {listings,searchDemo} from './data.mjs';
const mode=process.env.TERMIX_MODE||'demo';
if(!['demo','live'].includes(mode)) throw new Error('TERMIX_MODE demo veya live olmalı.');
let client;
if(mode==='live') {
  try {
    const {createClient}=await import('@termix-it/platform-sdk');
    client=await createClient({chain:process.env.TERMIX_CHAIN||'bsc'});
  } catch(error) {console.error('Canlı mod başlatılamadı. SDK kurulumu ve bağlantı için README.md dosyasını kontrol edin.'); process.exit(1);}
}
const files={'/':['index.html','text/html; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/style.css':['style.css','text/css; charset=utf-8']};
const send=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
const server=createServer(async(req,res)=>{
  try {
    if(req.method!=='GET') return send(res,405,{error:'Yalnızca okuma istekleri desteklenir.'});
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/listings') {
      const query=(url.searchParams.get('query')||'').slice(0,200);
      const category=url.searchParams.get('category')||'';
      const sort=url.searchParams.get('sort')||'relevance';
      if(!['relevance','price_asc','reputation_desc'].includes(sort)) return send(res,400,{error:'Geçersiz sıralama.'});
      const params={query,sort,pageSize:48,...(category?{category}:{})};
      const items=mode==='live'?(await client.listings.list(params)).items:searchDemo(params);
      return send(res,200,{mode,items});
    }
    if(url.pathname==='/api/categories') {
      const items=mode==='live'?await client.listings.categories():[{slug:'development',label:'Yazılım'},{slug:'creative',label:'Yaratıcı işler'},{slug:'research',label:'Araştırma'}];
      return send(res,200,{items});
    }
    if(url.pathname.startsWith('/api/listings/')) {
      const id=decodeURIComponent(url.pathname.slice('/api/listings/'.length));
      const item=mode==='live'?await client.listings.get(id):listings.find(x=>x.id===id);
      return item?send(res,200,{mode,item}):send(res,404,{error:'Hizmet bulunamadı.'});
    }
    const file=files[url.pathname];
    if(!file) return send(res,404,{error:'Sayfa bulunamadı.'});
    const body=await readFile(fileURLToPath(new URL('./public/'+file[0],import.meta.url)));
    res.writeHead(200,{'Content-Type':file[1],'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"});res.end(body);
  } catch(error) {console.error('İstek başarısız:',error.message);send(res,502,{error:'Hizmet bilgileri alınamadı. Bağlantıyı kontrol edip tekrar deneyin.'});}
});
server.listen(Number(process.env.PORT||4317),'127.0.0.1',()=>console.log(`TermiX Explorer: http://127.0.0.1:${server.address().port} (${mode})`));

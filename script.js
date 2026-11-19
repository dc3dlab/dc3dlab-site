const products = [
 {id:1,name:'Presépio',category:'Natal',price:60,image:'assets/presepio.jpg',description:'Peça decorativa impressa em 3D.',dimensions:'A confirmar',colors:[]},
 {id:2,name:'Porsche GT3',category:'Porta-Chaves',price:130,image:'assets/porsche-gt3.png',description:'Porta-chaves com visual inspirado no Porsche GT3.',dimensions:'A confirmar',colors:[]},
 {id:3,name:'Elvis Presley',category:'Decoração',price:70,image:'assets/elvis.jpg',description:'Peça decorativa impressa em 3D.',dimensions:'A confirmar',colors:[]},
 {id:4,name:'Mapa Dust 2',category:'Mundo Gamer',price:70,image:'assets/dust2.jpg',description:'Mapa decorativo inspirado no cenário Dust 2 de CS2.',dimensions:'A confirmar',colors:[]},
 {id:5,name:'Mapa Mirage',category:'Mundo Gamer',price:70,image:'assets/mirage.jpg',description:'Mapa decorativo inspirado no cenário Mirage de CS2.',dimensions:'A confirmar',colors:[]},
 {id:6,name:'Faca Kukri',category:'Mundo Gamer',price:50,image:'assets/kukri.jpg',description:'Peça decorativa inspirada na faca Kukri do universo gamer.',dimensions:'A confirmar',colors:[]},
 {id:7,name:'Santa Ceia',category:'Artigos Religiosos',price:90,image:'assets/santa-ceia.jpg',description:'Peça decorativa religiosa impressa em 3D.',dimensions:'A confirmar',colors:[]},
  {id:8,name:'Porta-terço 1',category:'Artigos Religiosos',price:70,image:'assets/porta-terco-1-cinza.jpeg',description:'Porta-terço decorativo em formato de coração, com imagem de Nossa Senhora e espaço para acomodar o terço.',dimensions:'A confirmar',colors:['Cinza','Branco mármore','Rosa-claro','Branco'],variants:[
  {name:'Cinza',images:['assets/porta-terco-1-cinza.jpeg']},
  {name:'Branco',images:['assets/porta-terco-1-branco.jpeg']},
  {name:'Branco mármore',images:['assets/porta-terco-1-marmore.jpeg']},
  {name:'Rosa-claro',images:['assets/porta-terco-1-rosa.jpeg']}
 ]},
 {id:9,name:'Porta-terço 2',category:'Artigos Religiosos',price:60,image:'assets/porta-terco-2.jpg',description:'Porta-terço decorativo.',dimensions:'A confirmar',colors:[]},
 {id:10,name:'Mascote Palmeiras',category:'Mascotes times',price:160,image:'assets/palmeiras.jpg',note:'Valor por unidade',description:'Mascote de time impresso em 3D.',dimensions:'A confirmar',colors:[]},
 {id:11,name:'Mascote Flamengo',category:'Mascotes times',price:160,image:'assets/flamengo.jpg',note:'Valor por unidade',description:'Mascote de time impresso em 3D.',dimensions:'A confirmar',colors:[]},
 {id:12,name:'Mascote Botafogo',category:'Mascotes times',price:160,image:'assets/botafogo.jpg',note:'Valor por unidade',description:'Mascote de time impresso em 3D.',dimensions:'A confirmar',colors:[]},
 {id:13,name:'Mascote Vasco',category:'Mascotes times',price:160,image:'assets/vasco.jpg',note:'Valor por unidade',description:'Mascote de time impresso em 3D.',dimensions:'A confirmar',colors:[]},
 {id:14,name:'Produto personalizado',category:'Personalizados',price:null,icon:'＋',note:'Sob orçamento',description:'Conte sua ideia e solicite um orçamento personalizado.',dimensions:'Definidas conforme o projeto',colors:[]}
];
// Para ativar um cupom exclusivo, preencha couponCode e discountPercent no produto correspondente.
const categories=['Todos','Natal','Mascotes times','Itens para casa','Artigos Religiosos','Mundo Gamer','Personalizados','Decoração','Porta-Chaves'];
let active='Todos',cart=[];
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const filters=document.querySelector('#filters'),grid=document.querySelector('#products'),search=document.querySelector('#search');
function ensureDetailModal(){
 if(document.querySelector('#product-modal')) return;
 const modal=document.createElement('div'); modal.id='product-modal'; modal.className='product-modal'; modal.hidden=true;
 modal.innerHTML=`<section class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="detail-name">
 <button class="detail-close" id="detail-close" aria-label="Fechar">×</button>
 <div class="detail-layout"><div class="detail-photo-wrap"><img id="detail-photo" alt=""></div>
 <div class="detail-content"><span class="tag" id="detail-category"></span><h2 id="detail-name"></h2><div class="detail-price" id="detail-price"></div>
 <p class="detail-description" id="detail-description"></p><div class="detail-spec"><b>Dimensões</b><span id="detail-dimensions"></span></div>
 <label class="detail-label" for="detail-color">Cor / opção</label><select id="detail-color"><option value="">Consultar disponibilidade</option></select>
 <label class="detail-label" for="detail-qty">Quantidade</label><div class="quantity-picker">
  <div class="quantity-buttons">
    <button type="button" data-qty="1">1</button>
    <button type="button" data-qty="2">2</button>
    <button type="button" data-qty="3">3</button>
    <button type="button" data-qty="4">4</button>
    <button type="button" data-qty="5">5</button>
  </div>
  <input id="detail-qty" type="number" min="1" value="1" placeholder="Outra quantidade">
</div>
 <div class="coupon-area"><label class="detail-label" for="detail-coupon">Cupom deste produto</label><div class="coupon-row"><input id="detail-coupon" type="text" placeholder="Digite seu cupom"><button id="apply-coupon" type="button">Aplicar</button></div><small id="coupon-feedback">Cupons válidos são específicos para cada produto.</small></div>
 <div class="detail-total"><span>Total deste produto</span><strong id="detail-total"></strong></div><button class="primary full" id="detail-add">Adicionar ao carrinho</button>
 <button class="detail-whatsapp" id="detail-whatsapp">Consultar pelo WhatsApp</button>
 </div></div></section>`;
 document.body.appendChild(modal);
 modal.querySelectorAll('[data-qty]').forEach(button=>{
  button.addEventListener('click',()=>{
    const input=modal.querySelector('#detail-qty');
    input.value=button.dataset.qty;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    modal.querySelectorAll('[data-qty]').forEach(b=>b.classList.toggle('active',b===button));
  });
});
modal.querySelector('#detail-qty').addEventListener('input',()=>{
  const input=modal.querySelector('#detail-qty');
  modal.querySelectorAll('[data-qty]').forEach(b=>b.classList.toggle('active',b.dataset.qty===input.value));
});
 const close=()=>{modal.hidden=true;document.body.style.overflow=''};
 modal.addEventListener('click',e=>{if(e.target===modal)close()});
 modal.querySelector('#detail-close').onclick=close;
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});
}
let selectedProduct=null,appliedDiscount=0;
function openProduct(id){
 ensureDetailModal(); selectedProduct=products.find(p=>p.id===id); if(!selectedProduct)return; appliedDiscount=0;
 const modal=document.querySelector('#product-modal'),p=selectedProduct;
 document.querySelector('#detail-photo').src=p.image||'';document.querySelector('#detail-photo').alt=p.name;
 document.querySelector('#detail-category').textContent=p.category;document.querySelector('#detail-name').textContent=p.name;
 document.querySelector('#detail-price').textContent=p.price===null?'Sob orçamento':money(p.price);
 document.querySelector('#detail-description').textContent=p.description||'Descrição em atualização.';
 document.querySelector('#detail-dimensions').textContent=p.dimensions||'A confirmar';
 const color=document.querySelector('#detail-color');
 const variants=p.variants||[];
 color.innerHTML=variants.length?variants.map((v,i)=>`<option value="${v.name}" ${i===0?'selected':''}>${v.name}</option>`).join(''):'<option value="">Consultar disponibilidade</option>'+(p.colors||[]).map(c=>`<option>${c}</option>`).join('');
 const updateVariantImage=()=>{const variant=variants.find(v=>v.name===color.value);const image=variant&&variant.images&&variant.images.length?variant.images[0]:p.image;document.querySelector('#detail-photo').src=image||'';};
 color.onchange=updateVariantImage;updateVariantImage();
 document.querySelector('#detail-qty').value=1;document.querySelector('#detail-coupon').value='';
 document.querySelector('#coupon-feedback').textContent='Cupons válidos são específicos para cada produto.';
 document.querySelector('#detail-total').textContent=p.price===null?'Sob orçamento':money(p.price);
 document.querySelector('#apply-coupon').onclick=()=>{
  const code=document.querySelector('#detail-coupon').value.trim().toUpperCase();
  if(p.couponCode && code===p.couponCode.toUpperCase()){appliedDiscount=Math.min(100,Math.max(0,Number(p.discountPercent)||0));document.querySelector('#coupon-feedback').textContent=`Cupom aplicado: ${appliedDiscount}% de desconto neste produto.`}
  else{appliedDiscount=0;document.querySelector('#coupon-feedback').textContent='Cupom inválido para este produto.'}
  updateDetailTotal();
 };
 function updateDetailTotal(){const qty=Math.max(1,Number(document.querySelector('#detail-qty').value)||1);document.querySelector('#detail-total').textContent=p.price===null?'Sob orçamento':money(p.price*qty*(1-appliedDiscount/100))}
 document.querySelector('#detail-qty').oninput=updateDetailTotal;
 document.querySelector('#detail-add').onclick=()=>{
  if(p.price===null){window.open('https://wa.me/5547997619228?text='+encodeURIComponent('Olá! Gostaria de solicitar um orçamento para '+p.name+'.'),'_blank');return}
  const qty=Math.max(1,Number(document.querySelector('#detail-qty').value)||1),unitPrice=p.price*(1-appliedDiscount/100),colorValue=color.value;
  const key=p.id+'-'+colorValue+'-'+appliedDiscount;const item=cart.find(x=>x.key===key);
  item?item.qty+=qty:cart.push({...p,key,qty,unitPrice,colorValue,discount:appliedDiscount});
  renderCart();modal.hidden=true;document.body.style.overflow='';
 };
 document.querySelector('#detail-whatsapp').onclick=()=>window.open('https://wa.me/5547997619228?text='+encodeURIComponent('Olá! Tenho interesse em '+p.name+'. Gostaria de mais informações.'),'_blank');
 modal.hidden=false;document.body.style.overflow='hidden';
}
function renderFilters(){filters.innerHTML=categories.map(c=>`<button class="filter ${active===c?'active':''}" data-cat="${c}">${c}</button>`).join('');filters.querySelectorAll('button').forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){const q=search.value.toLocaleLowerCase('pt-BR');const list=products.filter(p=>(active==='Todos'||p.category===active)&&p.name.toLocaleLowerCase('pt-BR').includes(q));grid.innerHTML=list.map(p=>`<article class="product product-clickable" data-detail="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${p.name}"><div class="product-image">${p.image?`<img src="${p.image}" alt="${p.name}">`:`<span class="placeholder">${p.icon||'✦'}</span>`}</div><div class="product-info"><span class="tag">${p.category}</span><h3>${p.name}</h3><div class="price">${p.price===null?'Sob orçamento':money(p.price)}</div>${p.note?`<small style="color:#a7abb4;margin-top:4px">${p.note}</small>`:''}<div class="product-actions"><button class="add" data-add="${p.id}" type="button">${p.price===null?'Consultar':'Ver detalhes'}</button></div></div></article>`).join('')||'<p class="empty">Nenhum produto encontrado nesta busca.</p>';
 grid.querySelectorAll('[data-detail]').forEach(card=>{card.onclick=e=>{if(e.target.closest('[data-add]'))return;openProduct(Number(card.dataset.detail))};card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProduct(Number(card.dataset.detail))}}});
 grid.querySelectorAll('[data-add]').forEach(b=>b.onclick=e=>{e.stopPropagation();openProduct(Number(b.dataset.add))});
}
function renderCart(){document.querySelector('#cart-count').textContent=cart.reduce((s,p)=>s+p.qty,0);document.querySelector('#cart-items').innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><div><b>${p.name}</b><small>${p.qty} × ${money(p.unitPrice||p.price)}${p.discount?` · cupom ${p.discount}%`:''}${p.colorValue?` · ${p.colorValue}`:''}</small></div><div><b>${money(p.qty*(p.unitPrice||p.price))}</b><button class="remove" data-remove="${p.key||p.id}">Remover</button></div></div>`).join(''):'<p class="empty">Seu carrinho está vazio.</p>';document.querySelector('#cart-total').textContent=money(cart.reduce((s,p)=>s+(p.unitPrice||p.price)*p.qty,0));document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(p=>(p.key||String(p.id))!==b.dataset.remove);renderCart()})}
const overlay=document.querySelector('#cart-overlay');document.querySelector('#open-cart').onclick=()=>{overlay.hidden=false;document.body.style.overflow='hidden'};document.querySelector('#close-cart').onclick=()=>{overlay.hidden=true;document.body.style.overflow=''};overlay.onclick=e=>{if(e.target===overlay){overlay.hidden=true;document.body.style.overflow=''}};search.oninput=renderProducts;
document.querySelector('#checkout').onclick=()=>{if(!cart.length){alert('Adicione pelo menos um produto ao carrinho.');return}const lines=cart.map(p=>`${p.qty}x ${p.name}${p.colorValue?' ('+p.colorValue+')':''} — ${money(p.qty*(p.unitPrice||p.price))}${p.discount?' (cupom '+p.discount+'%)':''}`).join('\n');const total=cart.reduce((s,p)=>s+(p.unitPrice||p.price)*p.qty,0);window.open('https://wa.me/5547997619228?text='+encodeURIComponent(`Olá! Quero fazer este pedido na DC.3D.LAB:\n${lines}\n\nTotal: ${money(total)}\nPor favor, confirme disponibilidade e entrega.`),'_blank')};
document.querySelector('#year').textContent=new Date().getFullYear();renderFilters();renderProducts();renderCart();

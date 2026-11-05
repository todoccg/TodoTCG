
const PRODUCTS = [
{id:1,name:"Sobre Escarlata y Púrpura",type:"sobres",label:"Sobre individual",desc:"Una nueva aventura por descubrir.",price:5.49,img:"https://images.pokemontcg.io/sv1/1.png",badge:"Popular"},
{id:2,name:"Colección Pokémon 151",type:"sobres",label:"Colección especial",desc:"Vuelve a los orígenes de Kanto.",price:24.95,img:"https://images.pokemontcg.io/sv3pt5/1.png",badge:"Especial"},
{id:3,name:"Caja de Entrenador Élite",type:"sobres",label:"Caja de entrenador",desc:"Ideal para ampliar tu colección.",price:49.95,img:"https://images.pokemontcg.io/swsh1/1.png",badge:"Premium"},
{id:4,name:"Sobre Pokémon GO",type:"sobres",label:"Sobre individual",desc:"¡Sal a la aventura!",price:5.25,img:"https://images.pokemontcg.io/pgo/1.png",badge:""},
{id:5,name:"Sobre Astros Brillantes",type:"sobres",label:"Sobre individual",desc:"Descubre nuevas cartas.",price:5.75,img:"https://images.pokemontcg.io/swsh9/1.png",badge:""},
{id:6,name:"Colección especial Mew",type:"sobres",label:"Colección especial",desc:"Una colección para fans de Mew.",price:29.95,img:"https://images.pokemontcg.io/sv3pt5/151.png",badge:"Destacado"},
{id:7,name:"Charizard — Base Set",type:"cartas",label:"Carta individual",desc:"Una carta clásica muy reconocible.",price:19.90,img:"https://images.pokemontcg.io/base1/4_hires.png",badge:"Destacado"},
{id:8,name:"Pikachu — Base Set",type:"cartas",label:"Carta individual",desc:"El icono de Pokémon en tu colección.",price:8.50,img:"https://images.pokemontcg.io/base1/58_hires.png",badge:"Popular"},
{id:9,name:"Mewtwo — Base Set",type:"cartas",label:"Carta individual",desc:"Añade un Pokémon legendario.",price:12.90,img:"https://images.pokemontcg.io/base1/10_hires.png",badge:""},
{id:10,name:"Blastoise — Base Set",type:"cartas",label:"Carta individual",desc:"Un clásico para cualquier carpeta.",price:16.90,img:"https://images.pokemontcg.io/base1/2_hires.png",badge:""},
{id:11,name:"Venusaur — Base Set",type:"cartas",label:"Carta individual",desc:"Uno de los grandes iniciales.",price:15.90,img:"https://images.pokemontcg.io/base1/15_hires.png",badge:""},
{id:12,name:"Alakazam — Base Set",type:"cartas",label:"Carta individual",desc:"Una carta clásica de tipo Psíquico.",price:7.90,img:"https://images.pokemontcg.io/base1/1_hires.png",badge:""},
{id:13,name:"Ninetales — Base Set",type:"cartas",label:"Carta individual",desc:"Una ilustración clásica.",price:6.50,img:"https://images.pokemontcg.io/base1/12_hires.png",badge:""},
{id:14,name:"Raichu — Base Set",type:"cartas",label:"Carta individual",desc:"El compañero eléctrico definitivo.",price:9.90,img:"https://images.pokemontcg.io/base1/14_hires.png",badge:""},
{id:15,name:"Gyarados — Base Set",type:"cartas",label:"Carta individual",desc:"Fuerza y presencia en tu colección.",price:11.90,img:"https://images.pokemontcg.io/base1/6_hires.png",badge:""},
{id:16,name:"Fundas transparentes",type:"accesorios",label:"Protección",desc:"Protege tus cartas del uso diario.",price:4.95,img:"https://images.pokemontcg.io/base1/58_hires.png",badge:""},
{id:17,name:"Carpeta de coleccionista",type:"accesorios",label:"Organización",desc:"Organiza tus cartas favoritas.",price:14.95,img:"https://images.pokemontcg.io/base1/4_hires.png",badge:""},
{id:18,name:"Caja guardacartas",type:"accesorios",label:"Almacenamiento",desc:"Mantén tu colección ordenada.",price:8.95,img:"https://images.pokemontcg.io/base1/2_hires.png",badge:""},
{id:19,name:"Fundas premium",type:"accesorios",label:"Protección",desc:"Un extra de cuidado para tus cartas.",price:7.50,img:"https://images.pokemontcg.io/base1/10_hires.png",badge:""},
{id:20,name:"Tapete de juego",type:"accesorios",label:"Juego",desc:"Prepara tu zona de juego.",price:19.95,img:"https://images.pokemontcg.io/base1/15_hires.png",badge:""}
];
const euro=n=>n.toLocaleString("es-ES",{style:"currency",currency:"EUR"});
let cart={};try{cart=JSON.parse(localStorage.getItem("todotcg-cart")||"{}")}catch(e){cart={}}
function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove("show"),2200)}
function saveCart(){localStorage.setItem("todotcg-cart",JSON.stringify(cart));renderCart()}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();toast("¡Producto añadido al carrito!")}
function changeQty(id,n){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];saveCart()}
function renderCart(){
 const countEl=document.getElementById("count"),items=document.getElementById("cartItems"),subtotal=document.getElementById("subtotal");
 const rows=Object.entries(cart).filter(([id,q])=>PRODUCTS.some(p=>p.id===+id)&&q>0);
 if(countEl)countEl.textContent=rows.reduce((s,[,q])=>s+q,0);
 if(subtotal)subtotal.textContent=euro(rows.reduce((s,[id,q])=>s+PRODUCTS.find(p=>p.id===+id).price*q,0));
 if(items)items.innerHTML=rows.length?rows.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===+id);return `<div class="cartline"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${euro(p.price)}</p><div class="qty"><button data-qty="${id}" data-delta="-1">−</button><span>${q}</span><button data-qty="${id}" data-delta="1">+</button></div></div><button class="remove" data-remove="${id}">Eliminar</button></div>`}).join(""):`<div class="emptycart">Tu carrito está vacío.<br><br>¡Hay muchas cartas esperándote!</div>`;
}
function toggleCart(open){document.getElementById("overlay")?.classList.toggle("open",open);document.getElementById("drawer")?.classList.toggle("open",open);document.body.style.overflow=open?"hidden":""}
function productCard(p){return `<article class="product"><div class="product-image">${p.badge?`<span class="tag ${p.badge==="Popular"?"red":""}">${p.badge}</span>`:""}<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.15';this.alt='Imagen no disponible'"></div><div class="product-body"><div class="kind">${p.label}</div><h3>${p.name}</h3><div class="desc">${p.desc}</div><div class="product-bottom"><span class="price">${euro(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Añadir ${p.name}">+</button></div></div></article>`}
function initCatalog(){
 const grid=document.getElementById("productGrid");if(!grid)return;
 const category=grid.dataset.category||"todos";let active=category;
 const search=document.getElementById("catalogSearch"),sort=document.getElementById("sort");
 function draw(){let list=PRODUCTS.filter(p=>(active==="todos"||p.type===active)&&(!search||`${p.name} ${p.desc} ${p.label}`.toLowerCase().includes(search.value.toLowerCase())));
 if(sort?.value==="low")list.sort((a,b)=>a.price-b.price);if(sort?.value==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.length?list.map(productCard).join(""):`<div class="empty">No encontramos productos con esa búsqueda.</div>`;
 }
 document.querySelectorAll("[data-filter]").forEach(b=>{b.classList.toggle("active",b.dataset.filter===active);b.addEventListener("click",()=>{active=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));draw()})});
 search?.addEventListener("input",draw);sort?.addEventListener("change",draw);draw();
}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add)addToCart(+add.dataset.add);
 const qty=e.target.closest("[data-qty]");if(qty)changeQty(+qty.dataset.qty,+qty.dataset.delta);
 const rem=e.target.closest("[data-remove]");if(rem){delete cart[rem.dataset.remove];saveCart()}
 const cat=e.target.closest("[data-category]");if(cat){localStorage.setItem("todotcg-category",cat.dataset.category)}
});
document.addEventListener("DOMContentLoaded",()=>{
 renderCart();initCatalog();
 document.getElementById("openCart")?.addEventListener("click",()=>toggleCart(true));
 document.getElementById("closeCart")?.addEventListener("click",()=>toggleCart(false));
 document.getElementById("overlay")?.addEventListener("click",()=>toggleCart(false));
 document.getElementById("checkout")?.addEventListener("click",()=>toast("Esta versión es una demo: aún no procesa pagos."));
 document.getElementById("mobileToggle")?.addEventListener("click",()=>document.getElementById("navlinks")?.classList.toggle("open"));
 document.getElementById("newsletterForm")?.addEventListener("submit",e=>{e.preventDefault();toast("¡Gracias por suscribirte!");e.target.reset()});
 document.getElementById("contactForm")?.addEventListener("submit",e=>{e.preventDefault();toast("Mensaje preparado. Esta demo no envía correos.");e.target.reset()});
});


items =[
    {picture:"image/0.jpg",discription:"Zegarek 0",price:"250",id:"Slava",id2:"z.0"},    
    {picture:"image/1.jpg",discription:"Zegarek 1",price:"250",id:"Luch",id2:"z.1"},
    {picture:"image/2.jpg",discription:"Zegarek 2",price:"250",id:"Vostoc",id2:"z.2"},
    {picture:"image/3.jpg",discription:"Zegarek 3",price:"250",id:"Luch",id2:"z.3"}, 
    {picture:"image/4.jpg",discription:"Zegarek 4",price:"250",id:"Slava",id2:"z.4"},
    {picture:"image/5.jpg",discription:"Zegarek 5",price:"250",id:"Poljot",id2:"z.5"},
    {picture:"image/6.jpg",discription:"Zegarek 6",price:"1250",id:"Poljot",id2:"z.6"},
    {picture:"image/5.jpg",discription:"Zegarek 5",price:"250",id:"Poljot",id2:"z.7"},
    {picture:"image/6.jpg",discription:"Zegarek 6",price:"1250",id:"Poljot",id2:"z.8"},
    {picture:"image/2.jpg",discription:"Zegarek 2",price:"250",id:"Vostoc",id2:"z.9"},
    {picture:"image/0.jpg",discription:"Zegarek 0",price:"250",id:"Slava",id2:"z.10"},
    {picture:"image/1.jpg",discription:"Zegarek 1",price:"250",id:"Luch",id2:"z.11"}
]
let database = items;
let side=items
let filter_on=false;
function reset(){
    document.getElementById("content").innerHTML="";
    DisplayItems(items)
    filter_on=false;
}

let CounterItem = 0
// tworzy div o określonej nazwie klasy = attribute we wskazanym miejscu = place
function create_div(attribute,place){
    let item = document.createElement("div");
    item.setAttribute("class",attribute);
    item.setAttribute("id",attribute+CounterItem);
    document.getElementById(place).appendChild(item);
}
function ItemRender() {
    // struktura pojemnika na opis przedmiotu
    create_div("item","content");
    create_div("picture","item"+CounterItem);
    create_div("item_discription","item"+CounterItem);
    create_div("discription","item_discription"+CounterItem);
    create_div("price","item_discription"+CounterItem);
    create_div("buy","item_discription"+CounterItem);
    CounterItem=CounterItem+1;
}
// problem jaki napotkałem i który udało mi się rozwiązać przez modyfikację id, to fakt
// że każde następne odpalenie funkcji ItemRender dorzucałao elemetny do już stworzonych wcześniej piewszych powstałych ID
// zamiast tworzyć nowe elementy pompował piewszys stworzony.

function InputItem(element){
    let item_picture = document.createElement("img");
    item_picture.setAttribute("class","item_picture");
    item_picture.setAttribute("id",element.picture);
    item_picture.setAttribute("src",element.picture);
    item_picture.setAttribute("alt",element.discription);
    document.getElementById("picture"+(CounterItem-1)).append(item_picture);
    document.getElementById("discription"+(CounterItem-1)).innerHTML ="Zegarek "+element.id;
    document.getElementById("price"+(CounterItem-1)).innerHTML = element.price+" pln";
    let button = document.createElement("button");
    button.setAttribute("class","buy_button");
    button.setAttribute("id",element.id2)
    button.onclick=buy;
    button.innerText = "Buy"
    document.getElementById("buy"+(CounterItem-1)).appendChild(button);
}

// funkcja do szybkiego generowania określonej ilości przedmiotów na stronie
function DisplayItems(items){
    CounterItem=0;
    items.forEach(function (element) {
        ItemRender();
        InputItem(element);
    });
    }

// pobiera mi z itemów ich Id i robi z nich listę unikatów, to się będzie wyświetlać na bocznym menu i po tym będzie się filtrować strona i wyświetlać tylko 
// te itemy które będą pasowały do ustawień filtra
let side_menu_positions=undefined;
function side_menu_list (side) {
    i=0;
    side_menu_positions=[];
    for (item in side){
    side_menu_positions.push(side[i].id);
            i=i+1;
    }
    side_menu_positions = [...new Set(side_menu_positions)];
    side_menu_positions.sort().reverse()}

    side_menu_list(side);

// ta część wyświetla listę z boku po id elementów
function div_side(element)
{let item = document.createElement("button");
item.setAttribute("class","side_button");
item.setAttribute("id",element);
item.onclick=Filter_by_id;
document.getElementById("side_menu").appendChild(item);
document.getElementById(element).innerText = element;}


function SideMenuRender(){
side_menu_positions.forEach(function(element){div_side(element);})
let item = document.createElement("button");
item.setAttribute("class","side_button");
item.onclick=reset;
item.innerText="All watches";
document.getElementById("side_menu").appendChild(item);
}
let set_filter;
// filtrowanie przyciskami w boczynym lewym menu
function Filter_by_id(event){
set_filter = event.target.id;
ItemFilterA(set_filter);
}
let display  = undefined;
function ItemFilterA(element){
    ItemFilter(element)
    document.getElementById("content").innerHTML="";
    DisplayItems(display)
}
function ItemFilter(filt) {
    filter_on=true;
    display = items.filter(function (item) {
    if (item.id === filt) {
      return true;
    } else {
      return false;
    }
  });}

// przyciks kup usuwa z listy itemów i dodaje go do listy itemów kupionych które będą wyświetlowne w koszyku
let bought = [];
let to_delete= undefined;
function buy(event){
    let buy_id = event.target.id;
    items.forEach(function(element){
        if (element.id2===buy_id){bought.push(element)
        to_delete = items.indexOf(element)}
    });
    items.splice(to_delete,1);
    side=items;
    document.getElementById("content").innerHTML="";
    if(display.length>1){if(filter_on) {ItemFilterA(set_filter)} else {DisplayItems(items)}}else{DisplayItems(items)};
    document.getElementById("side_menu").innerHTML="";
    side_menu_list (side);
    SideMenuRender();
    CartUpDate();
    bought_number();
    NoInCart();
}

function CartUpDate(){
    if (bought===JSON.parse(localStorage.getItem("bought"))){
        return true;
    }else {localStorage.setItem("bought", JSON.stringify(bought))}
}
let boughtnumber = 0
function bought_number() {
boughtnumber = 0;
bought.forEach(function(){
    boughtnumber=boughtnumber+1;
})}

function NoInCart(){
if (boughtnumber>0){
    document.getElementById("NoInCart").innerText = boughtnumber;
    document.getElementById("NoInCart").style.display="flex";
}}

   let to_buy = [];
   

   function ItemRender1() {
    // struktura pojemnika na opis przedmiotu
    create_div("holder","item_buy");
    create_div("pic","holder"+CounterItem);
    create_div("disc","holder"+CounterItem);
    create_div("pr","holder"+CounterItem);
    create_div("del","holder"+CounterItem);
    CounterItem=CounterItem+1;}

    function InputItem1(element){
        let item_picture = document.createElement("img");
        item_picture.setAttribute("class","item_pic");
        item_picture.setAttribute("id",element.picture);
        item_picture.setAttribute("src",element.picture);
        item_picture.setAttribute("alt",element.discription);
        document.getElementById("pic"+(CounterItem-1)).append(item_picture);
        document.getElementById("disc"+(CounterItem-1)).innerHTML ="Zegarek "+element.id;
        document.getElementById("pr"+(CounterItem-1)).innerHTML = element.price+" pln";
        let button = document.createElement("button");
        button.setAttribute("class","del_button");
        button.setAttribute("id",(CounterItem-1))
        // button.onclick="" potem dopiszemy funkcję dla działania przycisku
        button.innerText = "remove"
        document.getElementById("del"+(CounterItem-1)).appendChild(button);
    }
    function DisplayItems1(){
        CounterItem=0;
        to_buy = JSON.parse(localStorage.getItem("bought"));
        to_buy.forEach(function (element) {
            ItemRender1();
            InputItem1(element);
        });
        }
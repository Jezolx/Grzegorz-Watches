   let to_buy = JSON.parse(localStorage.getItem("bought"));
   

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
        button.setAttribute("id",element.id2);
        button.onclick=remove;
        button.innerText = "delete"
        document.getElementById("del"+(CounterItem-1)).appendChild(button);
    }
    function DisplayItems1(data){
        CounterItem=0;
        document.getElementById("item_buy").innerHTML="";
        data.forEach(function (element) {
            ItemRender1();
            InputItem1(element);
        });
        }

    function remove(event) {
        let to_remove =event.target.id;
        to_buy.forEach(function(element){
            if (element.id2===to_remove){
                to_buy.splice(to_buy.indexOf(element),1)
            }})
        DisplayItems1(to_buy)
        // localStorage.setItem("bought", JSON.stringify(to_buy))

    }
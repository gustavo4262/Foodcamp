function select(container_number, item_number){
    let container = `.container:nth-child(${container_number}) `;
    let item = `.item:nth-child(${item_number}) `;

    removeSelectionIcons(container_number);
    
    let element = document.querySelector(container + item);
    element.classList.add("selected");

    let icon = document.createElement("ion-icon");
    icon.setAttribute("name", "checkmark-circle");
    element.appendChild(icon);

    finish();
}

function finish(){
    if( checkselection(1) && checkselection(2) && checkselection(3) ) {
        let element = document.querySelector(".order button");
        element.innerHTML = "Fechar pedido";
        element.classList.add("finished");
    }
}

function removeSelectionIcons(container_number){
    let container = `.container:nth-child(${container_number}) `;
    let all_elements = document.querySelectorAll(container + " .item" );

    for(let i=0; i<all_elements.length; i+=1){
        let element = all_elements[i];
        element.classList.remove("selected");
        
        let icon = document.querySelector(container + "ion-icon");
        if (element.contains(icon)){
            element.removeChild(icon);
        }
    }
}


function checkselection(container_number){
    let container = `.container:nth-child(${container_number}) `;
    let all_elements = document.querySelectorAll(container + " .item" );
    
    let item_selected = 0;
    for(let i=0; i<all_elements.length; i+=1){
        let element = all_elements[i];
        if (element.classList.contains("selected")) {
            item_selected = i+1;
        }
    }

    return item_selected;
}

function confirmOrder(){
    const element = document.querySelector(".order button");
    if (element.classList.contains("finished")){
        let confirm_div = document.createElement("div");
        confirm_div.setAttribute("class", "confirm");
        document.body.appendChild(confirm_div);
        
        let confirm_title = document.createElement("h1");
        let confirm_title_text = document.createTextNode("Confirme seu pedido");
        confirm_title.appendChild(confirm_title_text);
        confirm_div.appendChild(confirm_title);
        
        var total_price = 0;

        for(let i=1; i<=3; i+=1) {
            let name = String(extractNamePrice(i)[0]);
            let price = Number(extractNamePrice(i)[1]);
            total_price+= price;
            appendDatainConfirm(name, price);
        }
        
        appendDatainConfirm("TOTAL", total_price.toFixed(2));

        let confirm_button = document.createElement("button");
        let confirm_button_text = document.createTextNode("Tudo Certo, pode pedir");
        confirm_button.appendChild(confirm_button_text);
        confirm_button.setAttribute("onclick", `sendMessage(${total_price})`);
        confirm_div.appendChild(confirm_button);

        let cancel_button = document.createElement("button");
        let cancel_button_text = document.createTextNode("Cancelar");
        cancel_button.appendChild(cancel_button_text);
        cancel_button.setAttribute("onclick", "cancelOrder()");
        cancel_button.setAttribute("class", "cancel");
        confirm_div.appendChild(cancel_button);

        document.querySelector(".top").style.opacity = 0.8;
        document.querySelector(".content").style.opacity = 0.8;
    }
}

function sendMessage(total_price){

    let name = prompt("Qual seu nome?");
    let address = prompt("Qual seu endereço?");

    let text = `Olá, gostaria de fazer o pedido:
    - Prato: ${String(extractNamePrice(1)[0])}
    - Bebida: ${String(extractNamePrice(2)[0])}
    - Sobremesa: ${String(extractNamePrice(3)[0])}
    Total: R$ ${total_price.toFixed(2)}
    
    Nome: ${name}
    Endereço: ${address}
    ` 

    text = encodeURIComponent(text);
    let url = "https://wa.me/5585996393218?text=" + text;
    window.open(url);
}

function cancelOrder(){
    let confirm_div = document.querySelector(".confirm");
    console.log(confirm_div);
    document.body.removeChild(confirm_div);
    document.querySelector(".top").style.opacity = 1;
    document.querySelector(".content").style.opacity = 1;
}

function appendDatainConfirm(name, price){
    let data_div = document.createElement("div");
    data_div.setAttribute("class", "data");
    
    let name_element = document.createElement("h2");
    let name_element_text = document.createTextNode(name);
    name_element.appendChild(name_element_text);
    data_div.appendChild(name_element);

    let price_element = document.createElement("span");
    let price_element_text = document.createTextNode(price);
    price_element.appendChild(price_element_text);
    data_div.appendChild(price_element);


    let confirm_div = document.querySelector('.confirm');
    confirm_div.appendChild(data_div);
}

function extractNamePrice(container_number){
    let container_query = `.container:nth-child(${container_number}) `;
    let item_query = `.item:nth-child(${checkselection(container_number)}) `;
    let container_name_element = document.querySelector(container_query + item_query + "h1");
    let container_name = container_name_element.innerHTML;
    let container_price_element = document.querySelector(container_query + item_query + "h3");
    let container_price = container_price_element.innerHTML.slice(2);
    return [container_name, container_price];
}

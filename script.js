function select(container_number, item_number){
    const container = ".container:nth-child(" + container_number + ") ";
    const item = ".item:nth-child(" + item_number + ") ";

    const all_elements = document.querySelectorAll(container + " .item" );
    removeSelection(all_elements);
    
    const element = document.querySelector(container + item);
    element.classList.add("selected");

    finish();
}

function finish(){
    if( checkselection(1) && checkselection(2) && checkselection(3) ) {
        const element = document.querySelector(".confirm button");
        element.innerHTML = "Fechar pedido";
        element.classList.add("finished");
        console.log(element);
    }
}

function removeSelection(all_elements){
    for(let i=0; i<all_elements.length; i+=1){
        let element = all_elements[i];
        element.classList.remove("selected");
    }
}


function checkselection(container_number){
    const container = ".container:nth-child(" + container_number + ") ";
    const all_elements = document.querySelectorAll(container + " .item" );
    
    let item_selected = 0;
    for(let i=0; i<all_elements.length; i+=1){
        let element = all_elements[i];
        if (element.classList.contains("selected")) {
            item_selected = i+1;
        }
    }

    return item_selected;
}

function sendMessage(){
    const element = document.querySelector(".confirm button");
    if (element.classList.contains("finished")){
        let food_name  = String(extractNamePrice(1)[0]);
        let food_price = Number(extractNamePrice(1)[1]);
        let drink_name  = String(extractNamePrice(2)[0]);
        let drink_price = Number(extractNamePrice(2)[1]);
        let desert_name  = String(extractNamePrice(3)[0]);
        let desert_price = Number(extractNamePrice(3)[1]);
        let total_price = (food_price + drink_price + desert_price).toFixed(2);

        let text = `Olá, gostaria de fazer o pedido:
        - Prato: ${food_name}
        - Bebida: ${drink_name}
        - Sobremesa: ${desert_name}
        Total: ${total_price}` 
        
        text = encodeURIComponent(text);
        let url = "https://wa.me/5585996393218?text=" + text;
        window.open(url);

    }
}

function extractNamePrice(container_number){
    let container_query = ".container:nth-child(" + container_number + ") ";
    let item_query = ".item:nth-child(" + checkselection(container_number) + ") ";
    let container_name_element = document.querySelector(container_query + item_query + "h1");
    let container_name = container_name_element.innerHTML;
    let container_price_element = document.querySelector(container_query + item_query + "h3");
    let container_price = container_price_element.innerHTML.slice(2);
    return [container_name, container_price];
}
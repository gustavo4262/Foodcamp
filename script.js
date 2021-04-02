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
    
    let selection = false;
    for(let i=0; i<all_elements.length; i+=1){
        let element = all_elements[i];
        // console.log(element);
        if (element.classList.contains("selected")) {
            selection = true;
        }
    }

    return selection;
}
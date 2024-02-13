function mainrender(reactElement,maincontainer){
    const domElement= document.createElement(reactElement.type)
    domElement.innerHTML= reactElement.children;
    for (const prop in reactElement.props) {
        if(prop==='children')continue;
        domElement.setAttribute(prop,reactElement.props[prop]);
            
        }
        maincontainer.appendChild(domElement);
    }


const maincontainer=document.querySelector("#root");

const reactElement={
    type:'a',
    props:{
        href:'https://google.com',
        target:'_blank'
    },
    children:'Click to visit google'
}

mainrender(reactElement,maincontainer)
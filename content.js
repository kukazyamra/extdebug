// console.log(window.location)


// if (domen === "n-katalog.ru"){
//   const full_name = document.querySelector(".title-for-page")
//   const articul = document.querySelector(".item-conf-name.ib.nobr");
//   console.log(full_name.textContent)
//   console.log(articul.textContent)
// }

// if (domen === "www.dns-shop.ru"){
//   const full_name = document.querySelector(".product-card-top__title")
//   // const articul = document.querySelector(".item-with-dots__text");
//   console.log(full_name.textContent)
//   // console.log(articul.textContent)
// }

// if (domen === "www.mvideo.ru"){
//   // const full_name = document.querySelector("h1.title")
//   // // const articul = document.querySelector(".item-conf-name.ib.nobr");
//   // console.log(full_name.textContent)
//   // // console.log(articul.textContent)
//   document.addEventListener('DOMContentLoaded', function(){
//     const full_name = document.querySelector("h1.title")
//     if (full_name){
//       console.log ('gbdsa')
//     }
//     else 'pizdec'
//   })

// }


// content.js
//подключается к беку, потом когда мы ЗАЖИМАЕМ мышь, текст сбрасывается и Выполняется СЕЛЕКТОНЧАНГЕ и записывает в строку введеный текст, 
// при отпускании мыши он отправляет все в бек

const domen = window.location.host
const port = chrome.runtime.connect({name: 'content-script'});
console.log('I AM CONTENT SCRIPT');
console.log(domen);
// Функция для обработки изменения URL
function handleUrlChange() {
    if ((domen=='www.rbt.ru')||(domen=='www.onlinetrade.ru')||domen.includes('e2e4online.ru')||(domen == 'www.citilink.ru')||(domen=='www.dns-shop.ru')||(domen=='www.mvideo.ru')||(domen=='www.eldorado.ru')){
        chrome.runtime.sendMessage({message: "timeout"});
        chrome.storage.local.set({'status': 'searching'});
    }
    setTimeout(findName, 1000);
}

// Добавляем обработчик события на изменение URL
// window.addEventListener('hashchange', handleUrlChange); // Для отслеживания изменений хэша в URL
// window.addEventListener('popstate', handleUrlChange); // Для отслеживания изменений URL при использовании навигации внутри страницы
// window.addEventListener('locationchange', handleUrlChange);
window.navigation.addEventListener("navigate", handleUrlChange);
// Вызываем функцию handleUrlChange() сразу после загрузки страницы, чтобы получить начальный URL
handleUrlChange();


function findName(){
    // if (domen == 'street-beat.ru') {
    //     const header = document.querySelector('.product-specs__title').textContent
    //     if (header != '') {
    //         port.postMessage({selectionText: header});
    //
    //     }
    // }

// if (domen=='sportmaster.ru') {
//   const header=document.querySelector('h1[data-selenium="product-name"]').textContent;
//     port.postMessage({ selectionText: header });
// }
//     if (domen == 'sneakerhead.ru') {
//         const header = document.querySelector('.product__title').textContent
//         if (header != '') {
//             port.postMessage({selectionText: header});
//         }
//     }

    // if (domen == 'superstep.ru') {
    //     const header = document.querySelector('.detail__info-title__wrapper')
    //     if (header != '') {
    //         const zagElement = header.querySelector('h1.zag');
    //         if (zagElement) {
    //             const title = zagElement.querySelector('.hidden');
    //             brand = title.querySelector('a').textContent;
    //             name = title.querySelector('font').textContent;
    //             port.postMessage({selectionText: brand+' '+name});
    //         }
    //     }
    // }

    if (domen.includes('e2e4online.ru')) {
        const header = document.querySelector('.offer-card-new__title').textContent
        if (header != '') {
            port.postMessage({selectionText: header});
        }
    }
    if (domen == 'www.citilink.ru') {
        const header = document.querySelector('[data-meta-name="ProductHeaderLayout__title"]').textContent;
        console.log('header'+header);

        if (header != '') {
            port.postMessage({selectionText:header});
        }
    }
    if (domen=='www.dns-shop.ru'){
        const header = document.querySelector('.product-card-top__title').textContent;

        if (header != '') {
            port.postMessage({selectionText:header});
        }
    }
    if (domen=='www.mvideo.ru'){
        const header = document.querySelector('h1.title').textContent;

        if (header != '') {
            port.postMessage({selectionText:header});
        }
    }

    if (domen=='www.eldorado.ru'){
        const header = document.querySelector('[data-dy="heading"]').textContent;

        if (header != '') {
            port.postMessage({selectionText:header});
        }
    }
    if (domen=='www.onlinetrade.ru'){
        const good = document.querySelector('.productPage__card');
        if (good!=null){
            const header=good.querySelector('h1').textContent;
            if (header != '') {
                port.postMessage({selectionText:header});
            }
        }
    }
    if (domen=='www.rbt.ru'){
        const header = document.querySelector('.page-item__title-h1').textContent;
        if (header != '') {
            port.postMessage({selectionText:header});
        }
    }



}
if ((domen=='www.rbt.ru')||domen.includes('e2e4online.ru')||(domen == 'www.citilink.ru')||(domen=='www.dns-shop.ru')||(domen=='www.mvideo.ru')||(domen=='www.eldorado.ru')||(domen=='www.onlinetrade.ru')){
    chrome.runtime.sendMessage({message: "timeout"});
    chrome.storage.local.set({'status': 'searching'});
}


setTimeout(findName, 1000);




let isMouseDown = false;
let selectedText = '';

// Подключаемся к background script

// Слушаем событие нажатия кнопки мыши
document.addEventListener('mousedown', function () {
    isMouseDown = true;
    selectedText = ''; // Сбрасываем текст перед началом выделения
});

// Слушаем событие отпускания кнопки мыши
document.addEventListener('mouseup', function () {
    isMouseDown = false;

    if (selectedText.trim() !== '') {
        // Отправляем выделенный текст в background script
        port.postMessage({selectionText: selectedText});
    }
});

// Слушаем событие выделения текста на странице
document.addEventListener('selectionchange', function () {
    if (isMouseDown) {
        var selection = window.getSelection();
        selectedText = selection.toString();
    }
});









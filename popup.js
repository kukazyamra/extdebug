// // Слушаем сообщения от background.js
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   // Проверяем, что сообщение содержит данные
//   if (request.data) {
//       // Получаем данные из сообщения
//       var jsonData = request.data;

//       // Делаем что-то с данными, например, визуализируем их в popup.html
//       // ...
//       var divElement  = document.querySelector('#visualization')
//       var htmlString = '<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>';

//       divElement.innerHTML = htmlString;

//   }
// });
// Прослушиваем сообщения от background.js
chrome.storage.local.set({'popupOpened': Date.now()});

items=document.getElementById('items')
function outputResults() {
    chrome.storage.local.get('myData', function(dataa) {
        if (dataa && dataa['myData']) {
            let data = dataa['myData'];
            console.log(data);
            // Создаем таблицу
            let table = document.createElement('table');
            table.classList.add('table');
            // Создаем заголовок таблицы
            let headerRow = table.insertRow();
            let imgHeader = document.createElement('th');
            imgHeader.textContent = 'Фото';
            headerRow.appendChild(imgHeader);
            let nameHeader = document.createElement('th');
            nameHeader.textContent = 'Название';
            headerRow.appendChild(nameHeader);
            let priceHeader = document.createElement('th');
            priceHeader.textContent = 'Цена';
            headerRow.appendChild(priceHeader);
            let shopHeader = document.createElement('th');
            shopHeader.textContent = 'Магазин';
            headerRow.appendChild(shopHeader);

            for (let i = 0; i < data.length; i++) {

                const price = data[i].price;
                const name = data[i].name;
                let row = table.insertRow();

                let imageCell = row.insertCell(0);
                let image = document.createElement('img');
                image.classList.add('ext-img');
                image.src = data[i].img;
                let imageLink = document.createElement('a');
                imageLink.href = data[i].link;
                imageLink.target = "_blank"; // открывать ссылку в новой вкладке

                imageLink.appendChild(image);
                imageCell.appendChild(imageLink);
                let nameCell = row.insertCell(1);
                let nameLink = document.createElement('a');
                nameLink.href = data[i].link;
                nameLink.textContent = name;
                nameLink.target = "_blank"; // открывать ссылку в новой вкладке

                nameCell.appendChild(nameLink);
                let priceCell = row.insertCell(2);
                priceCell.textContent = price;
                let shopCell = row.insertCell(3);
                shopCell.textContent = data[i].shop;
            }
            // Добавляем таблицу на страницу
            items.innerHTML='';
            items.appendChild(table);
        }
    });
}


// Получение сообщения от background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message =='new data'){
        console.log("Message from background.js:", request.message);
        outputResults();
    }
});

chrome.storage.local.get('status', function (status){
    if (status.status == 'searching'){
        items.innerHTML = '<p>Ищем предложения...</p>'
    } else if (status.status == 'finished'){
        chrome.storage.local.get('finishTime', function(result){
            if (Date.now()-result.finishTime < 30000){
                outputResults();
            } else {
                chrome.storage.local.set({'myData': ''});
            }
        })
    }
})



// chrome.storage.local.get('myData', function(result) {
//     console.log(storage.local.get('myData'))
//     if (result.myData) {
//         myData = result.myData
//         for (let i = 0; i < myData.length; i++) {
//             id=myData[i].id;
//             name = myData[i].name;
//             newItem = document.createElement('h1')
//             newItem.textContent=`Id: ${id}, Имя: ${name}`
//             items.appendChild(newItem)
//         }
//         // Далее вы можете использовать полученные данные для своих нужд
//     }
// });
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.dataReceived) {
//         // Получаем переданные данные
//         let myData = message.myData;
//         for (let i = 0; i < myData.length; i++) {
//             id=myData[i].id;
//             name = myData[i].name;
//             newItem = document.createElement('h1')
//             newItem.textContent=`Id: ${id}, Имя: ${name}`
//             items.appendChild(newItem)
//         }
//         // Далее вы можете использовать полученные данные для своих нужд
//     }
// });


// window.addEventListener('load', function() {
//     chrome.storage.local.set({ popupOpen: true });
// });
//
// window.addEventListener('unload', function() {
//     chrome.storage.local.remove('popupOpen');
// });
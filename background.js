// background.js
async function createOffscreen() {
    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['BLOBS'],
        justification: 'keep service worker running',
    }).catch(() => {
    });
}

chrome.runtime.onStartup.addListener(createOffscreen);
self.onmessage = e => {
}; // keepAlive
createOffscreen();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message =='tipa start search'){
        console.log("poluchil infu o start search");
        console.log(request.name);
        sendDataToServer(request.name, function (response) {
            chrome.runtime.sendMessage({message: "new data"});
            chrome.storage.local.set({'myData': response})
            chrome.storage.local.set({'finishTime': Date.now()})
        });
    } 
});

// let contentScriptPort;


// let data_search = message.selectionText

// chrome.runtime.onConnect.addListener(function (port) {
//     contentScriptPort = port;

//     contentScriptPort.onMessage.addListener(function (message) {
//         if (message.selectionText) {

//             console.log('Selected text:', message.selectionText);

//             sendDataToServer(message.selectionText, function (response) {
//                 chrome.runtime.sendMessage({message: "new data"});
//                 chrome.storage.local.set({'myData': response})
//                 chrome.storage.local.set({'finishTime': Date.now()})
//                 // chrome.storage.local.get('popupOpen', function(result) {
//                 //     if (result.popupOpen) {
//                 //         // Если окно открыто, отправляем сообщение в popup.js
//                 //         chrome.runtime.sendMessage({ dataReceived: true, myData: response });
//                 //         console.log('sending message...')
//                 //     } else {
//                 //         // Иначе сохраняем данные в chrome.storage
//                 //         chrome.storage.local.set({ myData: response }, function() {
//                 //             console.log('Данные успешно сохранены');
//                 //         });
//                 //     }
//                 // });
//                 // Отправка ответа обратно в content.js

//             });


//         }
//     });

//     contentScriptPort.onDisconnect.addListener(function () {
//         contentScriptPort = null;
//     });
// });


function sendDataToServer(data, callback) {
    // Параметры запроса
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Отправляем данные напрямую
    };
    // Отправка данных на сервер Flask
    chrome.storage.local.get('popupOpened', function (result) {
        if (Date.now() - result.popupOpened < 30000) {
            chrome.storage.local.set({'status': 'searching'});
            chrome.runtime.sendMessage({message: "timeout"});
            fetch('http://127.0.0.1:5000/receive_data', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Обработка ответа от сервера
                    chrome.storage.local.set({'status': 'finished'});

                    callback(data);
                })
                .catch(error => {
                    // Обработка ошибки
                    chrome.storage.local.set({'status': ''});

                    console.error('Ошибка при отправке данных на сервер:', error);
                    callback(null);
                });
        }
    })

}





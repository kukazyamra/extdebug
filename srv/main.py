from flask import Flask, request, jsonify
import random
import time
app=Flask(__name__)



@app.route('/')
def home():
    data={'id':12, 'name':'Mike'}
    return jsonify(data), 200

@app.route('/receive_data', methods=["POST"])
def receive_data():
    time.sleep(4)
    dt = request.get_json()
    print(dt)
    data=[
        {'price': 123, 'link': 'fake', 'shop': 'fake', 'name': f'{dt}', 'img': 'https://static.onlinetrade.ru/img/items/b/smartfon_xiaomi_redmi_note_13_8_256gb_chernyy_2928421_1.JPG'},
     {'price': 21990, 'link': 'google.com', 'shop': 'onlinetrade.ru', 'name': 'Смартфон Xiaomi Redmi Note 13 8/256GB Черный', 'img': 'https://static.onlinetrade.ru/img/items/b/smartfon_xiaomi_redmi_note_13_8_256gb_chernyy_2928421_1.JPG'},
     {'price': 22999, 'link': 'google.com', 'shop': 'dns-shop.ru', 'name': '6.67" Смартфон Xiaomi Redmi Note 13 256 ГБ черный', 'img': 'https://c.dns-shop.ru/thumb/st1/fit/0/0/3df336561598fe5d6d29524e84d57a5c/c535077fe172ce14b87dc57b1c9a0d3873cf76bf608832dfa58f4f928759fe0c.jpg.webp'},
     {'price': 208902, 'link': 'e2e4online.ru', 'shop': 'e2e4online.ru', 'name': '', 'img': 'https://s3.e2e4.ru/imgproxy/3374646'}
    ]


    sorted_data = sorted(data, key=lambda x: x['price'])

    return jsonify(sorted_data), 201


if __name__=='__main__':
    app.run(debug=True)

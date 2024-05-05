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
    time.sleep(8)
    dt = request.get_json()
    print(dt)
    data=[{'price':'Текст из расширения', 'name':dt, 'img':'https://img.mvideo.ru/Big/400255619bb.jpg','shop':'citilink.ru'
    , 'link' : 'https://www.google.com/'},
     {'price':f'{int(random.random()*1000)} руб.', 'name':'Товар1', 'img':'https://img.mvideo.ru/Big/400255619bb.jpg','shop':'citilinks.ru', 'link' : 'https://vk.com/kukazyamra'},
    {'price':f'{int(random.random()*1000)} руб.', 'name':'Товар2', 'img':'https://img.mvideo.ru/Big/400255619bb.jpg','shop':'citilink.ru', 'link' : 'google.com'},
    {'price':f'{int(random.random()*1000)} руб.', 'name':'Товар3', 'img':'https://img.mvideo.ru/Big/400255619bb.jpg','shop':'citilink.ru','link' : 'google.com'}]

    return jsonify(data), 201


if __name__=='__main__':
    app.run(debug=True)

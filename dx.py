import base64
import datetime
import json
import os
import requests
import sys

KEY_OF_COOKIE = "Phone"

msg = []


def logout(self):
    print("[{0}]: {1}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), self))
    sys.stdout.flush()


# push推送
PUSH_PLUS_TOKEN = ''


def push_plus_bot(title, content):
    try:
        print("\n")
        if not PUSH_PLUS_TOKEN:
            print("PUSHPLUS服务的token未设置!!\n取消推送")
            return
        url = 'https://www.pushplus.plus/send'
        data = {
            "token": PUSH_PLUS_TOKEN,
            "title": title,
            "content": content,
            "topic": ""
        }
        body = json.dumps(data).encode(encoding='utf-8')
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url=url, data=body, headers=headers).json()
        if response['code'] == 200:
            print('推送成功！')
        else:
            print('推送失败！')
    except Exception as e:
        print(e)


def telecom_task(config):
    mobile = config['mobile']
    msg.append(mobile + " 开始执行任务...")
    h5_headers = get_h5_headers(mobile)
    # 获取用户中心
    home_info_body = requests.get(url="http://49.232.124.89:8080/telecom/getHomeInfo", params={"mobile": mobile}).json()
    home_info_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/homeInfo", json=home_info_body,
                                  headers=h5_headers).json()
    if home_info_ret['resoultMsg'] != "成功":
        msg.append(home_info_ret['resoultMsg'])
        return
    user_id = home_info_ret['data']['userInfo']['userThirdId']
    old_coin = home_info_ret['data']['userInfo']['totalCoin']

    # 签到
    sign_body = requests.get(url="http://49.232.124.89:8080/telecom/getSign", params={"mobile": mobile}).json()
    sign_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/sign", json=sign_body,
                             headers=h5_headers).json()
    if sign_ret['data']['code'] == 1:
        msg.append("签到成功, 本次签到获得 " + str(sign_ret['data']['coin']) + " 豆")
    else:
        msg.append(sign_ret['data']['msg'])

    # 每日分享任务
    share_body = requests.get(url="http://49.232.124.89:8080/telecom/getShare",
                              params={"mobile": mobile, "userId": user_id}).json()
    requests.post(url="https://appfuwu.189.cn:9021/query/sharingGetGold", json=share_body,
                  headers={"User-Agent": "Xiaomi MI 9/9.2.0"}).text

    # 获取用户中心
    home_info_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/homeInfo", json=home_info_body,
                                  headers=h5_headers).json()
    new_coin = home_info_ret['data']['userInfo']['totalCoin']
    msg.append("【" + str(mobile) + "】" + "领取完毕, 现有金豆: " + str(new_coin))
    msg.append("本次领取金豆: " + str(new_coin - old_coin))

    # 喂食
    food(config)

    # 签到7天领取话费
    convert_reward(config)
    msg.append("----------------------------------------------")


def food(config):
    if config['food']:
        mobile = config['mobile']
        msg.append(mobile + " 开始执行喂食...")
        while True:
            food_body = requests.get(url="http://49.232.124.89:8080/telecom/getPhone", params={"mobile": mobile}).json()
            food_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/paradise/food", json=food_body,
                                     headers=get_h5_headers(mobile)).json()
            msg.append(food_ret['resoultMsg'])
            if food_ret['resoultCode'] != '0':
                break


def convert_reward(config):
    mobile = config['mobile']
    msg.append(mobile + " 开始执行满7天兑换话费...")
    phone_body = requests.get(url="http://49.232.124.89:8080/telecom/getPhone", params={"mobile": mobile}).json()
    activity_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/reward/activityMsg", json=phone_body,
                                 headers=get_h5_headers(mobile)).json()
    msg.append("你已连续签到 " + str(activity_ret['totalDay']) + " 天")
    if activity_ret['recordNum'] > 0:
        # 可以领取
        reward_id = activity_ret['date']['id']
        params = {
            "mobile": mobile,
            "rewardId": reward_id
        }
        reward_body = requests.get(url="http://49.232.124.89:8080/telecom/getConvertReward", params=params).json()
        reward_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/reward/convertReward", json=reward_body,
                                   headers=get_h5_headers(mobile)).json()
        if reward_ret['code'] == '0':
            msg.append(reward_ret['msg'])


def get_h5_headers(mobile):
    base64_mobile = str(base64.b64encode(mobile[5:11].encode('utf-8')), 'utf-8').strip(r'=+') + "!#!" + str(
        base64.b64encode(mobile[0:5].encode('utf-8')), 'utf-8').strip(r'=+')
    return {"User-Agent": "CtClient;9.2.0;Android;10;MI 9;" + base64_mobile}


def format_msg():
    str1 = ''
    for item in msg:
        str1 += str(item) + "\r\n"
    return str1


if __name__ == '__main__':
    Phone = os.environ[KEY_OF_COOKIE]
    phoneList = Phone.split("&")
    logout("检测到{}个Phone记录\n开始签到".format(len(phoneList)))
    index = 0
    for phoneConfig in phoneList:
        foodBol = False
        if phoneConfig.split(",")[1] == 'True':
            foodBol = True
        print("mobile：" + str(phoneConfig.split(",")[0]))
        print("food：" + str(foodBol))
        config = {"mobile": str(phoneConfig.split(",")[0]), "food": foodBol}
        telecom_task(config)
        index += 1
    content = format_msg()
    push_plus_bot("电信签到：", content)

#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_zddd_Help
Author: Curtin
功能：种豆得豆-助力
Date: 2021/10/17 下午12:12
TG交流 https://t.me/topstyle996
TG频道 https://t.me/TopStyle2021
cron: 0 0 * * *
new Env('种豆得豆-助力.py');
'''

# 种豆得豆助力码 ENV环境变量设置 export PLANT_BEAN_SHARECODES="code1&code2&code3"
zddd_code = ["rgorqgqg4gtluaxd7447mv56ea&hdpluo3fw52b7v3bt2jnjzcfza3h7wlwy7o5jii&e7lhibzb3zek3e4ipnxqoe53rp3ihqwww23hw6y&olmijoxgmjutzckvjhiisyidi6xvlmdadqh5xbi&4vvbjlml6tdfdgkob4cghf6svdbovn5nkzx3afq&nkvdrkoit5o65tasishkhlhgzmpfzfz4abfclli&xaq3fso6ha2krfakuembf5o2ru&plburxacdo26nss7lgmlez34ti&mlrdw3aw26j3wcovxizans6xwvf5wrgfm5odnaa&su6bfszxhcblrn45uz5w3qbcz4&mwx2fbrx5rt2ylw4zktinhz4mu&rb6w5zmt2uc5am4dgawzwccaqa&rj7s6mzlk7uog6n2fmxgwkh5nn5rumkjmcn552q&mlrdw3aw26j3xqgoaciuigwgmf7qxfjejssoa3i&emhxfc7hmmayfc7awwgndqnmu43h7wlwy7o5jii&olmijoxgmjutz3mcu23gz2xazp6wr5rwogy4zfq&olmijoxgmjutziedkkcdvmea3xbineb3l7i4umq&pe44is3q3qivkkuttr6cveqk7aq5cz63mk6jinq&e7lhibzb3zek3zucaibbdaucwgddpxwctw5ut3i&olmijoxgmjutza2iwozsxgztbqmjvquo2zue5ki&olmijoxgmjutyuovghnsi6wi7dh7jpfg6zfyfqa&e7lhibzb3zek34jm424cuwiuuj5uu4mb7qaupri&o7eiltak46s2xgzkxoxpohdfmut3ivdn7oknezy&mlrdw3aw26j3x4qcrrsa5uteedfutjfihj4v2ey&mlrdw3aw26j3xx2fqbkvt5ug27kaq4ckbik4qiq&d7v7b5psqtvegbxa6p6laof5me&7t7fuzpihctpkodk6sbizqr5iinpnrsacrrd3hq&ajwtxc27cil3f3b3iaokftg4ye3h7wlwy7o5jii&z42ysow4akzc3pqczgxayiueeu&yw6hilvomdzrngona34lxybpwy&mlrdw3aw26j3xf6xdcux3gsqq366h3yyq3kcwfi&cvhfevzh2r7hfryftmxp6pdtea5ac3f4ijdgqji&olmijoxgmjutywh5hfs743dlhde543cl6eqwfma&olmijoxgmjutz7bidvtflback2snrprn4m65fsa&rtsljotwy2w35an32iywbnavvhzzkkj6oxynfci&l4ex6vx6yynouw7fnpkv4axzglurmcspxkhd5pq&hstkzfwew5bhtwe6zrjxyk4qlhmoehw4ui7qelcjl3wl5vthqgdq&t2dcnkzznfpgxnd72g3hberwre&lxslbmbe3tkxfalufgkg2ypzja3h7wlwy7o5jii&klbur6xdpkgoohejzi63xxuify&mlrdw3aw26j3wmackpdsme2cawy22l6d4g3xvjq&iu237u55hwjior6ifudlry7yigg2pqnbrojp7pa&olmijoxgmjutzhldh4cocddtdgou2d6vc4ud3aa", ]

# UA 可自定义你的，注意格式: 【 jdapp;iPhone;10.0.4;14.2;9fb54498b32e17dfc5717744b5eaecda8366223c;network/wifi;ADID/2CF597D0-10D8-4DF8-C5A2-61FD79AC8035;model/iPhone11,1;addressid/7785283669;appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1 】
UserAgent = ''

import os, re, sys
import random
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
from urllib.parse import unquote
# requests.packages.urllib3.disable_warnings()
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
###
uuid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 40))
addressid = ''.join(random.sample('1234567898647', 10))
iosVer = ''.join(random.sample(["14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.7", "13.1.2", "13.1.1"], 1))
iosV = iosVer.replace('.', '_')
iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
ADID = ''.join(random.sample('0987654321ABCDEF', 8)) + '-' + ''.join(
    random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(
    random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 12))
###
if "PLANT_BEAN_SHARECODES" in os.environ:
    if len(os.environ["PLANT_BEAN_SHARECODES"]) > 1:
        zddd_code = os.environ["PLANT_BEAN_SHARECODES"]
        if '&' in zddd_code:
            zddd_code = zddd_code.split('&')
        elif '@' in zddd_code:
            zddd_code = zddd_code.split('@')
        print("已获取并使用Env环境 zddd_code:", zddd_code)
if not isinstance(zddd_code, list):
    zddd_code = zddd_code.split(" ")
        
class getJDCookie(object):
    # 适配各种平台环境ck

    def getckfile(self):
        global v4f
        curf = pwd + 'JDCookies.txt'
        v4f = '/jd/config/config.sh'
        ql_new = '/ql/config/env.sh'
        ql_old = '/ql/config/cookie.sh'
        if os.path.exists(curf):
            with open(curf, "r", encoding="utf-8") as f:
                cks = f.read()
                f.close()
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            cks = r.findall(cks)
            if len(cks) > 0:
                return curf
            else:
                pass
        if os.path.exists(ql_new):
            print("当前环境青龙面板新版")
            return ql_new
        elif os.path.exists(ql_old):
            print("当前环境青龙面板旧版")
            return ql_old
        elif os.path.exists(v4f):
            print("当前环境V4")
            return v4f
        return curf

    # 获取cookie
    def getCookie(self):
        global cookies
        ckfile = self.getckfile()
        try:
            if os.path.exists(ckfile):
                with open(ckfile, "r", encoding="utf-8") as f:
                    cks = f.read()
                    f.close()
                if 'pt_key=' in cks and 'pt_pin=' in cks:
                    r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
                    cks = r.findall(cks)
                    if len(cks) > 0:
                        if 'JDCookies.txt' in ckfile:
                            print("当前获取使用 JDCookies.txt 的cookie")
                        cookies = ''
                        for i in cks:
                            if 'pt_key=xxxx' in i:
                                pass
                            else:
                                cookies += i
                        return
            else:
                with open(pwd + 'JDCookies.txt', "w", encoding="utf-8") as f:
                    cks = "#多账号换行，以下示例：（通过正则获取此文件的ck，理论上可以自定义名字标记ck，也可以随意摆放ck）\n账号1【Curtinlv】cookie1;\n账号2【TopStyle】cookie2;"
                    f.write(cks)
                    f.close()
            if "JD_COOKIE" in os.environ:
                if len(os.environ["JD_COOKIE"]) > 10:
                    cookies = os.environ["JD_COOKIE"]
                    print("已获取并使用Env环境 Cookie")
        except Exception as e:
            print(f"【getCookie Error】{e}")

        # 检测cookie格式是否正确
    def getUserInfo(self, ck, pinName, userNum):
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback='
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn'
        }
        try:
            if sys.platform == 'ios':
                requests.packages.urllib3.disable_warnings()
                resp = requests.get(url=url, verify=False, headers=headers, timeout=60).json()
            else:
                resp = requests.get(url=url, headers=headers, timeout=60).json()
            if resp['retcode'] == "0":
                nickname = resp['data']['userInfo']['baseInfo']['nickname']
                return ck, nickname
            else:
                context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
                print(context)
                return ck, False
        except Exception:
            context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
            print(context)
            return ck, False

    def iscookie(self):
        """
        :return: cookiesList,userNameList,pinNameList
        """
        cookiesList = []
        userNameList = []
        pinNameList = []
        if 'pt_key=' in cookies and 'pt_pin=' in cookies:
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            result = r.findall(cookies)
            if len(result) >= 1:
                print("您已配置{}个账号".format(len(result)))
                u = 1
                for i in result:
                    r = re.compile(r"pt_pin=(.*?);")
                    pinName = r.findall(i)
                    pinName = unquote(pinName[0])
                    # 获取账号名
                    ck, nickname = self.getUserInfo(i, pinName, u)
                    if nickname != False:
                        cookiesList.append(ck)
                        userNameList.append(nickname)
                        pinNameList.append(pinName)
                    else:
                        u += 1
                        continue
                    u += 1
                if len(cookiesList) > 0 and len(userNameList) > 0:
                    return cookiesList, userNameList, pinNameList
                else:
                    print("没有可用Cookie，已退出")
                    exit(3)
            else:
                print("cookie 格式错误！...本次操作已退出")
                exit(4)
        else:
            print("cookie 格式错误！...本次操作已退出")
            exit(4)
getCk = getJDCookie()
getCk.getCookie()

def userAgent():
    """
    随机生成一个UA
    jdapp;iPhone;10.0.4;14.2;9fb54498b32e17dfc5717744b5eaecda8366223c;network/wifi;ADID/2CF597D0-10D8-4DF8-C5A2-61FD79AC8035;model/iPhone11,1;addressid/7785283669;appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1
    :return: ua
    """
    if not UserAgent:
        return f'jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/{ADID};model/iPhone{iPhone},1;addressid/{addressid};appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS {iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1'
    else:
        return UserAgent


def zhuli(ck, username, code):
    url = f'https://api.m.jd.com/client.action?functionId=plantBeanIndex&body=%7B%22plantUuid%22%3A%22{code}%22%2C%22monitor_source%22%3A%22plant_m_plant_index%22%2C%22monitor_refer%22%3A%22%22%2C%22version%22%3A%229.2.4.0%22%7D&appid=ld&client=apple&clientVersion=10.1.4&networkType=wifi&osVersion={iosVer}&uuid={uuid}'
    headers = {
        'Cookie': ck,
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': f'https://plantearth.m.jd.com/plantBean/index?source=jingkoulingzhuli&plantUuid={code}&mpin=&lng=113&lat=&sid=&un_area=',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'api.m.jd.com',
        'User-Agent': userAgent(),
        'Accept-Language': 'zh-cn'
    }
    try:
        resp = requests.get(url=url, headers=headers,  timeout=30)
        if resp.json()['data']:
            print(username, "助力完成~")
    except:
        print(username, "助力失败~")

def start():
    cookiesList, userNameList, pinNameList = getCk.iscookie()
    for ck, username in zip(cookiesList, userNameList):
        for code in zddd_code:
            zhuli(ck, username, code)

if __name__ == '__main__':
    start()

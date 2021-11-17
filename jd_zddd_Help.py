#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_zddd_Help
Author: Curtin
功能：种豆得豆-助力
Date: 2021/11/08 下午8:20
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
try:
    from jd_cookie import getJDCookie
    getCk = getJDCookie()
except:
    print("请先下载依赖脚本，\n下载链接：https://ghproxy.com/https://raw.githubusercontent.com/curtinlv/JD-Script/main/jd_tool_dl.py")
    sys.exit(3)
from urllib.parse import unquote
# requests.packages.urllib3.disable_warnings()
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
requests.packages.urllib3.disable_warnings()
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
    cookiesList, userNameList = getCk.iscookie()
    for ck, username in zip(cookiesList, userNameList):
        for code in zddd_code:
            zhuli(ck, username, code)

if __name__ == '__main__':
    start()

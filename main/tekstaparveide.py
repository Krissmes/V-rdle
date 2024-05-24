with open("main/words.txt","r", encoding="utf-8") as f:
    saturs = f.readlines()
    jaunais = [saturs[0]]
    for rinda in saturs[1:]:
        rinda = rinda.strip("\n")
        rakstamais = "\'" + rinda + "\', "
        jaunais.append(rakstamais)

with open("main/words_teksts.js","w", encoding="utf-8") as f:
    f.write("".join(jaunais))

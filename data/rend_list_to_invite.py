import hashlib

users = [i.split() for i in open('list.txt', 'r').readlines()]
out = open('invite.html', 'w')
salt = "qwert"

for i in range(len(users)):
    name, surname, vk = users[i]
    out.write('http://birthday.feretj.me/?uid=' +
              hashlib.md5(bytes(name + ' ' + surname + salt, 'UTF-8')).hexdigest() +
              ' <a href="' + vk + '">vk</a><br />\n')
out.write('\n')
out.close()

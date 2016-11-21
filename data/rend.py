import hashlib

users = [i.split() for i in open('list.txt', 'r').readlines()]
out = open('users.txt', 'w')
out.write('{')
salt = "qwert"

for i in range(len(users) - 1):
    name, surname, vk = users[i]
    out.write('\n  "' +
              hashlib.md5(bytes(name + ' ' + surname + salt, 'UTF-8')).hexdigest() +
              '": {\n      "id": "' + str(i) + '",\n' +
              '      "name": "' + name + '",\n' +
              '      "surname": "' + surname + '",\n' +
              '      "status": "0",\n' +
              '      "vk": "' + vk + '",\n' +
              '      "present": ""},')

name, surname, vk = users[-1]
out.write('\n  "' +
          hashlib.md5(bytes(name + ' ' + surname + salt, 'UTF-8')).hexdigest() +
          '": {\n      "id": "' + str(len(users) - 1) + '",\n' +
          '      "name": "' + name + '",\n' +
          '      "surname": "' + surname + '",\n' +
          '      "status": "0",\n' +
          '      "vk": "' + vk + '",\n' +
          '      "present": ""}')

out.write('\n}\n')
out.close()

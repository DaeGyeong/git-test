# vscode
> 서버에서 vscode를 실행해서 웹으로 접근 가능

```sh
wget https://github.com/cdr/code-server/releases/download/1.1156-vsc1.33.1/code-server1.1156-vsc1.33.1-linux-x64.tar.gz
tar xvfz code-server1.1156-vsc1.33.1-linux-x64.tar.gz
mv code-server1.1156-vsc1.33.1-linux-x64/code-server /usr/bin
mkdir ~/project
cd ~/project
export pass='abc123!!'
PASSWORD=$pass nohup code-server -p 1212 --allow-http &
```

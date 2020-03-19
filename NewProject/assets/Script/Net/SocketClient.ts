// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { connect, SocketIOClient } from "../lib/socket.io";

export default class SocketClient {
    io: SocketIOClient.Socket = null;
    handlers: string[] = [];

    constructor(ws_url: string, is_native = false) {
        if (is_native) {
            // this.io = window.io
        } else {
            this.io = connect(ws_url);
        }

        this.io.on("reconnect", () => {
            console.log("重连......");
        })

        this.io.on("connect", () => {
            console.log("连接成功");
        })

        this.io.on("disconnect", data => {
            console.log("断开连接:", data);
        })
    }

    disconnect = () => {
        this.io.disconnect();
    }

    send_msg = (event: string, data: any = {}, delay: number = 0) => {
        if (delay) {
            setTimeout(this.send_msg, delay, event, data);
        } else {
            console.log("send msg. event:%s  data:%s", event, JSON.stringify(data));
            if (this.io.connected) {
                this.io.emit(event, data);
            } else {
                console.error("socket is not connected.");
            }
        }
    }

    add_handler = (event: string, fn: Function) => {
        if (this.handlers.indexOf(event) != -1) {
            console.error("请勿重复添加事件");
            return;
        }
        this.io.on(event, fn);
        this.handlers.push(event);
    }

}

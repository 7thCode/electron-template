/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="../typings/index.d.ts" />

"use strict";

const electron = require('electron');
const {dialog} = require('electron');
const BrowserWindow = electron.BrowserWindow;

let count = 0;
export namespace MainModule {

    export class Main {

        constructor() {

        }

        public Add(v1:number, v2:number):number {
            return v1 + v2;
        }

        public Minus(v1:number, v2:number):number {
            return v1 - v2;
        }

        public RGBA(): string {
            return "";
        }

        public open():void {
            let options = {
                title: 'Message from callback',
                type: 'info',
                buttons: ['OK', 'Cancel'],
                message: 'Callback passs',
                detail: "ssss"
            };
            dialog.showOpenDialog(BrowserWindow, options);
        }
    }
}

module.exports = MainModule;
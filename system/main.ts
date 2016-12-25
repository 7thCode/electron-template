/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="../typings/index.d.ts" />

"use strict";

const electron = require('electron');
const {dialog} = require('electron');
const browserWindow = electron.BrowserWindow;

let File = require('./common/utility.js').File;

export namespace MainModule {

    export class Main {

        private  file:any;
        private current_file:string;

        constructor() {
            this.file = new File();
            this.current_file = '.';
        }

        public open(): string {

            let options = {
                title: 'タイトル',
                properties: ['openFile'],
                filters: [
                    {name: 'テキストファイル', extensions: ['txt']},
                    {name: 'JSファイル', extensions: ['js']},
                    {name: 'HTMLファイル', extensions: ['html']}
                ]
            };

            let filenames = dialog.showOpenDialog(browserWindow, options);
            this.current_file = filenames[0];
            return this.file.readfileSync(this.current_file);
        }

        public save(data:string): boolean {
            if (this.current_file) {
                return this.file.writefileSync(this.current_file, data);
            }
        }

        public save_as(data:string): boolean {

            let options = {
                title: '保存',
                defaultPath: this.current_file,
                filters: [
                    {name: 'テキストファイル', extensions: ['txt']},
                    {name: 'JSONファイル', extensions: ['json']}
                ]
            };

            let filename =  dialog.showSaveDialog(browserWindow, options);
            return this.file.writefileSync(filename, data);
        }
    }
}

module.exports = MainModule;
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

        private file: any;
        public current_file: string;

        constructor() {
            this.file = new File();
            this.current_file = '.';
        }

        public open(): string {
            let result:string = "";
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
            if (filenames.length > 0) {
                result = this.open_as(filenames[0]);
            }
            return result;
        }

        public open_as(filename: string): string {
            this.current_file = filename;
            return this.file.readfileSync(this.current_file);
        }

        public close(): string {
            this.current_file = '.';
            return '';
        }

        public save(data: string): boolean {
            if (this.current_file) {
                return this.file.writefileSync(this.current_file, data);
            }
        }

        public save_as(data: string): boolean {
            let result: boolean = false;
            let options = {
                title: '保存',
                defaultPath: this.current_file,
                filters: [
                    {name: 'テキストファイル', extensions: ['txt']},
                    {name: 'JSONファイル', extensions: ['json']}
                ]
            };
            let filename = dialog.showSaveDialog(browserWindow, options);
            if (filename) {
                result = this.file.writefileSync(filename, data);
            }
            return result;
        }
    }
}

module.exports = MainModule;
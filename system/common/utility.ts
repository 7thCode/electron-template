/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="../../typings/index.d.ts" />

"use strict";

export namespace Utility {

    const fs: any = require('graceful-fs');

    export class File {

        constructor() {

        }

        public readfileSync(filename: any): string {
            let result = "";
            let file = fs.openSync(filename, 'r');
            if (file) {
                try {
                    result = fs.readFileSync(filename, 'utf8');
                } finally {
                    fs.closeSync(file);
                }
            }
            return result;
        }

        public readfile(filename: any, callback: (error, data) => void): void {
            fs.open(filename, 'r', (error, fd) => {
                let data = null;
                if (fd) {
                    try {
                        data = fs.readFileSync(filename, 'utf8');
                    } finally {
                        fs.closeSync(fd);
                    }
                }
                callback(error, data);

            });
        }

        public delete_folder_recursive(path): void {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.delete_folder_recursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }

        public writefileSync(filename: string, data: string): boolean {
            let result: boolean = false;
            let fd = fs.openSync(filename, 'w');
            if (fd) {
                try {
                    fs.writeFileSync(fd, data);
                    result = true;
                } catch (e) {
                } finally {
                    fs.closeSync(fd);
                }
            }
            return result;
        }

        public writefile(filename: string, data: string, callback: (error: any) => void): void {
            fs.open(filename, 'w', (error: any, fd: any): void => {
                if (!error) {
                    try {
                        fs.writefile(fd, data, (error: any): void => {
                            if (!error) {
                                callback(null);
                            } else {
                                callback(error);
                            }
                        });
                    } finally {
                        fs.close(fd, () => {
                        });
                    }
                } else {
                    callback(error);
                }
            });
        }
    }
}

module.exports = Utility;

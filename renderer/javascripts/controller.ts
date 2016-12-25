/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="../../typings/index.d.ts" />

"use strict";

namespace ControllerModule {

    const {remote} = require('electron');
    const ipc = require('electron').ipcRenderer;
    const Controllers = angular.module('Controllers', []);

    Controllers.controller('Controller', ['$scope',
        function ($scope: any): void {

            let body = document.getElementById('body');

            body.ondragover = (): boolean => {
                return false;
            };

            body.ondragleave = body.ondragend = (): boolean => {
                return false;
            };

            body.ondrop = (e): boolean => {
                e.preventDefault();
                let file:any = e.dataTransfer.files[0];
                ipc.send('open', file.path);
                return false;
            };

            let editor = null;

            $scope.aceLoaded = (_editor: any) => {
                editor = _editor;
                editor.setTheme("ace/theme/github");
                $scope.theme = 'github';
                $scope.mode = 'html';
                $scope.source = '';
                editor.setOptions({
                    showGutter: true,
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                });

                editor.getSession().setUndoManager(new ace.UndoManager());
            };

            $scope.aceChanged = (e: any): void => {
                getStatus((error, status): void => {
                        if (status.filename) {
                            $scope.$evalAsync(// $apply
                                ($scope: any): void => {
                                    $scope.source = status.filename;
                                });
                        }
                    }
                );
            };

            let getStatus = (callback: (error: any, status: any) => void): void => {
                ipc.on('status', (event: any, status: any): void => {
                    callback(null, status);
                });
                ipc.send('status', '');
            };

            ipc.on('theme', (event: any, msg: string): void => {
                $scope.$evalAsync(// $apply
                    ($scope): void => {
                        $scope.theme = msg;
                    });
                editor.setTheme("ace/theme/" + msg);
            });

            ipc.on('mode', (event: any, msg: string): void => {
                $scope.$evalAsync(// $apply
                    ($scope): void => {
                        $scope.mode = msg;
                    });
                editor.getSession().setMode("ace/mode/" + msg);
            });

            ipc.on('open', (event: any, value: string): void => {
                //         let request = remote.require('request');
                //         let url = msg;
                editor.setValue(value);
                //        request(url, function (error, response, body) {
                //            if (!error && response.statusCode == 200) {
                //                editor.setValue(body);
                //            } else {
//
                //                   }
                //               });
            });

            ipc.on('close', (event: any, value: string): void => {
                editor.setValue(value);
            });

            ipc.on('save', (event: any, msg: any): void => {  //ping-pong pattern
                ipc.send('value', editor.getValue());
            });

            ipc.on('undo', (event: any, msg: any): void => {
                editor.undo();
            });

            ipc.on('redo', (event: any, msg: any): void => {
                editor.redo();
            });

        }]);

    Controllers.filter('keyboardShortcut', ($window): any => {
        return (str): void => {
            if (str) {
                let keys = str.split('-');
                let isOSX = /Mac OS X/.test($window.navigator.userAgent);

                let seperator = (!isOSX || keys.length > 2) ? '+' : '';

                let abbreviations = {
                    M: isOSX ? '' : 'Ctrl',
                    A: isOSX ? 'Option' : 'Alt',
                    S: 'Shift'
                };

                return keys.map((key, index) => {
                    let last = index == keys.length - 1;
                    return last ? key : abbreviations[key];
                }).join(seperator);
            }
        };

    });
}
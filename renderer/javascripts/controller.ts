/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="../../typings/index.d.ts" />

"use strict";

namespace ControllerModule {

    const {remote} = require('electron');

    let Controllers = angular.module('Controllers', []);

    Controllers.controller('Controller', ['$scope',
        function ($scope: any): void {

            this.settings = {
                printLayout: true,
                showRuler: true,
                showSpellingSuggestions: true,
                presentationMode: 'edit'
            };

            let editor = null;
            $scope.aceLoaded = function (_editor) {
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

            };

            $scope.aceChanged = function (e) {

            };

            let ipc = require('electron').ipcRenderer;
            ipc.on('theme', (event, msg) => {
                $scope.$evalAsync(// $apply
                    function ($scope) {
                        $scope.theme = msg;
                    });
                editor.setTheme("ace/theme/" + msg);
            });

            ipc.on('mode', (event, msg) => {
                $scope.$evalAsync(// $apply
                    function ($scope) {
                        $scope.mode = msg;
                    });
                editor.getSession().setMode("ace/mode/" + msg);
            });

            ipc.on('open', (event, msg) => {
                let request = remote.require('request');
                let url = msg;

                $scope.$evalAsync(// $apply
                    function ($scope) {
                        $scope.source = msg;
                    });

                request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        editor.setValue(body);
                    } else {

                    }
                });
            });
        }]);


    Controllers.filter('keyboardShortcut', function ($window) {

        return function (str) {
            if (str) {
                let keys = str.split('-');
                let isOSX = /Mac OS X/.test($window.navigator.userAgent);

                let seperator = (!isOSX || keys.length > 2) ? '+' : '';

                let abbreviations = {
                    M: isOSX ? '' : 'Ctrl',
                    A: isOSX ? 'Option' : 'Alt',
                    S: 'Shift'
                };

                return keys.map(function (key, index) {
                    let last = index == keys.length - 1;
                    return last ? key : abbreviations[key];
                }).join(seperator);
            }
        };

    });
}
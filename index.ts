/**!
 Copyright (c) 2016 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

/// <reference path="typings/index.d.ts" />

"use strict";

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
let mainWindow = null;

let ipc = electron.ipcMain;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function openWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL("file://" + __dirname + "/renderer/views/index.html");
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

let template = [
    {
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]
    },
    {
        label: 'File',
        submenu: [
            {label: 'Open', click: () => onFileOpenClicked('http://www.apple.com')}
        ]
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    },
    {
        label: 'View',
        submenu: [
            {label: 'Style',
                submenu: [
                    { label: 'ambiance', click: () => onThemeClicked('ambiance')},
                    { label: 'chaos', click: () => onThemeClicked('chaos')},
                    { label: 'chrome', click: () => onThemeClicked('chrome')},
                    { label: 'clouds', click: () => onThemeClicked('clouds')},
                    { label: 'clouds_midnight', click: () => onThemeClicked('clouds_midnight')},
                    { label: 'cobalt', click: () => onThemeClicked('cobalt')},
                    { label: 'crimson_editor', click: () => onThemeClicked('crimson_editor')},
                    { label: 'dawn', click: () => onThemeClicked('dawn')},
                    { label: 'dreamweaver', click: () => onThemeClicked('dreamweaver')},
                    { label: 'eclipse', click: () => onThemeClicked('eclipse')},
                    { label: 'github', click: () => onThemeClicked('github')},
                    { label: 'idle_fingers', click: () => onThemeClicked('idle_fingers')},
                    { label: 'iplastic', click: () => onThemeClicked('iplastic')},
                    { label: 'katzenmilch', click: () => onThemeClicked('katzenmilch')},
                    { label: 'kr_theme', click: () => onThemeClicked('kr_theme')},
                    { label: 'kuroir', click: () => onThemeClicked('kuroir')},
                    { label: 'merbivore', click: () => onThemeClicked('merbivore')},
                    { label: 'merbivore_soft', click: () =>  onThemeClicked('merbivore_soft')},
                    { label: 'mono_industrial', click: () => onThemeClicked('mono_industrial')},
                    { label: 'monokai', click: () => onThemeClicked('monokai')},
                    { label: 'pastel_on_dark', click: () => onThemeClicked('pastel_on_dark')},
                    { label: 'solarized_dark', click: () => onThemeClicked('solarized_dark')},
                    { label: 'solarized_light', click: () => onThemeClicked('solarized_light')},
                    { label: 'sqlserver', click: () => onThemeClicked('sqlserver')},
                    { label: 'terminal', click: () => onThemeClicked('terminal')},
                    { label: 'textmate', click: () => onThemeClicked('textmate')},
                    { label: 'tomorrow', click: () => onThemeClicked('tomorrow')},
                    { label: 'tomorrow_night', click: () => onThemeClicked('tomorrow_night')},
                    { label: 'tomorrow_night_blue', click: () => onThemeClicked('tomorrow_night_blue')},
                    { label: 'tomorrow_night_bright', click: () => onThemeClicked('tomorrow_night_bright')},
                    { label: 'tomorrow_night_eighties', click: () => onThemeClicked('tomorrow_night_eighties')},
                    { label: 'twilight', click: () => onThemeClicked('twilight')},
                    { label: 'vibrant_ink', click: () => onThemeClicked('vibrant_ink')},
                    { label: 'xcode', click: () => onThemeClicked('xcode')}
                ]
            },
            {"label": 'Language',
                submenu: [
                    { label: 'asciidoc', click: () => onModeClicked('asciidoc')},
                    { label: 'c9search', click: () => onModeClicked('c9search')},
                    { label: 'c_cpp', click: () => onModeClicked('c_cpp')},
                    { label: 'clojure', click: () => onModeClicked('clojure')},
                    { label: 'coffee', click: () => onModeClicked('coffee')},
                    { label: 'coldfusion', click: () => onModeClicked('coldfusion')},
                    { label: 'csharp', click: () => onModeClicked('csharp')},
                    { label: 'css', click: () => onModeClicked('css')},
                    { label: 'curly', click: () => onModeClicked('curly')},
                    { label: 'dart', click: () => onModeClicked('dart')},
                    { label: 'diff', click: () => onModeClicked('diff')},
                    { label: 'django', click: () => onModeClicked('django')},
                    { label: 'dot', click: () => onModeClicked('dot')},
                    { label: 'glsl', click: () => onModeClicked('glsl')},
                    { label: 'golang', click: () => onModeClicked('golang')},
                    { label: 'groovy', click: () => onModeClicked('groovy')},
                    { label: 'haml', click: () => onModeClicked('haml')},
                    { label: 'haxe', click: () => onModeClicked('haxe')},
                    { label: 'html', click: () => onModeClicked('html')},
                    { label: 'jade', click: () => onModeClicked('jade')},
                    { label: 'java', click: () => onModeClicked('java')},
                    { label: 'javascript', click: () => onModeClicked('javascript')},
                    { label: 'json', click: () => onModeClicked('json')},
                    { label: 'jsp', click: () => onModeClicked('jsp')},
                    { label: 'jsx', click: () => onModeClicked('jsx')},
                    { label: 'latex', click: () => onModeClicked('latex')},
                    { label: 'less', click: () => onModeClicked('less')},
                    { label: 'liquid', click: () => onModeClicked('liquid')},
                    { label: 'lisp', click: () => onModeClicked('lisp')},
                    { label: 'livescript', click: () => onModeClicked('livescript')},
                    { label: 'lua', click: () => onModeClicked('lua')},
                    { label: 'luapage', click: () => onModeClicked('luapage')},
                    { label: 'lucene', click: () => onModeClicked('lucene')},
                    { label: 'makefile', click: () => onModeClicked('makefile')},
                    { label: 'markdown', click: () => onModeClicked('markdown')},
                    { label: 'objectivec', click: () => onModeClicked('objectivec')},
                    { label: 'ocaml', click: () => onModeClicked('ocaml')},
                    { label: 'perl', click: () => onModeClicked('perl')},
                    { label: 'pgsql', click: () => onModeClicked('pgsql')},
                    { label: 'php', click: () => onModeClicked('php')},
                    { label: 'powershell', click: () => onModeClicked('powershell')},
                    { label: 'python', click: () => onModeClicked('python')},
                    { label: 'r', click: () => onModeClicked('r')},
                    { label: 'rdoc', click: () => onModeClicked('rdoc')},
                    { label: 'rhtml', click: () => onModeClicked('rhtml')},
                    { label: 'ruby', click: () => onModeClicked('ruby')},
                    { label: 'scad', click: () => onModeClicked('scad')},
                    { label: 'scala', click: () => onModeClicked('scala')},
                    { label: 'scheme', click: () => onModeClicked('scheme')},
                    { label: 'scss', click: () => onModeClicked('scss')},
                    { label: 'sh', click: () => onModeClicked('sh')},
                    { label: 'sql', click: () => onModeClicked('sql')},
                    { label: 'stylus', click: () => onModeClicked('stylus')},
                    { label: 'svg', click: () => onModeClicked('svg')},
                    { label: 'tcl', click: () => onModeClicked('tcl')},
                    { label: 'tex', click: () => onModeClicked('tex')},
                    { label: 'text', click: () => onModeClicked('text')},
                    { label: 'textile', click: () => onModeClicked('textile')},
                    { label: 'tm_snippet', click: () => onModeClicked('tm_snippet')},
                    { label: 'typescript', click: () => onModeClicked('typescript')},
                    { label: 'vbscript', click: () => onModeClicked('vbscript')},
                    { label: 'xml', click: () => onModeClicked('xml')},
                    { label: 'xquery', click: () => onModeClicked('xquery')},
                    { label: 'yaml', click: () => onModeClicked('yaml')}
                ]
            },

            { label: 'Reload', accelerator: 'Command+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
            { label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
        ]
    }
];

let menu = Menu.buildFromTemplate(template);

function onFileOpenClicked(v: string){
    mainWindow.webContents.send('open', v);
}

function onThemeClicked(theme: string){
    mainWindow.webContents.send('theme', theme);
}

function onModeClicked(mode: string){
    mainWindow.webContents.send('mode', mode);
}

app.on('ready', function () {
    Menu.setApplicationMenu(menu);
    openWindow();
});

app.on('gpu-process-crashed', function () {
});

app.on('login', function () {
});

app.on('certificate-error', function () {
});

app.on('web-contents-created', function () {
});

app.on('browser-window-created', function () {
});

app.on('browser-window-focus', function () {
});

app.on('browser-window-blur', function () {
});

app.on('before-quit', function () {
});

app.on('will-quit', function () {
});

app.on('quit', function () {
});

//# sourceMappingURL=index.js.map
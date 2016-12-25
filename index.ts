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
let mainModule = require('./system/main.js');

let ipc = electron.ipcMain;

let template = [
    {
        label: "Application",
        submenu: [
            {label: "About Application", selector: "orderFrontStandardAboutPanel:"},
            {type: "separator"},
            {label: "Quit", accelerator: "Command+Q", click: function () {app.quit();}}
        ]
    },
    {
        label: 'File',
        submenu: [
            {label: 'Open', accelerator: "Command+O", click: () => onFileOpenClicked()},
            {type: "separator"},
            {label: 'Save', accelerator: "Command+S", click: () => onFileSaveClicked()},
            {type: "separator"},
            {label: 'SaveAs...',  click: () => onFileSaveAsClicked()}
        ]
    },
    {
        label: "Edit",
        submenu: [
            {label: "Undo", accelerator: "CmdOrCtrl+Z", click: () => onUndoClicked()},
            {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", click: () => onRedoClicked()},
            {type: "separator"},
            {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
            {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
            {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Style',
                submenu: [
    //                {label: 'ambiance', click: () => onThemeClicked('ambiance')},
    //                {label: 'chaos', click: () => onThemeClicked('chaos')},
                    {label: 'chrome', click: () => onThemeClicked('chrome')},
  //                  {label: 'clouds', click: () => onThemeClicked('clouds')},
  //                  {label: 'clouds_midnight', click: () => onThemeClicked('clouds_midnight')},
                    {label: 'cobalt', click: () => onThemeClicked('cobalt')},
                    {label: 'crimson_editor', click: () => onThemeClicked('crimson_editor')},
                    {label: 'dawn', click: () => onThemeClicked('dawn')},
                    {label: 'dreamweaver', click: () => onThemeClicked('dreamweaver')},
                    {label: 'eclipse', click: () => onThemeClicked('eclipse')},
                    {label: 'github', click: () => onThemeClicked('github')},
  //                  {label: 'idle_fingers', click: () => onThemeClicked('idle_fingers')},
  //                  {label: 'iplastic', click: () => onThemeClicked('iplastic')},
  //                  {label: 'katzenmilch', click: () => onThemeClicked('katzenmilch')},
  //                  {label: 'kr_theme', click: () => onThemeClicked('kr_theme')},
  //                  {label: 'kuroir', click: () => onThemeClicked('kuroir')},
  //                  {label: 'merbivore', click: () => onThemeClicked('merbivore')},
  //                  {label: 'merbivore_soft', click: () => onThemeClicked('merbivore_soft')},
  //                  {label: 'mono_industrial', click: () => onThemeClicked('mono_industrial')},
  //                  {label: 'monokai', click: () => onThemeClicked('monokai')},
           //         {label: 'pastel_on_dark', click: () => onThemeClicked('pastel_on_dark')},
            //        {label: 'solarized_dark', click: () => onThemeClicked('solarized_dark')},
    //                {label: 'solarized_light', click: () => onThemeClicked('solarized_light')},
     //               {label: 'sqlserver', click: () => onThemeClicked('sqlserver')},
                    {label: 'terminal', click: () => onThemeClicked('terminal')},
                    {label: 'textmate', click: () => onThemeClicked('textmate')},
    //                {label: 'tomorrow', click: () => onThemeClicked('tomorrow')},
             //       {label: 'tomorrow_night', click: () => onThemeClicked('tomorrow_night')},
             //       {label: 'tomorrow_night_blue', click: () => onThemeClicked('tomorrow_night_blue')},
             //       {label: 'tomorrow_night_bright', click: () => onThemeClicked('tomorrow_night_bright')},
             //       {label: 'tomorrow_night_eighties', click: () => onThemeClicked('tomorrow_night_eighties')},
                    {label: 'twilight', click: () => onThemeClicked('twilight')},
   //                 {label: 'vibrant_ink', click: () => onThemeClicked('vibrant_ink')},
                    {label: 'xcode', click: () => onThemeClicked('xcode')}
                ]
            },
            {
                "label": 'Language',
                submenu: [
    //                {label: 'asciidoc', click: () => onModeClicked('asciidoc')},
     //               {label: 'c9search', click: () => onModeClicked('c9search')},
                    {label: 'c_cpp', click: () => onModeClicked('c_cpp')},
                    {label: 'clojure', click: () => onModeClicked('clojure')},
    //                {label: 'coffee', click: () => onModeClicked('coffee')},
    //                {label: 'coldfusion', click: () => onModeClicked('coldfusion')},
                    {label: 'csharp', click: () => onModeClicked('csharp')},
                    {label: 'css', click: () => onModeClicked('css')},
    //                {label: 'curly', click: () => onModeClicked('curly')},
                    {label: 'dart', click: () => onModeClicked('dart')},
  //                  {label: 'diff', click: () => onModeClicked('diff')},
                    {label: 'django', click: () => onModeClicked('django')},
    //                {label: 'dot', click: () => onModeClicked('dot')},
    //                {label: 'glsl', click: () => onModeClicked('glsl')},
                    {label: 'golang', click: () => onModeClicked('golang')},
  //                  {label: 'groovy', click: () => onModeClicked('groovy')},
                    {label: 'haml', click: () => onModeClicked('haml')},
                    {label: 'haxe', click: () => onModeClicked('haxe')},
                    {label: 'html', click: () => onModeClicked('html')},
                    {label: 'jade', click: () => onModeClicked('jade')},
                    {label: 'java', click: () => onModeClicked('java')},
                    {label: 'javascript', click: () => onModeClicked('javascript')},
                    {label: 'json', click: () => onModeClicked('json')},
                    {label: 'jsp', click: () => onModeClicked('jsp')},
                    {label: 'jsx', click: () => onModeClicked('jsx')},
//                    {label: 'latex', click: () => onModeClicked('latex')},
                    {label: 'less', click: () => onModeClicked('less')},
//                    {label: 'liquid', click: () => onModeClicked('liquid')},
                    {label: 'lisp', click: () => onModeClicked('lisp')},
//                    {label: 'livescript', click: () => onModeClicked('livescript')},
                    {label: 'lua', click: () => onModeClicked('lua')},
                    {label: 'luapage', click: () => onModeClicked('luapage')},
  //                  {label: 'lucene', click: () => onModeClicked('lucene')},
                    {label: 'makefile', click: () => onModeClicked('makefile')},
                    {label: 'markdown', click: () => onModeClicked('markdown')},
                    {label: 'objectivec', click: () => onModeClicked('objectivec')},
  //                  {label: 'ocaml', click: () => onModeClicked('ocaml')},
                    {label: 'perl', click: () => onModeClicked('perl')},
  //                  {label: 'pgsql', click: () => onModeClicked('pgsql')},
  //                  {label: 'php', click: () => onModeClicked('php')},
  //                  {label: 'powershell', click: () => onModeClicked('powershell')},
                    {label: 'python', click: () => onModeClicked('python')},
   //                 {label: 'r', click: () => onModeClicked('r')},
   //                 {label: 'rdoc', click: () => onModeClicked('rdoc')},
   //                 {label: 'rhtml', click: () => onModeClicked('rhtml')},
   //                 {label: 'ruby', click: () => onModeClicked('ruby')},
     //               {label: 'scad', click: () => onModeClicked('scad')},
     //               {label: 'scala', click: () => onModeClicked('scala')},
                    {label: 'scheme', click: () => onModeClicked('scheme')},
                    {label: 'scss', click: () => onModeClicked('scss')},
                    {label: 'sh', click: () => onModeClicked('sh')},
    //                {label: 'sql', click: () => onModeClicked('sql')},
    //                {label: 'stylus', click: () => onModeClicked('stylus')},
                    {label: 'svg', click: () => onModeClicked('svg')},
   //                 {label: 'tcl', click: () => onModeClicked('tcl')},
   //                 {label: 'tex', click: () => onModeClicked('tex')},
                    {label: 'text', click: () => onModeClicked('text')},
 //                   {label: 'textile', click: () => onModeClicked('textile')},
 //                   {label: 'tm_snippet', click: () => onModeClicked('tm_snippet')},
                    {label: 'typescript', click: () => onModeClicked('typescript')},
  //                  {label: 'vbscript', click: () => onModeClicked('vbscript')},
                    {label: 'xml', click: () => onModeClicked('xml')},
                    {label: 'xquery', click: () => onModeClicked('xquery')}
  //                  {label: 'yaml', click: () => onModeClicked('yaml')}
                ]
            },
            {
                label: 'Reload', accelerator: 'Command+R', click: function () {
                BrowserWindow.getFocusedWindow().reloadIgnoringCache();
            }
            },
            {
                label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: function () {
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
            }
        ]
    }
];

let menu = Menu.buildFromTemplate(template);

let main = new mainModule.Main();

function openWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL("file://" + __dirname + "/renderer/views/index.html");
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function onFileOpenClicked():void {
    mainWindow.webContents.send('open', main.open());
}

function onFileSaveClicked():void {
    mainWindow.webContents.send('save', '');
    ipc.on('value', (event:any, data:string) => {
        main.save(data);
    });
}

function onFileSaveAsClicked():void {
    mainWindow.webContents.send('save', '');
    ipc.on('value', (event:any, data:string) => {
        main.save_as(data);
    });
}

function onUndoClicked():void {
    mainWindow.webContents.send('undo', '');
}

function onRedoClicked():void {
    mainWindow.webContents.send('redo', '');
}

function onThemeClicked(theme: string):void {
    mainWindow.webContents.send('theme', theme);
}

function onModeClicked(mode: string):void {
    mainWindow.webContents.send('mode', mode);
}






app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    Menu.setApplicationMenu(menu);
    openWindow();
});

app.on('gpu-process-crashed',  () => {
});

app.on('login', () =>  {
});

app.on('certificate-error', () =>  {
});

app.on('web-contents-created', () =>  {
});

app.on('browser-window-created', () =>  {
});

app.on('browser-window-focus', () =>  {
});

app.on('browser-window-blur', () =>  {
});

app.on('before-quit', () =>  {
});

app.on('will-quit', () =>  {
});

app.on('quit', () =>  {
});

//# sourceMappingURL=index.js.map
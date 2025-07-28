// ace配置，使用动态加载来避免第一次加载开销
import ace from "ace-builds";
 
// 导入不同的主题模块，并设置对应 URL
import themeGithubUrl from "ace-builds/src-noconflict/theme-github?url";
ace.config.setModuleUrl("ace/theme/github", themeGithubUrl);
 
import themeChromeUrl from "ace-builds/src-noconflict/theme-chrome?url";
ace.config.setModuleUrl("ace/theme/chrome", themeChromeUrl);
 
import themeMonokaiUrl from "ace-builds/src-noconflict/theme-monokai?url";
ace.config.setModuleUrl("ace/theme/monokai", themeMonokaiUrl);
 
// 导入不同语言的语法模式模块，并设置对应 URL (所有支持的主题和模式：node_modules/ace-builds/src-noconflict)
import modeJsonUrl from "ace-builds/src-noconflict/mode-json?url";
ace.config.setModuleUrl("ace/mode/json", modeJsonUrl);
 
import modeJavascriptUrl from "ace-builds/src-noconflict/mode-javascript?url";
ace.config.setModuleUrl("ace/mode/javascript", modeJavascriptUrl);
 
import modeHtmlUrl from "ace-builds/src-noconflict/mode-html?url";
ace.config.setModuleUrl("ace/mode/html", modeHtmlUrl);

import modeCssUrl from "ace-builds/src-noconflict/mode-css?url";
ace.config.setModuleUrl("ace/mode/css", modeCssUrl);
 
import modePythonUrl from "ace-builds/src-noconflict/mode-python?url";
ace.config.setModuleUrl("ace/mode/yaml", modePythonUrl);
 
// 用于完成语法检查、代码提示、自动补全等代码编辑功能，必须注册模块 ace/mode/lang _ worker，并设置选项 useWorker: true
import workerBaseUrl from "ace-builds/src-noconflict/worker-base?url";
ace.config.setModuleUrl("ace/mode/base", workerBaseUrl);
 
import workerJsonUrl from "ace-builds/src-noconflict/worker-json?url"; // for vite
ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl);
 
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";
ace.config.setModuleUrl("ace/mode/javascript_worker", workerJavascriptUrl);
 
import workerHtmlUrl from "ace-builds/src-noconflict/worker-html?url";
ace.config.setModuleUrl("ace/mode/html_worker", workerHtmlUrl);

import workerCssUrl from "ace-builds/src-noconflict/worker-css?url";
ace.config.setModuleUrl("ace/mode/css_worker", workerCssUrl);
 
// 导入不同语言的代码片段，提供代码自动补全和代码块功能
import snippetsJsonUrl from "ace-builds/src-noconflict/snippets/json?url";
ace.config.setModuleUrl("ace/snippets/json", snippetsJsonUrl);
 
import snippetsJsUrl from "ace-builds/src-noconflict/snippets/javascript?url";
ace.config.setModuleUrl("ace/snippets/javascript", snippetsJsUrl);
 
import snippetsHtmlUrl from "ace-builds/src-noconflict/snippets/html?url";
ace.config.setModuleUrl("ace/snippets/html", snippetsHtmlUrl);

import snippetsCssUrl from "ace-builds/src-noconflict/snippets/css?url";
ace.config.setModuleUrl("ace/snippets/css", snippetsCssUrl);
 
import snippetsPyhontUrl from "ace-builds/src-noconflict/snippets/python?url";
ace.config.setModuleUrl("ace/snippets/javascript", snippetsPyhontUrl);
 
// 启用自动补全等高级编辑支持，
import extSearchboxUrl from "ace-builds/src-noconflict/ext-searchbox?url";
ace.config.setModuleUrl("ace/ext/searchbox", extSearchboxUrl);
 
// 启用自动补全等高级编辑支持
import "ace-builds/src-noconflict/ext-language_tools";
ace.require("ace/ext/language_tools");
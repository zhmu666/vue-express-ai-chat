# AI Chat

一个基于 Vue3 + TypeScript + Express 的前后端分离 AI 对话项目，支持调用阿里云百炼（DashScope / 百炼兼容接口）进行流式聊天输出。

## 项目简介

本项目实现了一个基础的 AI 对话系统，前端负责消息展示与交互，后端负责安全地转发大模型 API 请求。项目采用前后端分离结构，支持流式响应、错误处理和环境变量管理，适合作为大模型应用开发的入门实践项目。

## 功能特性

- 支持用户输入并发起对话
- 支持 AI 流式输出回复内容
- 支持消息状态展示（如 streaming / done / error）
- 支持清空聊天记录
- 后端代理大模型接口，避免前端暴露 API Key
- 使用环境变量管理敏感配置
- 使用 Vite 代理解决本地开发联调问题

## 技术栈

### 前端
- Vue 3
- TypeScript
- Pinia
- Vite

### 后端
- Node.js
- Express
- dotenv
- cors

### 模型接口
- 阿里云百炼（DashScope OpenAI Compatible API）
- 默认模型：`qwen-plus`

## 项目结构

```bash
ai-chat/
├─ backend/
│  ├─ .env.example
│  ├─ index.js
│  └─ package.json
├─ public/
├─ src/
│  ├─ api/
│  │  └─ chat.ts
│  ├─ stores/
│  │  └─ chat.ts
│  ├─ types/
│  │  └─ chat.ts
│  ├─ views/
│  │  └─ Chat.vue
│  ├─ App.vue
│  ├─ main.ts
│  └─ style.css
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
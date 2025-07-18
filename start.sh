#!/bin/bash

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "Node.js未安装，请先安装Node.js"
    exit 1
fi

# 检查是否需要安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 启动开发服务器
echo "正在启动项目..."
npm run dev -- --host 
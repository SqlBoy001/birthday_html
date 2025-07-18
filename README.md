# 生日祝福网页

这是一个使用React和现代Web技术构建的交互式生日祝福网页。通过精心设计的动画和互动效果，为特别的人创造一个难忘的生日体验。

## 功能特点

- 🎉 优雅的开场动画
- 📸 3D照片墙和相册展示
- 🎂 动态生日祝福
- 💝 回忆播放功能
- 💌 动画信件效果
- 🎁 惊喜抽奖环节

## 技术栈

- React + TypeScript
- TailwindCSS
- Framer Motion
- Three.js
- Howler.js
- Canvas Confetti

## 开始使用

1. 克隆项目
```bash
git clone <repository-url>
cd birthday_html
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 自定义内容

### 照片和音乐

1. 将照片放在 `public/images/` 目录下
2. 将音乐文件放在 `public/music/` 目录下
3. 在相应的组件中更新文件路径

### 文字内容

1. 修改 `src/components/WelcomeSection.tsx` 中的欢迎语
2. 修改 `src/components/WishesSection.tsx` 中的祝福语
3. 修改 `src/components/LetterSection.tsx` 中的信件内容
4. 修改 `src/components/SurpriseSection.tsx` 中的惊喜内容

## 性能优化

- 图片和音频资源预加载
- 组件懒加载
- 动画性能优化
- 移动端适配

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

1. 确保所有媒体资源都已正确放置在public目录下
2. 在移动设备上测试所有功能
3. 检查WebGL支持情况
4. 注意音频自动播放策略

## 贡献

欢迎提交Issue和Pull Request！

## 许可

MIT License

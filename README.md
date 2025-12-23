# Belle Pro - Design System

Hệ thống thiết kế và thư viện component cho Belle Pro Web Application.

🌐 **Live Demo**: [https://quan-tbs.github.io/pro-web-new-design-system/](https://quan-tbs.github.io/pro-web-new-design-system/)

## 🎨 Design System Components

Design system bao gồm các component sau:

### Atoms (Nguyên tử)

- **Button**: Các biến thể button với nhiều appearance và size
- **Badge**: Labels và status indicators
- **Input**: Text input với validation
- **Checkbox**: Checkbox component
- **Radio**: Radio button component
- **Switch**: Toggle switch
- **Select**: Dropdown select component

### Molecules (Phân tử)

- **Card**: Container component với shadow effects
- **Text**: Typography component với heading và các variants

### Styling Features

- **Border Radius**: Component có border-radius 12px (đã được cập nhật từ 6px)
- **Shadow System**: Các mức shadow từ sm đến lg
- **Dark Mode Support**: Hỗ trợ theme tối
- **Responsive**: Tương thích đa thiết bị

## 📋 Tổng quan

Đây là một dự án Storybook được xây dựng với:

- **Storybook Version**: 6.5.16
- **Framework**: React với TypeScript
- **Builder**: Webpack 5
- **Meta Framework**: Create React App (CRA) 4.0.3
- **Package Manager**: npm 10.9.2

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js (phiên bản tương thích với npm 10.9.2)
- npm hoặc yarn

### Cài đặt

```bash
# Cài đặt dependencies
npm install
```

### Chạy Storybook ở chế độ Development

```bash
# Khởi động Storybook development server
npm run storybook
```

Storybook sẽ chạy tại `http://localhost:6006` (hoặc port khác nếu 6006 đã được sử dụng).

### Build Storybook cho Production

```bash
# Build Storybook static files
npm run build-storybook
```

Các file build sẽ được tạo trong thư mục `storybook-static` (hoặc thư mục được cấu hình).

## 📁 Cấu trúc dự án

```
pro-web-new-design/
├── .storybook/          # Cấu hình Storybook
│   ├── main.js          # Cấu hình chính
│   └── preview.js       # Cấu hình preview
├── src/                 # Source code và stories
│   └── **/*.stories.@(js|jsx|ts|tsx)  # Story files
├── public/              # Static files
├── index.html           # Entry point cho Storybook manager
├── iframe.html          # Entry point cho Storybook preview
└── package.json         # Dependencies và scripts
```

## 🎨 Addons được sử dụng

Dự án này sử dụng các Storybook addons sau:

- **@storybook/addon-links**: Liên kết giữa các stories
- **@storybook/addon-essentials**: Bộ addons cần thiết bao gồm:
  - Controls
  - Actions
  - Viewport
  - Backgrounds
  - Docs
- **@storybook/addon-interactions**: Testing interactions

## 📝 Viết Stories

Stories được tìm kiếm trong thư mục `src/` với pattern:

```
**/*.stories.@(js|jsx|ts|tsx)
```

### Ví dụ Story

```typescript
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Button',
  variant: 'primary',
}
```

## 🛠️ Cấu hình

### Custom Webpack

Dự án có cấu hình Webpack tùy chỉnh (`hasCustomWebpack: true`). Cấu hình này có thể được tìm thấy trong file `.storybook/main.js`.

### Static Directories

Dự án có cấu hình static directories (`hasStaticDirs: true`) để phục vụ các file tĩnh.

## 📦 Build Output

Khi build Storybook, các file sau sẽ được tạo:

- `index.html`: Entry point chính cho Storybook manager
- `iframe.html`: Entry point cho preview iframe
- `main.manager.bundle.js`: Bundle cho Storybook manager
- `main.iframe.bundle.js`: Bundle cho Storybook preview
- `manifest.json`: Web app manifest
- `project.json`: Thông tin metadata của project

## 🔧 Scripts

Các scripts có sẵn trong `package.json`:

```json
{
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

## 🌐 Deployment

### Live Site

Storybook đã được deploy và có thể truy cập tại:

**🔗 [https://quan-tbs.github.io/pro-web-new-design-system/](https://quan-tbs.github.io/pro-web-new-design-system/)**

### Static Hosting

Storybook có thể được deploy như một static site. Sau khi build:

```bash
npm run build-storybook
```

Upload thư mục `storybook-static` lên hosting service như:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### GitHub Pages

```bash
# Build và deploy lên GitHub Pages
npm run build-storybook
npx gh-pages -d storybook-static
```

## 🐛 Troubleshooting

### Storybook không khởi động

1. Kiểm tra Node.js version
2. Xóa `node_modules` và `package-lock.json`, sau đó cài đặt lại:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Stories không hiển thị

1. Kiểm tra file stories có đúng pattern `*.stories.@(js|jsx|ts|tsx)`
2. Kiểm tra file stories có trong thư mục `src/`
3. Kiểm tra console để xem lỗi

### Build lỗi

1. Kiểm tra TypeScript errors
2. Kiểm tra Webpack configuration
3. Xem log chi tiết với `--debug` flag

## 📚 Tài liệu tham khảo

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Addons](https://storybook.js.org/addons)

## 👥 Đóng góp

Khi thêm component mới:

1. Tạo component trong thư mục `src/components/`
2. Tạo story file tương ứng với pattern `*.stories.tsx`
3. Đảm bảo component có TypeScript types đầy đủ
4. Thêm documentation và examples trong story

## 📄 License

[Thêm thông tin license nếu có]

## 📞 Liên hệ

[Thêm thông tin liên hệ nếu cần]

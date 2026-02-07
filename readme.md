# 🏬 Web 3D Cửa Hàng Việt Nam (Express + TypeScript + EJS)

## 📌 Giới thiệu
Đây là dự án **website 3D tương tác** mô phỏng một **cửa hàng Việt Nam ngoài đời thực**, cho phép người dùng:
- Tham quan cửa hàng từ **bên ngoài → bên trong**
- **Click chuột để di chuyển** giữa các khu vực (camera move)
- Tương tác với **lễ tân / quầy dịch vụ**
- Mở **popup form 2D** để đăng ký, điền thông tin, tư vấn dịch vụ

Dự án hướng tới trải nghiệm mới mẻ, trực quan nhưng vẫn **thực tế – dễ triển khai – dễ mở rộng**.

---

## 🎯 Mục tiêu
- Kết hợp **3D (trải nghiệm thị giác)** và **UI 2D (nghiệp vụ)**
- Không biến website thành game
- Chạy mượt trên trình duyệt phổ thông
- Phù hợp làm **portfolio** hoặc **sản phẩm thương mại**

---

## 🧠 Ý tưởng & Luồng trải nghiệm

1. Người dùng truy cập website
2. Thấy **mặt tiền cửa hàng 3D**
3. Click **cửa chính** → camera di chuyển vào bên trong
4. Click **lễ tân / quầy dịch vụ**
5. Popup **form đăng ký (HTML/UI 2D)** xuất hiện
6. Gửi dữ liệu về backend Express

> ⚠️ Form và nghiệp vụ không làm bằng 3D để đảm bảo UX và hiệu năng.

---

## 🖱️ Cơ chế tương tác
- Điều khiển hoàn toàn bằng **chuột**
- Click vào:
  - Cửa ra vào
  - Hotspot trên sàn
  - Quầy lễ tân
- Camera di chuyển mượt (smooth animation)

Không sử dụng:
- Nhân vật đi bộ
- Điều khiển WASD
- Cơ chế game phức tạp

---

## 🧱 Công nghệ sử dụng

### Backend
- Node.js
- Express
- TypeScript
- EJS (Server Side Rendering)

### Frontend
- Three.js (WebGL)
- Vanilla JavaScript (client-side)
- HTML / CSS

### UI / Form
- Popup HTML/CSS
- Validation phía server

---

## 🗂️ Cấu trúc thư mục đề xuất

```
src/
├── app.ts
├── routes/
│   ├── index.ts
│   └── api.ts
├── controllers/
│   └── register.controller.ts
├── views/
│   ├── layout.ejs
│   ├── index.ejs
│   └── partials/
│       └── popup-form.ejs
├── public/
│   ├── js/
│   │   ├── scene.js
│   │   ├── camera.js
│   │   └── interaction.js
│   ├── css/
│   └── assets/
│       └── models/
└── types/
```

---

## 🗺️ Cấu trúc Scene 3D
- Scene ngoài: mặt tiền cửa hàng
- Scene trong: khu lễ tân
- Đối tượng tương tác:
  - Cửa chính
  - Quầy lễ tân
  - Banner / bảng thông tin

---

## 🚀 Lộ trình phát triển

### Giai đoạn 1 – MVP
- Scene mặt tiền
- Click cửa → vào trong
- Click lễ tân → popup form

### Giai đoạn 2
- Thêm khu vực dịch vụ / sản phẩm
- Animation hover
- Loading screen

### Giai đoạn 3
- Lưu dữ liệu DB
- Gửi email / CRM
- NPC / Chat AI tư vấn

---

## 💡 Ứng dụng thực tế
- Cửa hàng bán lẻ
- Showroom (điện thoại, nội thất, xe)
- Trung tâm tư vấn dịch vụ
- Bất động sản
- Website tuyển sinh / đăng ký tư vấn

---

## ⭐ Điểm nổi bật
- Trải nghiệm mới lạ, khác biệt so với web truyền thống
- Phù hợp demo cho khách hàng
- Có thể đóng gói thành sản phẩm thương mại
- Dễ mở rộng sang React / SPA sau này

---

## ⚠️ Ghi chú kỹ thuật
- Model 3D nên dùng `.glb`, dung lượng nhỏ
- Tách code Three.js ra khỏi EJS
- Ưu tiên hiệu năng và UX hơn hiệu ứng phức tạp

---

## 👤 Tác giả
- Developer: Your Name
- Stack: Express + TypeScript + EJS + Three.js

---

📩 Nếu bạn là nhà tuyển dụng hoặc đối tác và muốn trao đổi thêm, vui lòng liên hệ.


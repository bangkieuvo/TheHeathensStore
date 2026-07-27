# ĐẶC TẢ CHỨC NĂNG WEBSITE E-COMMERCE
**Phiên bản:** 1.0  
**Ngày:** 24/06/2026

---

## I. TỔNG QUAN
- **Mục tiêu:** Xây dựng website bán hàng đa kênh, hiện đại, thân thiện với người dùng và tối ưu vận hành.
- **Luồng người dùng:** Khách hàng (mua sắm) và Quản trị viên (Admin).

---

## II. CHỨC NĂNG DÀNH CHO KHÁCH HÀNG

### 1. Trải nghiệm mua sắm cốt lõi
- **Trang chủ:**
  - Banner quảng cáo (hỗ trợ slide/carousel)
  - Sản phẩm nổi bật (bán chạy, mới nhất, giảm giá)
  - Danh mục chính
  - Mã giảm giá nổi bật

- **Danh mục & Lọc sản phẩm:**
  - Lọc theo:
    - Khoảng giá
    - Thương hiệu
    - Loại sản phẩm
    - Kích thước, màu sắc
    - Xếp hạng (đánh giá sao)
  - Sắp xếp theo: giá (tăng/giảm), tên A-Z, mới nhất, bán chạy
  - Phân trang

- **Trang chi tiết sản phẩm:**
  - Thư viện ảnh/video sản phẩm (zoom, 360° nếu có)
  - Mô tả chi tiết, thông số kỹ thuật
  - Giá, khuyến mãi, số lượng tồn kho hiển thị
  - Đánh giá & bình luận (kèm ảnh/video)
  - Nút: "Thêm vào giỏ", "Mua ngay", "Thêm vào yêu thích"
  - Sản phẩm liên quan / gợi ý kèm theo

- **Tìm kiếm cơ bản:**
  - Tìm theo từ khóa
  - Gợi ý sản phẩm khi nhập

- **Giỏ hàng:**
  - Thêm, sửa số lượng, xóa sản phẩm
  - Tự động cập nhật tổng tiền
  - Lưu giỏ hàng (cookie khi chưa đăng nhập, đồng bộ khi đăng nhập)
  - Áp dụng mã giảm giá

- **Thanh toán (Checkout):**
  - Nhập địa chỉ giao hàng (có thể lưu danh sách địa chỉ)
  - Chọn phương thức vận chuyển (tự động tính phí ship)
  - Chọn phương thức thanh toán:
    - COD (thanh toán khi nhận hàng)
    - Chuyển khoản ngân hàng
    - Thẻ tín dụng / ghi nợ
    - Ví điện tử (Momo, ZaloPay, VNPay,...)
  - Xác nhận đặt hàng, nhận mã đơn hàng

### 2. Tài khoản và quản lý cá nhân
- **Đăng ký / Đăng nhập:**
  - Đăng ký qua email hoặc số điện thoại
  - Xác thực OTP (email hoặc SMS)
  - Đăng nhập bằng tài khoản mạng xã hội (Google, Facebook, Apple – tuỳ chọn)
  - Quên mật khẩu – gửi link reset qua email
  - Đăng xuất

- **Quản lý tài khoản:**
  - Thông tin cá nhân: tên, email, số điện thoại, địa chỉ
  - Đổi mật khẩu
  - Lịch sử đơn hàng (xem chi tiết, trạng thái, hủy đơn)
  - Mua lại từ đơn hàng cũ
  - Danh sách yêu thích (Wishlist)
  - Quản lý địa chỉ giao hàng (nhiều địa chỉ)
  - Theo dõi đơn hàng real-time (nếu tích hợp API vận chuyển)
  - Đánh giá sản phẩm (có ảnh/video)

### 3. Nội dung & tiện ích bổ sung
- **Trang tĩnh:** Giới thiệu, Liên hệ, FAQ, Chính sách đổi trả, Chính sách bảo mật, Điều khoản sử dụng
- **Blog/Tin tức:** Chia sẻ thông tin hữu ích, SEO nội dung
- **Responsive:** Giao diện tương thích mọi thiết bị (mobile, tablet, desktop)

---

## III. CHỨC NĂNG DÀNH CHO QUẢN TRỊ VIÊN (ADMIN)

### 1. Quản lý hàng hóa & kho
- **Sản phẩm:**
  - Thêm, sửa, xóa, xem chi tiết (CRUD)
  - Import/Export dữ liệu sản phẩm (Excel/CSV)
  - Quản lý biến thể (màu sắc, kích thước, dung lượng,...)
  - Quản lý ảnh/video
- **Danh mục:**
  - Thêm, sửa, xóa danh mục cấp 1, cấp 2 (sub-category)
- **Tồn kho:**
  - Nhập kho, xuất kho, điều chỉnh số lượng
  - Cảnh báo tồn kho thấp (tự động)
  - Đồng bộ tồn kho real-time với các kênh bán hàng khác (nếu tích hợp)
- **Thương hiệu / Nhà cung cấp** (tuỳ chọn)

### 2. Quản lý đơn hàng
- Danh sách đơn hàng (lọc theo trạng thái, khoảng thời gian)
- Trạng thái đơn hàng: Chờ xác nhận → Đang chuẩn bị → Đang giao → Hoàn thành / Đã hủy
- Cập nhật trạng thái, ghi chú nội bộ
- In hóa đơn / Xuất PDF
- Hủy đơn, hoàn tiền (nếu có)
- Gửi thông báo cho khách hàng khi thay đổi trạng thái

### 3. Quản lý khách hàng
- Danh sách khách hàng (thông tin, lịch sử mua, số đơn, tổng chi)
- Phân nhóm khách hàng (VIP, mới, tiềm năng)
- Gửi email/tin nhắn hàng loạt đến nhóm khách hàng

### 4. Quản lý khuyến mãi & giảm giá
- Mã giảm giá: theo % hoặc số tiền cố định
  - Áp dụng cho toàn bộ đơn hàng hoặc sản phẩm/danh mục cụ thể
  - Giới hạn số lần sử dụng, thời gian hiệu lực
  - Giới hạn giá trị đơn hàng tối thiểu
- **Flash Sale:** Giảm giá theo khung giờ, hiển thị số lượng còn lại
- **Tích điểm / Thẻ thành viên:** Cấp bậc, đổi điểm, ưu đãi (nếu có)

### 5. Quản lý nội dung (CMS)
- Banner: thêm, sửa, xóa, đặt thời gian hiển thị
- Bài viết blog: CRUD, phân loại, tag
- Duyệt đánh giá / bình luận (duyệt/ẩn/xóa) để chống spam

### 6. Báo cáo & thống kê
- **Dashboard:**
  - Tổng doanh thu, số đơn hàng, số khách hàng mới
  - Sản phẩm bán chạy nhất
  - Biểu đồ doanh thu theo ngày/tuần/tháng/năm
- **Báo cáo nâng cao:**
  - Hành vi khách hàng (lượng truy cập, tỷ lệ thoát, giỏ hàng bỏ quên)
  - Báo cáo tồn kho, nhập xuất
  - Hiệu quả chiến dịch khuyến mãi

### 7. Phân quyền & bảo mật
- **RBAC (Phân quyền nhân viên):**
  - Siêu Admin (toàn quyền)
  - Quản lý kho (xem/sửa tồn kho, nhập xuất)
  - CSKH (xem đơn hàng, cập nhật trạng thái, xem khách hàng)
  - Biên tập viên (quản lý nội dung: blog, banner)
- **Bảo mật:**
  - Xác thực 2 lớp (2FA) cho tài khoản admin
  - Ghi log hoạt động (audit log)
  - SSL, mã hóa dữ liệu nhạy cảm

### 8. Cấu hình hệ thống
- Thông tin cửa hàng (tên, email, địa chỉ, số điện thoại)
- Cấu hình vận chuyển: bảng giá theo khu vực, đơn vị vận chuyển
- Cấu hình thanh toán: bật/tắt cổng, phí giao dịch
- Mẫu email (gửi xác nhận đơn hàng, quên mật khẩu, thông báo khuyến mãi,...)

---

## IV. TÍNH NĂNG NÂNG CAO (PHASE 2+)

### 1. Trải nghiệm khách hàng
- **Tìm kiếm thông minh:**
  - Autocomplete gợi ý sản phẩm
  - Sửa lỗi chính tả (fuzzy search)
  - Tìm kiếm bằng giọng nói (voice search)
  - Gợi ý sản phẩm dựa trên lịch sử tìm kiếm
- **Cá nhân hóa:** Gợi ý sản phẩm dựa trên hành vi mua, xem, phân nhóm khách hàng (AI/ML)
- **Chatbot / Trợ lý ảo:** Hỗ trợ 24/7, tư vấn sản phẩm, hỏi đáp tự động
- **So sánh sản phẩm:** Chọn 2–4 sản phẩm để so sánh thông số
- **Xem sản phẩm 3D/AR:** Thử ảo (nội thất, quần áo, mỹ phẩm,...) – nếu có ngân sách
- **Đa ngôn ngữ:** Tiếng Việt, tiếng Anh (hoặc thêm tùy chọn)
- **Đa tiền tệ:** Hiển thị giá theo VND/USD (theo vị trí địa lý hoặc lựa chọn)
- **Đăng nhập Social:** Google, Facebook, Apple

### 2. Marketing & bán hàng
- **Flash sale, Deal hấp dẫn:** Đếm ngược thời gian, hiển thị số lượng còn
- **Khách hàng thân thiết:** Tích điểm, cấp bậc, ưu đãi dành riêng
- **Email Marketing tự động:**
  - Nhắc giỏ hàng bỏ quên (sau 1h, 24h)
  - Chào mừng thành viên mới
  - Khuyến mãi sinh nhật
  - Mời đánh giá sau khi mua
  - Remarketing theo sở thích
- **Tích hợp đa kênh:** Facebook Shop, TikTok Shop, Shopee, Zalo – đồng bộ sản phẩm, đơn hàng, tồn kho
- **Đặt hàng định kỳ (Subscription):** Cho phép khách hàng đăng ký nhận hàng theo chu kỳ
- **Notification đa kênh:** Web Push, SMS, Email (theo sự kiện: đặt hàng, vận chuyển, đánh giá)
- **Gamification:** Vòng quay may mắn, minigame tích điểm

### 3. Thanh toán & vận chuyển
- **Mở rộng cổng thanh toán:**
  - Ví điện tử: Momo, ZaloPay, VNPay, PayPal
  - Thẻ tín dụng quốc tế (Visa, Mastercard) qua Stripe / OnePay
  - Mua trước trả sau (BNPL) – Fundiin, Home Credit (nếu có)
- **Tích hợp API vận chuyển:**
  - Lấy bảng giá, thời gian giao hàng từ GHTK, Viettel Post, GHN
  - Cho phép khách hàng chọn đơn vị vận chuyển
  - Theo dõi đơn hàng real-time
  - Tự động tính phí ship theo cân nặng/khu vực

### 4. Vận hành & quản trị nâng cao
- **Dashboard phân tích chuyên sâu:**
  - Funnel chuyển đổi
  - Báo cáo hiệu quả kênh marketing
  - Dự báo doanh số, tồn kho
- **A/B Testing:** Thử nghiệm giao diện, giá, banner
- **Tích hợp CRM/ERP:** Đồng bộ dữ liệu với hệ thống quản lý nội bộ
- **Multi-vendor (Marketplace):** Cho phép nhiều người bán đăng ký, quản lý sản phẩm, đơn hàng, doanh thu riêng

### 5. Kỹ thuật & bảo mật nâng cao
- **SEO:** Sitemap tự động, Schema.org (structured data), URL thân thiện, tối ưu meta tag
- **PWA (Progressive Web App):** Cài đặt trên điện thoại, trải nghiệm như ứng dụng native
- **Tối ưu tốc độ:** CDN, Redis/Varnish caching, nén ảnh, lazy-loading
- **Bảo mật:**
  - Đạt chuẩn PCI DSS (nếu lưu thẻ)
  - Phát hiện gian lận thanh toán
  - Mở API cho bên thứ ba (mobile app, đối tác)

---

## V. LỘ TRÌNH PHÁT TRIỂN GỢI Ý

| Phase | Nội dung | Thời gian dự kiến |
|-------|----------|-------------------|
| **Phase 1 – MVP** | Tất cả chức năng cơ bản (II + III.1 → III.4). Chỉ hỗ trợ COD và chuyển khoản. Giao diện responsive. | 3–4 tháng |
| **Phase 2 – Nâng cao trải nghiệm** | Bổ sung Wishlist, đánh giá ảnh/video, mã giảm giá, flash sale, tìm kiếm autocomplete, Blog. Tích hợp thêm Momo/VNPay. Quản lý đánh giá admin. | 2–3 tháng |
| **Phase 3 – Cá nhân hóa & tự động hóa** | Chatbot, gợi ý AI, email marketing tự động, web notification, đăng nhập social, API vận chuyển, dashboard nâng cao. | 2–3 tháng |
| **Phase 4 – Mở rộng & hoàn thiện** | Đa ngôn ngữ/đa tiền tệ, tích hợp đa kênh, PWA, SEO nâng cao, phân quyền chi tiết, bảo mật nâng cao, multi-vendor. | 2–3 tháng |

---

**--- HẾT ---**
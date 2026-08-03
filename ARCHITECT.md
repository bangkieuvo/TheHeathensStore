# ĐẶC TẢ CHỨC NĂNG 

## I. TỔNG QUAN

### 1. Mục tiêu sản phẩm

The Heathens Store là website thương mại điện tử chuyên bán áo bóng đá. Mục tiêu của phiên bản hiện tại là cung cấp một luồng mua hàng hoàn chỉnh, dễ sử dụng trên desktop và thiết bị di động: khám phá sản phẩm → thêm vào giỏ → chọn thông tin giao hàng → đặt đơn COD → theo dõi và quản lý đơn trong tài khoản.

### 2. Phạm vi hiện tại

- Danh mục sản phẩm công khai, tập trung vào áo đấu theo câu lạc bộ, giải đấu, mùa giải và loại áo.
- Khách chưa đăng nhập có thể xem, tìm kiếm và lọc sản phẩm.
- Giỏ hàng, danh sách yêu thích, checkout, đơn hàng và thông tin cá nhân chỉ dành cho người dùng đã đăng nhập.
- Giá đang hiển thị bằng USD; phương thức thanh toán hiện tại là COD.
- Phí vận chuyển: Standard là $5, miễn phí khi giá trị sản phẩm từ $100; Express là $15.
- Phần II mô tả và đánh dấu trạng thái chức năng dành cho khách hàng. Phần III–V là phạm vi quản trị và định hướng mở rộng, không đồng nghĩa với việc đã được triển khai.

### 3. Nhóm người dùng

| Nhóm | Quyền chính trong phạm vi hiện tại |
|---|---|
| Khách chưa đăng nhập | Xem trang chủ, danh mục, chi tiết sản phẩm, tìm kiếm và đọc nội dung công khai. |
| Khách hàng đã đăng nhập | Có toàn bộ quyền của khách, đồng thời quản lý giỏ hàng, yêu thích, checkout, đơn hàng, hồ sơ và địa chỉ giao hàng. |
| Admin/Staff | Đã có mô hình vai trò ở backend; giao diện và nghiệp vụ quản trị được mô tả riêng tại phần III. |

### 4. Kiến trúc và công nghệ

- **Frontend:** React 19, TypeScript, Vite, React Router, Axios và Bootstrap; tổ chức theo page, component, hook, service và type.
- **Backend:** Java 17, Spring Boot 3, Spring Web, Spring Security, Spring Data JPA và Bean Validation; chỉ cung cấp REST API, không còn Thymeleaf hoặc controller trả view.
- **Cơ sở dữ liệu:** MySQL; dữ liệu nghiệp vụ chính gồm user, user info, product, team, league, season, cart, favorite, shipping address và order.
- **Ảnh sản phẩm:** lưu URL ảnh, hỗ trợ tải lên qua Cloudinary.
- **Xác thực:** JWT lưu trong cookie `HttpOnly`; API cá nhân yêu cầu xác thực và backend không lưu session.
- **Đồng bộ trạng thái mua sắm:** frontend dùng một commerce state dùng chung để đồng bộ giỏ hàng, yêu thích, badge trên header và các trang liên quan.

### 5. Quy ước trạng thái trong tài liệu

- `[x]` Đã triển khai và có luồng frontend–backend.
- `[~]` Đã triển khai một phần hoặc còn giới hạn được ghi rõ.
- `[ ]` Chưa triển khai; là hạng mục dự kiến.

---

## II. CHỨC NĂNG DÀNH CHO KHÁCH HÀNG

### 1. Khám phá và tìm kiếm sản phẩm

#### 1.1. Trang chủ

- [x] Hero carousel tự động, cho phép chọn slide và điều hướng tới bộ lọc tương ứng.
- [x] Nhóm nhanh theo loại áo: Home, Away, Third và Goalkeeper.
- [x] Danh sách sản phẩm mới nhất và bán chạy, tối đa 8 sản phẩm mỗi nhóm hiển thị.
- [x] Hiển thị chính sách miễn phí vận chuyển Standard từ $100.
- [x] Thẻ sản phẩm hỗ trợ xem nhanh, thêm/xóa yêu thích và thêm vào giỏ.
- [ ] Banner và mã giảm giá lấy động từ CMS.

#### 1.2. Danh mục Shop

- [x] Tìm kiếm theo từ khóa trong tên, mô tả hoặc tên đội bóng.
- [x] Lọc theo đội bóng, mùa giải, loại áo và khoảng giá.
- [x] Lọc theo giải đấu ở cả backend và frontend.
- [x] Sắp xếp theo mới nhất, bán chạy, giá tăng, giá giảm và tên A–Z.
- [x] Phân trang phía server, hỗ trợ chuyển trang trước/sau và nhập số trang.
- [x] Đồng bộ từ khóa, đội bóng, giải đấu, mùa giải, loại áo, khoảng giá, sắp xếp và trang hiện tại trên query string của URL.
- [x] Xem nhanh thông tin và ảnh sản phẩm bằng modal.
- [ ] Lọc theo kích thước, màu sắc và đánh giá sao; mô hình sản phẩm hiện chưa có biến thể size/màu và review.

#### 1.3. Tìm kiếm trên header

- [x] Tìm theo từ khóa và chuyển kết quả sang trang Shop.
- [x] Gợi ý sản phẩm khi nhập, có debounce 250 ms.
- [x] Chọn gợi ý để mở trực tiếp trang chi tiết sản phẩm.
- [ ] Tìm kiếm gần đúng, sửa lỗi chính tả và lưu lịch sử tìm kiếm.

### 2. Chi tiết sản phẩm

- [x] Hiển thị ảnh thumbnail và thư viện nhiều ảnh; có ảnh thay thế khi sản phẩm chưa có ảnh.
- [x] Hiển thị tên, giá, mô tả, đội bóng, mùa giải, loại áo và số lượng tồn kho.
- [x] Chọn số lượng trong giới hạn tồn kho.
- [x] Thêm vào giỏ; nếu sản phẩm đã có trong giỏ, giao diện thể hiện trạng thái tương ứng.
- [x] Mua ngay: thêm sản phẩm vào giỏ rồi chuyển tới checkout.
- [x] Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích.
- [x] Hiển thị sản phẩm liên quan.
- [x] Chặn thao tác mua khi hết hàng hoặc khi yêu cầu của sản phẩm đang được xử lý.
- [ ] Video, phóng to ảnh, ảnh 360°, biến thể size/màu, khuyến mãi theo sản phẩm và đánh giá/bình luận.

### 3. Giỏ hàng và danh sách yêu thích

#### 3.1. Giỏ hàng

- [x] Giỏ hàng được lưu theo tài khoản trong cơ sở dữ liệu.
- [x] Thêm sản phẩm, chỉnh số lượng, hủy thay đổi số lượng và xóa sản phẩm.
- [x] Backend kiểm tra sản phẩm còn hoạt động, số lượng hợp lệ và tồn kho.
- [x] Tự động cập nhật thành tiền từng dòng, tổng số lượng và tổng tiền.
- [x] Cart panel trên header hiển thị danh sách rút gọn, tổng tiền, nút xóa, View cart và Checkout.
- [x] Hiển thị trạng thái đang xử lý và ngăn gửi trùng yêu cầu cho cùng một sản phẩm.
- [ ] Giỏ hàng cho khách chưa đăng nhập bằng cookie/local storage và đồng bộ sau khi đăng nhập.
- [ ] Mã giảm giá, ước tính thuế và lưu sản phẩm để mua sau.

#### 3.2. Danh sách yêu thích

- [x] Thêm/xóa yêu thích từ thẻ sản phẩm, trang chi tiết và My Account.
- [x] Favorite panel trên header hiển thị danh sách rút gọn và cho phép xóa trực tiếp.
- [x] Badge và các nút yêu thích đồng bộ sau khi API hoàn tất.
- [x] Trong My Account có thể mở chi tiết, thêm sản phẩm yêu thích vào giỏ hoặc xóa khỏi danh sách.
- [ ] Danh sách yêu thích cho khách chưa đăng nhập và chia sẻ wishlist.

### 4. Checkout và đơn hàng

#### 4.1. Checkout

- [x] Chỉ cho phép người dùng đã đăng nhập và có sản phẩm trong giỏ tiếp tục checkout.
- [x] Điền sẵn tên, số điện thoại và địa chỉ từ hồ sơ người dùng.
- [x] Chọn một địa chỉ đã lưu; ưu tiên địa chỉ mặc định nếu có.
- [x] Cho phép chỉnh thông tin người nhận cho đơn hàng hiện tại.
- [x] Chọn Standard hoặc Express và tính phí vận chuyển ở cả frontend lẫn backend.
- [x] Thanh toán COD.
- [x] Hiển thị tóm tắt sản phẩm, tạm tính, phí vận chuyển và tổng thanh toán.
- [x] Sau khi đặt thành công: tạo mã đơn UUID, trừ tồn kho, tăng số lượt bán và xóa các sản phẩm đã đặt khỏi giỏ.
- [x] Hiển thị trang xác nhận kèm mã đơn và tổng tiền.
- [ ] Thanh toán trực tuyến, mã giảm giá, hóa đơn điện tử và tích hợp API đơn vị vận chuyển.

#### 4.2. Lịch sử đơn hàng

- [x] Xem danh sách đơn theo thứ tự mới nhất, trạng thái, thời gian và tổng tiền.
- [x] Xem sản phẩm và thông tin nhận hàng trong từng đơn.
- [x] Hủy đơn ở trạng thái `PENDING` hoặc `CONFIRMED`; backend hoàn lại tồn kho và số lượt bán.
- [x] Mua lại đơn cũ bằng cách thêm lại các sản phẩm hợp lệ vào giỏ.
- [ ] Theo dõi vận chuyển real-time, yêu cầu đổi trả và hoàn tiền trực tuyến.

### 5. Xác thực và tài khoản cá nhân

#### 5.1. Đăng ký, đăng nhập và phiên làm việc

- [x] Đăng ký bằng username, email, họ tên, mật khẩu; số điện thoại và địa chỉ là thông tin bổ sung.
- [x] Kiểm tra định dạng email, số điện thoại và độ dài mật khẩu ở backend.
- [x] Đăng nhập bằng username, email hoặc số điện thoại và mật khẩu.
- [x] Duy trì đăng nhập bằng JWT trong cookie `HttpOnly`; hỗ trợ kiểm tra phiên và đăng xuất.
- [x] Tự chuyển tới trang đăng nhập khi người dùng chưa xác thực thực hiện thao tác cần tài khoản.
- [x] Checkbox “Remember me” tạo cookie đăng nhập 30 ngày; phiên thông thường dùng session cookie của trình duyệt.
- [ ] Xác thực email/OTP, quên và đặt lại mật khẩu, đăng nhập Google/Facebook/Apple.

#### 5.2. My Account

- [x] Xem và cập nhật họ tên, email, số điện thoại, địa chỉ mặc định trong hồ sơ.
- [x] Đổi mật khẩu sau khi xác nhận mật khẩu hiện tại.
- [x] Xem lịch sử và chi tiết đơn, hủy đơn hợp lệ và mua lại.
- [x] Xem và thao tác với wishlist.
- [x] Quản lý nhiều địa chỉ giao hàng: thêm, sửa, xóa và chọn địa chỉ mặc định.
- [ ] Xóa tài khoản, avatar và tùy chọn nhận thông báo.

### 6. Nội dung, điều hướng và trải nghiệm chung

- [x] Các trang: About, Contact, FAQ, Returns, Privacy Policy và Terms of Use.
- [x] Blog/Journal và trang chi tiết bài viết sử dụng dữ liệu nội bộ frontend.
- [x] Trang 404 cho URL không tồn tại.
- [x] Header responsive, menu desktop/mobile, Cart/Favorite panel và tên người dùng sau khi đăng nhập.
- [x] Giao diện có các trạng thái loading, empty, error và pending cho những luồng mua sắm chính.
- [x] Metadata cơ bản theo trang cho Home, Shop, Cart và Product Detail.
- [~] Giao diện đã có responsive theo template và CSS riêng; vẫn cần kiểm thử hồi quy trên nhiều kích thước màn hình thực tế.
- [ ] Form liên hệ gửi dữ liệu tới backend, CMS cho blog/trang tĩnh, sitemap và structured data.

---

## III. CHỨC NĂNG DÀNH CHO QUẢN TRỊ VIÊN VÀ NHÂN VIÊN (ADMIN/STAFF)

Trang quản trị nằm tại `/admin`; liên kết hiển thị với tài khoản có role `ADMIN` hoặc `STAFF`. Hai vai trò dùng chung các authority nghiệp vụ quản lý sản phẩm, đơn hàng, khách hàng, nội dung và cấu hình. Authority `MANAGE_STAFF` chỉ cấp cho `ADMIN`; frontend chỉ ẩn/hiện nút theo vai trò và backend vẫn là nơi quyết định quyền cuối cùng.

### 1. Quản lý hàng hóa và kho

- [x] Xem toàn bộ sản phẩm, bao gồm sản phẩm đã ẩn.
- [x] Thêm và sửa tên, giá, tồn kho, mô tả, loại áo, đội bóng, mùa giải và trạng thái hoạt động.
- [x] Ẩn sản phẩm khỏi Shop theo cơ chế archive/soft delete.
- [x] Điều chỉnh nhanh tồn kho và cảnh báo số lượng thấp trên dashboard.
- [x] Xuất danh sách sản phẩm dạng CSV.
- [~] Trang Admin đã upload ảnh chính và nhiều ảnh thư viện qua REST API/Cloudinary; khi upload ảnh chính mới, ảnh chính cũ được hạ thành ảnh thư viện. Chưa có xóa/sắp xếp ảnh riêng.
- [~] Đội bóng, giải đấu và mùa giải được dùng khi tạo/sửa sản phẩm; chưa có màn hình CRUD riêng cho dữ liệu phân loại.
- [ ] Import CSV, biến thể size/màu, lịch sử nhập/xuất kho, nhà cung cấp và đồng bộ tồn kho đa kênh.

### 2. Quản lý đơn hàng

- [x] Xem toàn bộ đơn, khách hàng, sản phẩm, địa chỉ nhận hàng và tổng tiền.
- [x] Cập nhật trạng thái đơn và trạng thái thanh toán.
- [x] Ghi chú nội bộ tối đa 1.000 ký tự.
- [ ] Bộ lọc nâng cao theo trạng thái/thời gian, in PDF, hoàn tiền và thông báo tự động cho khách hàng.

### 3. Quản lý khách hàng

- [x] Xem username, họ tên, email, số điện thoại, ngày tạo, số đơn và tổng chi.
- [x] Khóa/mở tài khoản; tài khoản bị khóa không thể tạo hoặc tiếp tục phiên đăng nhập.
- [ ] Phân nhóm VIP/mới/tiềm năng và gửi email/tin nhắn hàng loạt.

### 4. Quản lý khuyến mãi và giảm giá

- [~] Trang Admin có CRUD bản ghi Promotion với mã, giá trị, nội dung, trạng thái và khoảng hiệu lực; checkout chưa áp dụng phép tính giảm giá từ bản ghi này.
- [ ] Quy tắc phần trăm/số tiền, giới hạn lượt dùng và phạm vi sản phẩm/danh mục.
- [ ] Flash Sale và chương trình thành viên/tích điểm.

### 5. Quản lý nội dung (CMS)

- [~] Trang Admin có CRUD bản ghi Banner, Blog và Email Template, gồm nội dung, đường dẫn/giá trị, trạng thái và khoảng xuất bản.
- [ ] Kết nối các bản ghi CMS vào trang Home/Blog công khai, upload media, phân loại và tag.
- [ ] Kiểm duyệt đánh giá/bình luận; chức năng review phía khách hàng chưa được triển khai.

### 6. Báo cáo và thống kê

- [x] Dashboard tổng doanh thu đơn đã giao, tổng đơn, đơn chờ xử lý, khách hàng và sản phẩm.
- [x] Thống kê sản phẩm bán chạy và cảnh báo sản phẩm tồn kho thấp.
- [x] Backend tổng hợp doanh thu theo tháng để phục vụ biểu đồ.
- [ ] Funnel chuyển đổi, hành vi truy cập, giỏ bỏ quên và hiệu quả chiến dịch.

### 7. Phân quyền và bảo mật

- [x] Role `ADMIN` và `STAFF` được trả về trong phiên đăng nhập; authority nghiệp vụ được ánh xạ tập trung ở backend.
- [x] `ADMIN` và `STAFF` có quyền vận hành sản phẩm, tồn kho, đơn hàng, khách hàng, nội dung và cấu hình; người dùng thường nhận HTTP 403 dạng JSON khi truy cập API quản trị.
- [x] Chỉ `ADMIN` có `MANAGE_STAFF`, được thêm/xóa quyền Staff; API xóa Staff từ chối tuyệt đối nếu tài khoản đích là Admin. Xóa Staff đồng thời vô hiệu hóa tài khoản nhưng giữ dữ liệu lịch sử.
- [x] Trang quản lý nhân viên hiển thị cho Admin/Staff, nhưng form thêm và nút xóa chỉ hiển thị cho Admin.
- [x] Mật khẩu được băm; JWT lưu trong cookie `HttpOnly`; tài khoản bị khóa bị từ chối xác thực; CORS và thuộc tính cookie cấu hình được theo môi trường.
- [ ] 2FA Admin, audit log và phân quyền chi tiết theo từng nhân viên.

### 8. Cấu hình hệ thống

- [x] CRUD cấu hình dạng key/value trong trang Admin.
- [x] Phí Standard, Express và ngưỡng miễn phí được đọc động ở Checkout và OrderService qua các khóa `shipping.standard_fee`, `shipping.express_fee`, `shipping.free_threshold`.
- [x] Có dữ liệu mặc định cho cấu hình vận chuyển trong `DB_SETUP/11_data_store_settings.sql`.
- [~] Có thể lưu thêm khóa `store.*`; chưa có form chuyên biệt cho thông tin cửa hàng.
- [ ] Cấu hình cổng thanh toán, đơn vị vận chuyển và mẫu email gửi thực tế.

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

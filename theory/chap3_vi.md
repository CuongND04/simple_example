# Chương 3: Review

## Tài liệu tham khảo

Chương này tham khảo từ sách:
Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers

Học phần: Introduction to Software Testing

## Dàn ý

1. 3.1. Mục tiêu của review
2. 3.2. Các loại review
3. 3.3. Quy trình review
4. 3.4. Ví dụ checklist review

## Dàn ý (lặp lại trong slide gốc)

1. 3.1. Mục tiêu của review
2. 3.2. Các loại review
3. 3.3. Quy trình review
4. 3.4. Ví dụ checklist review

---

## Khái niệm review

Trong dự án phần mềm, các tài liệu/hiện vật (work product) được tạo ra là yếu tố then chốt.

Các tài liệu này được kiểm tra lặp đi lặp lại trong quá trình phát triển và thường phải review nhiều lần trước khi được phê duyệt để chuyển sang bước tiếp theo.

Thực tế, con người thường khó tự phát hiện lỗi của chính mình, vì vậy cần người khác tham gia review. Quy trình review cần có các stakeholder khác nhau để có các góc nhìn khác nhau.

Theo IEEE, review là hoạt động mà trong đó một work product hoặc một tập work product được trình bày cho nhân sự dự án, quản lý, người dùng, khách hàng hoặc các bên liên quan để nhận xét hoặc phê duyệt.

Review ở giai đoạn sớm là cực kỳ quan trọng vì chi phí sửa lỗi ở giai đoạn muộn (downstream) rất cao.

---

## 3.1. Mục tiêu của review

### Mục tiêu trực tiếp (gắn với dự án hiện tại)

1. Phát hiện lỗi phân tích và thiết kế, đồng thời xác định các nội dung cần sửa đổi, thay đổi hoặc bổ sung.
2. Nhận diện rủi ro mới có khả năng ảnh hưởng dự án.
3. Xác định các điểm lệch khỏi template, thủ tục style và quy ước.
4. Phê duyệt sản phẩm phân tích/thiết kế để đội dự án được phép chuyển sang pha phát triển kế tiếp.

### Mục tiêu gián tiếp (tổng quát hơn)

1. Tạo một diễn đàn không chính thức để trao đổi tri thức chuyên môn về phương pháp, công cụ và kinh nghiệm.

Lưu ý: dòng cuối phần mục tiêu gián tiếp trong bản OCR bị lỗi ký tự, nhưng nội dung chính thể hiện rõ ý về trao đổi tri thức nghề nghiệp.

---

## Dàn ý (lặp lại)

1. 3.1. Mục tiêu của review
2. 3.2. Các loại review
3. 3.3. Quy trình review
4. 3.4. Ví dụ checklist review

---

## 3.2. Các loại review

### 1) Management review

Dùng để:

- Xác định trạng thái kế hoạch và lịch tiến độ
- Xác nhận yêu cầu và phân bổ vào hệ thống
- Đánh giá hiệu quả các cách tiếp cận quản trị nhằm đảm bảo fitness for purpose

### 2) Technical review

Dùng để:

- Đánh giá mức phù hợp của sản phẩm phần mềm với mục đích sử dụng
- Xác định sai lệch so với đặc tả và tiêu chuẩn

### 3) Inspection

Dùng để:

- Phát hiện và định danh anomaly trong phần mềm
- Bao gồm lỗi và sai lệch so với tiêu chuẩn/đặc tả

### 4) Walk-through

Trong walk-through, người tham gia đặt câu hỏi và góp ý về:

- Anomaly tiềm ẩn
- Vi phạm tiêu chuẩn phát triển
- Các vấn đề khác

---

## So sánh các loại review

Nội dung bảng trong slide OCR bị xuống dòng và trộn cột; dưới đây là bản diễn giải đầy đủ theo đúng ý nghĩa các ô thông tin.

### Nhóm tiêu chí: Objective

- Management review:
  - Đánh giá mức tuân thủ đặc tả và kế hoạch
  - Đánh giá tính toàn vẹn của thay đổi
- Technical review:
  - Tìm anomaly
  - Xác minh kết quả xử lý
  - Xác minh chất lượng sản phẩm
- Inspection:
  - Tập trung phát hiện anomaly theo tiêu chí định trước
- Walk-through:
  - Tìm anomaly
  - Xem xét phương án thay thế
  - Cải tiến sản phẩm
  - Đồng thời là diễn đàn học tập

### Nhóm tiêu chí: Decision making

- Management review:
  - Theo dõi tiến độ
  - Thiết lập/xác nhận/điều chỉnh mục tiêu
  - Điều chỉnh phân bổ nguồn lực
  - Đội quản lý quyết định tại cuộc họp hoặc dựa trên khuyến nghị
- Technical review:
  - Nhóm review đề nghị quản lý hoặc lãnh đạo kỹ thuật hành động theo khuyến nghị
- Inspection:
  - Nhóm review chọn disposition sản phẩm đã định trước
  - Anomaly phải được loại bỏ
- Walk-through:
  - Nhóm thống nhất thay đổi để tác giả thực hiện

### Nhóm tiêu chí: Change verification

- Management review:
  - Leader xác nhận action item đã đóng
  - Việc xác minh thay đổi chi tiết do cơ chế kiểm soát dự án khác đảm nhận
- Technical review:
  - Tương tự: leader xác nhận action item đóng, phần còn lại giao cho kiểm soát dự án
- Inspection:
  - Tương tự
- Walk-through:
  - Tương tự

### Nhóm tiêu chí: Group size

- Management review: >= 2 người
- Technical review: >= 3 người
- Inspection: 3-6 người
- Walk-through: 2-7 người

### Nhóm tiêu chí: Group attendance

- Management review:
  - Thành phần quản lý, lãnh đạo kỹ thuật
  - Có ghi nhận attendance
- Technical review:
  - Kết hợp lãnh đạo kỹ thuật và peer
  - Có ghi nhận attendance
- Inspection:
  - Các peer tham gia
  - Có ghi nhận attendance
- Walk-through:
  - Lãnh đạo kỹ thuật + peer
  - Có ghi nhận attendance

### Nhóm tiêu chí: Group leadership

- Management review:
  - Thường do responsible manager dẫn dắt
- Technical review:
  - Thường do lead engineer hoặc tác giả dẫn dắt
- Inspection:
  - Trained facilitator
- Walk-through:
  - Facilitator hoặc leadership

### Nhóm tiêu chí: Volume of material

- Management review: tương đối thấp
- Technical review: trung bình đến cao (phụ thuộc mục tiêu cuộc họp)
- Inspection: lượng tài liệu có thể inspection trong một ngày; tài liệu lớn phải chia nhỏ
- Walk-through: tương đối thấp

### Nhóm tiêu chí: Presenter

- Management review: review leader quyết định presenter
- Technical review: review leader quyết định presenter
- Inspection: reader
- Walk-through: author

### Nhóm tiêu chí: Data collection

- Management review:
  - Thu thập theo chính sách/tiêu chuẩn/kế hoạch áp dụng
- Technical review:
  - Không phải yêu cầu dự án mang tính hình thức trong mọi trường hợp; có thể làm cục bộ
- Inspection: required
- Walk-through: recommended

### Nhóm tiêu chí: Output

- Management review:
  - Tài liệu management review
  - Bao gồm action item, trách nhiệm và hạn hoàn thành
- Technical review:
  - Tài liệu technical review
  - Bao gồm action item, trách nhiệm và hạn hoàn thành
- Inspection:
  - Danh sách anomaly
  - Tóm tắt anomaly
  - Tài liệu inspection
- Walk-through:
  - Danh sách anomaly
  - Action item
  - Quyết định
  - Đề xuất follow-up

### Nhóm tiêu chí: Use of anomaly checklists

- Management review: tùy chọn
- Technical review: tùy chọn
- Inspection: có
- Walk-through: tùy chọn

### Nhóm tiêu chí: Management participates

- Management review: có
- Technical review: khi cần bằng chứng hoặc cần phê chuẩn giải pháp từ quản lý
- Inspection: không
- Walk-through: không

---

## Dàn ý (lặp lại)

1. 3.1. Mục tiêu của review
2. 3.2. Các loại review
3. 3.3. Quy trình review
4. 3.4. Ví dụ checklist review

---

## 3.3. Quy trình review

### Thành phần tham gia

#### Review Leader

- Nên độc lập với team dự án.
- Có kiến thức và kinh nghiệm với loại review được áp dụng.
- Mức seniority ít nhất tương đương project leader.
- Có quan hệ phối hợp tốt với project leader và team.

#### Review Team

- Nên gồm thành viên senior trong team, kết hợp thêm thành viên senior từ bộ phận khác.

### Chuẩn bị review

#### Trách nhiệm của Review Leader

- Chỉ định thành viên review team
- Thiết lập lịch
- Phân phối tài liệu
- Và các công việc chuẩn bị khác

#### Trách nhiệm của Review Team

- Đọc tài liệu trước phiên review
- Lập danh sách comment trước phiên họp
- Với tài liệu thiết kế lớn, leader có thể chia phần cho từng cá nhân
- Hoàn thành checklist

### Phiên review

Các mức quyết định:

1. Full approval
   - Cho phép chuyển sang pha tiếp theo
   - Có thể còn sửa nhỏ
2. Partial approval
   - Chỉ một phần dự án được chuyển pha
   - Phần còn lại cần action item lớn
   - Chỉ được phép tiếp tục sau khi action item hoàn tất đạt yêu cầu

Việc xác nhận hoàn tất action item có thể do:

- Thành viên review team được giao theo dõi
- Hoặc toàn bộ review team
- Hoặc một phiên review đặc biệt

### Review report

Đây là trách nhiệm chính của Review Leader sau phiên review.

Mục tiêu quan trọng:

- Sửa sớm để giảm trễ tiến độ dự án

Review report bao gồm:

1. Tóm tắt nội dung thảo luận
2. Quyết định về việc tiếp tục dự án
3. Danh sách đầy đủ action item
   - Sửa lỗi, thay đổi, bổ sung cần thực hiện
   - Mỗi item có ngày hoàn thành dự kiến và người chịu trách nhiệm
4. Tên thành viên review team được giao follow-up

### Follow-up process

- Người follow-up có thể chính là review team leader.
- Cần xác minh từng action item đã được sửa xong như điều kiện cho phép dự án đi tiếp.
- Follow-up phải được tài liệu hóa đầy đủ để có thể làm rõ chỉnh sửa về sau khi cần.

---

## Hướng dẫn thực hành review

### Hạ tầng review (Review infrastructure)

1. Xây dựng checklist cho các loại tài liệu phổ biến.
2. Đào tạo chuyên gia senior để tạo nguồn lực cho review team.
3. Phân tích định kỳ hiệu quả review trong quá khứ.
4. Đưa lịch review vào kế hoạch dự án chính thức.

### Trong phiên review

1. Thảo luận chuyên môn theo hướng xây dựng, không cá nhân hóa vấn đề.
2. Bám sát agenda của phiên review.
3. Tập trung phát hiện defect thông qua verify và validate comment của người tham gia.
4. Tránh sa vào thảo luận giải pháp trong phiên review.
5. Nếu tranh cãi về một lỗi:
   - Kết thúc tranh luận bằng cách ghi nhận issue
   - Chuyển sang diễn đàn/phiên khác để xử lý sâu
6. Ghi chép đầy đủ comment đã thảo luận và kết quả verify/validate.
7. Thời lượng một phiên review không nên quá 2 giờ.

### Sau review

1. Hoàn thiện review report, bao gồm action item.
2. Thiết lập follow-up để đảm bảo toàn bộ action item được thực hiện đạt yêu cầu.

---

## Dàn ý (lặp lại)

1. 3.1. Mục tiêu của review
2. 3.2. Các loại review
3. 3.3. Quy trình review
4. 3.4. Ví dụ checklist review

---

## 3.4. Ví dụ checklist review

### Checklist review cho lập kế hoạch dự án phần mềm

1. Phạm vi phần mềm đã được xác định rõ ràng, không mơ hồ và có ranh giới cụ thể chưa?
2. Thuật ngữ đã rõ ràng chưa?
3. Nguồn lực có đủ cho phạm vi này không?
4. Nguồn lực có sẵn sàng khi cần không?
5. Tác vụ đã được định nghĩa và sắp thứ tự hợp lý chưa?
6. Cơ sở ước lượng chi phí có hợp lý không? Có được xây dựng từ ít nhất hai nguồn khác nhau không?
7. Có sử dụng dữ liệu lịch sử về năng suất và chất lượng không?
8. Các chênh lệch trong ước lượng đã được đối soát chưa?
9. Ngân sách và deadline định trước có thực tế không?
10. Lịch biểu có nhất quán không?

### Checklist review cho phân tích yêu cầu phần mềm

1. Phân tích miền thông tin đã đầy đủ, nhất quán và chính xác chưa?
2. Phân rã bài toán đã hoàn chỉnh chưa?
3. Interface bên ngoài và bên trong đã được định nghĩa đúng chưa?
4. Tất cả yêu cầu có truy vết được lên mức hệ thống không?
5. Có thực hiện prototyping cho khách hàng không?
6. Hiệu năng mong muốn có đạt được với các ràng buộc từ thành phần hệ thống khác không?
7. Yêu cầu có nhất quán với tiến độ, nguồn lực và ngân sách không?
8. Tiêu chí validation đã đầy đủ chưa?

### Checklist review cho thiết kế phần mềm (Preliminary Design Review)

1. Yêu cầu phần mềm đã phản ánh vào kiến trúc phần mềm chưa?
2. Có đạt tính mô-đun hiệu quả không? Các module có độc lập chức năng không?
3. Kiến trúc chương trình đã được factor hợp lý chưa?
4. Interface của module và của phần tử hệ thống bên ngoài đã được định nghĩa chưa?
5. Cấu trúc dữ liệu có nhất quán với yêu cầu phần mềm không?
6. Đã xét đến maintainability chưa?

### Checklist review cho thiết kế phần mềm (Design Walkthrough)

1. Thuật toán có thực hiện đúng chức năng mong muốn không?
2. Thuật toán có đúng logic không?
3. Interface có nhất quán với thiết kế kiến trúc không?
4. Độ phức tạp logic có hợp lý không?
5. Đã đặc tả xử lý lỗi và cơ chế antibugging chưa?
6. Cấu trúc dữ liệu cục bộ đã được định nghĩa phù hợp chưa?
7. Có dùng cấu trúc lập trình có cấu trúc xuyên suốt không?
8. Mức chi tiết thiết kế có phù hợp ngôn ngữ cài đặt không?
9. Có dùng tính năng phụ thuộc hệ điều hành hoặc phụ thuộc ngôn ngữ nào không?
10. Có dùng logic tổ hợp hoặc logic đảo gây khó đọc không?
11. Đã xét đến maintainability chưa?

### Checklist review cho coding

1. Thiết kế đã được chuyển dịch đúng sang mã nguồn chưa?
   - Kết quả procedural design cần sẵn có tại review này.
2. Có lỗi chính tả/typo không?
3. Có dùng đúng quy ước ngôn ngữ không?
4. Có tuân thủ coding standards về style ngôn ngữ, comment, module prologue không?
5. Có comment sai hoặc mơ hồ không?
6. Việc khai báo kiểu và dữ liệu có đúng không?
7. Ràng buộc vật lý (physical constraints) có đúng không?
8. Các mục trong checklist design walkthrough đã được tái áp dụng khi cần chưa?

### Checklist review cho kiểm thử phần mềm (Test Plan)

1. Các pha test chính đã được nhận diện và sắp thứ tự đúng chưa?
2. Truy vết tới tiêu chí validation/yêu cầu đã được thiết lập từ bước phân tích yêu cầu chưa?
3. Các chức năng chính có được minh chứng sớm không?
4. Test plan có nhất quán với overall project plan không?
5. Lịch test có được định nghĩa tường minh không?
6. Tài nguyên và công cụ test đã được xác định và sẵn có chưa?
7. Cơ chế lưu vết hồ sơ test đã được thiết lập chưa?
8. Test driver và stub đã được xác định chưa, và lịch phát triển chúng đã được lên chưa?

### Checklist review cho kiểm thử phần mềm (Test Procedure)

1. Đã đặc tả cả white-box và black-box test chưa?
2. Tất cả đường logic độc lập đã được kiểm thử chưa?
3. Test case đã được nhận diện và liệt kê kèm expected result chưa?
4. Có kiểm thử xử lý lỗi không?
5. Có kiểm thử giá trị biên không?
6. Có kiểm thử timing và performance không?
7. Mức sai lệch chấp nhận được so với expected result đã được đặc tả chưa?

### Checklist review cho bảo trì

1. Đã xét các side effect liên quan thay đổi chưa?
2. Yêu cầu thay đổi đã được tài liệu hóa, đánh giá và phê duyệt chưa?
3. Sau khi thay đổi, kết quả đã được tài liệu hóa và thông báo cho các bên liên quan chưa?
4. Đã thực hiện FTR phù hợp chưa?
5. Đã thực hiện final acceptance review để đảm bảo toàn bộ phần mềm được cập nhật, kiểm thử và thay thế đúng chưa?

---

## Ghi chú thuật ngữ chuyên ngành dùng trong bản dịch

- Review: rà soát kỹ thuật/quản lý
- Work product: sản phẩm công việc/hiện vật dự án
- Inspection: thanh tra kỹ thuật có cấu trúc
- Walk-through: duyệt thiết kế/mã theo trình bày của tác giả
- Anomaly: điểm bất thường/sai lệch
- Action item: hạng mục hành động cần xử lý
- Verify/Validate: xác minh/thẩm định
- FTR: Formal Technical Review (rà soát kỹ thuật chính thức)
- Maintainability: khả bảo trì

---

## Ghi chú về nguồn OCR

- Tài liệu gốc có một số đoạn lỗi ký tự và rơi chữ khi OCR.
- Bản dịch này giữ đầy đủ toàn bộ ý đọc được từ nguồn, không lược bỏ mục nào.
- Những chỗ mơ hồ được diễn giải theo ngữ cảnh môn Đảm bảo chất lượng phần mềm để tránh sai nghĩa học thuật.

# Chương 2: Tích hợp các hoạt động chất lượng trong vòng đời dự án

## Tài liệu tham khảo

Chương này tham khảo từ sách:
**Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers**

Học phần: Introduction to Software Testing

## Dàn ý

1. 2.1. Các phương pháp phát triển phần mềm
2. 2.2. Các mức kiểm thử
3. 2.2.1. Giới thiệu
4. 2.2.2. Unit test
5. 2.2.3. Integration test
6. 2.2.4. System test
7. 2.2.5. Acceptance test
8. 2.3. Mô hình hiệu quả loại bỏ lỗi và chi phí trong SQA
9. 2.4. Xây dựng kế hoạch SQA

---

## 2.1. Các phương pháp phát triển phần mềm

### SDLC (Software Development Life Cycle)

SDLC được xem là mô hình cổ điển:

- Đến nay vẫn còn được sử dụng.
- Nắm bắt các khối thành phần chính trong phát triển phần mềm.
- Trình tự tuyến tính (linear sequence).
- Cấu trúc cao, định hướng kế hoạch (plan-driven), quy trình nặng (heavy-weight process).
- Sản phẩm thường được bàn giao để đánh giá và triển khai ở cuối chu kỳ phát triển và kiểm thử.
- Mang tính "big bang" khi bàn giao.
- Phù hợp với các dự án lớn, thời gian dài.
- Đồng thời cũng là khung tham chiếu cho nhiều mô hình khác.

### Mô hình Prototyping

Mô hình mẫu thử thay thế một số phần của SDLC bằng quy trình tiến hóa và lặp:

- Các prototype được cung cấp lặp lại cho khách hàng để đánh giá và phản hồi.
- Chủ yếu lặp ở khâu thiết kế và hiện thực.
- Đội phát triển bám theo yêu cầu nhận được.
- Cuối cùng sản phẩm đạt mức hoàn thiện chấp nhận được.

### Mô hình Spiral

Mô hình xoắn ốc dùng cách tiếp cận lặp nhằm xử lý từng pha phát triển thông qua:

- Nhận phản hồi và thay đổi từ khách hàng
- Phân tích rủi ro
- Giải pháp hóa rủi ro

Đặc điểm:

- Thường mỗi pha truyền thống tương ứng một vòng xoắn.
- Trong mỗi vòng có thể dùng kỹ thuật của mô hình khác (SDLC, prototyping, ...).
- Spiral của Barry Boehm là mô hình phát triển lấy rủi ro làm trung tâm; mỗi vòng đều có hoạt động đánh giá rủi ro lớn.
- Ra đời sau SDLC nhằm xử lý nhược điểm phát hiện rủi ro muộn của SDLC.
- Tương tự SDLC: heavy-weight, plan-driven, cấu trúc cao.

### Mô hình hướng đối tượng (Object-Oriented Model)

Nhấn mạnh tái sử dụng thông qua object và component tái sử dụng.

Đặc trưng:

- Phát triển phần mềm dựa trên thành phần (component-based development).
- Nếu chưa có sẵn thành phần phù hợp, lập trình viên có thể:
  - Dựng prototype cho module cần thiết
  - Áp dụng hướng SDLC
  - Mua thư viện object
  - Tự phát triển thành phần

---

## SDLC theo các pha và hoạt động SQA gắn kèm

### Chuỗi pha cơ bản

- Requirements
- Analysis
- Design
- Coding
- Testing
- Acceptance

### Requirements Definition

- Do khách hàng thực hiện.

### Analysis

- Phân tích yêu cầu để hình thành mô hình phần mềm ban đầu.

### Design

- Định nghĩa chi tiết input/output và các quy trình xử lý.
- Bao gồm cấu trúc dữ liệu, cấu trúc phần mềm, ...

### Coding

- Chuyển thiết kế thành mã nguồn.
- Trong coding có các hoạt động SQA như:
  - Inspection
  - Unit test
  - Integration test

Lưu ý từ slide:

- Nhiều biến thể được tách ra từ đây.
- Các kiểm thử có thể do cá nhân (unit), nhóm hoặc cả team (integration).

### System test và Acceptance test

- Mục tiêu system test:
  - Phát hiện lỗi và sửa lỗi
  - Đạt mức chất lượng chấp nhận được
- Thường do phía phát triển thực hiện trước bàn giao.
- Acceptance test đôi khi do khách hàng thực hiện hoặc phối hợp với nhà phát triển.

### Installation / Conversion

Sau test, hệ thống được cài đặt và/hoặc thay thế hệ thống cũ:

- Cần chuyển đổi phần mềm/dữ liệu.
- Quan trọng là tránh làm gián đoạn hoạt động thường nhật trong quá trình chuyển đổi.
- Các cách triển khai: tăng dần (incremental), chạy song song, chuyển đổi dứt điểm.

### Operations and Maintenance

- Giai đoạn vận hành và bảo trì kéo dài nhiều năm.
- Bảo trì gồm:
  - Corrective
  - Adaptive
  - Perfective

Tài liệu ghi nhận có nhiều biến thể của SDLC cổ điển, đa phần nhằm khắc phục các vấn đề thực tế.

### Vòng phản hồi và V-Model

Slide nhấn mạnh các feedback loop giữa:

- Requirements
- Specification
- Design
- Updated Requirements
- Development
- Maintenance

V-Model mô tả quan hệ giữa thiết kế và mức kiểm thử tương ứng:

- Requirement Analysis <-> Acceptance Test Design/Testing
- System Design <-> System Test Design/Testing
- Architecture Design <-> Integration Test Design/Testing
- Module Design <-> Unit Test Design/Unit Testing
- Coding ở đáy chữ V
- Product Deliverable và Maintenance ở nhánh còn lại

---

## Mô hình Prototyping (chi tiết)

Ý tưởng chính:

- Phát triển prototype nhanh
- Khách hàng sẵn sàng tham gia phản hồi

Cách vận hành:

- Dùng công cụ prototyping để phản hồi nhanh theo góp ý.
- Bổ sung dần các phần cho đến khi ứng dụng đạt mức chấp nhận.
- Quy trình này có thể cài vào SDLC hoặc mô hình khác.

Luồng điển hình trong slide:

1. Khách hàng xác định yêu cầu
2. Thiết kế prototype
3. Hiện thực prototype
4. Khách hàng đánh giá prototype
5. Kiểm tra yêu cầu đã được đáp ứng chưa
6. Nếu chưa: yêu cầu chỉnh sửa/thay đổi/bổ sung và lặp lại
7. Nếu rồi: system test + acceptance test
8. Chuyển đổi hệ thống
9. Vận hành và bảo trì

Nhận xét:

- Cách tiếp cận tốt cho dự án nhỏ đến vừa.
- Sự tham gia của khách hàng là yếu tố rất quan trọng.

---

## Mô hình Spiral (chi tiết)

Là cách tiếp cận:

- Heavy-weight
- Plan-driven
- Highly structured
- Dành cho dự án lớn, nguy cơ thất bại cao

Kết hợp:

- Tính lặp
- Đánh giá rủi ro
- Sự tham gia khách hàng
- Prototyping
- Hoạt động kỹ thuật (design, code, test, ...)

Một vòng xoắn thường bao gồm:

- Planning dựa trên yêu cầu/nhận xét của khách hàng
- Risk analysis và risk resolution
- Engineering activities
- Customer evaluation
- Cập nhật thay đổi và lặp vòng tiếp

Bản sửa đổi của Spiral model nhấn mạnh hơn:

- Cơ hội thay đổi cho khách hàng
- Khả năng bám tiến độ/ngân sách cho đội phát triển
- Bổ sung phần riêng cho hành động phía khách hàng và hoạt động kỹ thuật phía developer

---

## Mô hình phát triển hướng đối tượng (chi tiết)

Mục tiêu:

- Tích hợp dễ dàng các module có sẵn (objects/components) vào hệ thống mới.

Quy trình:

1. Bắt đầu với OOA (Object-Oriented Analysis) và OOD (Object-Oriented Design)
2. Tìm và lấy component phù hợp từ thư viện component tái sử dụng (hoặc mua)
3. Nếu không có: tự phát triển
4. Có thể bổ sung component mới vào thư viện

Lợi ích kinh tế:

- Tái sử dụng giúp giảm chi phí và tăng tốc độ phát triển.

---

## Disciplines, Phases, and Iterations (RUP-style)

### Logic use case theo pha

- Giai đoạn đầu nhận diện các use case quan trọng để xác định phạm vi (khoảng 10%)
- Theo dõi và ghi nhận thay đổi yêu cầu
- Chi tiết hóa khoảng 80% use case
- Nhận diện và mô tả phần use case còn lại

### Các pha

- Inception
- Elaboration
- Construction
- Transition

### Core disciplines

- Business Modeling
- Requirements
- Analysis and Design
- Implementation
- Test and Assessment
- Deployment

### Supporting disciplines

- Configuration and Change Management
- Project Management
- Environment

### Inception Phase

Mục tiêu chính là đạt được sự đồng thuận (buy-in) từ các bên liên quan:

- Thu thập yêu cầu ban đầu
- Phân tích cost-benefit
- Phân tích rủi ro ban đầu
- Xác định phạm vi dự án
- Xác định kiến trúc ứng viên
- Xây dựng prototype thăm dò (disposable prototype)
- Use case model ban đầu (hoàn thiện 10%-20%)
- Domain model bản đầu

### Elaboration Phase

- Phân tích và thu thập yêu cầu
- Use case analysis
- Use case viết và review ~80% cuối pha
- Use case model ~80%
- Scenarios
- Sequence và Collaboration diagrams
- Class/Activity/Component/State diagrams
- Glossary để người dùng và dev dùng chung từ vựng
- Domain model để hiểu bài toán trong ngữ cảnh miền nghiệp vụ
- Cập nhật kế hoạch đánh giá rủi ro
- Hoàn thiện tài liệu kiến trúc

### Construction Phase

- Tập trung hiện thực thiết kế
- Chức năng tăng dần theo từng vòng
- Cài đặt sâu hơn, các stub được hoàn thiện
- Độ ổn định bắt đầu tăng
- Triển khai đầy đủ chi tiết, không chỉ phần lõi kiến trúc
- Phân tích vẫn tiếp tục nhưng thiết kế và coding là trọng tâm

### Transition Phase

Là giai đoạn chuyển giao hệ thống cho cộng đồng người dùng:

- Sản xuất/đóng gói/phát hành
- Cài đặt
- Đào tạo
- Hỗ trợ kỹ thuật
- Bảo trì

Đặc điểm vận hành:

- Quy mô đội phát triển thu hẹp dần
- Quyền kiểm soát chuyển sang đội bảo trì
- Có bản Alpha/Beta/Final
- Cập nhật phần mềm
- Tích hợp với hệ thống legacy hoặc phiên bản cũ

### Agile (slide OCR rút gọn ký tự)

Bản OCR của phần Agile bị mất chữ nhiều, nhưng thể hiện ý về vòng lặp triển khai - kiểm thử - lập kế hoạch - phát hành theo nhịp ngắn.

---

## 2.2. Các mức kiểm thử

### Dàn ý phần kiểm thử

1. 2.2.1. Introduction
2. 2.2.2. Unit test
3. 2.2.3. Integration test
4. 2.2.4. System test
5. 2.2.5. Acceptance test

### Quality Assurance vs Testing

**Quality Assurance** bao gồm nhiều hoạt động xuyên suốt quy trình phát triển:

- Standards phát triển
- Version control
- Change/Configuration management
- Release management
- Testing
- Đo lường chất lượng
- Phân tích lỗi
- Đào tạo

**Testing** cũng gồm nhiều hoạt động:

- Unit testing
- Integration testing
- System testing

### Các tiên đề kiểm thử (Testing Axioms)

- Kiểm thử không thể chứng minh rằng "không còn bug".
- Kiểm thử vét cạn là bất khả thi với ứng dụng không tầm thường.
- Kiểm thử phần mềm là hoạt động dựa trên rủi ro.
- Cách kiểm thử phụ thuộc ngữ cảnh (ví dụ hệ thống an toàn sống còn khác website thương mại điện tử).
- Kiểm thử nên bắt đầu càng sớm càng tốt trong SDLC.
- Càng tìm ra nhiều bug thì khả năng còn bug càng cao.

### Nhóm lỗi phổ biến

- Lỗi liên quan điều kiện biên
- Lỗi tính toán/thuật toán
- Lỗi luồng điều khiển
- Lỗi xử lý/diễn giải dữ liệu
- Lỗi giao diện người dùng
- Lỗi xử lý ngoại lệ
- Lỗi quản lý phiên bản

### Nguyên tắc kiểm thử

- Mọi test phải truy vết được về yêu cầu khách hàng.
- Mục tiêu kiểm thử là phát hiện lỗi.
- Lỗi nghiêm trọng nhất là lỗi làm chương trình không đáp ứng yêu cầu.
- Phải lập kế hoạch test từ sớm, trước khi chạy test.
- Có thể đặc tả test chi tiết ngay khi thiết kế hệ thống hoàn tất.
- Vì không thể test vét cạn, cần ưu tiên test theo rủi ro.
- Nguyên lý Pareto cũng đúng trong kiểm thử.

### Kiểm thử cái gì, khi nào?

Kiểm thử/review toàn bộ artefact xuyên suốt vòng đời:

**Requirements**

- Có đầy đủ không?
- Có xung đột không?
- Có hợp lý không?
- Có kiểm thử được không?

**Design**

- Có thỏa đặc tả không?
- Có tuân thủ tiêu chí yêu cầu không?
- Có hỗ trợ tích hợp với hệ thống hiện hữu không?

**Implemented system**

- Hệ thống có làm đúng điều phải làm không?

**Documentation**

- Tài liệu có chính xác không?
- Có được cập nhật không?
- Có truyền tải đúng thông tin cần truyền tải không?

---

## Quy trình kiểm thử

### 1) Test Planning

Lập kế hoạch kiểm thử bao gồm xây dựng test plan.

Các thành phần phổ biến của test plan:

- Entry criteria
- Hoạt động kiểm thử và lịch trình
- Phân công công việc kiểm thử
- Chiến lược và kỹ thuật kiểm thử được chọn
- Công cụ, môi trường, tài nguyên cần thiết
- Cơ chế theo dõi và báo cáo vấn đề
- Exit criteria

### 2) Test Design and Specification

- Review test basis (requirements, architecture, design, ...)
- Đánh giá testability của yêu cầu hệ thống
- Xác định test condition và test data cần dùng
- Thiết kế test case với các trường:
  - Identifier
  - Mô tả ngắn
  - Độ ưu tiên
  - Preconditions
  - Steps thực thi
  - Post-conditions
- Thiết kế môi trường kiểm thử (software, hardware, network architecture, database, ...)

### 3) Test Execution

- Xác nhận môi trường đã set up đúng
- Thực thi test case
- Ghi nhận kết quả (PASS/FAIL/NOT EXECUTED)
- Lặp lại hoạt động test khi cần
- Thực hiện regression testing

### 4) Result Analysis and Reporting

Báo cáo vấn đề cần gồm:

- Mô tả ngắn
- Vị trí phát hiện
- Cách tái hiện lỗi
- Severity
- Priority
- Liệu lỗi này có gợi ý test case mới không

### 5) Test Control, Management and Review

Dùng exit criteria để quyết định dừng test.

Tiêu chí có thể gồm:

- Coverage analysis
- Số lỗi còn pending
- Thời gian
- Chi phí

Công việc chính:

- Đối chiếu test log với exit criteria
- Đánh giá có cần test thêm không

---

## Levels of Testing

Thứ tự mức kiểm thử:

1. Unit Testing
2. Integration Testing
3. System Testing
4. User Acceptance Testing

### Unit Testing

- Kiểm thử từng lớp/đơn vị và các phương thức.
- Tập trung vào chữ ký hàm, hành vi ở mức đơn vị.
- Thường chạy rất nhanh.
- Trách nhiệm chính thuộc về developer.

### Integration Testing

- Kiểm thử tương tác giữa các component (A, B, C, database, ...).
- Mục tiêu là lỗi giao tiếp, lỗi ghép nối, lỗi luồng dữ liệu giữa module.

### System Testing

- Kiểm thử toàn hệ thống tích hợp hoàn chỉnh.
- Xác nhận hệ thống đáp ứng yêu cầu chức năng và phi chức năng ở mức hệ thống.

### Acceptance Testing

- Kiểm thử chấp nhận bởi người dùng/khách hàng để xác nhận đáp ứng nhu cầu sử dụng thực tế.

---

## 2.3. Mô hình hiệu quả loại bỏ lỗi và chi phí trong SQA

### Mục tiêu mô hình

Mô hình xử lý hai khía cạnh định lượng của lập kế hoạch SQA khi có nhiều hoạt động phát hiện lỗi:

1. Hiệu quả tổng thể của kế hoạch SQA trong việc loại bỏ lỗi dự án
2. Tổng chi phí loại bỏ lỗi dự án

Nhắc lại:

- Hoạt động SQA phải tích hợp vào kế hoạch phát triển dự án.

### Dữ liệu đầu vào của mô hình

Mô hình dựa trên 3 loại dữ liệu:

1. Defect origin distribution
   - Lỗi phát sinh ở pha nào
2. Defect removal effectiveness
   - Khả năng loại bỏ lỗi hiệu quả đến đâu
3. Cost of defect removal
   - Chi phí loại bỏ mỗi lỗi theo từng pha

### Phân bố nguồn gốc lỗi (Defect Origin Distribution)

Phân bố ổn định qua nhiều năm (theo tài liệu):

- Requirement specs: 15%
- Design: 35%
- Coding/Integration: 40%
- Documentation: 10%

### Hiệu quả loại bỏ lỗi (Defect Removal Effectiveness)

Quan sát quan trọng:

- Tỷ lệ lỗi được loại bỏ thường thấp hơn tỷ lệ lỗi được phát hiện.
- Lý do: có sửa nhưng không hiệu quả/không đầy đủ.
- Một số lỗi bị bỏ sót hoàn toàn.
- Lỗi chưa sửa từ pha trước cộng dồn với lỗi mới pha hiện tại.

Giả định phục vụ thảo luận:

- Hiệu quả lọc lỗi của mỗi hoạt động QA không dưới 40%.
- Nghĩa là mỗi hoạt động loại ít nhất 40% lỗi đầu vào.

### Bảng hiệu quả lọc lỗi trung bình (bản tiêu chuẩn trong slide)

Các giá trị OCR thể hiện:

- Requirements specs review: 50%
- Design inspection: 60%
- Design review: 50%
- Code inspections: 65%
- Unit test: 50%
- Unit test > code review: 30% (dòng OCR mơ hồ, giữ nguyên ý nguồn)
- Integration test: 50%
- System test/Acceptance: 50%
- Documentation review: 50% (dòng OCR "um eview")

### Chi phí loại bỏ lỗi theo pha

- Chi phí loại lỗi khác nhau đáng kể theo pha.
- Chi phí ở pha muộn cao hơn rất nhiều.
- Dữ liệu chi phí thực tế thường khó thu thập, nhưng nhiều nghiên cứu trọng điểm cho kết quả nhất quán.

### Các giả định của mô hình

Mô hình dựa trên các giả định:

1. Quá trình phát triển tuyến tính, tuần tự kiểu waterfall
2. Mỗi pha có thêm lỗi mới được đưa vào
3. Hoạt động review/test đóng vai trò bộ lọc:
   - Loại một phần lỗi
   - Cho phần còn lại đi tiếp sang pha sau
4. Ở mỗi pha, lỗi đầu vào = lỗi còn sót từ pha trước + lỗi mới của pha hiện tại
5. Chi phí loại lỗi ở mỗi hoạt động SQA được tính bằng:
   - Số lỗi loại bỏ x chi phí tương đối cho mỗi lỗi
6. Lỗi còn lại đi tới khách hàng
   - Đây là phần chi phí nặng nhất

### Có thể làm tốt hơn bằng kế hoạch SQA toàn diện

Kế hoạch SQA toàn diện (comprehensive defect filtering system):

1. Bổ sung thêm hoạt động QA ở pha thiết kế và pha coding
   - Có Design Inspection và Design Review thay cho chỉ review đơn giản
   - Có Code Inspection kết hợp Unit Test thay cho chỉ Unit Test đơn lẻ
2. Cải thiện hiệu quả lọc của các hoạt động QA còn lại

### Ví dụ chi phí loại lỗi theo pha (bảng trong slide)

- Requirement specification: 15% lỗi nguồn gốc, chi phí tương đối 1
- Design: 35%, chi phí 2.5
- Unit coding: 30%, chi phí 6.5
- Integration coding: 10%, chi phí 16
- Documentation: 10%, chi phí 40
- System testing: chi phí 40
- Operation: chi phí 110

### Ví dụ so sánh hiệu quả loại lỗi giữa kế hoạch tiêu chuẩn và kế hoạch toàn diện

Giá trị OCR thể hiện:

- Specification requirement review: 50% -> 60%
- Design inspection: (mở rộng) 70%
- Design review: 50% -> 60%
- Code inspection: (mở rộng) 70%
- Unit test: 50% -> 40% (dòng OCR có thể gây tranh luận, giữ nguyên theo nguồn)
- Integration tests: 50% -> 60%
- Documentation review: 50% -> 60%
- System test: 50% -> 60%
- Operation phase detection: 100% -> 100%

---

## 2.4. Xây dựng kế hoạch SQA

### Vai trò của SQA Plan

Kế hoạch đảm bảo chất lượng phần mềm là một trong các kế hoạch quan trọng nhất cần chuẩn bị trước khi bắt đầu dự án phát triển phần mềm.

### Nội dung cần có trong SQA Plan

#### 1) Standards

Bao gồm:

- Coding guidelines
- Design guidelines
- Testing guidelines
- Các chuẩn khác được chọn cho dự án

Mục tiêu:

- Đảm bảo mức chất lượng tối thiểu trong phát triển
- Đảm bảo tính đồng nhất đầu ra giữa các nguồn lực dự án

#### 2) Quality control activities

Các hoạt động đề xuất có thể gồm:

- Code walkthrough
- Requirements review
- Design review
- Các dạng test:
  - Unit testing
  - Integration testing
  - Functional testing
  - Negative testing
  - End-to-end testing
  - System testing
  - Acceptance testing

#### 3) Thủ tục và sự kiện kích hoạt causal analysis

Bao gồm các sự kiện:

- Failure
- Defect
- Success

#### 4) Audits

Mục đích:

- Phân tích các ngoại lệ trong dự án
- Đưa ra hành động khắc phục và phòng ngừa cần thiết
- Đảm bảo ngoại lệ không lặp lại

#### 5) IEEE Standard 730

Chuẩn IEEE 730 cung cấp hướng dẫn chi tiết cách lập quality assurance plan, bao gồm template gợi ý.

---

## Các chuẩn cụ thể nên đưa vào SQA Plan

Để hướng dẫn nhân sự thực hiện công việc đúng năng suất và chất lượng mong muốn, kế hoạch nên nêu rõ:

- Coding standards cho ngôn ngữ lập trình trong dự án
- Database design standards
- GUI design standards
- Test case design standards
- Testing standards
- Review standards
- Tài liệu tham chiếu quy trình tổ chức (organizational process reference)

---

## Các chỉ số chất lượng (quality metrics) nên nêu trong SQA Plan

- Defect injection rate
- Defect density
- Defect removal efficiency cho từng hoạt động QA
- Productivity cho các artefact của dự án
- Schedule variances

---

## Các hoạt động QC nên nêu rõ trong SQA Plan

- Code walkthrough
- Peer review
- Formal review
- Các loại kiểm thử sẽ thực hiện trong dự án

Tối thiểu phải có:

- Unit testing
- Integration testing
- System testing
- Acceptance testing

---

## Lịch audit cần có trong SQA Plan

Kế hoạch cũng nên chứa lịch cho các dạng audit:

- Periodic conformance audits
- Phase-end audits
- Investigative audits (kèm tiêu chí)
- Delivery audits

---

## Ghi chú về bản dịch

- Bản gốc là nội dung OCR nên có một số lỗi ký tự, thiếu chữ hoặc lặp dòng.
- Bản dịch này giữ đủ ý toàn bộ nội dung đã đọc được, đồng thời đánh dấu chỗ mơ hồ bằng chú thích ngắn để tránh diễn giải sai học thuật.
- Thuật ngữ được chuẩn hóa theo môn Đảm bảo chất lượng phần mềm (SQA).

# Chương 4: Kiểm thử phần mềm

## Tài liệu tham khảo

Chương này tham khảo từ sách:
Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers

Học phần: Introduction to Software Testing

## Dàn ý

1. 4.1. Định nghĩa và mục tiêu
2. 4.2. Quy trình kiểm thử phần mềm
3. 4.3. Các loại kiểm thử

## Dàn ý (lặp lại trong slide)

1. 4.1. Định nghĩa và mục tiêu
2. 4.2. Quy trình kiểm thử phần mềm
3. 4.3. Các loại kiểm thử

---

## 4.1. Định nghĩa và mục tiêu

### Định nghĩa Software Testing (ST)

Theo IEEE Standard Glossary of Software Engineering Terminology:

Kiểm thử là hoạt động trong đó một hệ thống hoặc thành phần được thực thi dưới các điều kiện xác định trước; kết quả được quan sát hoặc ghi lại; và một khía cạnh nào đó của hệ thống/thành phần được đánh giá.

Theo The Art of Software Testing:

Kiểm thử là quá trình thực thi một chương trình với mục đích tìm lỗi.

Diễn giải đơn giản:

Kiểm thử phần mềm là quá trình chạy hệ thống phần mềm để xác định phần mềm có đáp ứng đặc tả hay không.

### Mục tiêu kiểm thử theo mức độ trưởng thành quy trình kiểm thử

**Level 0:** Không có khác biệt giữa testing và debugging.

**Level 1:** Mục đích kiểm thử là chứng minh tính đúng đắn.

**Level 2:** Mục đích kiểm thử là chỉ ra phần mềm không hoạt động đúng.

**Level 3:** Mục đích kiểm thử không phải để chứng minh một điều cụ thể, mà để giảm rủi ro khi sử dụng phần mềm.

**Level 4:** Kiểm thử là một kỷ luật tư duy giúp mọi chuyên gia CNTT phát triển phần mềm chất lượng cao hơn.

Lưu ý: trong tài liệu gốc, phần này xuất hiện 2 lần với nội dung tương đương.

### Tactical Goals: Tại sao thực hiện từng test?

- Nếu không biết lý do của từng test thì test đó khó mang lại giá trị.
- Mục tiêu test và yêu cầu test phải được tài liệu hóa bằng văn bản.
- Cần xác định mức độ coverage dự kiến.
- Cần trả lời câu hỏi: test bao nhiêu là đủ?
- Mục tiêu phổ biến nhưng chưa tốt: dùng hết ngân sách test cho tới ngày ship (date criterion).

---

## Bảy nguyên lý kiểm thử

### 1) Testing shows presence of defects, not absence

Kiểm thử chỉ cho thấy sự hiện diện của lỗi, không chứng minh được không còn lỗi.

Dù không phát hiện lỗi nào, điều đó cũng không chứng minh phần mềm đúng tuyệt đối.

### 2) Exhaustive testing is impossible

Kiểm thử vét cạn là bất khả thi đối với hệ thống thực tế.

Thay vì test toàn bộ, cần dùng phân tích rủi ro, kỹ thuật test và ưu tiên để tập trung nỗ lực.

### 3) Early testing saves time and money

Kiểm thử sớm tiết kiệm thời gian và chi phí; thường gọi là shift-left testing.

### 4) Defects cluster together

Lỗi có xu hướng tập trung theo cụm.

Một số ít module thường chứa phần lớn defect phát hiện trước phát hành, hoặc gây ra phần lớn sự cố khi vận hành.

Dự đoán cụm lỗi và cụm lỗi quan sát thực tế là đầu vào quan trọng cho phân tích rủi ro để ưu tiên test.

### 5) Beware of the pesticide paradox

Nếu lặp đi lặp lại cùng một bộ test, dần dần bộ test đó không tìm được lỗi mới.

Muốn phát hiện lỗi mới cần:

- Cập nhật test hiện có
- Thay đổi test data
- Viết thêm test mới

Trong một số trường hợp như regression test tự động, "pesticide paradox" có mặt tích cực là số regression defect thấp.

### 6) Testing is context dependent

Kiểm thử phụ thuộc ngữ cảnh.

Ví dụ:

- Phần mềm điều khiển công nghiệp an toàn cao kiểm thử khác ứng dụng e-commerce trên mobile.
- Dự án Agile kiểm thử khác dự án phát triển tuần tự.

### 7) Absence-of-errors is a fallacy

Tin rằng chỉ cần tìm và sửa thật nhiều lỗi là sẽ đảm bảo hệ thống thành công là một ngộ nhận.

---

## Dàn ý (lặp lại)

1. 4.1. Định nghĩa và mục tiêu
2. 4.2. Quy trình kiểm thử phần mềm
3. 4.3. Các loại kiểm thử

---

## 4.2. Quy trình kiểm thử phần mềm

### Test Process

Không tồn tại một quy trình test "chuẩn duy nhất" cho mọi tổ chức.

Tuy nhiên có các nhóm hoạt động test phổ biến; thiếu các hoạt động này thì khó đạt mục tiêu test đã đặt ra.

Tập hợp các hoạt động đó tạo thành test process.

Các điểm cần xác định:

- Có những hoạt động nào trong quy trình
- Cách triển khai từng hoạt động
- Thời điểm thực hiện từng hoạt động

### Test Process in Context

Các yếu tố ngữ cảnh ảnh hưởng quy trình kiểm thử trong tổ chức gồm (không giới hạn):

1. Mô hình vòng đời phát triển phần mềm và phương pháp dự án đang dùng
2. Mức kiểm thử và loại kiểm thử được xem xét
3. Rủi ro sản phẩm và rủi ro dự án
4. Bối cảnh/chuẩn kiểm thử (slide OCR có cụm "International Software Testing")
5. Miền nghiệp vụ (business domain)
6. Ràng buộc vận hành, gồm:
   - Ngân sách và nguồn lực
   - Khung thời gian
   - Độ phức tạp
   - Ràng buộc hợp đồng và pháp lý
7. Chính sách và thực hành của tổ chức
8. Các chuẩn nội bộ và chuẩn bên ngoài cần tuân thủ

### Các nhóm hoạt động chính trong Test Process

1. Test planning
2. Test monitoring and control
3. Test analysis
4. Test design
5. Test implementation
6. Test execution
7. Test completion

---

## Chi tiết hoạt động và tác vụ

### Test monitoring and control

**Test monitoring** là so sánh liên tục tiến độ thực tế với tiến độ kế hoạch bằng các metric đã định nghĩa trong test plan.

**Test control** là thực hiện hành động cần thiết để đạt mục tiêu test plan (test plan có thể được cập nhật theo thời gian).

Monitoring và control được hỗ trợ bởi đánh giá exit criteria (trong một số mô hình SDLC gọi là definition of done).

Tiến độ test so với kế hoạch cần được báo cáo cho stakeholder qua test progress report, bao gồm:

- Sai lệch so với kế hoạch
- Thông tin hỗ trợ các quyết định điều chỉnh

### Test planning

Là nhóm hoạt động xác định:

- Mục tiêu kiểm thử
- Cách tiếp cận để đạt mục tiêu trong các ràng buộc ngữ cảnh

Ví dụ:

- Chọn kỹ thuật test phù hợp
- Xác định tác vụ test
- Lập lịch test để đáp ứng deadline

Test plan có thể được xem xét lại dựa trên phản hồi từ monitoring và control.

### Test analysis

Mục đích là đánh giá test basis và test item để nhận diện defect trong tài liệu/sản phẩm nền tảng, ví dụ:

- Ambiguities (mơ hồ)
- Omissions (bỏ sót, bản OCR ghi lỗi)
- Inconsistencies (không nhất quán)
- Inaccuracies (không chính xác)
- Contradictions (mâu thuẫn)
- Superfluous statements (thông tin thừa)

Hoạt động chính:

1. Xác định các feature và tập feature cần test
2. Định nghĩa và ưu tiên test conditions cho từng feature dựa trên:
   - Phân tích test basis
   - Đặc trưng chức năng (functional)
   - Đặc trưng phi chức năng (non-functional)
   - Đặc trưng cấu trúc (structural)
   - Yếu tố business/technical khác
   - Mức rủi ro
3. Thiết lập truy vết hai chiều giữa từng phần tử test basis và test condition liên quan

Trong một số trường hợp, test analysis tạo ra test conditions dùng làm test objectives trong test charter.

Test charter là work product điển hình trong một số kiểu kiểm thử dựa trên kinh nghiệm (experience-based testing).

Khi test objective truy vết được về test basis thì có thể đo coverage đạt được.

### Test design

Nếu test analysis trả lời câu hỏi "test cái gì?", thì test design trả lời "test như thế nào?".

Tại bước này, test conditions được chi tiết hóa thành high-level test cases, tập test case và testware khác.

Hoạt động chính:

1. Thiết kế và ưu tiên test case, tập test case
2. Xác định test data cần thiết để hỗ trợ test conditions và test cases
3. Thiết kế test environment, xác định hạ tầng và công cụ cần dùng
4. Thiết lập truy vết hai chiều giữa test basis, test conditions và test cases

Giống test analysis, test design cũng có thể phát hiện defect trong test basis.

### Test implementation

Mục tiêu là chuẩn bị đầy đủ testware để có thể chạy test; bao gồm sắp xếp test cases vào test procedures.

Nói cách khác, bước này trả lời: "đã sẵn sàng mọi thứ để chạy test chưa?"

Hoạt động chính:

1. Phát triển và ưu tiên test procedures; có thể tạo automated test scripts
2. Tạo test suites từ test procedures và script tự động (nếu có)
3. Sắp test suites vào lịch thực thi để chạy hiệu quả
4. Xây test environment (có thể gồm test harness, service virtualization, simulator, hạ tầng khác) và xác minh thiết lập đúng
5. Chuẩn bị test data và nạp đúng vào test environment
6. Xác minh/cập nhật truy vết hai chiều giữa test basis, test conditions, test cases, test procedures và test suites

### Test execution

Trong giai đoạn thực thi, test suites được chạy theo test execution schedule.

Hoạt động chính:

1. Ghi nhận ID và phiên bản của test item/test object, test tool và testware
2. Thực thi test thủ công hoặc bằng công cụ
3. So sánh kết quả thực tế với expected result
4. Phân tích anomaly để xác định nguyên nhân khả dĩ
   - Failure có thể do defect trong code
   - Cũng có thể có false positive
5. Báo defect dựa trên failure quan sát được
6. Ghi log kết quả test execution (pass/fail/blocked)
7. Lặp lại hoạt động test khi cần
   - Do hành động xử lý anomaly
   - Hoặc theo kế hoạch (corrected test, confirmation test, regression test)
8. Xác minh/cập nhật truy vết hai chiều giữa test basis, test conditions, test cases, test procedures và test results

### Test completion

Hoạt động test completion thu thập dữ liệu từ các hoạt động test đã hoàn tất để tổng hợp kinh nghiệm, testware và thông tin liên quan.

Thường diễn ra tại các mốc dự án như:

- Khi phát hành hệ thống
- Khi dự án test hoàn thành hoặc bị hủy

Hoạt động chính:

1. Kiểm tra tất cả defect report đã đóng chưa; defect chưa xử lý thì tạo change request hoặc backlog item
2. Tạo test summary report cho stakeholder
3. Hoàn thiện và lưu trữ test environment, test data, test infrastructure, testware để tái sử dụng
4. Bàn giao testware cho đội bảo trì, đội dự án khác hoặc stakeholder có thể dùng lại
5. Phân tích bài học kinh nghiệm để cải tiến cho iteration/release/project sau
6. Dùng thông tin thu thập được để nâng mức trưởng thành quy trình kiểm thử

---

## Organizational Test Process (theo mô hình nhiều lớp)

Nội dung từ slide OCR thể hiện các thành phần:

- Create/Maintain Organizational Test Policy
- Organizational Test Policy
- Create/Maintain Organizational Test Strategy
- Organizational Test Strategy
- Project Test Management Processes
- Project Test Plan
- Project Monitoring and Control Measures
- Project Test Completion
- Level Test Plan
- Level Test Completion Reports
- Test Management Processes (Unit/System/Acceptance/Performance/Usability/...)
- Fundamental Test Processes (Unit/System/Acceptance/Performance/Usability/...)
- Test Design and Implementation
- Test Execution
- Test Environment Set-Up
- Test Environment Readiness Report
- Test Incident Reporting
- Incident Report

Nguồn ghi trên slide:
ISO/IEC 29119 Software Testing Multi-Layer Process Model (Updated 26th May 2009)

---

## Bug management

### Bug life cycle

Các trạng thái thường gặp trong vòng đời bug (theo slide):

- New
- Assigned
- Rejected
- Fixed
- Deferred
- Re-Opened
- Duplicate
- Retested
- Verified
- Closed

### Logging error

Vì dự án có nhiều pha phát triển và nhiều chức năng, khi log lỗi cần ghi rõ:

- Lỗi là gì
- Thuộc chức năng nào

Mục đích của log lỗi:

- Để developer/leader đọc và hiểu nhanh
- Hỗ trợ theo dõi và xử lý nhiều bug cùng lúc

Yêu cầu mô tả lỗi:

- Ngắn gọn
- Rõ ràng
- Dễ truy vết ngay từ tiêu đề

Cần dùng thuật ngữ nhất quán để:

- Tránh hiểu nhầm
- Dễ tìm kiếm lỗi khi cần

### Mẫu ghi lỗi

- Subject: [function name] - [short explanation of error]
- Description: step, expected result, actual result
- Thông tin bổ sung: status, priority, assignee, deadline, ...

### Ví dụ 1: bug đơn giản

Ví dụ từ slide:

- Tracker: Bug
- Subject: Trang tìm kiếm - Lỗi chính tả trường "về"
- Description: Trong trang tìm kiếm, trường "Đến" phải là "Vé" (bản OCR có thể đảo chữ, nên hiểu là ví dụ lỗi chính tả label)
- Status: New
- Priority: Low
- Assignee: Do Ngoc

### Ví dụ 2: lỗi điển hình liên quan dữ liệu

Nguyên tắc trình bày:

1. Ghi rõ trình tự thao tác và dữ liệu gây lỗi
2. Mô tả rõ kết quả thực tế
3. Nêu rõ kết quả mong đợi theo đặc tả

Ví dụ từ slide:

- Subject: Trang tìm kiếm - Chưa kiểm tra ngày về sớm hơn ngày đi
- Step 1: Nhập ngày đi là tháng 12
- Step 2: Nhập ngày về là tháng 12 hoặc tháng 6 (để ngày về sớm hơn ngày đi)
- Actual output: màn hình kết quả hiển thị "Xin lỗi đã hết chỗ"
- Expected output: màn hình phải báo dữ liệu ngày không hợp lệ
- Status: New
- Priority: Normal
- Assignee: Do Ngoc

### Ví dụ 3: cách log lỗi kém

Vấn đề:

- Subject mơ hồ, không chỉ ra vị trí lỗi
- Description không nêu rõ lỗi xảy ra ở đâu

Hậu quả:

1. Developer khó xác định lỗi (đặc biệt khi xử lý nhiều task song song)
2. Tiêu đề lỗi tương tự nhau trong hệ thống lớn dễ gây nhầm lẫn hoặc trùng lặp bug log

Ví dụ subject kém: "Sai chính tả"

---

## Dàn ý (lặp lại)

1. 4.1. Định nghĩa và mục tiêu
2. 4.2. Quy trình kiểm thử phần mềm
3. 4.3. Các loại kiểm thử

---

## 4.3. Các loại kiểm thử

### Kiểm thử trong chuỗi Verification và Validation

Sơ đồ trong slide thể hiện:

**Verification phases**

- Requirement Analysis
- Functional Specification
- High-Level Design
- Detailed Design/Program Specification
- Code

**Test planning tương ứng**

- User Acceptance Test Plan
- System Test Plan
- Integrated Test Plan
- Unit Test Plan

**Validation phases**

- Unit Testing
- Integration Testing
- System Testing
- User Acceptance Testing

### Unit testing

- Là hoạt động kiểm thử nhỏ nhất, thực hiện trên hàm hoặc component đơn lẻ.
- Đòi hỏi hiểu thiết kế chương trình và code.
- Do developer thực hiện (không phải tester độc lập).

Định nghĩa unit:

- Thành phần nhỏ nhất có thể kiểm thử của phần mềm, ví dụ: function, class, procedure, method.

### Integration testing

Mục tiêu:

- Phát hiện lỗi giao tiếp giữa các component
- Đồng thời phát hiện lỗi bên trong component (nếu có)

Component có thể là:

- Module
- Ứng dụng đơn lẻ
- Ứng dụng client/server trong mạng

### Chiến lược integration testing

Hệ thống gồm tập các subsystem (tập lớp) được xác định ở bước thiết kế hệ thống.

Thứ tự chọn subsystem để test và tích hợp quyết định loại chiến lược:

1. Big Bang Integration (non-incremental)
2. Bottom-Up Integration
3. Top-Down Integration
4. Sandwich Testing
5. Các biến thể của các phương pháp trên

#### Big-Bang Integration Testing

- Tất cả component được tích hợp và test cùng một lúc.

Ưu điểm:

- Đơn giản về tổ chức ban đầu.

Nhược điểm:

- Khó cô lập nguyên nhân lỗi khi nhiều component lỗi cùng lúc.
- Defect phát hiện muộn ở lớp tích hợp.

#### Top-Down Integration Testing

Bắt đầu test từ lớp trên cùng (ví dụ hàm main hoặc gốc cây gọi).

Sau đó thêm dần các subsystem được gọi/phụ thuộc bởi subsystem đã test; lặp lại đến khi phủ đủ.

Cần **Test Stub**:

- Chương trình/phương thức mô phỏng hành vi input-output của subsystem còn thiếu
- Trả về dữ liệu mô phỏng định trước (canned data)

Ưu điểm:

- Test case bám theo chức năng hệ thống (functional requirements)

Nhược điểm:

- Viết stub khó khi tham số đầu vào phức tạp
- Có thể cần rất nhiều stub nếu tầng thấp có nhiều lời gọi hàm

Biến thể giảm số lượng stub (Bruegge):

- Test độc lập từng layer trước khi tích hợp các layer
- Nhược điểm: cần cả stub và driver

#### Bottom-Up Integration Testing

- Bắt đầu unit test ở tầng thấp nhất (các node lá trong cây phân rã)
- Thêm dần subsystem gọi/phụ thuộc các subsystem đã test
- Lặp lại tới khi tích hợp đủ hệ thống

Cần **Test Driver**:

- Routine giả lập để gọi subsystem và truyền test case vào subsystem đó

Ưu điểm:

- Hiệu quả với:
  - Hệ thống hướng đối tượng
  - Hệ thống thời gian thực
  - Hệ thống yêu cầu hiệu năng cao

Nhược điểm:

- Không tối ưu theo thứ bậc chức năng tổng thể
- Subsystem quan trọng nhất (ví dụ UI) thường bị test muộn

#### Sandwich Testing Strategy

Kết hợp Top-Down và Bottom-Up.

Xem hệ thống gồm 3 lớp:

1. Lớp cần test (lớp giữa)
2. Lớp trên lớp cần test
3. Lớp dưới lớp cần test

Trọng tâm test đặt vào lớp cần test.

Nếu hệ thống có nhiều hơn 3 lớp:

- Dùng heuristic tối thiểu hóa số lượng stub và driver.

### System test

- Là mức kiểm thử khi các module và tích hợp module đã được test.
- Mục tiêu: đánh giá phần mềm có tuân thủ yêu cầu đã đặc tả hay không.

### Taxonomy of System Tests

Các loại system test trong slide:

1. Basic functionality
2. Robustness
3. Inter-operability
4. Performance
5. Scalability
6. Stress
7. Load and stability
8. Reliability
9. Regression
10. Documentation
11. Regulatory

### Software/System Product Quality (cụm chất lượng sản phẩm)

Các thuộc tính chất lượng thể hiện trong slide OCR:

- Functional suitability
  - Functional completeness
  - Functional correctness
  - Functional appropriateness
- Performance efficiency
  - Time behaviour
  - Resource utilization
  - Capacity
- Compatibility
  - Co-existence
  - Interoperability
- Usability
  - Appropriateness recognizability
  - Learnability
  - Operability
  - User error protection
  - User interface aesthetics
  - Accessibility
- Reliability
  - Maturity
  - Availability
  - Fault tolerance
  - Recoverability
- Security
  - Confidentiality
  - Integrity
  - Non-repudiation
  - Accountability
  - Authenticity
- Maintainability
  - Modularity
  - Reusability
  - Analysability
  - Modifiability
  - Testability
- Portability
  - Adaptability
  - Installability
  - Replaceability

Lưu ý: một số từ trong ảnh OCR bị méo chữ, bản dịch chuẩn hóa theo bộ thuộc tính chất lượng phần mềm thông dụng.

### Acceptance testing

- Là mức kiểm thử nhằm đánh giá khả năng chấp nhận của hệ thống.
- Mục tiêu:
  - Đánh giá hệ thống có đáp ứng business requirements không
  - Quyết định hệ thống đã sẵn sàng bàn giao chưa
- Thường do khách hàng thực hiện (hoặc bên thứ ba đại diện khách hàng)

Có hai dạng:

1. **Alpha Test**
   - Người dùng test tại môi trường của nhà phát triển
   - Dev ghi nhận bug/feedback và lên kế hoạch sửa
2. **Beta Test**
   - Gửi phần mềm cho người dùng test trong môi trường thực
   - Bug/feedback được gửi lại cho dev để hiệu chỉnh

---

## Ghi chú thuật ngữ chuyên ngành dùng trong bản dịch

- Software Testing: Kiểm thử phần mềm
- Debugging: Gỡ lỗi
- Test process maturity: Mức trưởng thành quy trình kiểm thử
- Coverage: Mức độ bao phủ kiểm thử
- Shift-left testing: Dịch chuyển kiểm thử sang sớm hơn
- Test basis: Cơ sở kiểm thử
- Test condition: Điều kiện kiểm thử
- Test case: Trường hợp kiểm thử
- Testware: Tài sản kiểm thử
- Traceability: Khả năng truy vết
- Test suite: Bộ kiểm thử
- Test harness: Khung hỗ trợ kiểm thử
- Service virtualization: Ảo hóa dịch vụ phụ thuộc
- Confirmation testing: Kiểm thử xác nhận sửa lỗi
- Regression testing: Kiểm thử hồi quy
- Stub/Driver: Chương trình giả lập phụ trợ tích hợp

---

## Ghi chú về bản OCR

- Tài liệu gốc có nhiều đoạn rơi chữ, xuống dòng sai và lỗi OCR.
- Bản dịch này giữ đầy đủ các mục xuất hiện trong nguồn, không lược bỏ nội dung.
- Các chỗ mơ hồ được diễn giải theo đúng ngữ cảnh môn Đảm bảo chất lượng phần mềm để đảm bảo tính học thuật và khả dụng khi ôn tập.

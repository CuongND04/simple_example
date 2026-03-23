# Chương 4: Kiểm thử phần mềm - Black-box và Metamorphic Testing

## Tài liệu tham khảo

Chương này tham khảo từ sách:
Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers

Học phần: Introduction to Software Testing

Metamorphic Testing: Testing the Untestable
https://research.nottingham.edu.cn/ws/files/31438001/293_combinepdf*2*.pdf

---

## Dàn ý

1. 4.1. Định nghĩa
2. 4.2. Các kỹ thuật kiểm thử Black-box
3. 4.3. Metamorphic testing

## Dàn ý (lặp lại trong slide)

1. 4.1. Định nghĩa
2. 4.2. Các kỹ thuật kiểm thử Black-box
3. 4.3. Metamorphic testing

---

## 4.1. Định nghĩa

### Black-box testing

Black-box testing là kỹ thuật kiểm thử mà người kiểm thử không cần biết mã nguồn bên trong phần mềm.

Black-box testing (còn gọi là behavioral/behavior-based techniques):

- Dựa trên phân tích test basis phù hợp (ví dụ tài liệu yêu cầu chính thức).
- Áp dụng cho cả kiểm thử chức năng và phi chức năng.
- Tập trung vào input và output của đối tượng kiểm thử, không tham chiếu cấu trúc nội bộ.

---

## Test Techniques

Mục tiêu của test technique là hỗ trợ xác định:

- Test conditions
- Test cases
- Test data

Việc chọn kỹ thuật test phụ thuộc vào nhiều yếu tố:

1. Độ phức tạp của component/hệ thống
2. Tiêu chuẩn pháp quy (regulatory standards)
3. Yêu cầu khách hàng hoặc hợp đồng
4. Mức và loại rủi ro
5. Mức độ sẵn có của tài liệu
6. Kiến thức và kỹ năng của tester
7. Công cụ hiện có
8. Thời gian và ngân sách
9. Mô hình vòng đời phát triển phần mềm
10. Loại defect dự kiến trong component/hệ thống

### Test Techniques (tiếp)

- Một số kỹ thuật phù hợp hơn cho một số tình huống và test level cụ thể; một số kỹ thuật dùng được ở mọi mức.
- Khi tạo test case, tester thường kết hợp nhiều kỹ thuật để tối ưu hiệu quả test effort.
- Mức độ hình thức khi áp dụng kỹ thuật test trong test analysis/test design/test implementation có thể dao động từ rất không chính thức (ít hoặc không tài liệu) đến rất chính thức.
- Mức độ hình thức phù hợp phụ thuộc vào ngữ cảnh kiểm thử, bao gồm mức trưởng thành quy trình kiểm thử.

---

## Dàn ý (lặp lại)

1. 4.1. Định nghĩa
2. 4.2. Các kỹ thuật kiểm thử Black-box
3. 4.3. Metamorphic testing

---

## Các kỹ thuật thiết kế test Black-box

1. Equivalence Class Partitioning
2. Boundary Value Analysis
3. Decision Tables
4. State Transition
5. Pairwise testing

## Dàn ý chi tiết theo slide

1. 4.1. Definition and objectives
2. 4.2. Software testing process
3. 4.3. Blackbox testing techniques
4. 4.3.1. Equivalence partitioning technique
5. 4.3.2. Boundary value analysis technique
6. 4.3.3. Decision table technique
7. 4.3.4. State transition testing technique
8. 4.3.5. Pairwise testing technique

Lưu ý: trong slide OCR, dàn ý có lẫn nhãn từ chương trước; bản dịch giữ nguyên thông tin xuất hiện trong nguồn.

---

## 4.3.1. Kỹ thuật Equivalence Partitioning

### Khái niệm

Equivalence partitioning chia dữ liệu thành các partition (equivalence classes).

Tất cả phần tử trong cùng một partition được kỳ vọng xử lý giống nhau.

### Độ bao phủ

Coverage được đo bằng:

- Số partition đã được test bởi ít nhất một giá trị
- Chia cho tổng số partition đã xác định
- Thường biểu diễn theo phần trăm

Equivalence partitioning áp dụng được ở nhiều test level.

### Giá trị hợp lệ và không hợp lệ

Có partition cho cả valid values và invalid values.

- **Valid values**: giá trị hệ thống/component phải chấp nhận.
  - valid equivalence partition: partition chứa giá trị hợp lệ.
- **Invalid values**: giá trị hệ thống/component phải từ chối.
  - invalid equivalence partition: partition chứa giá trị không hợp lệ.

Partition có thể xác định cho mọi phần tử dữ liệu liên quan test object, gồm:

- Input
- Output
- Giá trị nội bộ
- Giá trị liên quan thời gian (trước/sau sự kiện)
- Tham số interface (ví dụ kiểm thử tích hợp giữa các component)

Khi cần, có thể chia tiếp partition thành sub-partition.

Mỗi giá trị phải thuộc **một và chỉ một** equivalence partition.

### Ví dụ 1: điều kiện đầu vào là khoảng giá trị

Yêu cầu: "Giá trị x chỉ trong khoảng 0 đến 100".

- Valid class: 0 <= x <= 100
- Invalid class 1: x < 0
- Invalid class 2: x > 100

### Ví dụ 2: điều kiện đầu vào là số lượng

Yêu cầu: "Chỉ đăng ký từ một đến sáu người".

- Valid class: từ 1 đến 6 người
- Invalid classes: 0 người, hoặc hơn 6 người

### Ví dụ 3: điều kiện đầu vào là tập giá trị

Yêu cầu: "Phương tiện đăng ký gồm bus, coach, truck, taxi, motorbike".

- 5 valid classes tương ứng 5 loại phương tiện
- 1 invalid class: phương tiện ngoài danh sách, ví dụ bicycle

---

## Dàn ý (lặp lại)

1. 4.1. Definition and objectives
2. 4.2. Software testing process
3. 4.3. Blackbox testing techniques
4. 4.3.1. Equivalence partitioning technique
5. 4.3.2. Boundary value analysis technique
6. 4.3.3. Decision table technique
7. 4.3.4. State transition testing technique
8. 4.3.5. Pairwise testing technique

---

## 4.3.2. Kỹ thuật Boundary Value Analysis (BVA)

### Khái niệm

BVA là mở rộng của equivalence partitioning, nhưng chỉ dùng được khi partition có thứ tự (dữ liệu số hoặc dữ liệu tuần tự).

Giá trị nhỏ nhất/lớn nhất (hoặc đầu/cuối) của partition là boundary values.

Hành vi ở biên thường dễ sai hơn hành vi bên trong partition.

BVA áp dụng được ở mọi test level và hay dùng cho yêu cầu có khoảng số (kể cả ngày/giờ).

### Độ bao phủ biên

Boundary coverage cho một partition được đo bằng:

- Số boundary values đã test
- Chia cho tổng số boundary values đã xác định

### Ví dụ

Giả sử một input field chỉ nhận số nguyên, và bàn phím đầu vào đã chặn non-integer.

Miền hợp lệ: 1 đến 5 (bao gồm cả 1 và 5).

Khi đó có 3 partition:

1. Invalid (quá thấp)
2. Valid
3. Invalid (quá cao)

Boundary values:

- Partition valid: 1 và 5
- Partition invalid quá cao: 6
- Partition invalid quá thấp: 0 (partition này chỉ có một phần tử biên)

Một biến thể kỹ thuật dùng 3 điểm cho mỗi biên:

- Giá trị ngay trước biên
- Giá trị tại biên
- Giá trị ngay sau biên

Trong ví dụ trên:

- Biên dưới: 0, 1, 2
- Biên trên: 4, 5, 6

---

## Dàn ý (lặp lại)

1. 4.1. Definition and objectives
2. 4.2. Software testing process
3. 4.3. Blackbox testing techniques
4. 4.3.1. Equivalence partitioning technique
5. 4.3.2. Boundary value analysis technique
6. 4.3.3. Decision table technique
7. 4.3.4. State transition testing technique
8. 4.3.5. Pairwise testing technique

---

## 4.3.3. Kỹ thuật Decision Table

### Khái niệm

Decision table là cách tốt để ghi lại các business rules phức tạp mà hệ thống phải triển khai.

Khi tạo decision table, tester xác định:

- Conditions (thường là input)
- Actions tương ứng (thường là output)

Các conditions/actions tạo thành các hàng (rows), thường conditions ở trên và actions ở dưới.

Mỗi cột (column) tương ứng một decision rule: một tổ hợp điều kiện duy nhất dẫn tới tập action tương ứng.

Giá trị conditions/actions thường thể hiện bằng:

- Boolean (true/false)
- Hoặc giá trị rời rạc (discrete values)

### Ký hiệu thường dùng

**Với conditions:**

- Y: điều kiện đúng (cũng có thể ghi T hoặc 1)
- N: điều kiện sai (cũng có thể ghi F hoặc 0)
- - : điều kiện không quan trọng (don't care, có thể ghi N/A)

**Với actions:**

- X: action phải xảy ra (cũng có thể ghi Y/T/1)
- Để trống: action không xảy ra

### Độ bao phủ

Full decision table có đủ cột để bao trùm mọi tổ hợp điều kiện.

Mức bao phủ tối thiểu phổ biến:

- Có ít nhất 1 test case cho mỗi decision rule.

Coverage được đo bằng:

- Số decision rules đã được test bởi ít nhất 1 test case
- Chia tổng số decision rules
- Biểu diễn theo phần trăm

### Điểm mạnh của Decision Table Testing

- Giúp nhận diện đầy đủ các tổ hợp điều kiện quan trọng, kể cả tổ hợp dễ bị bỏ sót.
- Giúp phát hiện lỗ hổng trong yêu cầu.
- Áp dụng được ở mọi test level, cho các tình huống mà hành vi phụ thuộc tổ hợp điều kiện.

### Ví dụ

Khuyến mãi cho chủ xe nếu thỏa **ít nhất 1 trong 2 điều kiện**:

- Đã kết hôn
- Là sinh viên giỏi

Mỗi input là logic value, nên decision table có 4 cột (4 rules):

- Rule 1: Married=Yes, GoodStudent=Yes -> Discount=60
- Rule 2: Married=Yes, GoodStudent=No -> Discount=25
- Rule 3: Married=No, GoodStudent=Yes -> Discount=50
- Rule 4: Married=No, GoodStudent=No -> Discount=0

---

## Dàn ý (lặp lại)

1. 4.1. Definition and objectives
2. 4.2. Software testing process
3. 4.3. Blackbox testing techniques
4. 4.3.1. Equivalence partitioning technique
5. 4.3.2. Boundary value analysis technique
6. 4.3.3. Decision table technique
7. 4.3.4. State transition testing technique
8. 4.3.5. Pairwise testing technique

---

## 4.3.4. Kỹ thuật State Transition Testing

### Khái niệm

State transition diagram mô tả:

- Các trạng thái có thể của phần mềm
- Cách hệ thống vào trạng thái, thoát trạng thái và chuyển trạng thái

Transition được kích hoạt bởi event (ví dụ người dùng nhập giá trị), và event tạo ra chuyển trạng thái.

Cùng một event có thể tạo 2 hoặc nhiều transition khác nhau từ cùng một state.

State change có thể làm phần mềm thực hiện action (ví dụ xuất kết quả tính toán hoặc thông báo lỗi).

State transition table mô tả:

- Các valid transitions
- Các transition có thể invalid
- Event tương ứng
- Action cho valid transitions

Thông thường state transition diagram chỉ hiển thị valid transitions, bỏ invalid transitions.

### Thiết kế test theo state transition

Có thể thiết kế test để:

1. Bao phủ một chuỗi trạng thái điển hình
2. Bao phủ tất cả trạng thái
3. Bao phủ mọi transition
4. Bao phủ chuỗi transition cụ thể
5. Kiểm thử invalid transitions

### Ứng dụng

- Ứng dụng menu-based
- Ngành phần mềm nhúng (embedded)
- Mô hình hóa business scenario có trạng thái cụ thể
- Kiểm thử điều hướng màn hình

State là khái niệm trừu tượng:

- Có thể biểu diễn vài dòng code
- Hoặc cả một quy trình nghiệp vụ

Coverage thường đo theo:

- Số trạng thái đã nhận diện được test
- Hoặc số transition đã nhận diện được test

### Ví dụ: module đặt vé máy bay

Slide nêu module có 6 trạng thái và các event/action chuyển trạng thái (bản OCR có lỗi ký tự ở vài nhãn).

Các trạng thái thường thấy trong sơ đồ:

- Made
- Paid
- Ticketed
- Used
- Cancelled By Customer
- Cancelled Non-Pay

Các event/action minh họa:

- giveInfo/startPayTimer
- payMoney
- payTimerExpires
- printTicket
- giveTicket
- cancel/refund
- returnTicket/refund

### Mức bao phủ theo ví dụ

**Coverage level 1:**

- Tạo test case sao cho mỗi state xuất hiện ít nhất một lần.
- Ví dụ trong slide: 3 đường đi đạt level 1 coverage.

**Coverage level 2:**

- Tạo test case sao cho mỗi event xảy ra ít nhất một lần.
- Ví dụ trong slide: 3 đường đi đạt level 2 coverage.

**Testing level 3:**

- Tạo path sao cho mọi transition path đều được test.
- Transition path: đường chuyển trạng thái xác định từ input state đến end state.
- Đây là coverage cao nhất vì vét hết khả năng, nhưng thường không khả thi khi có loop.

**Testing level 4:**

- Tạo path sao cho mọi linear transition path được test.

---

## Dàn ý (lặp lại)

1. 4.1. Definition and objectives
2. 4.2. Software testing process
3. 4.3. Blackbox testing techniques
4. 4.3.1. Equivalence partitioning technique
5. 4.3.2. Boundary value analysis technique
6. 4.3.3. Decision table technique
7. 4.3.4. State transition testing technique
8. 4.3.5. Pairwise testing technique

---

## 4.3.5. Kỹ thuật Pairwise Testing

### Ý tưởng

Trong thực tế, nhiều lỗi phát sinh từ tổ hợp giá trị của **cặp tham số đầu vào**.

### Phương pháp

1. Chọn tập input parameters và các giá trị tương ứng.
2. Tạo mọi tổ hợp pairwise giữa 2 tham số.
3. Xây test set sao cho bao phủ hết các cặp đã xác định.

### Ví dụ: tab View Options của Microsoft PowerPoint

Slide minh họa tab View Preferences với 7 thuộc tính:

1. Vertical_Ruler: Visible, InVisible
2. Ruler_Units: Inches, Centimeters, Points, Picas
3. Default_View: Normal, Slide, Outline
4. SS_Navigator: Popup, None
5. End_With_Black: Yes1, No1
6. Always_Mirror: Yes2, No2
7. Warn_Before: Yes3, No3

Nếu test toàn bộ tổ hợp:
2 _ 4 _ 3 _ 2 _ 2 _ 2 _ 2 = 384 test cases

Các cặp cần bao phủ ví dụ:

- (Visible, Inches)
- (Visible, Centimeters)
- ...
- (No2, No3)

Slide đưa một test suite pairwise (tạo bằng công cụ pairwise) bao phủ mọi cặp có thể.

Lưu ý: một số giá trị trong bảng OCR bị lỗi chính tả (Nomal, Non, Centimetes, ...), bản dịch giữ nguyên ý nghĩa kỹ thuật.

---

## Dàn ý (lặp lại)

1. 4.1. Definition
2. 4.2. Blackbox testing techniques
3. 4.3. Metamorphic testing

---

## 4.3. Metamorphic Testing

### Chương trình testable và untestable

**Testable programs:**
Một chương trình được xem là testable nếu output của mọi input có thể được xác minh.

Ví dụ đơn giản:

- 4 \* 7 = 28 (slide OCR ghi 27, đây là lỗi hiển nhiên trong nguồn)

**Untestable programs (non-testable):**
Chương trình được xem là untestable nếu output của một số input không thể xác minh trực tiếp.

Ví dụ:

- Tính trung bình của 100 triệu số thực
- Compiler
- Search engine
- Hệ machine learning
- Simulator

### Test oracle problem

**Test oracle** là cơ chế có thể quyết định output chương trình đúng hay sai trong thời gian hợp lý.

**Test oracle problem** xảy ra khi:

1. Không có test oracle
2. Có oracle nhưng quá đắt để áp dụng

### Ý tưởng Metamorphic Testing

Trong nhiều trường hợp ta không biết output đúng của từng input đơn lẻ.

Khi đó có thể khai thác mối quan hệ giữa các input liên quan và output tương ứng.

Ví dụ:

- Nếu tổng của 100 triệu số thực là S
- Khi thêm một số m vào tập số
- Tổng mới phải là S + m

### Quy trình Metamorphic Testing

1. Tạo và chạy source test cases (test gốc ban đầu)
2. Xác định các thuộc tính của bài toán, tức các MRs (metamorphic relations)
3. Tạo và chạy follow-up test cases từ source test cases bằng các MR đã xác định
4. Xác minh các MR

Case study tham khảo:
https://research.nottingham.edu.cn/ws/files/31438001/293_combinepdf_2_.pdf

### Ví dụ quy trình

Bài toán: chương trình tính tổng một danh sách số.

- Source test input: (2, 1, ..., 8, 5)
- Actual output: 100 (theo slide)

MR giả định:

- Nếu thêm một số a vào input, output phải tăng đúng a.

Follow-up test case:

- Input: (2, 1, ..., 8, 5, 25)
- Expected output: 125 = 100 + 25

Kiểm tra MR:

- Khi chạy follow-up test, actual output = 124
- 124 != 125, MR không thỏa
- Kết luận: chương trình có thể chứa lỗi

---

## Ghi chú thuật ngữ chuyên ngành

- Black-box testing: kiểm thử hộp đen
- Behavioral testing: kiểm thử hành vi
- Equivalence partitioning: phân hoạch tương đương
- Boundary value analysis (BVA): phân tích giá trị biên
- Decision table: bảng quyết định
- State transition testing: kiểm thử chuyển trạng thái
- Pairwise testing: kiểm thử cặp giá trị tham số
- Test oracle: cơ chế đối chiếu kết quả đúng/sai
- Metamorphic relation (MR): quan hệ biến hình
- Source test case: ca kiểm thử nguồn/gốc
- Follow-up test case: ca kiểm thử dẫn xuất

---

## Ghi chú về nguồn OCR

- Tài liệu gốc chứa lỗi OCR, xuống dòng sai, ký tự nhiễu và một số chỗ thiếu chữ.
- Bản dịch này giữ đầy đủ tất cả mục đã xuất hiện trong nguồn và diễn giải nhất quán theo ngữ cảnh môn Đảm bảo chất lượng phần mềm.
- Chỗ nào OCR sai rõ ràng được đánh dấu để tránh hiểu sai học thuật.

# Chương 1: Giới thiệu về đảm bảo chất lượng phần mềm

## Tài liệu tham khảo

Chương này tham khảo từ cuốn:
**Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers**

**Phần học:** Introduction to Software Testing

## Dàn ý

1. 1.1. Phần mềm là gì?
2. 1.2. Phân loại nguyên nhân gây lỗi phần mềm
3. 1.3. Đảm bảo chất lượng phần mềm (SQA) - định nghĩa và mục tiêu
4. 1.4. Các yếu tố chất lượng phần mềm
5. 1.5. Các yếu tố ảnh hưởng đến cường độ hoạt động đảm bảo chất lượng

## Dàn ý (lặp lại trong tài liệu gốc)

1. 1.1. Phần mềm là gì?
2. 1.2. Phân loại nguyên nhân gây lỗi phần mềm
3. 1.3. Đảm bảo chất lượng phần mềm (SQA) - định nghĩa và mục tiêu
4. 1.4. Các yếu tố chất lượng phần mềm
5. 1.5. Các yếu tố ảnh hưởng đến cường độ hoạt động đảm bảo chất lượng

---

## 1.1. Phần mềm là gì?

### Định nghĩa phần mềm

Định nghĩa phần mềm không hề đơn giản. Có phải chỉ là mã nguồn (code) không?

Theo IEEE:

> Phần mềm là: các chương trình máy tính, các thủ tục (procedures), và có thể bao gồm tài liệu cùng dữ liệu liên quan đến việc vận hành một hệ thống máy tính.

Một định nghĩa tương tự từ ISO:

Theo ISO (ISO 9000-3), có 4 thành phần cần thiết để đảm bảo chất lượng của quá trình phát triển và nhiều năm bảo trì phần mềm:

- Chương trình máy tính (code)
- Thủ tục/quy trình (procedures)
- Tài liệu (documentation)
- Dữ liệu cần thiết để vận hành hệ thống phần mềm

### Tổng quan về phần mềm

Có hai loại phần mềm cơ bản:

- **Phần mềm hệ thống (Systems Software):** tập hợp chương trình hỗ trợ hệ thống máy tính bằng cách điều phối hoạt động phần cứng và ứng dụng. Phần mềm hệ thống thường được viết cho tập phần cứng cụ thể, đặc biệt là CPU.
- **Phần mềm ứng dụng (Application Software):** tập hợp chương trình giải quyết các bài toán cụ thể hướng tới người dùng.

Sơ đồ phân loại trong tài liệu gốc (đã OCR):

- Systems Software
  - Operating Systems
  - Utility Programs
- Application Software
  - Proprietary Software
  - Off-the-shelf Software

### Hệ điều hành (Operating Systems)

Hệ điều hành là tập hợp chương trình máy tính điều khiển phần cứng và đóng vai trò giao diện giữa phần cứng với chương trình ứng dụng.

Các hoạt động chính của hệ điều hành:

- Thực hiện các chức năng phần cứng thông dụng như lưu dữ liệu lên đĩa
- Cung cấp giao diện người dùng (ví dụ GUI của Windows XP)
- Cung cấp tính độc lập phần cứng bằng cách làm lớp trung gian giữa ứng dụng và phần cứng
- Quản lý bộ nhớ hệ thống để kiểm soát truy cập và sử dụng bộ nhớ
- Quản lý tác vụ xử lý, ví dụ cho phép chạy đa nhiệm
- Kiểm soát quyền truy cập tài nguyên hệ thống, ví dụ bằng mật khẩu

### Các loại phần mềm ứng dụng

Trong tài liệu gốc có phân nhóm:

- Proprietary Software
- Off-the-shelf Software
- In-house developed
- Contract
- Customized Package
- Standard Package

### Dàn ý (xuất hiện lại trong bản gốc)

1. 1.1. Phần mềm là gì?
2. 1.2. Phân loại nguyên nhân gây lỗi phần mềm
3. 1.3. Đảm bảo chất lượng phần mềm (SQA) - định nghĩa và mục tiêu
4. 1.4. Các yếu tố chất lượng phần mềm
5. 1.5. Các yếu tố ảnh hưởng đến cường độ hoạt động đảm bảo chất lượng

---

## 1.2. Phân loại nguyên nhân gây lỗi phần mềm

### Error, Fault, Failure

**Software Error**

- Lỗi cú pháp (syntax/grammatical error)
- Lỗi logic (ví dụ dùng phép nhân thay vì phép cộng cho hai toán hạng)

**Software Fault**

- Không phải mọi error đều ngay lập tức gây fault quan sát được
- Đoạn mã chứa lỗi có thể chưa được thực thi (lỗi tồn tại nhưng chưa bị kích hoạt)

**Software Failure**

- Fault trở thành failure khi/ nếu được kích hoạt trong quá trình chạy
- Fault có thể được phát hiện tùy cách thực thi phần mềm hoặc các ràng buộc khi chạy (ví dụ tùy chọn thực thi)

Chuỗi tiến hóa lỗi trong quá trình phát triển:

- Software development process -> software error -> software fault -> software failure

### Ví dụ cụ thể trong tài liệu

- **Fault:** đáng lẽ phải bắt đầu tìm từ chỉ số `0`, nhưng lại bắt đầu từ `1`

```java
public static int numZero (int [ ] arr)
{ // Effects: If arr is null throw NullPointerException
  // else return the number of occurrences of 0 in arr
  int count = 0;
  for (int i = 1; i < arr.length; i++)
  {
    if (arr[i] == 0)
      count++;
  }
  return count;
}
```

Diễn giải từ bản gốc:

- Error: `i` bằng `1` thay vì `0` ở vòng lặp đầu tiên
- Failure có thể chưa xảy ra tùy test

**Test 1**

- Input: `[2,7,0]`
- Expected: `1`
- Actual: `1` -> PASS

**Test 2**

- Input: `[0,2,7]` (bản OCR hiển thị `[0.2,7]`, khả năng lỗi nhận dạng ký tự)
- Expected: `1`
- Actual: `0` -> FAIL

Giải thích lan truyền lỗi:

- Error tại biến đếm vòng lặp -> lan đến biến `count` -> failure thể hiện tại câu lệnh `return`

---

## Nguyên nhân gây lỗi phần mềm (Causes of Software Error)

### 1) Đặc tả yêu cầu sai (Faulty requirements definition)

Thường được xem là nguyên nhân gốc rễ lớn nhất của lỗi phần mềm.

Các dạng thường gặp:

- Định nghĩa yêu cầu sai (sai công thức, sai quy tắc)
- Định nghĩa không đầy đủ
- Yêu cầu mơ hồ hoặc ngầm định
- Thiếu yêu cầu
- Đưa vào yêu cầu không cần thiết

Tác động:

- Tăng chi phí, tăng độ phức tạp, kéo dài thời gian phát triển

### 2) Thất bại trong giao tiếp khách hàng - nhà phát triển

- Hiểu sai chỉ dẫn trong tài liệu yêu cầu
- Hiểu sai các thay đổi bằng văn bản trong quá trình phát triển
- Hiểu sai các thay đổi bằng lời nói trong quá trình phát triển
- Thiếu chú ý tới thông điệp từ phía khách hàng
- Khách hàng thiếu chú ý phản hồi câu hỏi từ phía nhà phát triển

Nhận xét trong bản gốc:

- Khách hàng đại diện cho người dùng; nhà phát triển thường có tư duy rất khác

### 3) Cố ý lệch khỏi yêu cầu phần mềm

- Lập trình viên tái sử dụng mã cũ/tương tự để tiết kiệm thời gian
- Mã tái sử dụng thường cần chỉnh sửa nhưng có thể không được chỉnh đủ
- Có thể chứa mã thừa/không dùng được

Theo tài liệu:

- Có thể cố tình lược bỏ chức năng do áp lực thời gian/chi phí
- Có thể tự ý thêm "nâng cấp" chưa được phê duyệt (perfective coding)
- Có thể bỏ qua các tính năng tưởng là nhỏ nhưng thực tế quan trọng

Hậu quả:

- Kiểm thử hệ thống sẽ phát hiện và gây vấn đề trong review/đánh giá

### 4) Lỗi thiết kế logic

- Mô tả yêu cầu bằng thuật toán sai
- Sai công thức, sai bảng quyết định, sai toán tử/toán hạng, sai mô tả text
- Quy trình được analyst mô tả không phản ánh đúng nghiệp vụ thực tế

Lưu ý từ tài liệu:

- Không phải mọi lỗi đều là lỗi phần mềm thuần túy

Một nguồn lỗi phổ biến:

- Định nghĩa điều kiện biên sai (boundary condition)
- Ví dụ các cụm ràng buộc tuyệt đối như: "không quá", "ít hơn", "n lần trở lên", "lần đầu tiên", ...

### 4) Lỗi thiết kế logic (tiếp)

- Bỏ sót trạng thái hệ thống bắt buộc
- Ví dụ điều kiện kiểu: nếu rank >= 01 và RPI là số thì... (dễ sót hành động theo trạng thái)
- Bỏ sót định nghĩa phản ứng khi hệ thống bị vận hành sai/không hợp lệ
- Có phát hiện thao tác bất hợp pháp nhưng không thiết kế phản ứng tương ứng
  - Ví dụ: kết thúc an toàn (graceful termination), cảnh báo/alarm, ...

### 5) Lỗi lập trình (Coding errors)

- Rất nhiều loại
- Lỗi cú pháp
- Lỗi logic (chạy được nhưng kết quả sai)
- Lỗi runtime (sập khi chạy)

### 6) Không tuân thủ tài liệu và quy chuẩn coding

- Không tuân thủ mẫu biểu/tài liệu chuẩn (template, structure)
- Không tuân thủ coding standards (quy tắc đặt tên thuộc tính, ...)
- Vấn đề kích thước chương trình
- Ràng buộc tương thích môi trường với chương trình khác
- Chuẩn dữ liệu/mã dữ liệu
- Thiếu hoặc sai tài liệu vận hành/hướng dẫn bắt buộc

Vai trò đội SQA:

- Không chỉ kiểm tra phần mềm thực thi
- Còn kiểm chuẩn coding, manual, message hiển thị, tài nguyên cần dùng, quy ước tên file/chương trình, ...

### 7) Thiếu sót trong quá trình kiểm thử

Đây thường là phần bị cắt ngắn nhiều nhất khi chạy theo deadline.

Các thiếu sót điển hình:

- Kế hoạch test không đầy đủ
- Một số phần ứng dụng chưa test hoặc test chưa kỹ
- Không ghi nhận/báo cáo đầy đủ error và fault đã phát hiện
- Chậm sửa fault do mô tả lỗi không rõ ràng
- Không sửa được lỗi vì hạn chế thời gian

### 8) Lỗi giao diện người dùng và quy trình sử dụng

Bao gồm lỗi tài liệu:

- Lỗi trong tài liệu thiết kế
- Gây khó khăn cho tái thiết kế và tái sử dụng
- Lỗi trong tài liệu hướng dẫn người dùng
- Lỗi trong trợ giúp trực tuyến (on-line help)
- Liệt kê chức năng phần mềm không tồn tại
  - Chức năng được lên kế hoạch sớm nhưng đã bỏ, tài liệu vẫn còn
- Nhiều thông điệp lỗi vô nghĩa hoặc khó hiểu

### Tóm tắt danh sách nguyên nhân trong tài liệu

Bản gốc ghi "nine causes", nhưng đoạn OCR hiển thị rõ 8 mục trước đó; dòng thứ 7 bị OCR lỗi chữ:

1. Faulty requirements definition
2. Client-developer communication failures
3. Deliberate deviations from software requirements
4. Logical design errors
5. Coding errors
6. Non-compliance with documentation and coding instructions
7. Shortcomings of the testing process (OCR gốc: "testina nrocess")
8. User interface and procedure errors
9. (Không hiển thị trọn vẹn trong bản OCR hiện có)

---

## 1.3. Đảm bảo chất lượng phần mềm (SQA): định nghĩa và mục tiêu

### Khái niệm chất lượng phần mềm

**Theo Philip Crosby:**

- Mức độ mà hệ thống/thành phần/quy trình đáp ứng các yêu cầu đã chỉ định.

**Theo Joseph M. Juran:**

- Mức độ mà hệ thống/thành phần/quy trình đáp ứng nhu cầu hoặc kỳ vọng của khách hàng/người dùng.

### Phân tích sâu hơn

- Cách hiểu theo đặc tả nhấn mạnh: đáp ứng specification.
- Cách hiểu theo người dùng nhấn mạnh: đáp ứng nhu cầu thực.
- Thực tế triển khai cho thấy hệ thống có thể "đúng spec" nhưng vẫn chưa làm khách hàng hài lòng.
- Ngược lại, nếu chỉ chạy theo kỳ vọng người dùng mà không quản trị trách nhiệm đặc tả cũng có rủi ro.

### Định nghĩa SQA

SQA là:

- Tập hợp hành động có kế hoạch và có hệ thống để tạo mức độ tin cậy đủ rằng sản phẩm phù hợp các yêu cầu kỹ thuật đã thiết lập.
- Tập hoạt động nhằm đánh giá quá trình phát triển/sản xuất sản phẩm.
- Phân biệt với chất lượng kiểm soát (quality control).

### SQA theo IEEE (diễn giải)

- Cần lập kế hoạch và triển khai có hệ thống
- Giúp theo dõi tiến độ và tạo niềm tin sản phẩm đi đúng hướng
- Liên quan trực tiếp tới quy trình phát triển phần mềm (methodology)
- Gắn với yêu cầu kỹ thuật phải được đặc tả rõ
- Bao gồm cả phát triển và nhiều năm bảo trì
- Bao gồm cả lập lịch và lập ngân sách
- Cần có cơ chế xử lý khi gặp áp lực tiến độ/nguồn lực

### Định nghĩa mở rộng trong tài liệu

SQA là tập hành động có hệ thống, có kế hoạch để đảm bảo với mức tin cậy đủ rằng:

- Quá trình phát triển hoặc bảo trì sản phẩm phần mềm đáp ứng yêu cầu kỹ thuật chức năng đã thiết lập
- Đồng thời đáp ứng yêu cầu quản lý về tiến độ và giới hạn ngân sách

### SQA và SQC khác nhau thế nào?

**Quality Control (SQC):**

- Tập trung đánh giá chất lượng sản phẩm/hoạt động đầu ra
- Có các đợt inspection trong phát triển và trước triển khai
- QC chỉ là một phần trong toàn bộ QA

**Quality Assurance (SQA):**

- Mục tiêu là tối thiểu hóa chi phí đảm bảo chất lượng bằng hoạt động xuyên suốt vòng đời
- Nhấn mạnh phòng ngừa nguyên nhân lỗi
- Phát hiện và sửa lỗi sớm trong quá trình phát triển
- Giảm tỷ lệ sản phẩm không đạt chất lượng trước khi phát hành

### Mục tiêu hoạt động SQA trong phát triển phần mềm

1. Đảm bảo mức độ tin cậy chấp nhận được rằng phần mềm phù hợp yêu cầu kỹ thuật chức năng.
2. Đảm bảo mức độ tin cậy chấp nhận được rằng phần mềm phù hợp yêu cầu quản lý về tiến độ và ngân sách.
3. Khởi tạo và quản lý các hoạt động cải tiến hiệu suất, hiệu quả của phát triển phần mềm và SQA.

### Mục tiêu hoạt động SQA trong bảo trì phần mềm (hướng sản phẩm)

1. Đảm bảo mức độ tin cậy chấp nhận được rằng các hoạt động bảo trì đáp ứng yêu cầu kỹ thuật chức năng.
2. Đảm bảo mức độ tin cậy chấp nhận được rằng các hoạt động bảo trì đáp ứng yêu cầu quản lý về tiến độ và ngân sách.
3. Khởi tạo và quản lý hoạt động cải tiến hiệu quả bảo trì và SQA.

---

## 1.4. Các yếu tố chất lượng phần mềm

### Tài liệu yêu cầu (Requirements Document)

Tài liệu đặc tả yêu cầu là một trong những thành phần quan trọng nhất để đạt chất lượng phần mềm.

Các ý chính trong tài liệu:

- Cần hiểu một tài liệu yêu cầu "tốt" gồm những gì
- Các mô hình SQA gợi ý khoảng 11-15 yếu tố chất lượng
- Cần hiểu các yếu tố chất lượng và bên liên quan nào quan tâm tới chúng
- Nhu cầu yêu cầu chất lượng toàn diện xuất hiện trong nhiều case study

### Nhu cầu về yêu cầu chất lượng toàn diện

- Cần cải thiện tài liệu yêu cầu kém chất lượng
- Thường thiếu các yếu tố như usability, reusability, maintainability, ...
- Ngành phần mềm gom nhóm các thuộc tính chất lượng thành "quality factors"
- Nhiều yếu tố được xem là yêu cầu phi chức năng (non-functional requirements)
- Mức độ ưu tiên các yếu tố có thể không giống nhau giữa các dự án
- Ví dụ yếu tố thường thay đổi theo ngữ cảnh: scalability, maintainability, reliability, portability

### Nhận xét thêm (Extra Thoughts)

- Trong Software Engineering, thường tập trung mạnh vào yêu cầu chức năng
- Yêu cầu phi chức năng đôi khi được chú ý chưa tương xứng
- Hiện nay chất lượng phi chức năng ngày càng được nhấn mạnh
- Có thể là yếu tố quyết định việc thỏa mãn yêu cầu tổng thể
- Trong RUP, yêu cầu phi chức năng được ghi trong SRS cùng với yêu cầu chức năng

---

## Mô hình yếu tố chất lượng của McCall

McCall đề xuất 11 yếu tố, chia thành 3 nhóm:

### Nhóm 1: Product Operation Factors

Đánh giá phần mềm chạy tốt thế nào:

- Correctness
- Reliability
- Efficiency
- Integrity
- Usability

### Nhóm 2: Product Revision Factors

Đánh giá khả năng thay đổi, kiểm thử lại, tái triển khai:

- Maintainability
- Flexibility
- Testability

### Nhóm 3: Product Transition Factors

Đánh giá khả năng chuyển môi trường và tích hợp:

- Portability
- Reusability
- Interoperability

Tài liệu nhấn mạnh: đây là nền tảng của khái niệm quality factors, dù các mô hình sau có đổi tên hoặc thêm bớt.

### Product Operation Factors (chi tiết)

#### 1) Correctness

Vấn đề correctness gắn chặt với tài liệu yêu cầu và đặc tả đầu ra.

Ví dụ:

- Đặc tả độ chính xác đầu ra (ví dụ tỷ lệ lỗi không lớn hơn 1%)
- Đặc tả tính đầy đủ đầu ra
- Đặc tả tính kịp thời của đầu ra
- Đặc tả chuẩn coding và chuẩn tài liệu

#### 2) Reliability requirements

Liên quan tới xác suất/tần suất không cung cấp được dịch vụ (failure).

Ví dụ đặc tả:

- Hệ thống theo dõi tim có failure rate < 1/1,000,000 ca
- Tổng downtime không quá 10 phút/tháng
- Dùng các chỉ số MTBF và MTTR (cổ điển nhưng vẫn hữu dụng)

#### 3) Efficiency requirements

Liên quan tài nguyên phần cứng cần để thực thi chức năng:

- MIPS
- MHz (chu kỳ/giây)
- Dung lượng lưu trữ MB/TB
- Băng thông truyền thông KBPS/MBPS/GBPS

Ví dụ đặc tả: truyền thông rất chậm gây nghẽn hiệu năng.

#### 4) Integrity

Liên quan bảo mật hệ thống, ngăn truy cập trái phép.

Tài liệu nhấn mạnh:

- Cyber security
- Internet security
- Network security
- Các phạm vi này liên quan nhưng không hoàn toàn đồng nhất

#### 5) Usability requirements

Liên quan nguồn lực cần để đào tạo nhân viên mới và vận hành hệ thống.

Gồm các khía cạnh:

- Learnability
- Utility
- Usability

Ví dụ: một nhân sự phải xử lý được `n` giao dịch trên một đơn vị thời gian.

### Product Revision Factors (chi tiết)

Nhóm này ảnh hưởng toàn bộ hoạt động bảo trì phần mềm:

- Corrective maintenance
- Adaptive maintenance
- Perfective maintenance

#### 1) Maintainability requirements

Mức nỗ lực cần để:

- Xác định nguyên nhân failure
- Sửa failure
- Xác nhận sửa lỗi thành công

Liên quan tới:

- Cấu trúc module
- Tài liệu nội bộ chương trình
- Manual cho lập trình viên
- Thiết kế kiến trúc và thiết kế chi tiết cùng tài liệu đi kèm

Ví dụ đặc tả: kích thước module <= 30 câu lệnh.

#### 2) Flexibility requirements

Liên quan nguồn lực để điều chỉnh phần mềm cho các nhóm khách hàng khác nhau.

Lưu ý:

- Có thể cần một phần perfective maintenance để cải thiện theo môi trường khách hàng
- Khách hàng khác nhau sẽ "exercise" hệ thống khác nhau

#### 3) Testability requirements

Các câu hỏi trọng tâm:

- Có định nghĩa sẵn kết quả trung gian để hỗ trợ test không?
- Có tạo log file không? Có backup không?
- Hệ thống có tự chẩn đoán trước và trong khi vận hành không?

### Product Transition Factors (chi tiết)

#### 1) Portability requirements

Nếu phần mềm phải chạy trên môi trường khác (phần cứng, hệ điều hành, ...), đồng thời vẫn duy trì môi trường hiện có, thì portability là bắt buộc.

#### 2) Reusability requirements

Có tái sử dụng được các phần của ứng dụng cho ứng dụng mới không?

Lợi ích:

- Tiết kiệm lớn chi phí phát triển
- Tận dụng thành phần đã test/chứng minh
- Tăng tốc phát triển và tăng chất lượng

#### 3) Interoperability requirements

Ứng dụng có cần tích hợp với hệ thống hiện có hay không?

Các điểm cần lưu ý:

- Nhiều trường hợp biết trước và có thể thiết kế sẵn từ đầu
- Có thể phải tích hợp giữa nền tảng, CSDL, công nghệ rất khác nhau
- Có thể có chuẩn ngành/chuẩn cấu trúc ứng dụng cần tuân thủ

---

## Các mô hình thay thế (Alternatives)

Một số chuyên gia SQA đề xuất mô hình với cách đặt tên khác hoặc thêm yếu tố mới.

- Có mô hình 12 yếu tố
- Có mô hình 15 yếu tố
- Tổng cộng có thêm 5 yếu tố mới thường được nhắc tới

Evans và Marciniak bổ sung:

- Verifiability
- Expandability

Deutsch và Willis bổ sung:

- Safety
- Manageability
- Survivability

### Bảng yếu tố theo mô hình thay thế (dịch từ bản OCR)

Danh sách yếu tố chất lượng:

1. Correctness
2. Reliability
3. Efficiency
4. Integrity
5. Usability
6. Maintainability
7. Flexibility
8. Testability
9. Portability
10. Reusability
11. Interoperability
12. Verifiability
13. Expandability
14. Safety
15. Manageability
16. Survivability

Các cụm trong bản OCR về Product Quality (có lỗi ký tự):

- Functional Compatibility
- Usability
- Reliability
- Maintainability
- Security
- Portability
- Appropriateness
- Confidentiality
- Modifiability
- Analysability
- Adaptability
- Replaceability
- Protection

---

## Dàn ý (xuất hiện lại)

1. 1.1. Phần mềm là gì?
2. 1.2. Phân loại nguyên nhân gây lỗi phần mềm
3. 1.3. Đảm bảo chất lượng phần mềm - định nghĩa và mục tiêu
4. 1.4. Các yếu tố chất lượng phần mềm
5. 1.5. Các yếu tố ảnh hưởng đến cường độ hoạt động đảm bảo chất lượng

---

## 1.5. Các yếu tố ảnh hưởng đến cường độ hoạt động SQA

### SQA gắn với từng pha dự án

Hoạt động SQA liên kết với việc hoàn thành từng pha của dự án:

- Yêu cầu
- Thiết kế
- ...

SQA cần được tích hợp vào kế hoạch phát triển sử dụng các mô hình SDLC như:

- Waterfall
- Prototyping
- Spiral

Tài liệu nhấn mạnh:

- Hoạt động SQA phải được coi là hoạt động chính thức như các hoạt động truyền thống khác
- Cần được đưa vào kế hoạch, có lịch, có nguồn lực

### Nhà lập kế hoạch SQA cần xác định

- Danh sách hoạt động SQA cần cho dự án
- Với mỗi hoạt động, cần xác định:
  - Thời điểm thực hiện
  - Loại hoạt động QA áp dụng
  - Ai thực hiện
  - Nguồn lực cần thiết

Lưu ý: nhiều vai trò trong dự án cùng tham gia hoạt động SQA.

### Cường độ hoạt động và phân bổ thời gian

Tài liệu (OCR lỗi một phần) nói rõ ý chính:

- Cần phân bổ đủ thời gian cho hoạt động SQA
- Đồng thời cần thời gian cho hoạt động khắc phục lỗi sau khi phát hiện
- Thực tế nhiều dự án thiếu thời gian cho công việc follow-up
- Hoạt động SQA không thể "làm cho có" rồi hấp thụ tự động

Kết luận:

- Cần phân tích nghiêm túc thời gian cho SQA và cho corrective actions

### Các yếu tố ảnh hưởng đến cường độ QA cần thiết

#### Nhóm yếu tố dự án (Project Factors)

- Quy mô dự án (lớn đến mức nào)
- Độ phức tạp và độ khó kỹ thuật
- Mức độ thành phần tái sử dụng
- Mức độ nghiêm trọng của hậu quả nếu dự án thất bại

#### Nhóm yếu tố đội ngũ (Team Factors)

- Năng lực chuyên môn của thành viên
- Mức độ quen thuộc dự án và kinh nghiệm trong lĩnh vực
- Mức độ sẵn có của nhân sự có thể đảm nhận công việc phù hợp

> Dòng cuối của bản OCR bị cắt ở cụm "Availability of staff members who can ..." nên bản dịch giữ đúng ý đến phần có thể xác định chắc chắn.

---

## Ghi chú dịch thuật chuyên ngành

Để nhất quán với môn Đảm bảo chất lượng phần mềm, bản dịch dùng các thuật ngữ sau:

- Software Quality Assurance -> Đảm bảo chất lượng phần mềm (SQA)
- Quality Control -> Kiểm soát chất lượng (SQC/QC)
- Error -> Sai sót/lỗi
- Fault -> Khiếm khuyết lỗi trong phần mềm
- Failure -> Thất bại vận hành/hành vi sai khi chạy
- Maintainability -> Khả bảo trì
- Testability -> Khả kiểm thử
- Reliability -> Độ tin cậy
- Portability -> Khả chuyển đổi môi trường
- Reusability -> Khả tái sử dụng
- Interoperability -> Khả tương tác/tích hợp liên hệ thống
- Corrective/Adaptive/Perfective Maintenance -> Bảo trì sửa lỗi/thích nghi/hoàn thiện

---

## Kết luận chương

Chương 1 đặt nền tảng SQA bằng cách:

- Làm rõ khái niệm phần mềm và chất lượng phần mềm
- Phân tích chuỗi Error -> Fault -> Failure
- Liệt kê nguồn gốc lỗi trong toàn vòng đời phát triển
- Định nghĩa SQA theo hướng kỹ thuật lẫn quản trị
- Trình bày hệ yếu tố chất lượng theo McCall và mô hình mở rộng
- Nêu tiêu chí xác định mức độ đầu tư SQA theo rủi ro dự án và năng lực đội ngũ

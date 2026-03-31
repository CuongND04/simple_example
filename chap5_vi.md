# Chương 5: Kiểm thử hộp trắng

## Tài liệu tham khảo

Chương này tham khảo từ cuốn sách:
**Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers**

Học phần: **Introduction to Software Testing**

## Dàn ý

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

---

## 5.1. Giới thiệu White-box Testing (WBT)

WBT dựa vào thuật toán cụ thể và cấu trúc dữ liệu bên trong của module cần kiểm thử để xác định module có hoạt động đúng hay không.

Vì vậy, người kiểm thử WBT cần có kỹ năng và kiến thức để hiểu chi tiết mã nguồn cần kiểm thử.

WBT thường tốn nhiều thời gian và công sức.

Đối với các module quan trọng, thực hiện tính toán chính của hệ thống, cách tiếp cận này là cần thiết.

### Các phương pháp kiểm thử hộp trắng

- Kiểm thử luồng điều khiển (Control flow testing)
- Kiểm thử luồng dữ liệu (Data flow testing)

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

---

## 5.2.1. Kỹ thuật kiểm thử luồng điều khiển (Control flow testing)

### Một số định nghĩa

**Đường thực thi (Execution path):** là kịch bản thực thi tương ứng của một đơn vị phần mềm; là danh sách có thứ tự các lệnh được thực thi trong một lần chạy cụ thể của đơn vị phần mềm. Đường thực thi bắt đầu từ điểm vào của đơn vị phần mềm và dừng tại điểm kết thúc của đơn vị phần mềm.

**Mục tiêu của kiểm thử luồng điều khiển:** đảm bảo tất cả các đường thực thi của đơn vị phần mềm đang kiểm thử đều chạy đúng.

### Ví dụ

```text
1: WHILE NOT EOF LOOP
2: Read Record;
2: IF field1 equals 0 THEN
3: Add field1 to Total
3: Increment Counter
4: ELSE
4: IF field2 equals 0 THEN
5: Print Total, Counter
5: Reset Counter
6: ELSE
6: Subtract field2 from Total
7: END IF
8: END IF
8: Print "End Record"
9: END LOOP
```

(Slide có kèm sơ đồ đồ thị luồng điều khiển tương ứng.)

### Thảo luận (1)

- Với đoạn mã:

```text
for (i=1; i<=1000; i++)
  for (j=1; j<=1000; j++)
    for (k=1; k<=1000; k++)
      doSomethingWith(i,j,k);
```

Chỉ có 1 đường thực thi, nhưng độ dài là
$1000*1000*1000 = 1$ tỷ câu lệnh `doSomethingWith(i,j,k)`.

- Với đoạn mã:

```text
if (c1) s11 else s12;
if (c2) s21 else s22;
if (c3) s31 else s32;
if (c32) s321 else s322;
```

Có thể có số lượng đường thực thi rất lớn (slide nêu 2^32 ~ 4 tỷ đường thực thi).

### Thảo luận (2)

- Một số đường thực thi có thể bị thiếu:

```text
if (a>0) doIsGreater();
if (a==0) doIsEqual();
// thiếu trường hợp a < 0
if (a<0) doIsLess();
```

- Một đường thực thi có thể pass với test case này nhưng sai với test case khác:

```c
int blech (int a, int b) { return a/b; }
```

Khi kiểm thử chọn `b <> 0` thì kết quả đúng. Tuy nhiên khi `b = 0` thì hàm lỗi.

---

## Độ bao phủ kiểm thử (Testing coverage)

Từ thảo luận ở trên, ta cần kiểm thử với số test case tối thiểu nhưng đạt mức tin cậy tối đa. Vấn đề là xác định số test case tối thiểu đó như thế nào.

**Coverage** là tỷ lệ các thành phần thực sự được kiểm thử sau khi chạy tập test case đã chọn. Coverage càng lớn thì độ tin cậy càng cao.

Thành phần được xét có thể là:

- Câu lệnh (statement)
- Điểm quyết định (decision point)
- Điều kiện con (subcondition)
- Đường thực thi (execution path)
- Hoặc tổ hợp các thành phần trên

### Coverage mức 0 và 1

- **Mức 0:** kiểm thử tự do; để người dùng kiểm thử phần còn lại. Đây là mức kiểm thử không có tính trách nhiệm cao.

- **Mức 1 (Statement coverage):** mỗi câu lệnh phải được thực thi ít nhất 1 lần.

Ví dụ với hàm `foo`, 2 test case sau có thể đạt 100% coverage mức 1:

- TC1: `foo(0,0,0,0)`, trả về 0
- TC2: `foo(1,1,1,1)`, trả về 1

Tuy nhiên vẫn không phát hiện được lỗi chia cho 0 tại dòng 8.

```c
1. float foo(int a, int b, int c, int d) {
2.   return e;
3.   float e;
4.   if (a==0)
5.     return 0;
6.   int x = 0;
7.   if ((a==b) || ((c==d) && bug(a)))
8.     x = 1;
9.   e = 1/x;
10. }
```

### Coverage mức 2

Mỗi quyết định phải được thực thi:

- Ít nhất 1 lần cho nhánh `true`
- Ít nhất 1 lần cho nhánh `false`

Đây gọi là **Branch coverage**.

Theo ví dụ trên:

- Với TC1, TC2 ở slide trước: đạt `3/4 = 75%` branch coverage.
- Thêm TC3:
  - TC3: `foo(1,2,1,2)`
- Khi đó đạt 100% branch coverage.

### Coverage mức 3

Mỗi điều kiện con phải được thực thi:

- Ít nhất 1 lần cho `true`
- Ít nhất 1 lần cho `false`

Gọi là **Subcondition coverage**.

Ví dụ bảng trong slide:

- `a==0`: TC1 cho true; TC2 cho false
- `a==b`: TC2 cho true; TC3 có thể gây chia cho 0
- `c==d`: TC3 có thể gây chia cho 0
- `bug(a)`: phụ thuộc cài đặt

### Coverage mức 4

Mỗi điều kiện con của mỗi quyết định phải:

- Được thực thi ít nhất 1 lần true và 1 lần false
- Và true/false này phải ảnh hưởng đến kết quả của quyết định

Đây gọi là **Branch & Subcondition coverage**.

---

## Basis Path Testing (Tom McCabe)

### Ý tưởng

Từ module kiểm thử, tạo đồ thị luồng điều khiển `G`.

Tính **độ phức tạp cyclomatic** của `G` (ký hiệu `C`):

- $V(G) = E - N + 2$,
  với `E` là số cạnh, `N` là số nút.
- $V(G) = P + 1$,
  với `P` là số nút quyết định.

Lưu ý:

- Nếu `V(G) > 10`, nên chia module thành các module con để giảm xác suất lỗi.

### Tạo C đường cơ sở tuyến tính cần kiểm thử

1. Tạo đường cơ sở đầu tiên (đường phổ biến nhất).
2. Với đường thứ 2, đổi cạnh tại nút quyết định thứ nhất và giữ tối đa phần chung với đường đầu tiên.
3. Với đường thứ 3, đổi cạnh tại nút quyết định thứ hai và giữ tối đa phần chung với đường đầu tiên.
4. Tiếp tục với đường thứ 4, 5, ... cho đến khi đã xét hết các nút quyết định (đủ `C` đường).

### Ví dụ

```text
1: WHILE NOT EOF LOOP
2: Read Record;
2: IF field1 equals 0 THEN
3: Add field1 to Total
3: Increment Counter
4: ELSE
4: IF field2 equals 0 THEN
5: Print Total, Counter
5: Reset Counter
6: ELSE
6: Subtract field2 from Total
7: END IF
8: END IF
8: Print "End Record"
9: END LOOP
```

(Slide có kèm đồ thị vòng lặp và các đường đi.)

---

## Loop testing

Mục tiêu: tập trung kiểm tra tính hợp lệ của cấu trúc vòng lặp.

### Với vòng lặp đơn (single loop)

- Bỏ qua vòng lặp (skip loop)
- Chạy 1 lần
- Chạy `k` lần (`k < n`)
- Chạy `n`, `n+1` lần

Với `n` là số vòng lặp tối đa.

### Với vòng lặp lồng nhau (nested loop)

- Bắt đầu từ vòng lặp trong cùng.
- Đặt tham số lặp của vòng ngoài ở giá trị nhỏ nhất.
- Kiểm tra các mức: `min+1`, giá trị điển hình, `max-1`, `max` cho vòng trong khi tham số vòng ngoài giữ cố định.

### Với vòng lặp tuần tự (sequence loops)

- Làm tương tự nested loop.

### Với vòng lặp phi cấu trúc (unstructured loops)

- Slide nêu câu hỏi mở “For unstructured loops?” để thảo luận.

### Ví dụ Loop testing

```java
// LOOP TESTING EXAMPLE PROGRAM
import java.io.*;
class LoopTestExampleApp {
  // FIELDS
  public static BufferedReader keyboardInput = new BufferedReader(
      new InputStreamReader(System.in));
  private static final int MINIMUM = 1;
  private static final int MAXIMUM = 10;

  // METHODS
  /* Main method */
  public static void main(String[] args) throws IOException {
    System.out.println("Input an integer value:");
    int input = new Integer(keyboardInput.readLine()).intValue();
    int numberOfIterations = 0;
  }
}
```

Bảng Input/Result trong slide:

- Input: 11 -> Result: 0 (skip loop)
- Input: 10 -> Result: 1 (loop 1 time)
- Input: 5 -> Result: 5 (loop k time)
- Input: 1 -> Result: 10 (loop n time)
- (Có một dòng lặp lại kết quả skip loop do OCR.)

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

---

## 5.2.2. Data flow testing

Là phương pháp hiệu quả để phát hiện vấn đề liên quan tới biến:

- Câu lệnh gán/nhập dữ liệu vào biến sai.
- Thiếu định nghĩa biến trước khi dùng.
- Tiên đề/logic sai (do thực thi sai theo luồng thực thi)...
- Mỗi biến nên có vòng đời tốt theo chuỗi 3 bước: tạo, dùng, hủy.
- Chỉ các lệnh trong phạm vi của biến mới được truy cập/xử lý biến đó.
- Phạm vi (scope): global, local.

### Data flow testing (tiếp) — Phân tích vòng đời biến

Lệnh truy cập biến theo 3 hành động:

- `d` (define): định nghĩa biến, gán giá trị cho biến.
  (Nhập dữ liệu vào biến cũng là một dạng gán.)
- `r` (reference): tham chiếu giá trị của biến (thường trong biểu thức).
- `u` (undefine): hủy/xóa biến.

Nếu ký hiệu `~` mô tả trạng thái biến chưa tồn tại, có các khả năng đầu tiên:

- `~d`: biến chưa tồn tại rồi được định nghĩa với giá trị chỉ định.
- `~r`: biến chưa tồn tại nhưng đã được dùng ngay (giá trị nào?).

### Data flow testing (tiếp) — Cặp hành động vòng đời biến

Kết hợp 3 thao tác biến tạo ra 9 cặp:

- `dd`: biến được định nghĩa rồi lại định nghĩa; hơi lạ, có thể chấp nhận, nhưng cũng có thể là lỗi lập trình.
- `dr`: định nghĩa rồi dùng; đúng và bình thường.
- `du`: định nghĩa rồi hủy; hơi lạ, có thể chấp nhận, nhưng cũng có thể là lỗi.
- `rd`: dùng rồi định nghĩa giá trị mới; hợp lý.
- `rr`: dùng rồi dùng tiếp; hợp lý.
- `ru`: dùng rồi hủy; hợp lý.
- `ud`: hủy rồi định nghĩa lại; chấp nhận được.
- `ur`: hủy rồi dùng; lỗi.
- `uu`: hủy rồi lại hủy lần nữa; bất thường/lỗi.

### Data flow testing (tiếp) — Data flow graph

Dùng để mô tả các kịch bản vòng đời khác nhau của biến.

Tạo data flow graph tương tự tạo control flow graph của module đang kiểm thử, nhưng có thêm nhãn hành động biến.

Ví dụ slide (mã và nhãn d/r/u):

```c
1. float foo(int a, int b, int c, int d) {
2.   float e;
3.   if (a==0)
4.     return 0;
5.   int x=0;
6.   if ((a==b) || ((c==d) && bug(a)))
7.     x=1;
8.   e=1/x;
9.   return e;
10. }
```

Nhãn dữ liệu kèm theo trong slide (OCR có lỗi ở một vài ký tự):

- `d(a) d(b) d(c) d(d)`
- `d(e)`
- `r(a)`
- `u(a) u(b) u(c) u(d)`
- `d(x)`
- `d(e) u(x) u(e)`
- `r(a), r(b), r(c), r(d)`
- `r(x), d(e), r(e)`

### Data flow testing (tiếp) — Quy trình

1. Tạo control flow graph, sau đó chuyển thành data flow graph.
2. Tính Cyclomatic của đồ thị (`C = P + 1`).
3. Tạo `C` đường cơ sở (basic paths).
4. Kiểm thử vòng đời cho từng biến dữ liệu:
   - Mỗi biến có tối đa `C` kịch bản hành động biến.
   - Với mỗi kịch bản, tìm các cặp hành động bất thường.

### Data flow testing: Ví dụ

Đồ thị có 2 nút quyết định nên:

- `C = 2 + 1 = 3`

Hàm có 4 tham số đầu vào, 2 biến cục bộ:

- `a, b, c, d, e, x`

```c
1. float foo(int a, int b, int c, int d) {
2.   float e;
3.   if (a==0)
4.     return 0;
5.   int x = 0;
6.   if ((a==b) || ((c==d) && bug(a)))
7.     x = 1;
8.   e = 1/x;
9.   return e;
10. }
```

Các kịch bản trong slide:

- Scenario 1: `~dduk`
- Scenario 2: `~dduk` (giống scenario 1)
- Scenario 3: `~dk`

Scenario 1 và 2 có cặp bất thường `dd`, nên cần xác định xem có liên quan lỗi hay không.

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

---

## 5.3. Automation unit test

### Công cụ

- `http://pathcrawler-online.com:8080`

**Chức năng chính của PathCrawler** (và cũng là nội dung được minh họa trong bản online):

- Tự động hóa kiểm thử đơn vị theo cấu trúc bằng cách sinh dữ liệu đầu vào để đạt full coverage cho hàm C đang kiểm thử.
- Full coverage có thể là:
  - Tất cả đường thực thi khả thi (all feasible execution paths), hoặc
  - `k-path coverage`: giới hạn tiêu chí all-path ở các đường có tối đa `k` lần lặp liên tiếp.
- Các chế độ này có trong bản online.

PathCrawler cũng có thể dùng để:

- Đáp ứng các tiêu chí coverage khác (branch coverage, MC-DC, ...)
- Sinh test bổ sung để cải thiện coverage cho test suite chức năng hiện có
- Hoặc sinh đúng phần test cần thiết để bao phủ phần mã quan tâm

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

---

## 5.4. Bài tập

Thực thi công cụ `http://pathcrawleronline.com:8080` và tìm:

- Kết quả coverage
- Các test case
- Mã unit tương ứng với test case

Nghiên cứu unit test bằng JUnit.

---

# Chương 5: Kiểm thử hộp trắng (bản lặp trong slide)

## Tài liệu tham khảo

Chương này tham khảo từ cuốn sách:
**Mastering Software Quality Assurance: Best Practices, Tools and Techniques for Software Developers**

Học phần: **Introduction to Software Testing**

## Dàn ý

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## 5.1. Giới thiệu White-box Testing (WBT)

WBT dựa vào thuật toán cụ thể và cấu trúc dữ liệu bên trong của module cần kiểm thử để xác định module có hoạt động đúng hay không.

Vì vậy, tester WBT cần có kỹ năng và kiến thức để hiểu chi tiết mã nguồn cần kiểm thử.

WBT thường tốn nhiều thời gian và công sức.

Với module quan trọng, thực hiện tính toán chính của hệ thống, cách tiếp cận này là cần thiết.

### Các phương pháp kiểm thử hộp trắng

- Control flow testing
- Data flow testing

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## 5.2.1. Kỹ thuật kiểm thử luồng điều khiển — định nghĩa

**Execution path:** là danh sách có thứ tự các lệnh được thực thi trong một lần chạy của software unit; bắt đầu ở entry point và dừng ở cuối software unit.

**Mục tiêu:** đảm bảo tất cả execution path của software unit under test chạy đúng.

### Ví dụ

```text
1: WHILE NOT EOF LOOP
2: Read Record;
2: IF field1 equals 0 THEN
3: Add field1 to Total
3: Increment Counter
4: ELSE
4: IF field2 equals 0 THEN
5: Print Total, Counter
5: Reset Counter
6: ELSE
6: Subtract field2 from Total
7: END IF
8: END IF
8: Print "End Record"
9: END LOOP
```

(Slide có sơ đồ nút/cạnh tương ứng.)

### Discussion (1)

- Đoạn lặp 3 tầng có 1 execution path nhưng cực dài.
- Đoạn nhiều câu `if/else` có số execution path cực lớn.

### Discussion (2)

- Có thể bỏ sót execution path (ví dụ thiếu nhánh `a < 0`).
- Một execution path pass với test này nhưng fail với test khác (ví dụ chia cho 0).

## Testing coverage

- Cần tối thiểu test case nhưng tối đa độ tin cậy.
- Coverage là tỷ lệ thành phần được kiểm thử.
- Thành phần có thể là statement, decision point, subcondition, execution path, hoặc kết hợp.

### Coverage level 0 & 1

- Level 0: kiểm thử tùy ý, thiếu trách nhiệm.
- Level 1: mỗi statement chạy ít nhất 1 lần.

Ví dụ `foo`:

- TC1 `foo(0,0,0,0)` trả 0
- TC2 `foo(1,1,1,1)` trả 1

Tuy nhiên vẫn không bắt lỗi chia cho 0 ở dòng 8.

```c
float foo(int a, int b, int c, int d) {
  return e;
  float e;
  if (a==0)
    return 0;
  int x = 0;
  if ((a==b) || ((c==d) && bug(a)))
    x = 1;
  e = 1/x;
}
```

### Coverage level 2

Mỗi decision phải chạy >=1 lần true và >=1 lần false (branch coverage).

- TC1 + TC2: 75%
- Thêm TC3 `foo(1,2,1,2)`: 100%

### Coverage level 3

Mỗi subcondition chạy >=1 lần true và >=1 lần false (subcondition coverage).

Bảng ví dụ trong slide:

- `a==0`: TC1 true, TC2 false
- `a==b`: TC2 true, TC3 chia cho 0
- `c==d`: TC3 chia cho 0
- `bug(a)`

### Coverage level 4

Mỗi subcondition của mỗi decision:

- chạy true/false ít nhất 1 lần,
- và true/false đó phải tác động tới kết quả decision.

Gọi là branch & subcondition coverage.

## Basis Path Testing (Tom McCabe)

- Tạo control flow graph `G`.
- Tính cyclomatic complexity `C`.
- Công thức:
  - `V(G) = E - N + 2`
  - `V(G) = P + 1`
- Nếu `V(G) > 10` nên tách module.
- Tạo `C` đường cơ sở tuyến tính để kiểm thử.

### Basis Path Testing (tiếp)

1. Tạo đường đầu tiên (phổ biến nhất).
2. Đường thứ 2 đổi cạnh ở nút quyết định thứ nhất, giữ tối đa phần giống đường đầu.
3. Đường thứ 3 đổi cạnh ở nút quyết định thứ hai, giữ tối đa phần giống đường đầu.
4. Tiếp tục đến khi xét đủ các decision node (đủ `C` đường).

### Example

```text
1: WHILE NOT EOF LOOP
2: Read Record;
2: IF field1 equals 0 THEN
3: Add field1 to Total
3: Increment Counter
4: ELSE
4: IF field2 equals 0 THEN
5: Print Total, Counter
5: Reset Counter
6: ELSE
6: Subtract field2 from Total
7: END IF
8: END IF
8: Print "End Record"
9: END LOOP
```

## Loop testing

- Tập trung kiểm tra tính hợp lệ cấu trúc vòng lặp.

### Single loop

- Skip loop
- Loop 1 lần
- Loop `k` lần (`k < n`)
- Loop `n`, `n+1` lần

Với `n` là số vòng lặp tối đa.

### Nested loop

- Bắt đầu vòng trong cùng.
- Đặt vòng ngoài ở giá trị tối thiểu.
- Kiểm tra `min+1`, giá trị điển hình, `max-1`, `max` của vòng trong khi giữ vòng ngoài.

### Sequence loops

- Làm tương tự nested loop.

### Unstructured loops

- Slide đặt câu hỏi mở để thảo luận.

### Loop testing: Example

```java
// LOOP TESTING EXAMPLE PROGRAM
import java.io.*;
class LoopTestExampleApp {
  // FIELDS
  public static BufferedReader keyboardInput = new BufferedReader(
      new InputStreamReader(System.in));
  private static final int MINIMUM = 1;
  private static final int MAXIMUM = 10;

  // METHODS
  /* Main method */
  public static void main(String[] args) throws IOException {
    System.out.println("Input an integer value:");
    int input = new Integer(keyboardInput.readLine()).intValue();
    int numberoOfIterations = 0;
  }
}
```

### Loop testing: Example (cont.)

- Input 11 -> Result 0 (skip loop)
- Input 10 -> Result 1 (loop 1 time)
- Input 5 -> Result 5 (loop k time)
- Input 1 -> Result 10 (loop n time)
- Có dòng lặp kết quả skip loop trong bản OCR.

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## Data flow testing

Là phương pháp hiệu quả để phát hiện vấn đề với biến:

- Câu lệnh gán/nhập dữ liệu vào biến sai.
- Thiếu định nghĩa biến trước khi sử dụng.
- Tiên đề sai do luồng thực thi sai.
- Mỗi biến cần vòng đời tốt: tạo, dùng, hủy.
- Chỉ lệnh trong scope của biến mới truy cập/xử lý được biến.
- Scope: global, local.

## Data flow testing (cont.)

### Analysis of life cycle of a variable

Biến được truy cập qua 3 thao tác:

- `d (define)`
- `r (reference)`
- `u (undefine)`

Nếu `~` là trạng thái chưa tồn tại biến:

- `~d`: chưa tồn tại rồi được định nghĩa
- `~r`: chưa tồn tại nhưng dùng ngay

### Analysis of life cycle of a variable (cont.)

9 cặp thao tác:

- `dd`, `dr`, `du`, `rd`, `rr`, `ru`, `ud`, `ur`, `uu`

Giải thích ý nghĩa giống phần trên:

- `dr` đúng chuẩn,
- `ur` lỗi,
- `dd`, `du`, `uu` cần xem xét vì có thể là bất thường.

## Data flow testing (cont.)

### Data flow graph

Dùng để mô tả các kịch bản vòng đời biến.

Tạo data flow graph tương tự control flow graph nhưng thêm nhãn hành động biến.

```c
1. float foo(int a, int b, int c, int d) {
2. float e;
3. if (a==0)
4. return 0;
5. int x=0;
6. if ((a==b) || ((c==d) && bug(a)))
7. x=1;
8. e=1/x;
9. return e;
10. }
```

Nhãn trong slide (một số ký tự OCR lỗi):

- `d(a) d(b), d(c), d(d), d(e)`
- `u(a), u(b), u(c), u(d)`
- `d(x)`
- `d(e), u(x), ...`
- `r(a), r(b), r(c), r(d)`
- `r(x), d(e), r(e)`

## Data flow testing (cont.)

### Data flow testing process

- Tạo control flow graph rồi đổi sang data flow graph.
- Tính Cyclomatic (`C = P + 1`).
- Tạo `C` basic paths.
- Kiểm thử vòng đời cho từng biến dữ liệu.
- Với mỗi kịch bản, tìm cặp hành động bất thường.

## Data flow testing: Example

- Đồ thị có 2 decision node -> `C = 3`.
- Hàm có 4 tham số đầu vào và 2 biến local: `a, b, c, d, e, x`.

```c
1. float foo(int a, int b, int c, int d) {
2. float e;
3. if (a==0)
4. return 0;
5. int x = 0;
6. if ((a==b) || ((c==d) && bug(a)))
7. x = 1;
8. e = 1/x;
9. return e;
10. }
```

### Data flow testing: Example (tiếp)

- Scenario 1: `~dduk`
- Scenario 2: `~dduk` (giống scenario 1)
- Scenario 3: `~dk`

Scenario 1 và 2 có cặp bất thường `dd`; cần xác định có phải lỗi không.

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## Công cụ

- `http://pathcrawler-online.com:8080`

PathCrawler có chức năng chính là tự động hóa structural unit testing bằng cách sinh test input để đạt full coverage cho hàm C.

Full coverage có thể là:

- Tất cả đường thực thi khả thi
- Hoặc `k-path coverage` (giới hạn all-path ở tối đa `k` vòng lặp liên tiếp)

Ngoài ra PathCrawler còn dùng để:

- Đáp ứng tiêu chí coverage khác (branch coverage, MC-DC, ...)
- Sinh test bổ sung cải thiện coverage của bộ test chức năng hiện có
- Sinh đúng phần test cần để bao phủ một phần mã cụ thể

## Dàn ý (lặp lại)

1. 5.1. Giới thiệu kiểm thử hộp trắng
2. 5.2. Kỹ thuật kiểm thử hộp trắng
3. 5.2.1. Kỹ thuật kiểm thử luồng điều khiển
4. 5.2.2. Kỹ thuật kiểm thử luồng dữ liệu
5. 5.3. Tự động hóa kiểm thử đơn vị
6. 5.4. Bài tập

## Bài tập

Thực hiện công cụ `http://pathcrawleronline.com:8080` và tìm:

- Kết quả coverage
- Test cases
- Unit code tương ứng với các test case

Nghiên cứu unit test với JUnit.

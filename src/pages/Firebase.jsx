import React, { useState } from "react";
import "firebase/compat/storage";
import { storage } from "./FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAn4hvIIraWdh-MmmOVL2vb-8Ji4LSH_SU",
//   authDomain: "oto-a6dev.firebaseapp.com",
//   projectId: "oto-a6dev",
//   storageBucket: "oto-a6dev.appspot.com",
//   messagingSenderId: "1060182708095",
//   appId: "1:1060182708095:web:ba55b28e5eabd5fe9b944a",
//   measurementId: "G-DX1YV0DJ11",
// };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

const starsRef = ref(
  storage,
  "webp/images/Bentley/Bentley%20Flying%20Spur/ngoai-that/bieu-tuong-bentley-flying-spur.jpg"
);

export default function Firebase() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  console.log("data", data);
  let des = [
    "",
    "<p><strong>Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. </strong></p>",
    "<p>Chính vì thế mà giá thành của những chiếc xe Bentley cũng không phải là rẻ. Để thuận tiện hơn cho việc lựa chọn mua những chiếc xe thuộc thương hiệu này, bạn cần cập nhật bảng&nbsp;<strong>giá xe Bentley</strong> mới nhất tháng&nbsp;04/2022.</p>",
    '<p><span style="font-size:24px"><strong>Bentley Mulsanne</strong></span></p>',
    "<p>Thiết kế của chiếc xe thuộc dòng <strong>Bentley Mulsanne</strong> rất độc đáo. Cảm nhận chung của mọi người về Bentley Mulsanne chính là sự <strong>lịch lãm và thời thượng</strong> ở ngoại thất.&nbsp;Các đường nét thiết kế ngoại thất của Bentley Mulsanne vừa sắc sảo, vừa tinh tế nhờ những nét uốn lượn từ nhôm siêu bền.</p>",
    "<p>Cùng với các chi tiết cần làm điểm nhấn như nắp capo hay trần và cốp xe được sơn màu nổi bật.&nbsp;<strong>Bentley Mulsanne</strong> được thiết kế đậm chất cổ điển và có phong thái đẳng cấp hoàng tộc.&nbsp;</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne" height="478" src="/uploads/news/gia-xe/bentley-mulsanne-4.jpg" width="850">',
    "<figcaption><strong><em>Giá xe Bentley Mulsanne tại châu Âu: Từ 307.000 USD.</em></strong></figcaption>",
    "</figure>",
    "</div>",
    "<p>Bentley Mulsanne sử dụng khối<strong> động cơ V8 6.0L </strong>với công suất tối đa 505 mã lực và mô-men xoắn cực đại đạt 1020 Nm. Hộp số xe Bentley Mulsanne tự động 8 cấp, có hệ dẫn động cầu sau. Tốc độ xe đạt mức 296 km/h là tối đa.</p>",
    "<p>Bentley Mulsanne còn được trang bị đầy đủ mọi tính năng an toàn cho những khách hàng như 4 túi khí, hệ thống bó cứng phanh ABS, phanh điện tử ERD, cân bằng điện tử ESC và dây đai an toàn. Tại thị trường châu Âu Bentley Mulsanne được bán với giá từ 307.000 USD. &nbsp;</p>",
    '<p><span style="font-size:24px"><strong>Bentley Mulsanne Extended Wheelbase</strong></span></p>',
    "<p>Kiểu dáng thiết kế của xe <strong>Bentley Mulsanne Extended Wheelbase</strong> có thể nói là hoàn hảo. Sự kết hợp một cách tinh tế và cân bằng giữa những nét hiện đại và cổ điển đã khiến Bentley Mulsanne Extended Wheelbase mê hoặc những kẻ mê xe trên thế giới.&nbsp;</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne Extended Wheelbase" height="478" src="/uploads/news/gia-xe/bentley-mulsanne-extended-wheelbase-2.jpg" width="850">',
    "<figcaption><strong><em>Giá xe Bentley Mulsanne Extended Wheelbase tại châu Âu: Từ 350.000 USD.</em></strong></figcaption>",
    "</figure>",
    "</div>",
    "<p><strong>Mulsanne Extended Wheelbase</strong> cũng được nhà sản xuất ưu ái tăng thêm chiều dài cơ sở 25 cm, nhờ vậy tăng thêm không gian cho khoang sau, giúp nâng tầm đẳng cấp và sự sang trọng. Nhiều chi tiết được thiết kế vô cùng tỉ mỉ, ví dụ như cửa gió lớn, ốp viền hay tay nắm cửa mạ crom sáng bóng, hệ thống ghế ngồi bọc da cao cấp.&nbsp;</p>",
    "<p>Kết hợp với điều này chính là những tiện ích siêu tiện lợi như cửa sổ trời có kích thước lớn hơn, rèm điện 2 bên và ghế ngồi có thể ngả ra. Nhờ vậy mang đến cảm giác tận hưởng thoải mái nhất cho những người ngồi trong xe.&nbsp;Giá xe Bentley Mulsanne Extended Wheelbase tại châu Âu: Từ 350.000 USD.</p>",
    '<p><span style="font-size:24px"><strong>Bentley Mulsanne Speed</strong></span></p>',
    "<p>Thiết kế của<strong> Bentley Mulsanne Speed đậm chất cổ điển</strong> hơn nhiều so với những dòng sản phẩm khác của thương hiệu này. Đặc biệt là phần đầu xe được thiết kế tỉ mỉ đậm chất hoài cổ, còn phần thân xe thì thuôn dài, làm người xem như trở về với những chiếc xe của đầu thế kỷ trước.&nbsp;</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne Speed" height="586" src="/uploads/news/gia-xe/bentley-mulsanne-speed-3.jpg" width="850">',
    "<figcaption><em><strong>Giá xe Bentley Mulsanne Speed&nbsp;tại châu Âu chỉ từ 339.000 USD.</strong></em></figcaption>",
    "</figure>",
    "</div>",
    "<p>Động cơ của Bentley Mulsanne Speed là khối <strong>động cơ V8 twin-turbocharged &nbsp;6.0L</strong>, công suất của xe đạt 535 mã lực tối đa, mô-men xoắn cực đại 1100 Nm và hộp số tự động 8 cấp giúp chiếc xe vận hành bền bỉ và mạnh mẽ. Theo những số liệu thống kế, tốc độ tối đa của Bentley Mulsanne Speed đạt mức 305 km/h.&nbsp;Giá xe Bentley Mulsanne Speed tại châu Âu chỉ từ 339.000 USD.</p>",
    '<p><span style="font-size:24px"><strong>Bentley Flying Spur</strong></span></p>',
    "<p>Trong khi những dòng xe khác của Bentley mang đến cảm giác của những quý ông châu Âu&nbsp;lịch lãm thế kỷ trước thì thiết kế của <strong>Bentley Flying Spur</strong> lại mang đến cho người xem sự ấn tượng về độ <strong>nam tính và thể thao</strong>.</p>",
    "<p>Tuy nhiên, những nét hoài cổ được điểm xuyến cực kỳ khéo léo trên thiết kế của Bentley Flying Spur sẽ khiến cho người xem liên tưởng đến một quý ông truyền thống, vừa mạnh mẽ vừa lịch sự.&nbsp;<strong>Giá xe&nbsp;Bentley Flying Spur </strong>sẽ được <strong>Tin bán xe</strong> cập nhật ngay dưới đây.</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="bentley flying spur 2" height="529" src="/uploads/news/gia-xe/bentley-flying-spur-2.jpg" width="850">',
    "<figcaption><em><strong>Giá xe Bentley Flying Spur các phiên bản tại châu Âu</strong></em></figcaption>",
    "</figure>",
    "</div>",
    '<table align="center" border="1" cellpadding="1" cellspacing="1">',
    "<tbody>",
    "<tr>",
    '<td colspan="2"><strong>Bảng báo giá xe Bentley Flying Spur</strong></td>',
    "</tr>",
    "<tr>",
    "<td><strong>Tên sản phẩm</strong></td>",
    "<td><strong>Giá thành (tại châu Âu)</strong></td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Flying Spur 4.0 V8</td>",
    "<td>Từ 191.725 USD</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Flying Spur 4.0 V8 S</td>",
    "<td>Từ 207.725 USD</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Flying Spur W12 6.0</td>",
    "<td>Từ 227.225 USD</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Flying Spur W12 6.0 S</td>",
    "<td>Từ 247.323 USD</td>",
    "</tr>",
    "</tbody>",
    "</table>",
    '<p><span style="font-size:24px"><strong>Bentley Continental GT</strong></span></p>',
    "<p><strong>Bentley Continental GT</strong> là sự trung hòa giữa <strong>nét thể thao và sự lịch lãm</strong>. Và giống như những dòng Bentley khác, Continental GT vẫn làm người ta nhớ đến sự <strong>hoài cổ trong từng thiết kế</strong>. Đồng thời nhờ những bánh hợp kim 21 inch được khắc chạm nổi, Bentley Continental GT đã tạo nên sự ấn tượng về một chiếc xe sang trọng và thời thượng.</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="Bentley Continental GT" height="525" src="/uploads/news/gia-xe/bentley-continental-gt-3.jpg" width="850">',
    "<figcaption><em><strong>Giá xe Bentley Continental GT các phiên bản tại châu Âu</strong></em></figcaption>",
    "</figure>",
    "</div>",
    "<p>Điểm khiến Continental GT nhận được sự yêu thích của giới đua xe chính là <strong>khối động cơ mạnh mẽ</strong>, giúp xe đạt công suất tối đa là 505 - 633 mã lực và mô-men xoắn cực đại 660-820 Nm. Hộp số xe tự động 8 cấp ZF và hệ dẫn động 4 bánh có lực đẩy mạnh mẽ. Xe có thể đạt tốc độ tối đa là 305 - 331 km/h. Cùng chúng tôi cập&nbsp; nhật <strong>giá xe</strong>&nbsp;<strong>Bentley Continental GT </strong>ngay sau đây nhé.</p>",
    '<table align="center" border="1" cellpadding="1" cellspacing="1">',
    "<tbody>",
    "<tr>",
    '<td colspan="2"><strong>Bảng báo giá xe Bentley Continental GT&nbsp;</strong></td>',
    "</tr>",
    "<tr>",
    "<td><strong>Tên sản phẩm</strong></td>",
    "<td><strong>Giá thành&nbsp;</strong></td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Continental GT 2018-2019</td>",
    "<td>Khoảng 25 tỷ VNĐ</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Continental GT Speed Convertible 2017</td>",
    "<td>267.025 USD</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Continental GT Speed Coupe 2017</td>",
    "<td>243.025 USD</td>",
    "</tr>",
    "</tbody>",
    "</table>",
    '<p><span style="font-size:24px"><strong>Bentley Bentayga</strong></span></p>',
    "<p>Thiết kế của <strong>Bentley Bentayga </strong>được đánh giá là phiên bản<strong> sang trọng đẳng cấp</strong> bậc nhất trong số những dòng xe thương hiệu Bentley. Toàn bộ thân xe là sự kết hợp hoàn hảo của những nét đỉnh nhất ở các phiên bản trước làm cho mọi người đều cực kỳ ấn tượng.&nbsp;</p>",
    "<p>Xét về độ mạnh mẽ của động cơ xe thì <strong>Bentayga</strong> có công suất tối đa là&nbsp;606 mã lực, mô-men xoắn cực đại 900 Nm kết hợp với hộp số tự động 8 cấp và hệ dẫn động 4 bánh mượt mã. Nhờ vậy mà Bentayga <strong>vận hành rất ổn định và khá nhanh</strong>, khi tốc độ tối đa có thể đạt từ 270 - 301 km/h.<strong>&nbsp;Giá xe&nbsp;<strong>Be</strong>ntley Bentayga </strong>tại thị&nbsp;trường Châu Âu sẽ được chúng tôi cập nhật liên tục.</p>",
    '<div style="text-align:center">',
    '<figure class="image" style="display:inline-block"><img alt="bentley bentayga 3" height="481" src="/uploads/news/gia-xe/bentley-bentayga-3.jpg" width="850">',
    "<figcaption><em><strong>Giá xe Bentley Bentayga các phiên bản tại châu Âu</strong></em></figcaption>",
    "</figure>",
    "</div>",
    '<table align="center" border="1" cellpadding="1" cellspacing="1">',
    "<tbody>",
    "<tr>",
    '<td colspan="2"><strong>Bảng báo giá xe Bentley Bentayga&nbsp;</strong></td>',
    "</tr>",
    "<tr>",
    "<td><strong>Tên sản phẩm</strong></td>",
    "<td><strong>Giá thành tại châu Âu</strong></td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Bentayga W12</td>",
    "<td>Từ 232.000 - 300.000 USD</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Bentayga V8</td>",
    "<td>Dự kiến khoảng 16 – 18 tỷ đồng</td>",
    "</tr>",
    "<tr>",
    "<td>Bentley Bentayga Hybrid</td>",
    "<td>Đang cập nhật</td>",
    "</tr>",
    "</tbody>",
    "</table>",
    "<p>Trên đây là bảng báo<strong> giá xe Bentley </strong>các loại. Giá thành trên chỉ mang tính tham khảo vì sẽ biến động theo thời gian. Tuy nhiên đây là những mức giá chuẩn và mới được cập nhật trong thời gian gần đây nhất. Do đó xin mời các bạn tham khảo và lựa chọn chiếc xe phù hợp nhất cho mình.&nbsp;</p>",
    "<p>Theo dõi tin bán xe để nhận những thông tin xác thực nhất về <strong>giá xe ô tô</strong>, tin tức <strong>đánh giá xe</strong> của chuyên gia và người dùng các thương hiệu xe hơi nổi tiếng trên thị trường trong và ngoài nước.</p>",
    "",
  ];
  const clickToImg = () => {
    alert("a");
  };
  const info =
    "<p><strong>Bentley là thương hiệu xe đã có tuổi đ…ác của sự sang trọng và quý phái. </strong></p>";
  console.log("info", info.replaceAll("strong", "h1"));
  des = des.map((el) => {
    return el.replaceAll("strong", "h1");
  });
  des = des.join("");
  const listItem = () => {
    getDownloadURL(starsRef).then((url) => {
      console.log("url", url);
      setImage(url);
    });
  };
  const clickHandler = (e) => {
    // `target` is the element the click was on (the div we hooked or an element
    // with in it), `currentTarget` is the div we hooked the event on
    let el = e.target;
    while (el && el !== e.currentTarget && el.tagName !== "H1") {
      el = el.parentNode;
    }
    if (el && el.tagName === "H1") {
      alert("a");
    }
  };

  return (
    <div onClick={listItem}>
      <div>firebase</div>
      <div dangerouslySetInnerHTML={{ __html: info }}></div>
      <div
        onClick={clickHandler}
        className="card"
        dangerouslySetInnerHTML={{ __html: des }}
      ></div>
      <img onClick={clickToImg} src={image} alt="?" />
    </div>
  );
}

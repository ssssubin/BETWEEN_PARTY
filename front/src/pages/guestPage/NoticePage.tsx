import { useState } from "react";
import "./css/NoticePage.css";
import background from "../assets/background.png";
import CustomAlert from "../../components/CustomAlert";
import Notice from "../../components/Notice";

export default function NoticePage() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <div
        className="mobile-frame"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,120,0,.45), rgba(0,0,0,.45)),
          url(${background})
        `,
        }}
      >
        <div className="container">
            {/* 상단 고정 영역 */}
            <div className="fixed-header">
                <h1 className="title"> BETWEEN PARTY </h1>
                <h3 className="subtitle">
                ❝저희 파티는 적당한 온도 속에서 서로를 알아가보는
                <br />
                잔잔한 설렘을 추구합니다😊❞
                </h3>
                <h2 className="notice-title">
                📢 공지사항
                </h2>
            </div>
        
            {/* 공지사항 영역만 스크롤 */} 
            <div className="notice-content">
                <Notice />
          </div>
        </div>
      </div>

      <CustomAlert open={alertOpen} title="BETWEEN PARTY" message="입장이 완료되었습니다." onClose={() => setAlertOpen(false)} />
    </>
  );
}

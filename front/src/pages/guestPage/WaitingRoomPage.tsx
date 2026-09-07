import { useState } from "react";
import "./css/WaitingRoomPage.css";
import background from "../assets/background.png";
import CustomAlert from "../../components/CustomAlert";

export default function WaitingRoomPage() {
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
          {/* 상단 헤더 */}
          <div className="party-header">
              <h1 className="waiting-title">BETWEEN PARTY</h1>

              <div className="guest-info">
                  <div className="guest-name">승현님</div>
                  <div className="guest-profile">(수원 남주혁)</div>
              </div>
          </div>
          {/* 중앙 안내 */}
          <div className="context-box">
              <h2 className="notice-title">
                  [ 입장이 확인됐어요 ]
              </h2>
              <p className="notice-subtitle">
                  잠시만 기다려주세요🙏<br />호스트가 다음 순서를 시작하면 <br/>화면이 자동으로 바뀝니다 :)
              </p>
          </div>
        </div>
      </div>

      <CustomAlert open={alertOpen} title="BETWEEN PARTY" message="입장이 완료되었습니다." onClose={() => setAlertOpen(false)} />
    </>
  );
}

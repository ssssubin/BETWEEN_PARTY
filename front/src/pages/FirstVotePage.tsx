import { useState } from "react";
import "./FirstVotePage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";

export default function FirstVotePage() {
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
          <div className="inner">
            <h1 className="title">첫인상 투표💌</h1>

            <h3 className="subtitle">
              최대 3명 선택 후 "제출하기" 버튼 클릭👆 <br />⭐꼭! 모든 사람을 선택한 후 제출하기 버튼 클릭해주세요⭐
            </h3>

            <button className="enter-btn" disabled={!isValid} onClick={() => setAlertOpen(true)}>
              제출하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert open={alertOpen} title="BETWEEN PARTY" message="체크인이 완료되었습니다." onClose={() => setAlertOpen(false)} />
    </>
  );
}

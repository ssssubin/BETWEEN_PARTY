import { useState } from "react";
import "./css/CheckInPage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";

export default function CheckInPage() {
  const [form, setForm] = useState({
    region: "", // 지역
    nickname: "", // 닉네임
    mbti: "", // MBTI
    todayFeature: "", // 오늘의 특징
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const isValid =
    !!form.region && !!form.nickname && !!form.mbti && !!form.todayFeature;

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
            <h1 className="title">CHECK-IN</h1>

            <h3 className="subtitle">
              ❝체크인 시간입니다! 아래의 정보들을 작성해주세요😊❞
            </h3>

            <div className="input-group">
              <label htmlFor="region">지역</label>

              <input
                id="region"
                className="input"
                placeholder="예시: 신림"
                maxLength={15}
                value={form.region}
                onChange={handleChange}
              />

              <p className="input-guide">"지역"을 입력해주세요.</p>

              <label htmlFor="nickname">닉네임</label>

              <input
                id="nickname"
                className="input"
                placeholder="예시: 남주혁"
                maxLength={15}
                value={form.nickname}
                onChange={handleChange}
              />

              <p className="input-guide">"연예인 이름"을 작성해주세요.</p>

              <label htmlFor="mbti">MBTI</label>

              <input
                id="mbti"
                className="input"
                placeholder="예시: ESFJ"
                maxLength={4}
                value={form.mbti.toUpperCase()}
                onChange={handleChange}
              />

              <p className="input-guide">MBTI를 입력해주세요.</p>

              <label htmlFor="todayFeature">오늘의 특징😎</label>

              <input
                id="todayFeature"
                className="input"
                type="text"
                placeholder="예시: 빨간 니트 / 안경 / 검정 모자"
                maxLength={8}
                value={form.todayFeature}
                onChange={handleChange}
              />

              <p className="input-guide">
                오늘 나를 알아볼 수 있는 특징 하나만 적어주세요. (8글자 내외)
              </p>
            </div>

            <button
              className="enter-btn"
              disabled={!isValid}
              onClick={() => setAlertOpen(true)}
            >
              체크인하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        open={alertOpen}
        title="BETWEEN PARTY"
        message="체크인이 완료되었습니다😎"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}

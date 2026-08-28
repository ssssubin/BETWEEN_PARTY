import { useState } from "react";
import "./LoginPage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";

export default function LoginPage() {
  const [form, setForm] = useState({
    gender: "", // 성별
    nickname: "", // 닉네임
    age: "", // 나이
    tableNum: 0, // 테이블 번호
    isAdmin: false, // 호스트 여부
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const isValid = form.gender && form.nickname && form.age && form.tableNum;

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
            <h1 className="title">BETWEEN PARTY</h1>

            <h3 className="subtitle">
              ❝저희 파티는 적당한 온도 속에서 서로를 알아가보는
              <br />
              잔잔한 설렘을 추구합니다😊❞
            </h3>

            <div className="input-group">
              <label htmlFor="gender">성별</label>

              <select id="gender" className="input" value={form.gender} onChange={handleChange}>
                <option value="">성별을 선택해주세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>

              <p className="input-guide">성별을 선택해주세요.</p>

              <label htmlFor="nickname">닉네임</label>

              <input id="nickname" className="input" placeholder="예시: 신림_지드래곤" maxLength={15} value={form.nickname} onChange={handleChange} />

              <p className="input-guide">"지역_연예인 이름"으로 작성해주세요.</p>

              <label htmlFor="age">나이</label>

              <input id="age" className="input" placeholder="예시: 20세 or 07년생" maxLength={4} value={form.age} onChange={handleChange} />

              <p className="input-guide">나이를 입력해주세요.</p>

              <label htmlFor="tableNum">테이블 번호</label>

              <input
                id="tableNum"
                className="input"
                type="number"
                inputMode="numeric"
                placeholder="1"
                maxLength={2}
                value={form.tableNum}
                onChange={handleChange}
              />

              <p className="input-guide">본인이 앉은 테이블 번호를 입력해주세요.</p>
            </div>

            <button className="enter-btn" disabled={!isValid} onClick={() => setAlertOpen(true)}>
              입장하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert open={alertOpen} title="BETWEEN PARTY" message="입장이 완료되었습니다." onClose={() => setAlertOpen(false)} />
    </>
  );
}

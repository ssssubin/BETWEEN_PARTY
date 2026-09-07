import { useState } from "react";
import "./css/LoginPage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";

export default function LoginPage() {
  const [form, setForm] = useState({
    gender: "", // 성별
    name: "", // 예약자명(실명)
    phoneNumber: "", // 전화번호
    isCheck: false, // 개인 정보 수집 동의 여부
    isAdmin: false, // 호스트 여부
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    let formattedValue = value;

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setForm((prev) => ({
      ...prev,
      phoneNumber: formattedValue,
    }));
  };
  const isValidPhoneNumber = /^010-\d{4}-\d{4}$/.test(form.phoneNumber);
  const isValid =
    !!form.gender && !!form.name && isValidPhoneNumber && form.isCheck;

  return (
    <>
      <div
        className="mobile-frame"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,120,0,.45), rgba(52, 21, 21, 0.45)),
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

              <select
                id="gender"
                className="input"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">성별을 선택해주세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>

              <p className="input-guide">성별을 선택해주세요.</p>

              <label htmlFor="name">이름</label>

              <input
                id="name"
                className="input"
                placeholder=""
                maxLength={15}
                value={form.name}
                onChange={handleChange}
              />

              <p className="input-guide">이름을 입력해주세요.</p>

              <label htmlFor="phoneNumber">전화번호</label>

              <input
                id="phoneNumber"
                className="input"
                type="tel"
                inputMode="numeric"
                placeholder="010-1234-5678"
                maxLength={13}
                value={form.phoneNumber}
                onChange={handlePhoneChange}
              />

              <p className="input-guide">전화번호를 입력해주세요.</p>
            </div>

            <label className="check-group">
              <input
                type="checkbox"
                id="isCheck"
                checked={form.isCheck}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isCheck: e.target.checked,
                  }))
                }
              />
              <span>개인 정보(이름, 전화번호) 수집에 동의합니다.</span>
            </label>

            <button
              className="enter-btn"
              disabled={!isValid}
              onClick={() => setAlertOpen(true)}
            >
              로그인
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        open={alertOpen}
        title="BETWEEN PARTY"
        message="BETWEEN PARTY에 오신 걸 환영합니다🥳"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}

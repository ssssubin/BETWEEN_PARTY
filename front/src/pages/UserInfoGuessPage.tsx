import { useState } from "react";
import "./css/UserInfoGuessPage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";

export default function UserInfoGuessPage() {
  const [alertOpen, setAlertOpen] = useState(false);

  // 입력값
  const [table, setTable] = useState("");
  const [age, setAge] = useState<string>("");
  const [job, setJob] = useState("");
  const [charmPoint, setCharmPoint] = useState("");

  // 테이블 개수
  const tableNum = 5;

  // 모든 항목이 입력되었는지 확인
  const isValid =
    table !== "" &&
    age.trim() !== "" &&
    job.trim() !== "" &&
    charmPoint.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;

    setAlertOpen(true);
  };

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
            <h1 className="title">나이/직업 맞추기⭐</h1>

            <h3 className="subtitle">
              테이블끼리 나이·직업·나만의 매력을 적고 <br />
              서로 맞춰보는 콘텐츠입니다☺️
            </h3>

            {/* 테이블 선택 */}
            <div className="input-group">
              <label htmlFor="table">테이블</label>

              <select
                id="table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
              >
                <option value="">테이블을 선택해주세요</option>

                {Array.from({ length: tableNum }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}번 테이블
                  </option>
                ))}
              </select>
            </div>

            {/* 나이 */}
            <div className="input-group">
              <label htmlFor="age">나이</label>

              <input
                id="age"
                type="text"
                placeholder="나이 또는 년생을 입력해주세요"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* 직업 */}
            <div className="input-group">
              <label htmlFor="job">직업</label>
              <input
                id="job"
                type="text"
                placeholder="직업을 입력해주세요"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>

            {/* 나만의 매력 포인트 */}
            <div className="input-group">
              <label htmlFor="charmPoint">나만의 매력 포인트</label>
              <textarea
                id="charmPoint"
                placeholder="나만의 매력 포인트를 입력해주세요"
                value={charmPoint}
                onChange={(e) => setCharmPoint(e.target.value)}
              />
            </div>

            <button
              className="enter-btn"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              제출하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        open={alertOpen}
        title="BETWEEN PARTY"
        message="제출되었습니다☺️"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}

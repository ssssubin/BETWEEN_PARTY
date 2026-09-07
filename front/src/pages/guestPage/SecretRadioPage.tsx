import { useEffect, useRef, useState } from "react";
import "./css/SecretRadioPage.css";
import background from "../../assets/background.png";
import CustomAlert from "../../components/CustomAlert";
import guestData from "../../mock/checkInGuestList.json"

export default function SecretRadioPage() {
  const [form, setForm] = useState({
    nickname: "", // 닉네임
    message: "", // 메시지
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchNickname, setSearchNickname] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // 외부 클릭 시 dropdown 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNicknameSelect = (nickname: string) => {
    setForm((prev) => ({
      ...prev,
      nickname,
    }));

    setSearchNickname("");
    setDropdownOpen(false);
  };

  const filteredGuests = guestData.filter((guest) => {
  const searchTarget = `${guest.region} ${guest.nickname}`.toLowerCase();

  return searchTarget.includes(searchNickname.toLowerCase());
});

  const isValid = !!form.nickname && !!form.message;
  const selectedNickname = form.nickname === "unknown" ? "닉네임 모름" : form.nickname;

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
            <h1 className="title">📻익명 라디오</h1>

            <h3 className="subtitle">
              "오늘 마음이 가는 사람에게 <br/>익명으로 메시지를 남겨보세요🤍"
            </h3>
            <p className="subscribe">📢들어온 질문 중 <strong>10-15개정도</strong> 선별하여 <br/>호스트가 읽어줄 예정입니다!</p>

            <div className="input-group">

              <label htmlFor="nickname">메시지를 보낼 닉네임</label>

             {/* 닉네임 Dropdown */}
              <div className="nickname-dropdown" ref={dropdownRef}>
                <button
                  type="button"
                  className="nickname-select"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <span>{selectedNickname === ""? "닉네임을 선택해주세요": selectedNickname}</span>
                  <span className="dropdown-arrow"></span>
                </button>

                {dropdownOpen && (
                  <div className="nickname-dropdown-menu">
                    <input
                      type="text"
                      className="nickname-search"
                      placeholder="닉네임 검색"
                      value={searchNickname}
                      onChange={(e) =>
                        setSearchNickname(e.target.value)
                      }
                      autoFocus
                    />

                    <div className="nickname-list">
                      {/* 닉네임 모름 */}
                      <button
                        type="button"
                        className={`nickname-option ${
                          form.nickname === "unknown" ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleNicknameSelect("unknown")
                        }
                      >
                        닉네임 모름
                      </button>

                      {/* 검색된 닉네임 */}
                      {filteredGuests.map((guest, index) => (
                        <button
                          type="button"
                          key={index}
                          className={`nickname-option ${
                            form.nickname === guest.nickname
                              ? "selected" 
                              : ""
                          }`}
                          onClick={() =>
                            handleNicknameSelect(`${guest.region} ${guest.nickname}`)
                          }
                        >
                          {guest.region} {guest.nickname}
                        </button>
                      ))}

                      {/* 검색 결과 없음 */}
                      {filteredGuests.length === 0 && (
                        <p className="no-result">
                          검색 결과가 없습니다.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <p className="input-guide">메시지를 보낼 닉네임을 선택해주세요.</p>

              <label htmlFor="message">보낼 메시지</label>
              <p className="input-guide">닉네임을 모르겠으면 테이블번호 + 인상착의를 함께 써주세요!</p>

              <textarea
                id="message"
                className="input message-input"
                placeholder="예시: 오늘 너가 여기서 제일 마음에 들어서 그런데 옆으로 가도 될까?"
                maxLength={300}
                value={form.message}
                onChange={handleChange}
            />

              <p className="input-guide">
                테토스러운 메시지일수록 뽑힐 가능성이 높아요❣️
              </p>
            </div>

            <button
              className="enter-btn"
              disabled={!isValid}
              onClick={() => setAlertOpen(true)}
            >
              전송하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        open={alertOpen}
        title="BETWEEN PARTY"
        message="메시지가 전송되었습니다💌"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}

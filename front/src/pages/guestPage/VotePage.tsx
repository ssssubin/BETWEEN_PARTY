import { useState } from "react";
import "./css/VotePage.css";

import background from "../../assets/background.png";
import CustomAlert from "../../components/CustomAlert";

import guestData from "../../mock/checkInGuestList.json";

type Gender = "all" | "male" | "female";

type VotePageProps = {
  title: string;
  subtitle: React.ReactNode;
  maxSelection: number;
};

export default function VotePage({
  title,
  subtitle,
  maxSelection,
}: VotePageProps) {
  const [alertOpen, setAlertOpen] = useState(false);

  // 현재 선택된 성별 탭
  const [selectedGender, setSelectedGender] = useState<Gender>("all");

  // 현재 선택된 사람
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);

  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState("");

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // 성별 + 검색어 필터링
  const filteredGuests = guestData.filter((guest) => {
    // 성별 필터
    const genderMatch =
      selectedGender === "all" || guest.gender === selectedGender;

    // 검색어 필터
    const keyword = searchKeyword.trim().toLowerCase();

    const searchMatch =
      keyword === "" ||
      guest.region.toLowerCase().includes(keyword) ||
      guest.nickname.toLowerCase().includes(keyword);

    return genderMatch && searchMatch;
  });

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  // 현재 페이지에 보여줄 게스트
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentGuests = filteredGuests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // 성별 탭 변경
  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    setCurrentPage(1);
  };

  // 게스트 선택
  const handleGuestSelect = (guestId: number) => {
    setSelectedGuests((prev) => {
      // 이미 선택된 게스트라면 선택 해제
      if (prev.includes(guestId)) {
        return prev.filter((id) => id !== guestId);
      }

      // 최대 선택 가능 인원 초과
      if (prev.length >= maxSelection) {
        return prev;
      }

      // 게스트 추가
      return [...prev, guestId];
    });
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 검색
  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  // 검색 초기화
  const handleSearchClear = () => {
    setSearchKeyword("");
    setCurrentPage(1);
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
            <h1 className="title">{title}</h1>

            <h3 className="subtitle">{subtitle}</h3>

            {/* 게스트 영역 */}
            <div className="guest-section">
              {/* 성별 탭 */}
              <div className="gender-tabs">
                <button
                  className={
                    selectedGender === "all"
                      ? "gender-tab active"
                      : "gender-tab"
                  }
                  onClick={() => handleGenderChange("all")}
                >
                  전체
                </button>

                <button
                  className={
                    selectedGender === "male"
                      ? "gender-tab active male-tab"
                      : "gender-tab"
                  }
                  onClick={() => handleGenderChange("male")}
                >
                  남성
                </button>

                <button
                  className={
                    selectedGender === "female"
                      ? "gender-tab active female-tab"
                      : "gender-tab"
                  }
                  onClick={() => handleGenderChange("female")}
                >
                  여성
                </button>
              </div>

              {/* 검색 */}
              <div className="search-box">
                <span className="search-icon">🔍</span>

                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="지역 또는 닉네임 검색"
                />

                {searchKeyword && (
                  <button
                    className="search-clear"
                    onClick={handleSearchClear}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* 게스트 카드 */}
              <div className="guest-grid">
                {currentGuests.map((guest) => {
                  const isSelected = selectedGuests.includes(guest.id);

                  return (
                    <div
                      className={`guest-card ${guest.gender} ${
                        isSelected ? "selected" : ""
                      }`}
                      key={guest.id}
                      onClick={() => handleGuestSelect(guest.id)}
                    >
                      {isSelected && (
                        <div className="selected-check">✓</div>
                      )}

                      <div className="guest-profile">
                        <div className="guest-nickname">
                          {guest.region} {guest.nickname}
                        </div>

                        <div className="guest-detail">
                          <span>{guest.mbti}</span>
                          <span>{guest.feature}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 게스트가 없는 경우 */}
              {currentGuests.length === 0 && (
                <div className="empty-guests">
                  해당 조건의 게스트가 없습니다.
                </div>
              )}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      className={
                        currentPage === page
                          ? "page-btn active"
                          : "page-btn"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              className="enter-btn"
              disabled={selectedGuests.length === 0}
              onClick={() => setAlertOpen(true)}
            >
              제출하기🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        open={alertOpen}
        title="BETWEEN PARTY"
        message={
          maxSelection === 1
            ? "최종 투표가 완료되었습니다🥰"
            : "첫인상 투표가 완료되었습니다🥰"
        }
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}

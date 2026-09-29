import { useMemo, useState } from "react";
import "./VoteHistorySection.css";

interface VoteTarget {
  id: number;
  nickname: string;
}

interface VoteHistory {
  id: number;
  nickname: string;
  gender: string;
  voters: VoteTarget[];
}

interface VoteHistorySectionProps {
  voteHistories: VoteHistory[];
  title: string;
}

export function VoteHistorySection({
  voteHistories,
  title
}: VoteHistorySectionProps) {
  const [femaleSearch, setFemaleSearch] = useState("");
  const [maleSearch, setMaleSearch] = useState("");

  const femaleHistories = useMemo(() => {
    return voteHistories.filter(
      (history) =>
        history.gender === "female" &&
        history.nickname
          .toLowerCase()
          .includes(femaleSearch.toLowerCase()),
    );
  }, [voteHistories, femaleSearch]);

  const maleHistories = useMemo(() => {
    return voteHistories.filter(
      (history) =>
        history.gender === "male" &&
        history.nickname
          .toLowerCase()
          .includes(maleSearch.toLowerCase()),
    );
  }, [voteHistories, maleSearch]);

  const renderHistory = (history: VoteHistory) => {
    const targetGender =
      history.gender === "male" ? "female" : "male";
    // const targetNickname = history.voters.map();

    return (
      <div className="vote-history-card" key={history.id}>
        {/* 투표한 사람 */}
        <span className={`nickname-neon ${history.gender}`}>
          {history.nickname}
        </span>

        {/* 화살표 */}
        <span className="vote-arrow">→</span>

        {/* 투표한 대상 */}
        <div className="voter-list">
          {history.voters.map((target, index) => (
            <span key={target.id}>
              <span className={`voter-nickname ${targetGender}`}>
                {target.nickname}
              </span>
              {index < history.voters.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="first-vote-history-section">
      <div className="vote-history-header">
        <h2>{title} 투표 내역</h2>
        <p>
          각 참가자가 누구에게 {title} 투표를 했는지 확인할 수 있습니다.
        </p>
      </div>

      <div className="vote-history-columns">
        {/* 여성 */}
        <div className="vote-history-column female-column">
          <div className="column-title female">
            <span>여성 투표 내역</span>
          </div>

          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="지역 또는 닉네임 검색"
              value={femaleSearch}
              onChange={(e) => setFemaleSearch(e.target.value)}
            />

            {femaleSearch && (
            <button
              className="search-clear-button"
              onClick={() => setFemaleSearch("")}
              type="button"
            >
              ×
            </button>
          )}
          </div>

          <div className="history-list">
            {femaleHistories.length > 0 ? (
              femaleHistories.map(renderHistory)
            ) : (
              <div className="empty-history">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 남성 */}
        <div className="vote-history-column male-column">
          <div className="column-title male">
            <span>남성 투표 내역</span>
          </div>

          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="지역 또는 닉네임 검색"
              value={maleSearch}
              onChange={(e) => setMaleSearch(e.target.value)}
            />

            {maleSearch && (
            <button
              className="search-clear-button"
              onClick={() => setMaleSearch("")}
              type="button"
            >
              ×
            </button>
          )}
          </div>

          <div className="history-list">
            {maleHistories.length > 0 ? (
              maleHistories.map(renderHistory)
            ) : (
              <div className="empty-history">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

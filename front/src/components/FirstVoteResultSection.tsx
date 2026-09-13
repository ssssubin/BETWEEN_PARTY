import { useMemo, useState } from "react";
import type { Participant } from "../types/participant";
import "./FirstVoteResultSection.css";

interface VoteResult {
  participant: Participant;
  voteCount: number;
  voters: Participant[];
}

interface FirstVoteResultSectionProps {
  femaleResults: VoteResult[];
  maleResults: VoteResult[];
}

export function FirstVoteResultSection({
  femaleResults,
  maleResults,
}: FirstVoteResultSectionProps) {
  return (
    <div className="first-vote-result-container">
      <FirstVoteResultColumn
        gender="female"
        title={`여성 ${femaleResults.length}명`}
        results={femaleResults}
      />

      <FirstVoteResultColumn
        gender="male"
        title={`남성 ${maleResults.length}명`}
        results={maleResults}
      />
    </div>
  );
}

interface FirstVoteResultColumnProps {
  gender: "female" | "male";
  title: string;
  results: VoteResult[];
}

function FirstVoteResultColumn({
  gender,
  title,
  results,
}: FirstVoteResultColumnProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sentIds, setSentIds] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSendResult = (id: number) => {
    setSentIds((prev) => [...prev, id]);
  };

  // 지역 또는 닉네임 검색
  const filteredResults = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return results;
    }

    return results.filter((result) =>
      result.participant.nickname.toLowerCase().includes(keyword),
    );
  }, [results, searchKeyword]);

  return (
    <div className={`first-vote-result-column ${gender}`}>
      {/* 검색 영역 */}
      <div className="first-vote-result-header">
        <div className="first-vote-result-search">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="지역 또는 닉네임 검색"
          />

          {searchKeyword && (
            <button
              className="search-clear-button"
              onClick={() => setSearchKeyword("")}
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="first-vote-result-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => {
            const isExpanded = expandedId === result.participant.id;
            const isSent = sentIds.includes(result.participant.id);

            return (
              <div
                className={`first-vote-result-card ${
                  isExpanded ? "expanded" : ""
                }`}
                key={result.participant.id}
              >
                <button
                  className="first-vote-result-main"
                  onClick={() => handleToggle(result.participant.id)}
                >
                  <span className="rank">{index + 1}</span>

                  <span className="nickname">
                    {result.participant.nickname}
                  </span>

                  <span className="vote-count">{result.voteCount}표</span>

                  <span className="arrow">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {isExpanded && (
                  <div className="voters-container">
                    <div className="voters-list">
                      {result.voters.length > 0 ? (
                        result.voters.map((voter) => (
                          <span className="voter-item" key={voter.id}>
                            {voter.nickname}
                          </span>
                        ))
                      ) : (
                        <span className="no-voters">
                          투표한 게스트가 없습니다.
                        </span>
                      )}

                      <button
                        className={`send-result-button ${isSent ? "sent" : ""}`}
                        disabled={isSent}
                        onClick={() => handleSendResult(result.participant.id)}
                      >
                        {isSent ? "전송완료" : "결과 전송하기"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-search-result">검색 결과가 없습니다.</div>
        )}{" "}
      </div>
    </div>
  );
}

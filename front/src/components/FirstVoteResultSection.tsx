import { useState } from "react";
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

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSendResult = (id: number) => {
    setSentIds((prev) => [...prev, id]);
  };

  return (
    <div className={`first-vote-result-column ${gender}`}>
      <div className="first-vote-result-list">
        {results.map((result, index) => {
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

                <span className="nickname">{result.participant.nickname}</span>

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
        })}
      </div>
    </div>
  );
}

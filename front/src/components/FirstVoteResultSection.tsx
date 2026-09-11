import { useMemo, useState } from "react";
import type { Participant } from "../types/participant";
import "./FirstVoteResultSection.css";

interface VoteResult {
  participant: Participant;
  voteCount: number;
}

interface VoteRelation {
  voterId: number;
  targetId: number;
}

interface FirstVoteResultSectionProps {
  femaleResults: VoteResult[];
  maleResults: VoteResult[];
  voteRelations: VoteRelation[];
  participants: Participant[];
}

interface VoteDetailModalProps {
  open: boolean;
  onClose: () => void;
  participants: Participant[];
  voteRelations: VoteRelation[];
}

const ITEMS_PER_PAGE = 6;

export function FirstVoteResultSection({
  femaleResults,
  maleResults,
  voteRelations,
  participants,
}: FirstVoteResultSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="first-vote-result-container">
        <VoteResultColumn
          gender="female"
          title={`여성 ${femaleResults.length}명`}
          results={femaleResults}
          onDetailClick={() => setModalOpen(true)}
        />

        <VoteResultColumn
          gender="male"
          title={`남성 ${maleResults.length}명`}
          results={maleResults}
          onDetailClick={() => setModalOpen(true)}
        />
      </div>

      <VoteDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        participants={participants}
        voteRelations={voteRelations}
      />
    </>
  );
}

interface VoteResultColumnProps {
  gender: "female" | "male";
  title: string;
  results: VoteResult[];
  onDetailClick: () => void;
}

function VoteResultColumn({
  gender,
  title,
  results,
  onDetailClick,
}: VoteResultColumnProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const currentResults = results.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className={`vote-result-column ${gender}`}>
      <div className="vote-result-header">
        <h2>{title}</h2>

        <button
          className="vote-detail-button"
          onClick={onDetailClick}
        >
          투표 상세보기
        </button>
      </div>

      <div className="vote-result-list">
        {currentResults.map((result, index) => {
          const rank =
            (page - 1) * ITEMS_PER_PAGE + index + 1;

          return (
            <div
              className="vote-result-card"
              key={result.participant.id}
            >
              <div className="vote-rank">
                {rank}
              </div>

              <div className="vote-participant-info">
                <span className="vote-participant-region">
                  {result.participant.region}
                </span>

                <strong>
                  {result.participant.nickname}
                </strong>
              </div>

              <div className="vote-count">
                <strong>{result.voteCount}</strong>
                <span>표</span>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="vote-pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ‹
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              className={page === pageNumber ? "active" : ""}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function VoteDetailModal({
  open,
  onClose,
  participants,
  voteRelations,
}: VoteDetailModalProps) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchResults = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return [];
    }

    return participants.filter((participant) => {
      const region = participant.region?.toLowerCase() ?? "";
      const nickname = participant.nickname?.toLowerCase() ?? "";

      return (
        region.includes(keyword) ||
        nickname.includes(keyword)
      );
    });
  }, [searchKeyword, participants]);

  if (!open) {
    return null;
  }

  const getParticipant = (id: number) => {
    return participants.find(
      (participant) => participant.id === id
    );
  };

  return (
    <div className="vote-modal-overlay" onClick={onClose}>
      <div
        className="vote-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="vote-modal-header">
          <div>
            <span>첫인상 투표</span>
            <h2>투표 상세보기</h2>
          </div>

          <button
            className="vote-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="vote-search">
          <input
            type="text"
            placeholder="지역 또는 닉네임 검색"
            value={searchKeyword}
            onChange={(event) =>
              setSearchKeyword(event.target.value)
            }
          />
        </div>

        <div className="vote-modal-content">
          {!searchKeyword.trim() ? (
            <div className="vote-empty">
              <span>🔍</span>
              <p>
                지역 또는 닉네임을 검색해주세요.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="vote-empty">
              <span>😢</span>
              <p>
                검색된 참가자가 없습니다.
              </p>
            </div>
          ) : (
            searchResults.map((participant) => {
              const votedFor = voteRelations
                .filter(
                  (relation) =>
                    relation.voterId === participant.id
                )
                .map((relation) =>
                  getParticipant(relation.targetId)
                )
                .filter(
                  (person): person is Participant =>
                    person !== undefined
                );

              const votedBy = voteRelations
                .filter(
                  (relation) =>
                    relation.targetId === participant.id
                )
                .map((relation) =>
                  getParticipant(relation.voterId)
                )
                .filter(
                  (person): person is Participant =>
                    person !== undefined
                );

              return (
                <div
                  className="vote-detail-card"
                  key={participant.id}
                >
                  <div className="searched-participant">
                    <span>
                      {participant.region}
                    </span>
                    <strong>
                      {participant.nickname}
                    </strong>
                  </div>

                  <div className="vote-relation">
                    <div className="relation-title">
                      <span>→</span>
                      <strong>내가 투표한 사람</strong>
                    </div>

                    {votedFor.length > 0 ? (
                      <div className="relation-list">
                        {votedFor.map((person) => (
                          <div
                            className="relation-person"
                            key={person.id}
                          >
                            {person.region}{" "}
                            {person.nickname}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relation-none">
                        투표한 사람이 없습니다.
                      </div>
                    )}
                  </div>

                  <div className="relation-divider" />

                  <div className="vote-relation">
                    <div className="relation-title">
                      <span>←</span>
                      <strong>나에게 투표한 사람</strong>
                    </div>

                    {votedBy.length > 0 ? (
                      <div className="relation-list">
                        {votedBy.map((person) => (
                          <div
                            className="relation-person"
                            key={person.id}
                          >
                            {person.region}{" "}
                            {person.nickname}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relation-none">
                        투표한 사람이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
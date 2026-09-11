import { useState } from "react";
import type { Participant } from "../types/participant";
import "./Participants.css";

const ITEMS_PER_PAGE = 12;

interface ParticipantSectionProps {
  femaleParticipants: Participant[];
  maleParticipants: Participant[];
}

interface ParticipantColumnProps {
  gender: "female" | "male";
  title: string;
  participants: Participant[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ParticipantSection({
  femaleParticipants,
  maleParticipants,
}: ParticipantSectionProps) {
  const [femalePage, setFemalePage] = useState(1);
  const [malePage, setMalePage] = useState(1);

  const femaleTotalPages = Math.ceil(
    femaleParticipants.length / ITEMS_PER_PAGE
  );

  const maleTotalPages = Math.ceil(
    maleParticipants.length / ITEMS_PER_PAGE
  );

  const femaleStartIndex =
    (femalePage - 1) * ITEMS_PER_PAGE;

  const maleStartIndex =
    (malePage - 1) * ITEMS_PER_PAGE;

  const currentFemaleParticipants =
    femaleParticipants.slice(
      femaleStartIndex,
      femaleStartIndex + ITEMS_PER_PAGE
    );

  const currentMaleParticipants =
    maleParticipants.slice(
      maleStartIndex,
      maleStartIndex + ITEMS_PER_PAGE
    );

  return (
    <div className="participant-container">
      <ParticipantColumn
        gender="female"
        title={`여성 ${femaleParticipants.length}명`}
        participants={currentFemaleParticipants}
        currentPage={femalePage}
        totalPages={femaleTotalPages}
        onPageChange={setFemalePage}
      />

      <ParticipantColumn
        gender="male"
        title={`남성 ${maleParticipants.length}명`}
        participants={currentMaleParticipants}
        currentPage={malePage}
        totalPages={maleTotalPages}
        onPageChange={setMalePage}
      />
    </div>
  );
}

function ParticipantColumn({
    gender,
  title,
  participants,
  currentPage,
  totalPages,
  onPageChange,
}: ParticipantColumnProps) {
  return (
    <section className={`participant-column ${gender}`}>
      <div className="participant-header">
        {title}
      </div>

      <div className="participant-list">
        {participants.map((participant) => (
          <div
            className="participant-row"
            key={participant.id}
          >
            <div className="participant-info">
              <strong>{participant.name} {participant.nickname !== "" ? `(${participant.nickname})`: ''}</strong>

              <span>
                {participant.phoneNum} 
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() =>
              onPageChange(currentPage - 1)
            }
          >
            ‹
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              className={`pagination-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() =>
              onPageChange(currentPage + 1)
            }
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

import { useState } from "react";
import type { Participant } from "../types/participant";
import "./Participants.css";
import CustomAlert from "./CustomAlert";

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
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}

interface ParticipantEditModalProps {
  participant: Participant;
  onClose: () => void;
  onSave: (participant: Participant) => void;
}

export function ParticipantSection({
  femaleParticipants,
  maleParticipants,
}: ParticipantSectionProps) {
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [femalePage, setFemalePage] = useState(1);
  const [malePage, setMalePage] = useState(1);

  const [femaleList, setFemaleList] = useState(femaleParticipants);
  const [maleList, setMaleList] = useState(maleParticipants);

  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);

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
  
  // 수정 버튼
  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
  };

  // 수정 저장
  const handleUpdate = (updatedParticipant: Participant) => {
    if (updatedParticipant.gender === "female") {
      setFemaleList((prev) =>
        prev.map((participant) =>
          participant.id === updatedParticipant.id
            ? updatedParticipant
            : participant
        )
      );
    } else {
      setMaleList((prev) =>
        prev.map((participant) =>
          participant.id === updatedParticipant.id
            ? updatedParticipant
            : participant
        )
      );
    }
    setEditingParticipant(null);
    setAlert({
      open: true,
      title: "BETWEEN",
      message: `게스트(${updatedParticipant.name}) 정보를 수정하였습니다.`,
    });
  };

  // 삭제 버튼
  const handleDelete = (participant: Participant) => {
    setAlert({
      open: true,
      title: "BETWEEN",
      message: `게스트(${participant.name})가 삭제되었습니다.`,
    });

    if (participant.gender === "female") {
      setFemaleList((prev) =>
        prev.filter((item) => item.id !== participant.id)
      );
    } else {
      setMaleList((prev) =>
        prev.filter((item) => item.id !== participant.id)
      );
    }
  };

  return (
    <>
      <div className="participant-container">
        <ParticipantColumn
          gender="female"
          title={`여성 ${femaleParticipants.length}명`}
          participants={currentFemaleParticipants}
          currentPage={femalePage}
          totalPages={femaleTotalPages}
          onPageChange={setFemalePage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ParticipantColumn
          gender="male"
          title={`남성 ${maleParticipants.length}명`}
          participants={currentMaleParticipants}
          currentPage={malePage}
          totalPages={maleTotalPages}
          onPageChange={setMalePage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {editingParticipant && (
          <ParticipantEditModal
            participant={editingParticipant}
            onClose={() => setEditingParticipant(null)}
            onSave={handleUpdate}
          />
        )}

      <CustomAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        onClose={() =>
          setAlert({
            open: false,
            title: "",
            message: "",
          })
        }
      />
    </>
  );
}

function ParticipantColumn({
    gender,
  title,
  participants,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete
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
              <strong>
                {participant.name}
                {participant.nickname !== ""
                  ? ` (${participant.nickname})`
                  : ""}
              </strong>

              <span>{participant.phoneNum}</span>

              <div className="participant-actions">
                <button
                  type="button"
                  className="participant-edit-button"
                  onClick={() => onEdit(participant)}
                >
                  수정
                </button>

                <button
                  type="button"
                  className="participant-delete-button"
                  onClick={() => onDelete(participant)}
                >
                  삭제
                </button>
              </div>
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

// 게스트 정보 수정 모달
function ParticipantEditModal({
  participant,
  onClose,
  onSave,
}: ParticipantEditModalProps) {
  const [name, setName] = useState(participant.name);
  const [nickname, setNickname] = useState(participant.nickname);
  const [phoneNum, setPhoneNum] = useState(participant.phoneNum);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...participant,
      name: name.trim(),
      nickname: nickname.trim(),
      phoneNum: phoneNum.trim(),
    });
  };

  return (
    <div className="participant-modal-overlay" onClick={onClose}>
      <div
        className="participant-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="participant-modal-header">
          <h2>참가자 정보 수정</h2>

          <button
            type="button"
            className="participant-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="participant-form">
            <label>
              <span>이름</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              <span>닉네임</span>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </label>

            <label>
              <span>전화번호</span>
              <input
                type="tel"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="participant-modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              취소
            </button>

            <button
              type="submit"
              className="modal-save-button"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
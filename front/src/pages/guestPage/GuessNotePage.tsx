import { useState } from "react";
import "./css/GuessNotePage.css";
import background from "../assets/background.png";
import guessData from "../../mock/guessNotes.json"; // 경로 설정

interface GuessNote {
  id: number;
  age: string;
  job: string;
  charmPoint: string;
}

// 현재 로그인한 사용자의 테이블 번호라고 가정
const myTableId = 1;

export default function GuessNotePage() {
  const [selectedNote, setSelectedNote] = useState<GuessNote | null>(null);

  // 현재는 mock 데이터이므로 myTableId를 기준으로 필터링
  // 실제 API 연결 시에는 서버에서 같은 테이블의 쪽지만 받아오는 방식 추천
  const tableNotes = guessData;

  // 열람한 쪽지 ID
  const [readNoteIds, setReadNoteIds] = useState<Set<number>>(new Set());

  const handleNoteClick = (note: GuessNote) => {
    // 쪽지 열람 처리
    setReadNoteIds((prev) => {
      const next = new Set(prev);
      next.add(note.id);
      return next;
    });

    // 상세 모달 열기
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  return (
    <>
      <div
        className="mobile-frame guess-note-page"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,120,0,.45), rgba(0,0,0,.45)),
          url(${background})
        `,
        }}
      >
        <div className="container">
          <div className="inner">
            <h1 className="title">누구일까요?⭐</h1>

            <h3 className="subtitle">
              같은 테이블에 앉은 사람들의 쪽지를 보고
              <br />
              누구인지 맞춰보세요☺️
            </h3>

            <div className="note-grid">
              {tableNotes.map((note, index) => {
                const isRead = readNoteIds.has(note.id);

                return (
                  <button
                    key={note.id}
                    className={`note-card ${isRead ? "read" : ""}`}
                    onClick={() => handleNoteClick(note)}
                  >
                    {/* 열람 완료 표시 */}
                    {isRead && <div className="read-badge">✓ 열람 완료</div>}

                    <div className="note-number">{index + 1}번 쪽지</div>

                    <div className="note-lock">{isRead ? "📖" : "🔒"}</div>

                    <div className="note-guide">
                      {isRead ? "다시 확인하기" : "눌러서 확인하기"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 모달은 mobile-frame 밖에 위치 */}
      {selectedNote && (
        <div className="note-modal-overlay" onClick={handleCloseModal}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="닫기"
            >
              ×
            </button>

            <h2>쪽지 내용💌</h2>

            <div className="note-info">
              <div className="info-item">
                <span className="info-label">나이</span>
                <span className="info-value">{selectedNote.age}</span>
              </div>

              <div className="info-item">
                <span className="info-label">직업</span>
                <span className="info-value">{selectedNote.job}</span>
              </div>

              <div className="info-item charm-item">
                <span className="info-label">나만의 매력 포인트</span>

                <p className="charm-value">{selectedNote.charmPoint}</p>
              </div>
            </div>

            <button className="modal-confirm-btn" onClick={handleCloseModal}>
              확인🤍
            </button>
          </div>
        </div>
      )}
    </>
  );
}

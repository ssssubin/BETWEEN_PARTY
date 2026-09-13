import { useState } from "react";
import "./css/MainPage.css";
import background from "../../assets/background.png";
import guestData from "../../mock/guestList.json";
import type { Participant } from "../../types/participant";
import { ParticipantSection } from "../../components/Participants";
import { FirstVoteResultSection } from "../../components/FirstVoteResultSection";
import { FirstVoteMatchSection } from "../../components/FirstVoteMatchSection";
import { AnonymousRadioSection } from "../../components/AnonymousRadioSection";

const stages = [
  "대기",
  "첫인상 투표",
  "나이/직업 맞추기",
  "첫인상 득표 수",
  "익명 라디오",
  "최종 투표",
];

const tabs = ["참가자", "첫인상 투표", "익명 라디오", "최종투표", "지난 행사"];

export default function MainPage() {
  const [currentStage, setCurrentStage] = useState(-1);
  const [currentStageName, setCurrentStageName] = useState("");
  const [isAdmissionClosed, setIsAdmissionClosed] = useState(false);
  const [activeTab, setActiveTab] = useState("참가자");

  const femaleParticipants: Participant[] = guestData.filter(
    (person) => person.gender === "female",
  );
  const maleParticipants: Participant[] = guestData.filter(
    (person) => person.gender === "male",
  );

  const femaleVoteResults = [
    {
      participant: femaleParticipants[0],
      voteCount: 3,
      voters: [maleParticipants[0], maleParticipants[2], maleParticipants[4]],
    },
    {
      participant: femaleParticipants[1],
      voteCount: 2,
      voters: [maleParticipants[1], maleParticipants[3]],
    },
    {
      participant: femaleParticipants[2],
      voteCount: 2,
      voters: [maleParticipants[0], maleParticipants[1]],
    },
  ];

  const maleVoteResults = [
    {
      participant: maleParticipants[0],
      voteCount: 3,
      voters: [
        femaleParticipants[0],
        femaleParticipants[2],
        femaleParticipants[4],
      ],
    },
    {
      participant: maleParticipants[1],
      voteCount: 2,
      voters: [femaleParticipants[1], femaleParticipants[3]],
    },
    {
      participant: maleParticipants[2],
      voteCount: 2,
      voters: [femaleParticipants[1], femaleParticipants[3]],
    },
    {
      participant: maleParticipants[3],
      voteCount: 2,
      voters: [femaleParticipants[1], femaleParticipants[3]],
    },
    {
      participant: maleParticipants[4],
      voteCount: 2,
      voters: [femaleParticipants[1], femaleParticipants[3]],
    },
  ];

  const matchResults = [
    {
      male: maleParticipants[0],
      female: femaleParticipants[0],
    },
    {
      male: maleParticipants[1],
      female: femaleParticipants[1],
    },
    {
      male: maleParticipants[2],
      female: femaleParticipants[2],
    },
    {
      male: maleParticipants[3],
      female: femaleParticipants[3],
    },
  ];

  const radioMessages = [
    {
      to: femaleParticipants[0],
      from: maleParticipants[0],
      message: "오늘 이야기하면서 정말 즐거웠어요!",
    },
    {
      to: maleParticipants[1],
      from: femaleParticipants[2],
      message: "처음에는 조금 어색했는데 생각보다 편하게 이야기할 수 있었어요.",
    },
    {
      to: femaleParticipants[1],
      from: maleParticipants[2],
      message: "다음에 기회가 된다면 또 이야기하고 싶어요.",
    },
    {
      to: maleParticipants[0],
      from: femaleParticipants[0],
      message: "오늘 분위기가 너무 재미있었어요!",
    },
  ];

  const handleStageStart = (index: number) => {
    setCurrentStage(index);
    setCurrentStageName(stages[index]);
  };

  const handleStageEnd = (index: number) => {
    if (currentStage === index) {
      setCurrentStage(-1);
    }
  };

  return (
    <div
      className="host-page"
      style={{
        backgroundImage: `
            linear-gradient(rgba(255,120,0,.45), rgba(0,0,0,.45)),
            url(${background})
          `,
      }}
    >
      {/* Header */}
      <header className="host-header">
        <div className="header-title">
          <div className="party-name">BETWEEN PARTY</div>
          <h1>행사 운영</h1>
        </div>

        <div className="header-actions">
          <div className="gender-count female">
            여성 {femaleParticipants.length}
          </div>

          <div className="gender-count male">
            남성 {maleParticipants.length}
          </div>

          <button
            className={`admission-toggle ${isAdmissionClosed ? "closed" : ""}`}
            onClick={() => setIsAdmissionClosed((prev) => !prev)}
          >
            <div className="admission-text">
              <span>신규 참가자 입장</span>
              <strong>{isAdmissionClosed ? "입장 마감" : "입장 가능"}</strong>
            </div>

            <span className="toggle">
              <span className="toggle-circle" />
            </span>
          </button>

          <button className="end-event-button">모임 종료</button>

          <button className="admin-event-button">관리자 설정</button>
        </div>
      </header>

      {/* Stage */}
      <section className="stage-section">
        <div className="current-stage-card">
          <span>현재 단계</span>

          <strong>
            {currentStage >= 0
              ? stages[currentStage]
              : `${currentStageName} 진행 종료`}
          </strong>

          <em>{currentStage >= 0 ? "진행 중" : "대기"}</em>
        </div>

        <div className="stage-list">
          {stages.map((stage, index) => {
            const isActive = currentStage === index;

            return (
              <div
                className={`stage-card ${isActive ? "active" : ""}`}
                key={stage}
              >
                <div className="stage-title">
                  {index + 1}. {stage}
                </div>

                <div className="stage-buttons">
                  <button
                    className="start-button"
                    onClick={() => handleStageStart(index)}
                  >
                    시작
                  </button>

                  <button
                    className="end-button"
                    onClick={() => handleStageEnd(index)}
                  >
                    마감
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tabs */}
      <nav className="host-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="host-content">
        {activeTab === tabs[0] && ( // 참가자 목록
          <ParticipantSection
            femaleParticipants={femaleParticipants}
            maleParticipants={maleParticipants}
          />
        )}

        {activeTab === tabs[1] && ( // 첫인상 투표 결과
          <>
            <FirstVoteResultSection
              femaleResults={femaleVoteResults}
              maleResults={maleVoteResults}
            />
            <FirstVoteMatchSection matches={matchResults} />
          </>
        )}

        {activeTab === tabs[2] && ( // 익명 라디오
          <AnonymousRadioSection messages={radioMessages} />
        )}

        {!tabs.includes(activeTab) && (
          <div className="empty-content">
            <h2>{activeTab}</h2>
            <p>해당 기능의 운영 화면입니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

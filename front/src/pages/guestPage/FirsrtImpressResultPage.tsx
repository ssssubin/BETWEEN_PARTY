import { useState } from "react";
import "./css/FirstImpressResultPage.css";
import background from "../../assets/background.png";
import voteData from "../../mock/firstImpressResult.json"

interface Voter {
    id: number;
    nickname: string;
}

export default function FirstImpressResultPage() {
    const [voters, setVoters] = useState<Voter[]>(voteData.voters);
    const [loading, setLoading] = useState(false);

  return (
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
          <h1 className="title">
            오늘,
            <br />
            당신의 첫인상 득표 수는?
          </h1>

          <h3 className="subtitle">
            "누가 나를 투표했는지 알고 싶다면,
            <br />
            코인을 사용해 확인해보세요😉"
          </h3>

          {/* 투표자 목록 */}
          <div className="voter-section">
            {loading ? (
              <p>투표자 정보를 불러오는 중...</p>
            ) : voters.length === 0 ? (
              <p>아직 나에게 투표한 사람이 없어요🥲</p>
            ) : (
              <>
                <div className="vote-count">
                  총 <strong>{voters.length}명</strong>이 투표했어요🫶
                </div>

                <div className="voter-list">
                  {voters.map((voter, index) => (
                    <div className="voter-card" key={voter.id}>
                        <div className="voter-number">
                            {index + 1}
                        </div>

                        <div className="voter-info">
                            <div className="voter-nickname">{voter.nickname}</div>
                        </div>
                        </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

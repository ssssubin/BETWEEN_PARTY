import "./css/FinalVoteResultPage.css";

import background from "../../assets/background.png";

export default function FinalVoteResultPage() {
  // TODO: API에서 받아올 값
  const isMatched = false;

  // TODO: API에서 받아올 매칭 상대 정보
  const matchedGuest = {
    region: "신림",
    nickname: "남주혁",
  };

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
        <div className="fixed-header">
            <h1 className="title"> 최종 투표 결과💘 </h1>
            <h3 className="subtitle">
            ❝저희 파티는 적당한 온도 속에서 서로를 알아가보는
            <br />
            잔잔한 설렘을 추구합니다😊❞
            </h3>
        </div>
        <div className="inner result-inner">

          {isMatched ? (
            <div className="final-result-card">
              <div className="final-result-icon">
                💕
              </div>

              <h2 className="final-result-title">
                매칭되었습니다!
              </h2>

              <div className="matched-guest">
                <span className="matched-guest-label">
                  [ 매칭된 사람 ]
                </span>

                <div className="matched-guest-name">
                  {matchedGuest.region} {matchedGuest.nickname}
                </div>

                <p className="matched-guest-message">
                  좋은 인연으로 이어지길 바랄게요💗
                </p>
              </div>
            </div>
          ) : (
            <div className="final-result-card not-matched">
              <div className="final-result-icon">
                💌
              </div>

              <h2 className="final-result-title">
                아쉽게 매칭되지 않았어요🥲
              </h2>

              <p className="final-result-message">
                서로의 선택이 맞지 않았어요.
                <br />
                그래도 멋진 만남이었어요🥰
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

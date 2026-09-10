import "./css/FirstVoteResultPage.css";

import background from "../../assets/background.png";

export default function FirstVoteResultPage() {
  // TODO: API에서 받아올 값
  const isMatched = true;

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
        {/* 상단 고정 영역 */}
        <div className="fixed-header">
            <h1 className="title"> 첫인상 투표 결과💌 </h1>
            <h3 className="subtitle">
            ❝저희 파티는 적당한 온도 속에서 서로를 알아가보는
            <br />
            잔잔한 설렘을 추구합니다😊❞
            </h3>
        </div>
        <div className="inner result-inner">

          {isMatched ? (
            <>
              <div className="result-card matched">
                <div className="result-icon">💗</div>

                <h2 className="result-title">
                  서로 관심을 보냈어요🥰
                </h2>
              </div>
              <p className="result-notice">
                ※ 첫인상 투표에서는 <br/>상대방의 정보가 공개되지 않습니다.
              </p>
            </>
           
          ) : (
            <div className="result-card not-matched">
              <div className="result-icon">💌</div>

              <h2 className="result-title">
                아쉽게도 매칭되지 않았어요🥲
              </h2>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
}

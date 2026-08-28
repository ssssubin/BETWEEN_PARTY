import styles from './NoticeItem.module.css';

// NoticeItemProps 인터페이스 정의
interface NoticeItemProps{
    title: string;
    children: React.ReactNode, // JSX 요소, 문자열, 배열 등을 모두 수용
    isOpen: boolean,
    onToggle: () => void // 매개변수와 반환값이 없는 함수 타입
}

function NoticeItem({ title, children, isOpen, onToggle } : NoticeItemProps) {
  return (
    <div className={styles.item} style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      <button
        type="button"
        className={styles.title}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.arrow}>
          {isOpen ? '▼' : '▶'}
        </span>

        <span>{title}</span>
      </button>

      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}

export default NoticeItem;

import { useEffect, useState } from 'react'; 
import styles from './LoadingIndicator.module.css';
import { ReactComponent as UFOIcon } from '../../assets/img/ufo.svg';

type LoadingIndicatorProps = {
  isLoading: boolean;
  isLoadingIndicatorActiveHandler: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
};

function LoadingIndicator({
  isLoading,
  isLoadingIndicatorActiveHandler,
  message
}: LoadingIndicatorProps) {
  const [start] = useState(Date.now());
  
  useEffect(() => {
    if (!isLoading) {
      let delta = Date.now() - start;
      delta = Math.floor(delta / 1000);
      const timeRemaining = 5 - delta;

      if (timeRemaining > 0) {
        setTimeout(() => {
          isLoadingIndicatorActiveHandler(false);
        }, timeRemaining * 1000);
      } else {
        isLoadingIndicatorActiveHandler(false);
      }
    }
  }, [isLoading, isLoadingIndicatorActiveHandler, start]);

  return (
    <div className={styles.LoadingIndicator}>
      <UFOIcon />
      <div className={styles.ufoBeam}>
        <div />
        <div />
        <div />
      </div>
      <div className={styles.text}>{message}</div>
    </div>
  );
}

export default LoadingIndicator;

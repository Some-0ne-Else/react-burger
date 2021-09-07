import React from 'react';
import FeedDetails from '../components/FeedDetails/FeedDetails';
import styles from './FeedDetailsPage.module.css';

function FeedDetailsPage() {
  return (
    <main className={styles.main}>
      <FeedDetails />
    </main>
  );
}

export default FeedDetailsPage;

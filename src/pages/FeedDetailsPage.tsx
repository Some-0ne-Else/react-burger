import React, { FC } from 'react';
import FeedDetails from '../components/FeedDetails/FeedDetails';
import styles from './FeedDetailsPage.module.css';

const FeedDetailsPage:FC = () => (
  <main className={styles.main}>
    <FeedDetails />
  </main>
);

export default FeedDetailsPage;

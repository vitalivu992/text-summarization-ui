import React from 'react';

export const SCORE_CODE_TO_LABEL = {
  "combination": "Final score",
  "word_match": "Word match share",
  "tfidf_wms": "TF-IDF Word match share",
  "cross_sim": "Cross-Encoder",
  "cosine_sim": "Consine similarity",
}
export const PRECISION = 10000;
export default function App({ children }) {
  return (
    <div className="home-app">
      <div className="page-container">{children}</div>
    </div>
  );
}

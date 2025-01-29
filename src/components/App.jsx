import React, { useState } from 'react';
import FeedbackOptions from '../components/FeedbackOptions';
import Statistics from '../components/Statistics';
import Section from '../components/Section';
import Notification from '../components/Notification';


const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={Object.keys(feedback)} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {total ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;


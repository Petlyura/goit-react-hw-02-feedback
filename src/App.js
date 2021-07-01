import React, { Component } from "react";

import Section from "./components/Section";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleLeaveFeedback = ({ target: { name } }) => {
    this.setState((prevState) => ({ [name]: prevState[name] + 1 }));
  };

  countTotalFeedback = () => {
    const total = Object.values(this.state).reduce(
      (acc, value) => acc + value,
      0
    );
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const positiveFeedback = this.state.good;
    const positiveFeedbackPercentage = total
      ? Math.round((positiveFeedback / total) * 100)
      : 0;

    return positiveFeedbackPercentage;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions onLeaveFeedback={this.handleLeaveFeedback} />
        </Section>
        <Section>
          {totalFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}

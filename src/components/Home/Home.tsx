import './Home.css';
import budget_video from '../../assets/Budget_Tool.mp4';

function Home() {
  return (
    <div>
      {/* Section for user to specify expenses */}
      <section className="take-control">
        <h1>Take Control of Your Finances</h1>
        <p>The Online Budgeting Tool (OBT) provides users with everything they need to manage their money efficiently.</p>
        <div className="video-container">
          <video controls width="600" height="400" autoPlay muted>
            <source src={budget_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="features">
        <h1>Explore Our Key Features</h1>
        <div className="feature-grid">
          <div className="feature-item">
            <h2>Create Budgets</h2>
            <p>Plan your spending and track where your money goes.</p>
            <a href="/budgets" className="learn-more">
              Learn More
            </a>
          </div>
          <div className="feature-item">
            <h2>Track Investments</h2>
            <p>Monitor your daily expenses with easy-to-read reports.</p>
            <a href="/expenses" className="learn-more">
              Learn More
            </a>
          </div>
          <div className="feature-item">
            <h2>Financial Calculators</h2>
            <p>Use our tools to calculate savings, loans, and investments.</p>
            <a href="/calculators" className="learn-more">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h1>How It Works</h1>
        <p>Learn how to set up your account, create a budget, and start tracking expenses.</p>
        <button className="cta-button">See How It Works</button>
      </section>

      <section className="testimonials">
        <h1>What Our Users Say</h1>
        <p>"OBT has helped me save more and spend smarter!" - Sarah M.</p>
      </section>
    </div>
  );
}
export default Home;

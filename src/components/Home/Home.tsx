import './Home.css';
import { Link } from 'react-router-dom';

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
            <Link to="/tools/budget" className="feature-cta-button">
              Explore the Budget Tool
            </Link>
          </div>
          <div className="feature-item">
            <h2>Track Investments</h2>
            <p>Learn how to make your money work for you.</p>
            <Link to="/tools/interest-calculator" className="feature-cta-button">
              Start Tracking Investments
            </Link>
          </div>
          <div className="feature-item">
            <h2>Contact Experts</h2>
            <p>Reach out to the OBT team with all your financial tool questions.</p>
            <Link to="/contact" className="feature-cta-button">
              Contact Experts Now
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h1>Don't know where to start?</h1>
        <p>Familiarize yourself with key financial terms to begin your journey.</p>
        <Link to="/help" className="feature-cta-button">
          Explore financial terms
        </Link>
      </section>

      <section className="testimonials">
        <h1>What Our Users Say</h1>
        <p>"OBT has helped me save more and spend smarter!" - Sarah M.</p>
      </section>
    </div>
  );
}
export default Home;

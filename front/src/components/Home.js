import React, { useState, useEffect } from "react";
import "./Home.css";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="saving-lives-container">
      <h1>Welcome to SAFE LIFE</h1>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At EcoGuardians, we are committed to protecting and preserving our planet. Our mission is to raise awareness about the urgent need to combat global warming and inspire action to safeguard our environment for future generations.
        </p>
      </section>

      <section className="what-we-do-section">
        <h2>What We Do</h2>
        <ul>
          <li>
            <strong>Education and Awareness:</strong> We provide comprehensive information and resources to educate individuals and communities about climate change and its impact.
          </li>
          <li>
            <strong>Advocacy and Action:</strong> We advocate for environmentally friendly policies and support initiatives aimed at reducing carbon emissions and preserving natural habitats.
          </li>
          <li>
            <strong>Community Engagement:</strong> We engage with communities worldwide to promote sustainable living practices and organize clean-up campaigns.
          </li>
        </ul>
      </section>

      <section className="how-you-can-help">
        <h2>How You Can Help</h2>
        <p>
          You can make a difference! Get informed, take action, and support our cause to combat global warming and protect our planet for future generations.
        </p>
        <ul>
          <li>
            <strong>Get Informed:</strong> Explore our resources to learn about climate change and eco-friendly living.
          </li>
          <li>
            <strong>Take Action:</strong> Join our campaigns or start your own local initiatives.
          </li>
          <li>
            <strong>Support Our Cause:</strong> Donate to help fund our projects.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;

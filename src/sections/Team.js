import React, { forwardRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import lhs from "../media/dark-blue-bg.png";

function Team(props, ref) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  let location = useLocation();

  useEffect(() => {
    const saveMembers = async () => {
      let data = await fetchMembers();
      let team = [];
      let advisors = [];
      let preparedData = {};
      data.forEach((item) => {
        if (item.category === "TEAM") {
          team.push(item);
        } else {
          advisors.push(item);
        }
      });
      preparedData.team = team;
      preparedData.advisors = advisors;
      setMembers(preparedData);
      setLoading(false);
    };

    const fetchMembers = async () => {
      try {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/team`);
        return res.data;
      } catch (err) {
        console.log("Could not fetch Team Members...");
        return null;
      }
    };

    saveMembers();
  }, []);

  const getTeam = () => {
    let list = [];

    members.team.map((TeamMember) => {
      let split = TeamMember.picture.split("/upload/");
      const cloudinarySrc = `${process.env.REACT_APP_CLOUDINARY_URL}/${split[0]}/upload/c_scale,w_200,f_auto/${split[1]}`;
      return list.push(
        <li key={TeamMember.id} className="team-card">
          <Link
            to={{
              pathname: `/team/${TeamMember.slug}`,
              state: { background: location },
            }}
          >
            <div className="team-card-image-wrapper">
              <img
                className="team-card-image"
                src={cloudinarySrc}
                alt={TeamMember.name}
              />
            </div>
            <div className="team-card-text">
                <h5 className="team-card-name">{TeamMember.name}</h5>
                <h6 className="team-card-title">{TeamMember.title}</h6>
            </div>
          </Link>
        </li>
      );
    });

    return list;
  };

  const getAdvisors = () => {
    let list = [];

    members.advisors.map((TeamMember) => {
      let split = TeamMember.picture.split("/upload/");
      const cloudinarySrc = `${process.env.REACT_APP_CLOUDINARY_URL}/${split[0]}/upload/c_scale,w_180,f_auto/${split[1]}`;
      return list.push(
        <li key={TeamMember.id} className="team-card">
          <Link
            to={{
              pathname: `/team/${TeamMember.slug}`,
              state: { background: location },
            }}
          >
            <div className="team-card-image-wrapper">
              <img
                className="team-card-image"
                src={cloudinarySrc}
                alt={TeamMember.name}
              />
            </div>
            <div className="team-card-text">
                <h5 className="team-card-name">{TeamMember.name}</h5>
                <h6 className="team-card-title">{TeamMember.title}</h6>
            </div>
          </Link>
        </li>
      );
    });

    return list;
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div ref={ref}>
      <div className="team-section">
        <div className="team-container">
          <div className="team-info">
            <h2 className="team-header">OUR TEAM</h2>
            <p className="team-paragraph">
            A group of young entrepreneurs passionate about finance and technology who are facing a unique challenge: Finding the winning projects, backed by the best teams in the blockchain space.
            </p>
            <div className="team-bg-wrapper">
              <img src={lhs} alt="db" className="team-bg" />
            </div>
          </div>
          <div className="team-items-wrapper team-members">
            <ul className="team-items">{getTeam()}</ul>
          </div>
        </div>
        <div className="team-container">
          <div className="team-info">
            <h2 className="team-header">OUR SHAREHOLDERS</h2>
            <p className="team-paragraph">
              We are also proud and honoured to be supported by reputable and
              respected managers, entrepreneurs and personalities from all over
              the world who provide us with the expertise we need to thrive in
              such a competitive and highly technical industry.
            </p>
            <div className="team-bg-wrapper">
              <img src={lhs} alt="db" className="team-bg" />
            </div>
          </div>
          <div className="team-items-wrapper">
            <ul className="team-items">{getAdvisors()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Team);

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../style/TeamModal.css";
import axios from "axios";
import Loader from "./Loader";

function TeamModal() {
  let history = useHistory();
  let { id } = useParams();

  let back = (e) => {
    setLoaded(false);
    e.stopPropagation();
    history.goBack();
  };

  const [member, setMember] = useState({});
  const [loaded, setLoaded] = useState(false);

  const cloudinarySrc = () => {
    let split = member.picture.split("/upload/");
    return `${process.env.REACT_APP_CLOUDINARY_URL}/${split[0]}/upload/c_scale,w_240,f_auto/${split[1]}`;
  };

  useEffect(() => {
    const fetchMember = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/team/${id}`
      );
      setMember(res.data);
      setLoaded(true);
    };
    fetchMember();
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    document.body.style.height = "100%";
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.height = "auto";
    };
  }, [id]);

  if (!loaded) return <Loader />;
  return (
    <div className="team-modal-wrapper" role="button" onClick={back}>
      <div
        className="team-modal"
        role="button"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="team-modal-close" onClick={back}>
          X
        </span>
        <div className="team-modal-body">
          <div className="team-modal-image-wrapper">
            <img
              className="team-modal-image"
              src={cloudinarySrc()}
              alt={member.name}
            />
          </div>
          <div className="team-modal-info">
            <div className="team-modal-header">
              <h2 className="team-modal-name">{member.name}</h2>
              <h3 className="team-modal-title">{member.title}</h3>
            </div>
            <p className="team-modal-desc">{member.description}</p>
            <div className="team-modal-contact">
              <h2 className="team-modal-contact-text">Contact: </h2>
              {member.email && (
                <a
                  className="team-modal-mail team-modal-social"
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mail"
                >
                  <i className='far fa-envelope fa-2x' />
                </a>
              )}
              <a
                className="team-modal-linkedin team-modal-social"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;

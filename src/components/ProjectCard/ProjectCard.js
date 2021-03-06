import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../App";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Profile from "../Profile/Profile";
import "./ProjectCard.css";

export default function ProjectCard(props) {
  const [codeSnippet, setCodeSnippet] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [user, setUser] = useState(null);
  const contextUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.project) {
      setBgColor(props.project.backgroundColor);
      setCodeSnippet(props.project.codeSnippet);
      const user = {
        _name: props.project.author,
      };
      setUser(user);
    }
  }, [props.project]);

  const handleCodeChange = (e) => {
    e.preventDefault();
    let codeSnippet = e.target.value;
    props.onCodeChange(codeSnippet);
    setCodeSnippet(codeSnippet);
  };

  const handleClick = () => {
    if (props.project && props.communityPage) {
      const project = {
        name: props.project.name,
        description: props.project.description,
        codeSnippet: props.project.codeSnippet,
        language: props.project.language,
        backgroundColor: props.project.backgroundColor,
        author: props.project.author,
      };
      navigate("/home", { state: { project, user: contextUser } });
    }
  };

  return (
    <section className={"radius-8 project-card"} onClick={() => handleClick()}>
      <div
        id="codebox-bg"
        className={"flex column radius-8 codebox-bg"}
        style={{ backgroundColor: bgColor }}
      >
        <div className={"flex column radius-8 codebox"}>
          <div className={"flex codebox-options"}>
            <div className={"exit-btn"} />
            <div className={"minimize-btn"} />
            <div className={"expand-btn"} />
          </div>
          {props.highlight ? (
            <CodeEditor
              className={"grow-1 color-white codebox-text"}
              value={codeSnippet || ""}
              language={props.language}
              placeholder="Please enter your code."
              onChange={handleCodeChange}
              style={{
                backgroundColor: "var(--codebox-color)",
                fontFamily: "monospace",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: 14,
              }}
            />
          ) : (
            <textarea
              className={"grow-1 color-white codebox-text"}
              value={codeSnippet || ""}
              onChange={handleCodeChange}
            />
          )}
        </div>
      </div>
      {props.project && props.communityPage && (
        <div className={"flex column wrap project-details"}>
          <h1 className={"title-font"}>{props.project.name}</h1>
          <p className={"body-font body-details-opacity"}>
            {props.project.description}
          </p>
          <div className={"flex align-center justify-between mb-24"}>
            <div className="flex align-center">
              <div className={"flex comment-item"}>
                <FontAwesomeIcon icon={faComment} size="lg" />
                <p className="body-font">9</p>
              </div>
              <div className={"flex favorite-item"}>
                <FontAwesomeIcon icon={faHeart} size="lg" />
                <p className="body-font">9</p>
              </div>
            </div>
            {user && (
              <div className="project-author">
                <Profile showIcon={true} user={user} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

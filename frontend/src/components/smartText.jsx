import { useState } from "react";

const SmartText = (props) => {

    const [showLess, setShowLess] = useState(true);

    if ((props.text).length < props.long) {
      return <p>{props.text}</p>;
    } else {
      return (
        <div>
          <p>{ showLess ? `${props.text.slice(0, props.long)}...` : props.text }</p>
          <a
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setShowLess(!showLess)}
          >
            &nbsp;View {showLess ? "More" : "Less"}
          </a>
        </div>
      );
    }


};

export default SmartText
import React from "react";

function Avatar(props) {
    return (
        <img 
            src={require("../images/" + props.logo)}
            className={"animate__animated " + props.animation}
            alt={props.logo} 
            width={props.dimension}
            height={props.dimension}
        ></img>
    );
}

export default Avatar;
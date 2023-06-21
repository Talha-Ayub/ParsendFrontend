import React from "react";


const InputField = (props) => {

  var style = {
    background: "#C6C6C6",
    boxShadow: "0px 0px 5px 1.5px rgba(0, 0, 0, 0.5)",
    borderRadius: "5px",
    border: "none",
    outline: "none",

    // font-size: 20px;
    // margin-top: 20px;
    // margin-bottom: 15px;
    padding: "5px 5px"
    //   "width":50
  };

  if (!props.width) {
    style["width"] = props.size;
    style["height"]=props.height;
  }

  //   style["width"] = props.size;

  return <input style={style} type="text" placeholder={props.ph} name={props.name} value={props.value} onChange={props.onChange} onClick={props.onClick} />;
};

export default InputField;

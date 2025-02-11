import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setUser } from "./actions";
import MyComponet from "./Components/MyComponent";

function px(value) {
  return typeof value === "number" ? `${value}px` : value;
}

function getSpacing(position) {
  return (props) => {
    switch (position) {
      case "top":
        return px(props.gapTop || "");
      case "left":
        return px(props.gapLeft || "");
      case "right":
        return px(props.gapRight || "");
      case "bottom":
        return px(props.gapBottom || "");
      default:
        return px(props.gap || "");
    }
  };
}

function getAlignment(position) {
  switch (position) {
    case "left":
    case "top":
      return "flex-start";
    case "center":
      return "center";
    case "right":
    case "bottom":
      return "flex-end";
    default:
      return "";
  }
}

const HStack = styled.div`
  display: flex;
  align-items: ${(props) => getAlignment(props.alignItems)};

  > * {
    margin: ${getSpacing()};
    margin-top: ${getSpacing("top")};
    margin-right: ${getSpacing("right")};
    margin-bottom: ${getSpacing("bottom")};
    margin-left: ${getSpacing("left")};
  }
`;

const VStack = styled(HStack)`
  flex-direction: column;
`;

const Square = styled.div`
  background-color: crimson;
  width: 24px;
  height: 24px;
`;

class Boxes2 extends React.Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.history.push("/boxes");
    } else {
      this.props.history.push("/");
    }
  }

  handleSignOut = (e) => {
    e.preventDefault();

    this.props.setUser(false);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="section">
        <h1 className="title is-1">App2</h1>
        <h2>Horizontal stack</h2>
        <MyComponet
          title="Custom Title"
          description="This is a component with customized props."
        />

        <HStack gapRight={40} gap={4} style={{ height: 200 }} alignItems="top">
          <Square />
          <Square />
          <Square />
          <Square />
        </HStack>
        <h2>Vertical stack</h2>
        <VStack gapTop={4} alignItems="center">
          <Square />
          <Square />
          <Square />
          <Square />
        </VStack>
        <button onClick={this.handleSignOut} className="button isnot-danger">
          Next Page!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps, { setUser })(Boxes2);

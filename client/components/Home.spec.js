/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemberHome } from "./MemberHome";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("MemberHome", () => {
  let memberHome;

  beforeEach(() => {
    memberHome = shallow(<MemberHome username="cody" />);
  });

  it("renders the email in an h3", () => {
    expect(memberHome.find("h3").text()).to.be.equal("Welcome, cody");
  });
});

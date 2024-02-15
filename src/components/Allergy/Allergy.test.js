import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Allergy from "./Allergy";

const setUp = () => {
  render(
    <Provider store={store}>
      <Allergy
        livesArray={["/img/heart.png", "/img/heart.png", "/img/heart.png"]}
        allergyFruit={{
          src: "/img/fruits/pineapple.png",
          alt: "pineapple",
        }}
      />
    </Provider>
  );
};

describe("Allergy component tests", () => {
  beforeEach(() => {
    setUp();
  });

  test("should render allergy component successfully", () => {
    expect(screen.getByText(/Allergic To/i)).toBeInTheDocument();
  });

  test("should display the allergy image", () => {
    expect(screen.getByAltText("allergy")).toBeInTheDocument();
  });

  test("should display the players lives", () => {
    expect(screen.getAllByAltText("lives")[0]).toBeInTheDocument();
  });
});

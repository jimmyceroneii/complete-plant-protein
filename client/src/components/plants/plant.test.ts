import { EssentialProtein } from "./types";
import { removeProteinsWithPlant } from "./utils";

describe("ProteinListUpdate", () => {
  it("removes an item from the list and updates the proteins", () => {
    const initialProteinList: EssentialProtein[] = ["Histidine"];

    const plant = "bean";

    const updatedProteinList = removeProteinsWithPlant(
      plant,
      initialProteinList,
    );

    expect(updatedProteinList.length).toEqual(0);
  });
});

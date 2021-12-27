describe("Plant List Page", () => {
  it("will check the boxes and see the list updated", () => {
    cy.visit("localhost:1234");

    given.the_bean_is_selected();

    when.the_rice_is_selected();
    then.both_plants_are_selected_and_histidine_is_shown();

    when.both_plants_are_not_selected();
    then.histidine_is_not_shown();
  });
});

const given = {
  the_bean_is_selected() {
    cy.get("[data-cy='check-box-bean']").should("be.checked");
    cy.get("[data-cy='check-box-rice']").should("not.be.checked");
    cy.contains("Histidine");
  },
};

const when = {
  the_rice_is_selected() {
    cy.get("[data-cy='check-box-rice']").click();
  },
  both_plants_are_not_selected() {
    cy.get("[data-cy='check-box-bean']").click();
    cy.get("[data-cy='check-box-rice']").click();
  },
};

const then = {
  both_plants_are_selected_and_histidine_is_shown() {
    cy.get("[data-cy='check-box-bean']").should("be.checked");
    cy.get("[data-cy='check-box-rice']").should("be.checked");
    cy.contains("Histidine");
  },
  histidine_is_not_shown() {
    cy.contains("Histidine").should("not.exist");
  },
};

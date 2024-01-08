describe("connect to test db", () => {
  it("can connect to db", () => {
    cy.task(
      "queryDB",
      "CREATE TABLE if NOT exists Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("Input entries", () => {
    cy.task(
      "queryDB",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (1, "Ivan", "02-2022", "Barcelona"),
    (2, "Maria", "03-2022", "Tokio"),
    (3, "Andrey", "02-2023", "Milan")`
    );
  });

  it("Add more entries", () => {
    cy.task(
      "queryDB",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (4, "Alex", "03-2022", "Berlin"),
    (5, "Sofia", "03-2022", "Dublin")`
    );
  });

  it("Select students from the 03-2022 group", () => {
    cy.task(
      "queryDB",
      `
  SELECT FirstName, StudentGroup, City from Students where StudentGroup="03-2022" order by StudentGroup`
    ).then((result) => {
      cy.log(JSON.stringify(result));
    });
  });

  it("can delete the db", () => {
    cy.task("queryDB", "DROP TABLE Students");
  });
});

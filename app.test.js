const app = require('./app');

test("sum function testing", () => {
  expect(app.add(1, 2)).toBe(3);
});

test("todoList array testing", () => {
  expect(app.todoList.length).toBe(4);
});

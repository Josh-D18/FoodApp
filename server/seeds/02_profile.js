let profiles = [
  {
    username: "api_123_user",
    hash: "q572587bq2405724q05",
    password: "hello",
    user_id: 1,
  },
  {
    username: "api_321_user",
    hash: "q572587bq2405724q05",
    password: "hello",
    user_id: 3,
  },
  {
    username: "api_231_user",
    hash: "q572587bq2405724q05",
    password: "hello",
    user_id: 2,
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("profile")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("profile").insert(profiles);
    });
};

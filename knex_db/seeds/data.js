/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const usersData = require("./seed_data/users_data");
const entriesData = require("./seed_data/entries_data");
const teamsData = require("./seed_data/teams_data");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert(usersData);
    })
    .then(() => {
      return knex("entries").del();
    })
    .then(() => {
      return knex("entries").insert(entriesData);
    })
    .then(() => {
      return knex("teams").del();
    })
    .then(() => {
      return knex("teams").insert(teamsData);
    });
};

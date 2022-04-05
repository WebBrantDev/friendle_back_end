exports.up = function (knex) {
  return knex.schema
    .createTable("teams", (table) => {
      table.increments("id").primary();
      table.string("daily_word", 20);
      table.string("game_type", 30).defaultTo("default");
      table.string("team_name", 50).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table
        .integer("team_id")
        .unsigned()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("avatar", 150).notNullable();
      table.string("username", 50).notNullable();
      table.string("email", 55).notNullable();
      table.string("password", 100);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("entries", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("team_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("game_day", 15).notNullable();
      table.integer("current_game_day", 15).notNullable().defaultTo(289);
      table.integer("num_of_guesses", 5).notNullable();
      table.string("guess_pattern", 50).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entries").dropTable("users").dropTable("teams");
};


exports.up = function (knex) {
return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary(); // sets review_id as primary
    table.text("content");
    table.integer("score");

    table.integer("movie_id").unsigned().notNullable();
    table
    .foreign("movie_id")
    .references("movie_id")
    .inTable("movies")
    .onDelete("CASCADE");

    table.integer("critic_id").unsigned().notNullable(); // Foreign Key, references ID to a particular critic
    table
    .foreign("critic_id")
    .references("critic_id")
    .inTable("critics")
    .onDelete("CASCADE");
    table.timestamps(true, true); // shows created_at and updated_at as timestamps
})
};

exports.down = function (knex) {
return knex.schema.dropTable("reviews");
};

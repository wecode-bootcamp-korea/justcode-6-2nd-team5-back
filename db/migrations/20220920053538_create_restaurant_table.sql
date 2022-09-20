-- migrate:up
create table restaurant(
  id int primary key auto_increment not null,
  name varchar not null,
  intro varchar,
  businessHour varchar not null,
  phoneNumber varchar not null,
  closedDay varchar not null,
  reviewPoint double
)

-- migrate:down
drop table restaurant;

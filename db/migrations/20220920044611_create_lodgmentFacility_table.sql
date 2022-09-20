-- migrate:up
create table lodgmentFacility(
  id int primary key auto_increment not null,
  facility varchar not null
)

-- migrate:down
drop table lodgmentFacility;

-- migrate:up
create table lodgmentHashTag(
  id int primary key auto_increment not null,
  hashTag varchar not null
)

-- migrate:down
drop table lodgmentHashTag;
